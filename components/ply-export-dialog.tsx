"use client"

import { useState } from "react"
import { useIFS } from "./ifs-context"
import { useI18n } from "./i18n-context"
import { exportPLY, estimatePLYFileSize } from "../utils/ply-exporter"
import { exportFBX, exportOBJ, estimateFileSize } from "../utils/fbx-exporter"
import { exportLAS, exportLAZ, estimateLASFileSize } from "../utils/las-exporter"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Info, CheckCircle, AlertTriangle, Settings, Layers } from "lucide-react"
import { exportHighDensityPLY } from "../utils/ply-exporter"

interface ExportDialogProps {
  isOpen: boolean
  onClose: () => void
}

// File format options
const FILE_FORMATS = [
  {
    value: "ply",
    label: "PLY",
    description: "Point cloud format, best for research",
    icon: "📊",
    supports: ["points", "colors"],
    software: ["MeshLab", "CloudCompare", "Blender"],
    recommended: "Point clouds, research",
  },
  {
    value: "las",
    label: "LAS",
    description: "LiDAR standard format, widely supported",
    icon: "📡",
    supports: ["points", "colors", "classification"],
    software: ["CloudCompare", "QGIS", "ArcGIS", "LAStools"],
    recommended: "GIS, LiDAR processing",
  },
  {
    value: "laz",
    label: "LAZ",
    description: "Compressed LAS format, smaller files",
    icon: "🗜️",
    supports: ["points", "colors", "classification"],
    software: ["CloudCompare", "QGIS", "ArcGIS", "LAStools"],
    recommended: "GIS, LiDAR processing, sharing",
  },
  {
    value: "obj",
    label: "OBJ",
    description: "Universal 3D format, widely supported",
    icon: "🎯",
    supports: ["points", "mesh", "colors"],
    software: ["Blender", "Maya", "3ds Max", "Unity"],
    recommended: "General 3D modeling",
  },
  {
    value: "fbx",
    label: "FBX",
    description: "Industry standard, supports advanced features",
    icon: "🏭",
    supports: ["points", "mesh", "materials"],
    software: ["Maya", "3ds Max", "Unity", "Unreal Engine"],
    recommended: "Game engines, animation",
  },
]

// Point cloud density recommendations based on use case
const DENSITY_PRESETS = [
  {
    name: "preview",
    label: "Preview/Draft",
    description: "Quick preview, low quality",
    points: 10000,
    icon: "👁️",
    color: "bg-gray-100 text-gray-800",
    meshQuality: "Low",
    useCase: "Quick visualization, web preview",
  },
  {
    name: "standard",
    label: "Standard Quality",
    description: "Good balance of quality and performance",
    points: 50000,
    icon: "⚖️",
    color: "bg-blue-100 text-blue-800",
    meshQuality: "Medium",
    useCase: "General 3D modeling, basic mesh generation",
  },
  {
    name: "high",
    label: "High Quality",
    description: "Detailed mesh generation",
    points: 200000,
    icon: "✨",
    color: "bg-green-100 text-green-800",
    meshQuality: "High",
    useCase: "Professional modeling, detailed analysis",
  },
  {
    name: "ultra",
    label: "Ultra High",
    description: "Maximum detail for complex surfaces",
    points: 500000,
    icon: "🎯",
    color: "bg-purple-100 text-purple-800",
    meshQuality: "Ultra",
    useCase: "Research, high-precision applications",
  },
  {
    name: "ultra2M",
    label: "2M Points Export",
    description: "Generate 2 million points directly from IFS",
    points: 2000000,
    icon: "🚀",
    color: "bg-red-100 text-red-800",
    meshQuality: "Maximum",
    useCase: "Research, publication, high-precision modeling",
  },
]

export default function ExportDialog({ isOpen, onClose }: ExportDialogProps) {
  const { attractorPoints, pointColors, matrices } = useIFS()
  const { t } = useI18n()
  const [filename, setFilename] = useState("attractor")
  const [fileFormat, setFileFormat] = useState<"ply" | "las" | "laz" | "obj" | "fbx">("ply")
  const [includeColors, setIncludeColors] = useState(true)
  const [plyFormat, setPlyFormat] = useState<"ascii" | "binary">("binary")
  const [lasPointFormat, setLasPointFormat] = useState<number>(2) // Default to format 2 (XYZ + RGB)
  const [lazCompression, setLazCompression] = useState<number>(7) // Default compression level
  const [scale, setScale] = useState(1.0)
  const [usePresets, setUsePresets] = useState(true)
  const [selectedPreset, setSelectedPreset] = useState("standard")
  const [customPointCount, setCustomPointCount] = useState(100000)
  const [customPointInput, setCustomPointInput] = useState("100000")
  const [generateMesh, setGenerateMesh] = useState(false)
  const [meshDensity, setMeshDensity] = useState(1.0)
  const [isExporting, setIsExporting] = useState(false)
  const [exportResult, setExportResult] = useState<any>(null)

  const totalPoints = attractorPoints ? attractorPoints.length / 3 : 0
  const hasColors = pointColors && pointColors.length === (attractorPoints ? attractorPoints.length : 0)

  // Get current point count based on mode
  const getCurrentPointCount = () => {
    if (usePresets) {
      const preset = DENSITY_PRESETS.find((p) => p.name === selectedPreset)
      return Math.min(preset?.points || 50000, Math.max(totalPoints, 2000000))
    } else {
      return Math.min(customPointCount, 2000000)
    }
  }

  const currentPointCount = getCurrentPointCount()
  const currentFormat = FILE_FORMATS.find((f) => f.value === fileFormat)!

  // Estimate file size based on format
  const estimatedSize = (() => {
    switch (fileFormat) {
      case "ply":
        return estimatePLYFileSize(currentPointCount, includeColors && hasColors, plyFormat)
      case "las":
        return estimateLASFileSize(currentPointCount, includeColors && hasColors, "las")
      case "laz":
        return estimateLASFileSize(currentPointCount, includeColors && hasColors, "laz")
      default:
        return estimateFileSize(currentPointCount, includeColors && hasColors, fileFormat, generateMesh)
    }
  })()

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatPointCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`
    return count.toString()
  }

  const getFileExtension = () => {
    return fileFormat
  }

  const handleCustomPointInputChange = (value: string) => {
    setCustomPointInput(value)
    const numValue = Number.parseInt(value.replace(/[^0-9]/g, ""))
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(10000, Math.min(2000000, numValue))
      setCustomPointCount(clampedValue)
    }
  }

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0]
    setCustomPointCount(newValue)
    setCustomPointInput(newValue.toString())
  }

  const handleExport = async () => {
    if (!attractorPoints && currentPointCount < 1000000) return

    setIsExporting(true)
    setExportResult(null)

    try {
      const finalFilename = filename.endsWith(`.${fileFormat}`) ? filename : `${filename}.${fileFormat}`

      let result

      // Handle different export formats
      if (fileFormat === "ply") {
        // PLY export logic (existing)
        if (currentPointCount >= 1000000 || !attractorPoints) {
          result = exportHighDensityPLY(matrices, {
            filename: finalFilename,
            includeColors: includeColors && hasColors,
            format: plyFormat,
            scale,
            targetPoints: currentPointCount,
          })
        } else {
          // Sample existing points for PLY
          let exportPoints = attractorPoints
          let exportColors = pointColors

          if (currentPointCount < totalPoints) {
            const sampledPoints = new Float32Array(currentPointCount * 3)
            const sampledColors = pointColors ? new Float32Array(currentPointCount * 3) : undefined
            const step = totalPoints / currentPointCount

            for (let i = 0; i < currentPointCount; i++) {
              const sourceIndex = Math.floor(i * step)
              sampledPoints[i * 3] = attractorPoints[sourceIndex * 3]
              sampledPoints[i * 3 + 1] = attractorPoints[sourceIndex * 3 + 1]
              sampledPoints[i * 3 + 2] = attractorPoints[sourceIndex * 3 + 2]

              if (sampledColors && pointColors) {
                sampledColors[i * 3] = pointColors[sourceIndex * 3]
                sampledColors[i * 3 + 1] = pointColors[sourceIndex * 3 + 1]
                sampledColors[i * 3 + 2] = pointColors[sourceIndex * 3 + 2]
              }
            }
            exportPoints = sampledPoints
            exportColors = sampledColors
          }

          result = exportPLY(exportPoints, exportColors, {
            filename: finalFilename,
            includeColors: includeColors && hasColors,
            format: plyFormat,
            scale,
          })
        }
      } else if (fileFormat === "las" || fileFormat === "laz") {
        // LAS/LAZ export logic
        let exportPoints: Float32Array
        let exportColors: Float32Array | undefined

        if (currentPointCount >= 1000000 || !attractorPoints) {
          // Generate high-density points
          const { positions, colors } = await import("../utils/ply-exporter").then((module) =>
            module.generateHighDensityPoints(matrices, currentPointCount),
          )
          exportPoints = positions
          exportColors = colors
        } else {
          // Use existing points
          exportPoints = attractorPoints
          exportColors = pointColors

          if (currentPointCount < totalPoints) {
            const sampledPoints = new Float32Array(currentPointCount * 3)
            const sampledColors = pointColors ? new Float32Array(currentPointCount * 3) : undefined
            const step = totalPoints / currentPointCount

            for (let i = 0; i < currentPointCount; i++) {
              const sourceIndex = Math.floor(i * step)
              sampledPoints[i * 3] = attractorPoints[sourceIndex * 3]
              sampledPoints[i * 3 + 1] = attractorPoints[sourceIndex * 3 + 1]
              sampledPoints[i * 3 + 2] = attractorPoints[sourceIndex * 3 + 2]

              if (sampledColors && pointColors) {
                sampledColors[i * 3] = pointColors[sourceIndex * 3]
                sampledColors[i * 3 + 1] = pointColors[sourceIndex * 3 + 1]
                sampledColors[i * 3 + 2] = pointColors[sourceIndex * 3 + 2]
              }
            }
            exportPoints = sampledPoints
            exportColors = sampledColors
          }
        }

        // Export based on format
        if (fileFormat === "las") {
          result = exportLAS(exportPoints, includeColors ? exportColors : undefined, {
            filename: finalFilename,
            includeColors: includeColors && hasColors,
            scale,
            pointFormat: includeColors && hasColors ? lasPointFormat : 0,
          })
        } else {
          result = exportLAZ(exportPoints, includeColors ? exportColors : undefined, {
            filename: finalFilename,
            includeColors: includeColors && hasColors,
            scale,
            pointFormat: includeColors && hasColors ? lasPointFormat : 0,
            compression: lazCompression,
          })
        }
      } else {
        // FBX/OBJ export logic (existing)
        let exportPoints: Float32Array
        let exportColors: Float32Array | undefined

        if (currentPointCount >= 1000000 || !attractorPoints) {
          // Generate high-density points for FBX/OBJ
          const { positions, colors } = await import("../utils/ply-exporter").then((module) =>
            module.generateHighDensityPoints(matrices, currentPointCount),
          )
          exportPoints = positions
          exportColors = colors
        } else {
          // Use existing points
          exportPoints = attractorPoints
          exportColors = pointColors

          if (currentPointCount < totalPoints) {
            const sampledPoints = new Float32Array(currentPointCount * 3)
            const sampledColors = pointColors ? new Float32Array(currentPointCount * 3) : undefined
            const step = totalPoints / currentPointCount

            for (let i = 0; i < currentPointCount; i++) {
              const sourceIndex = Math.floor(i * step)
              sampledPoints[i * 3] = attractorPoints[sourceIndex * 3]
              sampledPoints[i * 3 + 1] = attractorPoints[sourceIndex * 3 + 1]
              sampledPoints[i * 3 + 2] = attractorPoints[sourceIndex * 3 + 2]

              if (sampledColors && pointColors) {
                sampledColors[i * 3] = pointColors[sourceIndex * 3]
                sampledColors[i * 3 + 1] = pointColors[sourceIndex * 3 + 1]
                sampledColors[i * 3 + 2] = pointColors[sourceIndex * 3 + 2]
              }
            }
            exportPoints = sampledPoints
            exportColors = sampledColors
          }
        }

        // Export based on format
        if (fileFormat === "fbx") {
          result = exportFBX(exportPoints, exportColors, {
            filename: finalFilename,
            includeColors: includeColors && hasColors,
            scale,
            generateMesh,
            meshDensity,
          })
        } else {
          result = exportOBJ(exportPoints, exportColors, {
            filename: finalFilename,
            includeColors: includeColors && hasColors,
            scale,
            generateMesh,
            meshDensity,
          })
        }
      }

      setExportResult(result)

      // Auto close after 3 seconds on success
      setTimeout(() => {
        onClose()
        setExportResult(null)
      }, 3000)
    } catch (error) {
      console.error("Export failed:", error)
      setExportResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const canExport = filename.trim() && (attractorPoints || currentPointCount >= 1000000)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Export 3D Model</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Format Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Layers className="w-4 h-4 mr-2 text-green-600" />
                File Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {FILE_FORMATS.map((format) => (
                  <div
                    key={format.value}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      fileFormat === format.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setFileFormat(format.value as any)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{format.icon}</span>
                        <div>
                          <div className="font-medium text-sm">{format.label}</div>
                          <div className="text-xs text-gray-600">{format.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Supports:</div>
                        <div className="text-xs font-medium">{format.supports.join(", ")}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <strong>Best for:</strong> {format.recommended}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      <strong>Software:</strong> {format.software.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Point Cloud Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Info className="w-4 h-4 mr-2 text-blue-600" />
                Export Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Available Points:</span>
                    <span className="font-medium">{totalPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Export Points:</span>
                    <span className="font-medium text-blue-600">{currentPointCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-medium">{currentFormat.label}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Has Colors:</span>
                    <span className="font-medium">{hasColors ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Size:</span>
                    <span className="font-medium">{formatFileSize(estimatedSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Output Type:</span>
                    <span className="font-medium">
                      {generateMesh && (fileFormat === "obj" || fileFormat === "fbx") ? "Mesh" : "Point Cloud"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Point Count Selection Mode */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Settings className="w-4 h-4 mr-2 text-purple-600" />
                Point Count Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mode Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Selection Mode</div>
                    <div className="text-xs text-gray-600">
                      {usePresets ? "Use quality presets" : "Custom point count"}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600">Presets</span>
                    <Switch checked={!usePresets} onCheckedChange={(checked) => setUsePresets(!checked)} />
                    <span className="text-xs text-gray-600">Custom</span>
                  </div>
                </div>

                {/* Preset Mode */}
                {usePresets && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Quality Presets</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {DENSITY_PRESETS.map((preset) => (
                        <div
                          key={preset.name}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedPreset === preset.name
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedPreset(preset.name)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{preset.icon}</span>
                              <div>
                                <div className="font-medium text-sm">{preset.label}</div>
                                <div className="text-xs text-gray-600">{preset.description}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-sm">{formatPointCount(preset.points)}</div>
                              <div className={`text-xs px-2 py-1 rounded ${preset.color}`}>{preset.meshQuality}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Mode */}
                {!usePresets && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Custom Point Count</Label>
                      <div className="mt-2 space-y-3">
                        {/* Direct Input */}
                        <div className="flex items-center space-x-2">
                          <Input
                            value={customPointInput}
                            onChange={(e) => handleCustomPointInputChange(e.target.value)}
                            placeholder="100000"
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 whitespace-nowrap">points</span>
                        </div>

                        {/* Slider */}
                        <div className="space-y-2">
                          <Slider
                            value={[customPointCount]}
                            onValueChange={handleSliderChange}
                            min={10000}
                            max={2000000}
                            step={10000}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>10K</span>
                            <span className="font-medium">{formatPointCount(customPointCount)}</span>
                            <span>2M</span>
                          </div>
                        </div>

                        {/* Quick Buttons */}
                        <div className="flex flex-wrap gap-2">
                          {[50000, 100000, 250000, 500000, 1000000, 2000000].map((count) => (
                            <Button
                              key={count}
                              variant={customPointCount === count ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                setCustomPointCount(count)
                                setCustomPointInput(count.toString())
                              }}
                              className="text-xs"
                            >
                              {formatPointCount(count)}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Export Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Export Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Filename</Label>
                <Input
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="attractor"
                  className="mt-1"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {filename.endsWith(`.${fileFormat}`) ? filename : `${filename}.${fileFormat}`}
                </div>
              </div>

              {/* PLY-specific settings */}
              {fileFormat === "ply" && (
                <div>
                  <Label className="text-sm font-medium">PLY Format</Label>
                  <Select value={plyFormat} onValueChange={(value: "ascii" | "binary") => setPlyFormat(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ascii">ASCII (Human-readable, larger file)</SelectItem>
                      <SelectItem value="binary">Binary (Compact, smaller file)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* LAS-specific settings */}
              {fileFormat === "las" && (
                <div>
                  <Label className="text-sm font-medium">LAS Point Format</Label>
                  <Select
                    value={lasPointFormat.toString()}
                    onValueChange={(value) => setLasPointFormat(Number.parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Format 0 (Basic XYZ)</SelectItem>
                      <SelectItem value="2">Format 2 (XYZ + RGB)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* LAZ-specific settings */}
              {fileFormat === "laz" && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">LAZ Point Format</Label>
                    <Select
                      value={lasPointFormat.toString()}
                      onValueChange={(value) => setLasPointFormat(Number.parseInt(value))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Format 0 (Basic XYZ)</SelectItem>
                        <SelectItem value="2">Format 2 (XYZ + RGB)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Compression Level: {lazCompression}</Label>
                    <Slider
                      value={[lazCompression]}
                      onValueChange={([value]) => setLazCompression(value)}
                      min={1}
                      max={9}
                      step={1}
                      className="mt-1"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>Faster</span>
                      <span>Smaller</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mesh generation for FBX/OBJ */}
              {(fileFormat === "fbx" || fileFormat === "obj") && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Generate Mesh</Label>
                    <Switch checked={generateMesh} onCheckedChange={setGenerateMesh} />
                  </div>

                  {generateMesh && (
                    <div>
                      <Label className="text-sm font-medium">Mesh Density: {meshDensity.toFixed(1)}x</Label>
                      <Slider
                        value={[meshDensity]}
                        onValueChange={([value]) => setMeshDensity(value)}
                        min={0.1}
                        max={2.0}
                        step={0.1}
                        className="mt-1"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Higher density creates more triangles but larger files
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Scale: {scale.toFixed(1)}x</Label>
                <Slider
                  value={[scale]}
                  onValueChange={([value]) => setScale(value)}
                  min={0.1}
                  max={10}
                  step={0.1}
                  className="mt-1"
                />
                <div className="text-xs text-gray-500 mt-1">Adjust model size for target software</div>
              </div>

              {hasColors && (
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Include Colors</Label>
                  <Switch checked={includeColors} onCheckedChange={setIncludeColors} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Warning */}
          {currentPointCount > 500000 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <div className="font-medium">High Point Count Warning</div>
                <div className="text-sm mt-1">
                  Exporting {currentPointCount.toLocaleString()} points may take 30-60 seconds and create large files.
                  {generateMesh && " Mesh generation will increase processing time significantly."}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Export Result */}
          {exportResult && (
            <Alert className={exportResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <CheckCircle className={`w-4 h-4 ${exportResult.success ? "text-green-600" : "text-red-600"}`} />
              <AlertDescription className={exportResult.success ? "text-green-800" : "text-red-800"}>
                {exportResult.success ? (
                  <div>
                    <div className="font-medium">Export successful!</div>
                    <div className="text-xs mt-1">
                      {exportResult.vertexCount?.toLocaleString()} vertices
                      {exportResult.faceCount && ` • ${exportResult.faceCount.toLocaleString()} faces`}
                      {" • "}
                      {formatFileSize(exportResult.fileSize)}
                      {" • "}
                      {exportResult.format || fileFormat.toUpperCase()} format
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-medium">Export failed</div>
                    <div className="text-xs mt-1">{exportResult.error}</div>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Export Button */}
          <Button onClick={handleExport} disabled={isExporting || !canExport} className="w-full" size="lg">
            <Download className="w-4 h-4 mr-2" />
            {isExporting
              ? `Generating ${formatPointCount(currentPointCount)} points...`
              : `Export ${formatPointCount(currentPointCount)} Points as ${currentFormat.label}`}
          </Button>

          {/* Usage Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Software Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-600 space-y-3">
                <div>
                  <strong>PLY Format:</strong>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div>• MeshLab (Poisson Reconstruction)</div>
                    <div>• CloudCompare (Surface Reconstruction)</div>
                    <div>• Blender (Import PLY)</div>
                    <div>• Open3D (Python library)</div>
                  </div>
                </div>

                <div>
                  <strong>LAS/LAZ Format:</strong>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div>• CloudCompare (Native support)</div>
                    <div>• QGIS (with LAStools plugin)</div>
                    <div>• ArcGIS (Native support)</div>
                    <div>• LAStools (Processing suite)</div>
                    <div>• PDAL (Python library)</div>
                    <div>• Potree (Web visualization)</div>
                  </div>
                </div>

                <div>
                  <strong>OBJ Format:</strong>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div>• Blender (File → Import → OBJ)</div>
                    <div>• Maya (Import OBJ)</div>
                    <div>• 3ds Max (Import OBJ)</div>
                    <div>• Unity (Drag to Assets)</div>
                  </div>
                </div>

                <div>
                  <strong>FBX Format:</strong>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div>• Maya (Native support)</div>
                    <div>• 3ds Max (Native support)</div>
                    <div>• Unity (Drag to Assets)</div>
                    <div>• Unreal Engine (Import FBX)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
