export interface FBXExportOptions {
  filename?: string
  includeColors?: boolean
  scale?: number
  generateMesh?: boolean
  meshDensity?: number
}

export interface OBJExportOptions {
  filename?: string
  includeColors?: boolean
  scale?: number
  generateMesh?: boolean
  meshDensity?: number
}

// FBX ASCII format exporter (simplified version)
export function exportFBX(positions: Float32Array, colors?: Float32Array, options: FBXExportOptions = {}) {
  const {
    filename = `attractor-${Date.now()}.fbx`,
    includeColors = true,
    scale = 1.0,
    generateMesh = false,
    meshDensity = 1.0,
  } = options

  const vertexCount = positions.length / 3
  const hasColors = includeColors && colors && colors.length === positions.length

  if (generateMesh) {
    return exportFBXMesh(positions, colors, vertexCount, hasColors, filename, scale, meshDensity)
  } else {
    return exportFBXPoints(positions, colors, vertexCount, hasColors, filename, scale)
  }
}

// OBJ format exporter (simpler and more widely supported)
export function exportOBJ(positions: Float32Array, colors?: Float32Array, options: OBJExportOptions = {}) {
  const {
    filename = `attractor-${Date.now()}.obj`,
    includeColors = true,
    scale = 1.0,
    generateMesh = false,
    meshDensity = 1.0,
  } = options

  const vertexCount = positions.length / 3
  const hasColors = includeColors && colors && colors.length === positions.length

  if (generateMesh) {
    return exportOBJMesh(positions, colors, vertexCount, hasColors, filename, scale, meshDensity)
  } else {
    return exportOBJPoints(positions, colors, vertexCount, hasColors, filename, scale)
  }
}

function exportFBXPoints(
  positions: Float32Array,
  colors: Float32Array | undefined,
  vertexCount: number,
  hasColors: boolean,
  filename: string,
  scale: number,
) {
  // FBX ASCII header
  let content = `; FBX 7.4.0 project file
; Created by Chaoscope Clone
; ----------------------------------------------------

FBXHeaderExtension:  {
	FBXHeaderVersion: 1003
	FBXVersion: 7400
	CreationTimeStamp:  {
		Version: 1000
		Year: ${new Date().getFullYear()}
		Month: ${new Date().getMonth() + 1}
		Day: ${new Date().getDate()}
		Hour: ${new Date().getHours()}
		Minute: ${new Date().getMinutes()}
		Second: ${new Date().getSeconds()}
		Millisecond: ${new Date().getMilliseconds()}
	}
	Creator: "Chaoscope Clone"
}

; Object definitions
Definitions:  {
	Version: 100
	Count: 2
	ObjectType: "Geometry" {
		Count: 1
	}
	ObjectType: "Model" {
		Count: 1
	}
}

; Object properties
Objects:  {
	Geometry: 1000000, "Geometry::AttractorPoints", "Mesh" {
		Vertices: *${vertexCount * 3} {
			a: `

  // Add vertices
  for (let i = 0; i < vertexCount; i++) {
    const x = (positions[i * 3 + 0] * scale).toFixed(6)
    const y = (positions[i * 3 + 1] * scale).toFixed(6)
    const z = (positions[i * 3 + 2] * scale).toFixed(6)
    content += `${x},${y},${z}`
    if (i < vertexCount - 1) content += ","
  }

  content += `
		}
		PolygonVertexIndex: *0 {
			a: 
		}
		GeometryVersion: 124
	}
	
	Model: 2000000, "Model::AttractorModel", "Mesh" {
		Version: 232
		Properties70:  {
			P: "RotationActive", "bool", "", "",1
			P: "InheritType", "enum", "", "",1
			P: "ScalingMax", "Vector3D", "Vector", "",0,0,0
			P: "DefaultAttributeIndex", "int", "Integer", "",0
		}
		Shading: Y
		Culling: "CullingOff"
	}
}

; Object connections
Connections:  {
	C: "OO",1000000,2000000
}
`

  const blob = new Blob([content], { type: "text/plain" })
  downloadBlob(blob, filename)

  return {
    success: true,
    vertexCount,
    fileSize: blob.size,
    hasColors,
    format: "FBX",
  }
}

function exportOBJPoints(
  positions: Float32Array,
  colors: Float32Array | undefined,
  vertexCount: number,
  hasColors: boolean,
  filename: string,
  scale: number,
) {
  let content = `# OBJ file created by Chaoscope Clone
# Vertices: ${vertexCount}
# Format: Point Cloud

`

  // Add vertices
  for (let i = 0; i < vertexCount; i++) {
    const x = (positions[i * 3 + 0] * scale).toFixed(6)
    const y = (positions[i * 3 + 1] * scale).toFixed(6)
    const z = (positions[i * 3 + 2] * scale).toFixed(6)

    if (hasColors && colors) {
      const r = (colors[i * 3 + 0] || 1).toFixed(3)
      const g = (colors[i * 3 + 1] || 1).toFixed(3)
      const b = (colors[i * 3 + 2] || 1).toFixed(3)
      content += `v ${x} ${y} ${z} ${r} ${g} ${b}\n`
    } else {
      content += `v ${x} ${y} ${z}\n`
    }
  }

  // Add points (each vertex as a point)
  content += "\n# Points\n"
  for (let i = 1; i <= vertexCount; i++) {
    content += `p ${i}\n`
  }

  const blob = new Blob([content], { type: "text/plain" })
  downloadBlob(blob, filename)

  return {
    success: true,
    vertexCount,
    fileSize: blob.size,
    hasColors,
    format: "OBJ",
  }
}

function exportFBXMesh(
  positions: Float32Array,
  colors: Float32Array | undefined,
  vertexCount: number,
  hasColors: boolean,
  filename: string,
  scale: number,
  meshDensity: number,
) {
  // Simple mesh generation using Delaunay-like triangulation
  const { vertices, faces } = generateSimpleMesh(positions, scale, meshDensity)

  const content = `; FBX 7.4.0 project file
; Created by Chaoscope Clone - Mesh Export
; ----------------------------------------------------

FBXHeaderExtension:  {
	FBXHeaderVersion: 1003
	FBXVersion: 7400
	CreationTimeStamp:  {
		Version: 1000
		Year: ${new Date().getFullYear()}
		Month: ${new Date().getMonth() + 1}
		Day: ${new Date().getDate()}
		Hour: ${new Date().getHours()}
		Minute: ${new Date().getMinutes()}
		Second: ${new Date().getSeconds()}
		Millisecond: ${new Date().getMilliseconds()}
	}
	Creator: "Chaoscope Clone"
}

Definitions:  {
	Version: 100
	Count: 2
	ObjectType: "Geometry" {
		Count: 1
	}
	ObjectType: "Model" {
		Count: 1
	}
}

Objects:  {
	Geometry: 1000000, "Geometry::AttractorMesh", "Mesh" {
		Vertices: *${vertices.length} {
			a: ${vertices.join(",")}
		}
		PolygonVertexIndex: *${faces.length} {
			a: ${faces.join(",")}
		}
		GeometryVersion: 124
	}
	
	Model: 2000000, "Model::AttractorModel", "Mesh" {
		Version: 232
		Properties70:  {
			P: "RotationActive", "bool", "", "",1
			P: "InheritType", "enum", "", "",1
			P: "ScalingMax", "Vector3D", "Vector", "",0,0,0
			P: "DefaultAttributeIndex", "int", "Integer", "",0
		}
		Shading: Y
		Culling: "CullingOff"
	}
}

Connections:  {
	C: "OO",1000000,2000000
}
`

  const blob = new Blob([content], { type: "text/plain" })
  downloadBlob(blob, filename)

  return {
    success: true,
    vertexCount: vertices.length / 3,
    faceCount: faces.length / 3,
    fileSize: blob.size,
    hasColors,
    format: "FBX",
  }
}

function exportOBJMesh(
  positions: Float32Array,
  colors: Float32Array | undefined,
  vertexCount: number,
  hasColors: boolean,
  filename: string,
  scale: number,
  meshDensity: number,
) {
  const { vertices, faces } = generateSimpleMesh(positions, scale, meshDensity)

  let content = `# OBJ file created by Chaoscope Clone
# Mesh Export
# Vertices: ${vertices.length / 3}
# Faces: ${faces.length / 3}

`

  // Add vertices
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i].toFixed(6)
    const y = vertices[i + 1].toFixed(6)
    const z = vertices[i + 2].toFixed(6)
    content += `v ${x} ${y} ${z}\n`
  }

  // Add faces
  content += "\n# Faces\n"
  for (let i = 0; i < faces.length; i += 3) {
    const a = faces[i] + 1 // OBJ uses 1-based indexing
    const b = faces[i + 1] + 1
    const c = faces[i + 2] + 1
    content += `f ${a} ${b} ${c}\n`
  }

  const blob = new Blob([content], { type: "text/plain" })
  downloadBlob(blob, filename)

  return {
    success: true,
    vertexCount: vertices.length / 3,
    faceCount: faces.length / 3,
    fileSize: blob.size,
    hasColors,
    format: "OBJ",
  }
}

function generateSimpleMesh(positions: Float32Array, scale: number, density: number) {
  // Simple mesh generation - create triangles from nearby points
  const vertices: number[] = []
  const faces: number[] = []

  const step = Math.max(1, Math.floor(1 / density))
  const maxDistance = 0.5 * scale

  // Sample vertices based on density
  for (let i = 0; i < positions.length; i += 3 * step) {
    vertices.push(positions[i] * scale, positions[i + 1] * scale, positions[i + 2] * scale)
  }

  // Generate faces using simple triangulation
  const vertexCount = vertices.length / 3
  for (let i = 0; i < vertexCount - 2; i += 3) {
    if (i + 2 < vertexCount) {
      // Check if points are close enough to form a triangle
      const dist1 = distance3D(vertices, i * 3, (i + 1) * 3)
      const dist2 = distance3D(vertices, (i + 1) * 3, (i + 2) * 3)
      const dist3 = distance3D(vertices, (i + 2) * 3, i * 3)

      if (dist1 < maxDistance && dist2 < maxDistance && dist3 < maxDistance) {
        faces.push(i, i + 1, i + 2)
      }
    }
  }

  return { vertices, faces }
}

function distance3D(vertices: number[], idx1: number, idx2: number): number {
  const dx = vertices[idx1] - vertices[idx2]
  const dy = vertices[idx1 + 1] - vertices[idx2 + 1]
  const dz = vertices[idx1 + 2] - vertices[idx2 + 2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
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

export function estimateFileSize(
  vertexCount: number,
  hasColors: boolean,
  format: "ply" | "fbx" | "obj",
  generateMesh = false,
): number {
  const headerSize = format === "fbx" ? 500 : format === "obj" ? 100 : 150

  if (format === "ply") {
    // PLY binary format
    const vertexSize = hasColors ? 15 : 12
    return headerSize + vertexCount * vertexSize
  } else if (format === "obj") {
    // OBJ text format
    const avgVertexLine = hasColors ? 45 : 30 // "v x.xxxxxx y.yyyyyy z.zzzzzz r.xxx g.xxx b.xxx\n"
    const meshFactor = generateMesh ? 1.5 : 1.1 // Additional faces if mesh
    return headerSize + vertexCount * avgVertexLine * meshFactor
  } else {
    // FBX text format
    const avgVertexSize = 25 // Approximate size per vertex in FBX
    const meshFactor = generateMesh ? 2.0 : 1.2 // Additional data for mesh
    return headerSize + vertexCount * avgVertexSize * meshFactor
  }
}
