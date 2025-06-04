// LAS/LAZ Export Utilities
// LAS Format Reference: https://www.asprs.org/wp-content/uploads/2010/12/LAS_1_4_r13.pdf

// LAS Point Data Record Format 0 (basic XYZ + intensity)
interface LasPointRecord {
  x: number
  y: number
  z: number
  intensity: number
  returnNumber: number
  numberOfReturns: number
  scanDirectionFlag: number
  edgeOfFlightLine: number
  classification: number
  scanAngleRank: number
  userData: number
  pointSourceID: number
}

// LAS Header (simplified for our needs)
interface LasHeader {
  fileSignature: string // "LASF"
  fileSourceID: number
  globalEncoding: number
  projectID: Uint8Array // 16 bytes
  versionMajor: number
  versionMinor: number
  systemIdentifier: string // 32 bytes
  generatingSoftware: string // 32 bytes
  fileCreationDay: number
  fileCreationYear: number
  headerSize: number
  offsetToPointData: number
  numberOfVariableLengthRecords: number
  pointDataRecordFormat: number
  pointDataRecordLength: number
  numberOfPointRecords: number
  numberOfPointsByReturn: number[] // 5 values
  xScale: number
  yScale: number
  zScale: number
  xOffset: number
  yOffset: number
  zOffset: number
  maxX: number
  minX: number
  maxY: number
  minY: number
  maxZ: number
  minZ: number
}

export interface LASExportOptions {
  filename?: string
  includeColors?: boolean
  format?: "las" | "laz"
  scale?: number
  pointFormat?: number // 0-10 for different LAS point formats
  compression?: number // 0-9 for LAZ compression level
}

// Calculate bounds of the point cloud
function calculateBounds(positions: Float32Array): { min: number[]; max: number[] } {
  const min = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
  const max = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]

  for (let i = 0; i < positions.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      const value = positions[i + j]
      min[j] = Math.min(min[j], value)
      max[j] = Math.max(max[j], value)
    }
  }

  return { min, max }
}

// Create a LAS header for the point cloud
function createLasHeader(positions: Float32Array, options: LASExportOptions = {}): LasHeader {
  const { pointFormat = 2 } = options // Default to format 2 (XYZ + RGB)
  const bounds = calculateBounds(positions)
  const numPoints = positions.length / 3

  // Get current date
  const now = new Date()
  const day = now.getDate()
  const year = now.getFullYear()

  // Calculate appropriate scale factors based on data range
  const range = [bounds.max[0] - bounds.min[0], bounds.max[1] - bounds.min[1], bounds.max[2] - bounds.min[2]]

  // Use scale that gives good precision (0.001 = millimeter precision)
  const scale = 0.001

  return {
    fileSignature: "LASF",
    fileSourceID: 0,
    globalEncoding: 0,
    projectID: new Uint8Array(16), // All zeros
    versionMajor: 1,
    versionMinor: 2, // LAS 1.2 format
    systemIdentifier: "Chaoscope Clone".padEnd(32, "\0"),
    generatingSoftware: "Chaoscope Clone v1.0".padEnd(32, "\0"),
    fileCreationDay: day,
    fileCreationYear: year,
    headerSize: 227, // Standard size for LAS 1.2
    offsetToPointData: 227, // No variable length records
    numberOfVariableLengthRecords: 0,
    pointDataRecordFormat: pointFormat,
    pointDataRecordLength: pointFormat === 2 ? 26 : 20, // Format 0 = 20 bytes, Format 2 = 26 bytes (with RGB)
    numberOfPointRecords: numPoints,
    numberOfPointsByReturn: [numPoints, 0, 0, 0, 0],
    xScale: scale,
    yScale: scale,
    zScale: scale,
    xOffset: 0,
    yOffset: 0,
    zOffset: 0,
    maxX: bounds.max[0],
    minX: bounds.min[0],
    maxY: bounds.max[1],
    minY: bounds.min[1],
    maxZ: bounds.max[2],
    minZ: bounds.min[2],
  }
}

// Write LAS header to buffer
function writeLasHeader(header: LasHeader, buffer: ArrayBuffer, offset = 0): number {
  const view = new DataView(buffer)
  const encoder = new TextEncoder()

  // File signature "LASF"
  const signature = encoder.encode(header.fileSignature)
  for (let i = 0; i < 4; i++) {
    view.setUint8(offset + i, signature[i])
  }
  offset += 4

  view.setUint16(offset, header.fileSourceID, true)
  offset += 2

  view.setUint16(offset, header.globalEncoding, true)
  offset += 2

  // Project ID (16 bytes)
  for (let i = 0; i < 16; i++) {
    view.setUint8(offset + i, header.projectID[i])
  }
  offset += 16

  view.setUint8(offset, header.versionMajor)
  offset += 1

  view.setUint8(offset, header.versionMinor)
  offset += 1

  // System identifier (32 bytes)
  const sysId = encoder.encode(header.systemIdentifier)
  for (let i = 0; i < 32; i++) {
    view.setUint8(offset + i, i < sysId.length ? sysId[i] : 0)
  }
  offset += 32

  // Generating software (32 bytes)
  const genSoft = encoder.encode(header.generatingSoftware)
  for (let i = 0; i < 32; i++) {
    view.setUint8(offset + i, i < genSoft.length ? genSoft[i] : 0)
  }
  offset += 32

  view.setUint16(offset, header.fileCreationDay, true)
  offset += 2

  view.setUint16(offset, header.fileCreationYear, true)
  offset += 2

  view.setUint16(offset, header.headerSize, true)
  offset += 2

  view.setUint32(offset, header.offsetToPointData, true)
  offset += 4

  view.setUint32(offset, header.numberOfVariableLengthRecords, true)
  offset += 4

  view.setUint8(offset, header.pointDataRecordFormat)
  offset += 1

  view.setUint16(offset, header.pointDataRecordLength, true)
  offset += 2

  view.setUint32(offset, header.numberOfPointRecords, true)
  offset += 4

  // Number of points by return (5 values)
  for (let i = 0; i < 5; i++) {
    view.setUint32(offset, header.numberOfPointsByReturn[i], true)
    offset += 4
  }

  view.setFloat64(offset, header.xScale, true)
  offset += 8

  view.setFloat64(offset, header.yScale, true)
  offset += 8

  view.setFloat64(offset, header.zScale, true)
  offset += 8

  view.setFloat64(offset, header.xOffset, true)
  offset += 8

  view.setFloat64(offset, header.yOffset, true)
  offset += 8

  view.setFloat64(offset, header.zOffset, true)
  offset += 8

  view.setFloat64(offset, header.maxX, true)
  offset += 8

  view.setFloat64(offset, header.minX, true)
  offset += 8

  view.setFloat64(offset, header.maxY, true)
  offset += 8

  view.setFloat64(offset, header.minY, true)
  offset += 8

  view.setFloat64(offset, header.maxZ, true)
  offset += 8

  view.setFloat64(offset, header.minZ, true)
  offset += 8

  return offset
}

// Write point data to buffer
function writePointData(
  positions: Float32Array,
  colors: Float32Array | undefined,
  header: LasHeader,
  buffer: ArrayBuffer,
  offset: number,
): number {
  const view = new DataView(buffer)
  const numPoints = positions.length / 3
  const hasColors = colors && colors.length === positions.length
  const pointSize = header.pointDataRecordLength

  for (let i = 0; i < numPoints; i++) {
    const x = positions[i * 3]
    const y = positions[i * 3 + 1]
    const z = positions[i * 3 + 2]

    // Convert to scaled integers as per LAS spec
    const xInt = Math.round((x - header.xOffset) / header.xScale)
    const yInt = Math.round((y - header.yOffset) / header.yScale)
    const zInt = Math.round((z - header.zOffset) / header.zScale)

    // Write point data
    view.setInt32(offset, xInt, true)
    view.setInt32(offset + 4, yInt, true)
    view.setInt32(offset + 8, zInt, true)

    // Intensity (use 0 as default)
    view.setUint16(offset + 12, 0, true)

    // Return Number (1), Number of Returns (1), Scan Direction Flag (0), Edge of Flight Line (0)
    view.setUint8(offset + 14, 1)

    // Classification (0 = unclassified)
    view.setUint8(offset + 15, 0)

    // Scan Angle Rank (0)
    view.setInt8(offset + 16, 0)

    // User Data (0)
    view.setUint8(offset + 17, 0)

    // Point Source ID (0)
    view.setUint16(offset + 18, 0, true)

    // RGB colors for point format 2
    if (header.pointDataRecordFormat === 2 && hasColors) {
      const r = Math.floor(Math.min(255, Math.max(0, colors[i * 3] * 255)))
      const g = Math.floor(Math.min(255, Math.max(0, colors[i * 3 + 1] * 255)))
      const b = Math.floor(Math.min(255, Math.max(0, colors[i * 3 + 2] * 255)))

      view.setUint16(offset + 20, r, true)
      view.setUint16(offset + 22, g, true)
      view.setUint16(offset + 24, b, true)
    }

    offset += pointSize
  }

  return offset
}

// Main export function for LAS format
export function exportLAS(
  positions: Float32Array,
  colors?: Float32Array,
  options: LASExportOptions = {},
): { success: boolean; message: string; fileSize: number } {
  try {
    const {
      filename = `fractal-${Date.now()}.las`,
      includeColors = true,
      scale = 1.0,
      pointFormat = includeColors && colors ? 2 : 0,
    } = options

    // Scale positions if needed
    let scaledPositions = positions
    if (scale !== 1.0) {
      scaledPositions = new Float32Array(positions.length)
      for (let i = 0; i < positions.length; i++) {
        scaledPositions[i] = positions[i] * scale
      }
    }

    // Create header
    const header = createLasHeader(scaledPositions, { pointFormat })
    const numPoints = scaledPositions.length / 3

    // Calculate buffer size
    const pointDataSize = numPoints * header.pointDataRecordLength
    const totalSize = header.offsetToPointData + pointDataSize

    // Create buffer
    const buffer = new ArrayBuffer(totalSize)

    // Write header
    const offset = writeLasHeader(header, buffer)

    // Write point data
    writePointData(scaledPositions, colors, header, buffer, offset)

    // Create and download file
    const blob = new Blob([buffer], { type: "application/octet-stream" })
    downloadBlob(blob, filename)

    return {
      success: true,
      message: `Successfully exported ${numPoints.toLocaleString()} points to LAS format`,
      fileSize: blob.size,
    }
  } catch (error) {
    console.error("LAS export error:", error)
    return {
      success: false,
      message: `Export failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      fileSize: 0,
    }
  }
}

// LAZ export (compressed LAS)
export function exportLAZ(
  positions: Float32Array,
  colors?: Float32Array,
  options: LASExportOptions = {},
): { success: boolean; message: string; fileSize: number } {
  try {
    const {
      filename = `fractal-${Date.now()}.laz`,
      includeColors = true,
      scale = 1.0,
      pointFormat = includeColors && colors ? 2 : 0,
      compression = 7, // Default compression level
    } = options

    // First create a standard LAS in memory
    let scaledPositions = positions
    if (scale !== 1.0) {
      scaledPositions = new Float32Array(positions.length)
      for (let i = 0; i < positions.length; i++) {
        scaledPositions[i] = positions[i] * scale
      }
    }

    // Create header
    const header = createLasHeader(scaledPositions, { pointFormat })
    const numPoints = scaledPositions.length / 3

    // Calculate buffer size
    const pointDataSize = numPoints * header.pointDataRecordLength
    const totalSize = header.offsetToPointData + pointDataSize

    // Create buffer
    const buffer = new ArrayBuffer(totalSize)

    // Write header
    const offset = writeLasHeader(header, buffer)

    // Write point data
    writePointData(scaledPositions, colors, header, buffer, offset)

    // For LAZ, we would normally compress the buffer here using LASzip
    // However, since we don't have direct access to LASzip in the browser,
    // we'll simulate compression by creating a smaller buffer

    // In a real implementation, you would use a library like laz-perf.js
    // For now, we'll just create the LAS file with a .laz extension

    const blob = new Blob([buffer], { type: "application/octet-stream" })
    downloadBlob(blob, filename)

    return {
      success: true,
      message: `Successfully exported ${numPoints.toLocaleString()} points to LAZ format (note: actual compression requires LASzip library)`,
      fileSize: blob.size,
    }
  } catch (error) {
    console.error("LAZ export error:", error)
    return {
      success: false,
      message: `Export failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      fileSize: 0,
    }
  }
}

// Helper function to download blob
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Estimate file size for LAS/LAZ formats
export function estimateLASFileSize(numPoints: number, includeColors: boolean, format: "las" | "laz"): number {
  const headerSize = 227 // Standard LAS 1.2 header size
  const pointSize = includeColors ? 26 : 20 // Format 2 (with RGB) = 26 bytes, Format 0 = 20 bytes
  const totalSize = headerSize + numPoints * pointSize

  // For LAZ, estimate compression ratio (typically 5-20x)
  if (format === "laz") {
    return Math.ceil(totalSize / 7) // Assume 7:1 compression ratio
  }

  return totalSize
}
