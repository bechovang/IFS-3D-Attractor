"use client"

import { useState } from "react"
import { useIFS } from "./ifs-context"
import { useI18n } from "./i18n-context"
import { exportPLY, estimatePLYFileSize } from "../utils/ply-exporter"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Info, CheckCircle, AlertTriangle, Lightbulb, Target } from "lucide-react"

interface PLYExportDialogProps {
  isOpen: boolean
  onClose: () => void
}

// Point cloud density recommendations based on use case
const DENSITY_PRESETS = [
  {
    name: "preview",
    label: "Preview/Draft",
    description: "Quick preview, low quality",
    points: 5000,
    icon: "👁️",
    color: "bg-gray-100 text-gray-800",
    meshQuality: "Low",
    useCase: "Quick visualization, web preview",
  },
  {
    name: "standard",
    label: "Standard Quality",
    description: "Good balance of quality and performance",
    points: 25000,
    icon: "⚖️",
    color: "bg-blue-100 text-blue-800",
    meshQuality: "Medium",
    useCase: "General 3D modeling, basic mesh generation",
  },
  {
    name: "high",
    label: "High Quality",
    description: "Detailed mesh generation",
    points: 100000,
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
    name: "custom",
    label: "Custom",
    description: "User-defined point count",
    points: 50000,
    icon: "🔧",
    color: "bg-orange-100 text-orange-800",
    meshQuality: "Variable",
    useCase: "Specific requirements",
  },
]

// Mesh generation recommendations
const MESH_RECOMMENDATIONS = {
  "1000-5000": {
    quality: "Basic",
    algorithms: ["Delaunay triangulation"],
    suitableFor: "Simple 2D surfaces, basic visualization",
    warning: "May have holes or irregular triangles",
  },
  "5000-25000": {
    quality: "Good",
    algorithms: ["Ball Pivoting Algorithm", "Alpha shapes"],
    suitableFor: "Standard 3D objects, moderate detail",
    warning: "Good for most general purposes",
  },
  "25000-100000": {
    quality: "High",
    algorithms: ["Poisson Surface Reconstruction", "Ball Pivoting Algorithm"],
    suitableFor: "Detailed 3D models, professional work",
    warning: "Excellent mesh quality expected",
  },
  "100000+": {
    quality: "Ultra",
    algorithms: ["Poisson Surface Reconstruction"],
    suitableFor: "Research, high-precision modeling, complex surfaces",
    warning: "Maximum detail, large file sizes",
  },
}

export default function PLYExportDialog({ isOpen, onClose }: PLYExportDialogProps) {
  const { attractorPoints, pointColors } = useIFS()
  const { t } = useI18n()
  const [filename, setFilename] = useState("attractor")
  const [includeColors, setIncludeColors] = useState(true)
  const [format, setFormat] = useState<"ascii" | "binary">("ascii")
  const [scale, setScale] = useState(1.0)
  const [selectedPreset, setSelectedPreset] = useState("standard")
  const [customPointCount, setCustomPointCount] = useState(50000)
  const [isExporting, setIsExporting] = useState(false)
  const [exportResult, setExportResult] = useState<any>(null)

  if (!attractorPoints) return null

  const totalPoints = attractorPoints.length / 3
  const hasColors = pointColors && pointColors.length === attractorPoints.length

  // Get current point count based on preset
  const getCurrentPointCount = () => {
    if (selectedPreset === "custom") {
      return Math.min(customPointCount, totalPoints)
    }
    const preset = DENSITY_PRESETS.find((p) => p.name === selectedPreset)
    return Math.min(preset?.points || 25000, totalPoints)
  }

  const currentPointCount = getCurrentPointCount()
  const estimatedSize = estimatePLYFileSize(currentPointCount, includeColors && hasColors, format)

  // Get mesh recommendation based on point count
  const getMeshRecommendation = (points: number) => {
    if (points < 5000) return MESH_RECOMMENDATIONS["1000-5000"]
    if (points < 25000) return MESH_RECOMMENDATIONS["5000-25000"]
    if (points < 100000) return MESH_RECOMMENDATIONS["25000-100000"]
    return MESH_RECOMMENDATIONS["100000+"]
  }

  const meshRec = getMeshRecommendation(currentPointCount)

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleExport = async () => {
    if (!attractorPoints) return

    setIsExporting(true)
    setExportResult(null)

    try {
      const finalFilename = filename.endsWith(".ply") ? filename : `${filename}.ply`

      // Sample points if needed
      let exportPoints = attractorPoints
      let exportColors = pointColors

      if (currentPointCount < totalPoints) {
        // Create sampled arrays
        const sampledPoints = new Float32Array(currentPointCount * 3)
        const sampledColors = pointColors ? new Float32Array(currentPointCount * 3) : undefined

        const step = totalPoints / currentPointCount

        for (let i = 0; i < currentPointCount; i++) {
          const sourceIndex = Math.floor(i * step)

          // Copy position
          sampledPoints[i * 3] = attractorPoints[sourceIndex * 3]
          sampledPoints[i * 3 + 1] = attractorPoints[sourceIndex * 3 + 1]
          sampledPoints[i * 3 + 2] = attractorPoints[sourceIndex * 3 + 2]

          // Copy color if available
          if (sampledColors && pointColors) {
            sampledColors[i * 3] = pointColors[sourceIndex * 3]
            sampledColors[i * 3 + 1] = pointColors[sourceIndex * 3 + 1]
            sampledColors[i * 3 + 2] = pointColors[sourceIndex * 3 + 2]
          }
        }

        exportPoints = sampledPoints
        exportColors = sampledColors
      }

      const result = exportPLY(exportPoints, exportColors, {
        filename: finalFilename,
        includeColors: includeColors && hasColors,
        format,
        scale,
      })

      setExportResult(result)

      // Auto close after 2 seconds on success
      setTimeout(() => {
        onClose()
        setExportResult(null)
      }, 2000)
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>{t.exportPLY}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Point Cloud Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Info className="w-4 h-4 mr-2 text-blue-600" />
                Point Cloud Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Points:</span>
                    <span className="font-medium">{totalPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Export Points:</span>
                    <span className="font-medium text-blue-600">{currentPointCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sampling Ratio:</span>
                    <span className="font-medium">{((currentPointCount / totalPoints) * 100).toFixed(1)}%</span>
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
                    <span>Mesh Quality:</span>
                    <span className="font-medium text-green-600">{meshRec.quality}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Point Density Presets */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Target className="w-4 h-4 mr-2 text-purple-600" />
                Point Density Presets
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                        <div className="font-medium text-sm">
                          {preset.name === "custom"
                            ? customPointCount.toLocaleString()
                            : preset.points.toLocaleString()}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${preset.color}`}>{preset.meshQuality}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <strong>Use case:</strong> {preset.useCase}
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Point Count Input */}
              {selectedPreset === "custom" && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <Label className="text-sm font-medium">Custom Point Count</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={[customPointCount]}
                      onValueChange={([value]) => setCustomPointCount(value)}
                      min={1000}
                      max={totalPoints}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>1K</span>
                      <span className="font-medium">{customPointCount.toLocaleString()}</span>
                      <span>{(totalPoints / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mesh Generation Recommendations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
                Mesh Generation Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      meshRec.quality === "Ultra"
                        ? "bg-purple-100 text-purple-800"
                        : meshRec.quality === "High"
                          ? "bg-green-100 text-green-800"
                          : meshRec.quality === "Good"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {meshRec.quality} Quality
                  </div>
                  <div className="text-sm text-gray-600">{meshRec.warning}</div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Recommended Algorithms:</div>
                  <div className="flex flex-wrap gap-1">
                    {meshRec.algorithms.map((algo, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {algo}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Suitable For:</div>
                  <div className="text-sm text-gray-600">{meshRec.suitableFor}</div>
                </div>
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
                  {filename.endsWith(".ply") ? filename : `${filename}.ply`}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Format</Label>
                <Select value={format} onValueChange={(value: "ascii" | "binary") => setFormat(value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ascii">ASCII (Human-readable, larger file)</SelectItem>
                    <SelectItem value="binary">Binary (Compact, smaller file)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
          {currentPointCount > 100000 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <div className="font-medium">High Point Count Warning</div>
                <div className="text-sm mt-1">
                  Exporting {currentPointCount.toLocaleString()} points may take longer and create large files. Consider
                  using a lower density preset for faster processing.
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
                      {exportResult.vertexCount.toLocaleString()} vertices • {formatFileSize(exportResult.fileSize)}
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
          <Button onClick={handleExport} disabled={isExporting || !filename.trim()} className="w-full" size="lg">
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Exporting..." : `Export ${currentPointCount.toLocaleString()} Points`}
          </Button>

          {/* Usage Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Software Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-600 space-y-2">
                <div>
                  <strong>Mesh Generation Software:</strong>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>• MeshLab (Poisson Reconstruction)</div>
                  <div>• CloudCompare (Surface Reconstruction)</div>
                  <div>• Blender (Add-ons required)</div>
                  <div>• Open3D (Python library)</div>
                </div>
                <div className="mt-3">
                  <strong>3D Software Import:</strong>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>• Blender (File → Import → PLY)</div>
                  <div>• Unity (Drag to Assets folder)</div>
                  <div>• Houdini (File → Import)</div>
                  <div>• Maya (Import plugin required)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
