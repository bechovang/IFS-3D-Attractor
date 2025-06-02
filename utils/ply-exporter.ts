export interface PLYExportOptions {
  filename?: string
  includeColors?: boolean
  format?: "ascii" | "binary"
  scale?: number
}

// Thêm interface cho IFS configuration
interface IFSTransformation {
  matrix: number[][] // 3x3 matrix
  translation: number[] // 3D vector
  probability: number
}

// Hàm tạo 2M điểm trực tiếp từ IFS mà không cần render
export function generateHighDensityPoints(
  matrices: any[],
  targetPoints = 2000000,
): { positions: Float32Array; colors: Float32Array } {
  console.log(`Generating ${targetPoints.toLocaleString()} points using IFS Chaos Game...`)

  // Chuẩn bị IFS transformations
  const transformations: IFSTransformation[] = matrices
    .filter((m) => m.enabled)
    .map((m) => ({
      matrix: [
        [m.a, m.c, m.e],
        [m.b, m.d, m.f],
        [m.g, m.h, m.i],
      ],
      translation: [m.tx, m.ty, m.tz],
      probability: m.probability,
    }))

  if (transformations.length === 0) {
    throw new Error("No enabled transformations found")
  }

  // Normalize probabilities
  const totalProb = transformations.reduce((sum, t) => sum + t.probability, 0)
  transformations.forEach((t) => (t.probability /= totalProb))

  // Create cumulative probability array for faster selection
  const cumProbs: number[] = []
  let cumSum = 0
  for (const t of transformations) {
    cumSum += t.probability
    cumProbs.push(cumSum)
  }

  // Initialize arrays
  const positions = new Float32Array(targetPoints * 3)
  const colors = new Float32Array(targetPoints * 3)

  // Starting point
  let x = 0.0,
    y = 0.0,
    z = 0.0

  // Pre-parse colors for performance
  const parsedColors = matrices
    .filter((m) => m.enabled)
    .map((m) => {
      const color = m.color
      return {
        r: Number.parseInt(color.slice(1, 3), 16) / 255,
        g: Number.parseInt(color.slice(3, 5), 16) / 255,
        b: Number.parseInt(color.slice(5, 7), 16) / 255,
      }
    })

  // Chaos Game algorithm
  for (let i = 0; i < targetPoints; i++) {
    // Select transformation based on probability
    const rand = Math.random()
    let transformIndex = 0

    for (let j = 0; j < cumProbs.length; j++) {
      if (rand <= cumProbs[j]) {
        transformIndex = j
        break
      }
    }

    const transform = transformations[transformIndex]

    // Apply affine transformation: newPoint = matrix * point + translation
    const newX =
      transform.matrix[0][0] * x + transform.matrix[0][1] * y + transform.matrix[0][2] * z + transform.translation[0]
    const newY =
      transform.matrix[1][0] * x + transform.matrix[1][1] * y + transform.matrix[1][2] * z + transform.translation[1]
    const newZ =
      transform.matrix[2][0] * x + transform.matrix[2][1] * y + transform.matrix[2][2] * z + transform.translation[2]

    x = newX
    y = newY
    z = newZ

    // Store point (scale for better visualization)
    const scale = 10
    positions[i * 3] = x * scale
    positions[i * 3 + 1] = y * scale
    positions[i * 3 + 2] = z * scale

    // Store color
    const color = parsedColors[transformIndex]
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    // Progress logging
    if (i % 100000 === 0) {
      console.log(`Generated ${i.toLocaleString()} / ${targetPoints.toLocaleString()} points`)
    }
  }

  console.log(`Successfully generated ${targetPoints.toLocaleString()} points`)
  return { positions, colors }
}

export function exportPLY(positions: Float32Array, colors?: Float32Array, options: PLYExportOptions = {}) {
  const { filename = `attractor-${Date.now()}.ply`, includeColors = true, format = "ascii", scale = 1.0 } = options

  const vertexCount = positions.length / 3
  const hasColors = includeColors && colors && colors.length === positions.length

  if (format === "ascii") {
    return exportPLYAscii(positions, colors, vertexCount, hasColors, filename, scale)
  } else {
    return exportPLYBinary(positions, colors, vertexCount, hasColors, filename, scale)
  }
}

// Cập nhật hàm exportPLY để hỗ trợ high density generation
export function exportHighDensityPLY(matrices: any[], options: PLYExportOptions & { targetPoints?: number } = {}) {
  const {
    filename = `ifs-2M-points-${Date.now()}.ply`,
    includeColors = true,
    format = "binary",
    scale = 1.0,
    targetPoints = 2000000,
  } = options

  console.log(`Starting high-density PLY export: ${targetPoints.toLocaleString()} points`)

  // Generate high-density point cloud
  const { positions, colors } = generateHighDensityPoints(matrices, targetPoints)

  // Export to PLY
  if (format === "ascii") {
    return exportPLYAscii(positions, colors, targetPoints, includeColors, filename, scale)
  } else {
    return exportPLYBinary(positions, colors, targetPoints, includeColors, filename, scale)
  }
}

function exportPLYAscii(
  positions: Float32Array,
  colors: Float32Array | undefined,
  vertexCount: number,
  hasColors: boolean,
  filename: string,
  scale: number,
) {
  // Build header
  let header = `ply
format ascii 1.0
comment Generated by Chaoscope Clone
element vertex ${vertexCount}
property float x
property float y
property float z`

  if (hasColors) {
    header += `
property uchar red
property uchar green
property uchar blue`
  }

  header += `\nend_header\n`

  // Build vertex data
  let body = ""
  for (let i = 0; i < vertexCount; i++) {
    const x = (positions[i * 3 + 0] * scale).toFixed(6)
    const y = (positions[i * 3 + 1] * scale).toFixed(6)
    const z = (positions[i * 3 + 2] * scale).toFixed(6)

    if (hasColors && colors) {
      const r = Math.floor(Math.min(255, Math.max(0, (colors[i * 3 + 0] || 1) * 255)))
      const g = Math.floor(Math.min(255, Math.max(0, (colors[i * 3 + 1] || 1) * 255)))
      const b = Math.floor(Math.min(255, Math.max(0, (colors[i * 3 + 2] || 1) * 255)))
      body += `${x} ${y} ${z} ${r} ${g} ${b}\n`
    } else {
      body += `${x} ${y} ${z}\n`
    }
  }

  // Create and download file
  const content = header + body
  const blob = new Blob([content], { type: "text/plain" })
  downloadBlob(blob, filename)

  return {
    success: true,
    vertexCount,
    fileSize: blob.size,
    hasColors,
  }
}

function exportPLYBinary(
  positions: Float32Array,
  colors: Float32Array | undefined,
  vertexCount: number,
  hasColors: boolean,
  filename: string,
  scale: number,
) {
  // Build header
  let header = `ply
format binary_little_endian 1.0
comment Generated by Chaoscope Clone
element vertex ${vertexCount}
property float x
property float y
property float z`

  if (hasColors) {
    header += `
property uchar red
property uchar green
property uchar blue`
  }

  header += `\nend_header\n`

  // Calculate buffer size
  const headerBytes = new TextEncoder().encode(header)
  const vertexSize = hasColors ? 15 : 12 // 3 floats (12 bytes) + optional 3 uchars (3 bytes)
  const dataSize = vertexCount * vertexSize
  const totalSize = headerBytes.length + dataSize

  // Create binary buffer
  const buffer = new ArrayBuffer(totalSize)
  const view = new DataView(buffer)
  const uint8View = new Uint8Array(buffer)

  // Write header
  uint8View.set(headerBytes, 0)
  let offset = headerBytes.length

  // Write vertex data
  for (let i = 0; i < vertexCount; i++) {
    // Write position (3 floats, little endian)
    view.setFloat32(offset, positions[i * 3 + 0] * scale, true)
    view.setFloat32(offset + 4, positions[i * 3 + 1] * scale, true)
    view.setFloat32(offset + 8, positions[i * 3 + 2] * scale, true)
    offset += 12

    if (hasColors && colors) {
      // Write color (3 uchars)
      const r = Math.floor(Math.min(255, Math.max(0, (colors[i * 3 + 0] || 1) * 255)))
      const g = Math.floor(Math.min(255, Math.max(0, (colors[i * 3 + 1] || 1) * 255)))
      const b = Math.floor(Math.min(255, Math.max(0, (colors[i * 3 + 2] || 1) * 255)))

      view.setUint8(offset, r)
      view.setUint8(offset + 1, g)
      view.setUint8(offset + 2, b)
      offset += 3
    }
  }

  // Create and download file
  const blob = new Blob([buffer], { type: "application/octet-stream" })
  downloadBlob(blob, filename)

  return {
    success: true,
    vertexCount,
    fileSize: blob.size,
    hasColors,
  }
}

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

export function estimatePLYFileSize(vertexCount: number, hasColors: boolean, format: "ascii" | "binary"): number {
  const headerSize = 150 // Approximate header size

  if (format === "ascii") {
    // Each vertex: "x.xxxxxx y.yyyyyy z.zzzzzz" (about 24 chars) + optional " r g b" (about 8 chars) + newline
    const avgLineSize = hasColors ? 33 : 25
    return headerSize + vertexCount * avgLineSize
  } else {
    // Binary: 3 floats (12 bytes) + optional 3 uchars (3 bytes)
    const vertexSize = hasColors ? 15 : 12
    return headerSize + vertexCount * vertexSize
  }
}
