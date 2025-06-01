"use client"

import { useState } from "react"
import { useIFS } from "./ifs-context"
import { exportPLY, estimatePLYFileSize } from "../utils/ply-exporter"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Download, Info, CheckCircle } from "lucide-react"

interface PLYExportDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function PLYExportDialog({ isOpen, onClose }: PLYExportDialogProps) {
  const { attractorPoints, pointColors } = useIFS()
  const [filename, setFilename] = useState("attractor")
  const [includeColors, setIncludeColors] = useState(true)
  const [format, setFormat] = useState<"ascii" | "binary">("ascii")
  const [scale, setScale] = useState(1.0)
  const [isExporting, setIsExporting] = useState(false)
  const [exportResult, setExportResult] = useState<any>(null)

  if (!attractorPoints) return null

  const vertexCount = attractorPoints.length / 3
  const hasColors = pointColors && pointColors.length === attractorPoints.length
  const estimatedSize = estimatePLYFileSize(vertexCount, includeColors && hasColors, format)

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

      const result = exportPLY(attractorPoints, pointColors, {
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Export PLY File</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Point Cloud Info */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
              <Info className="w-4 h-4 mr-1" />
              Point Cloud Information
            </h4>
            <div className="space-y-1 text-xs text-blue-700">
              <div className="flex justify-between">
                <span>Vertices:</span>
                <span className="font-medium">{vertexCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Has Colors:</span>
                <span className="font-medium">{hasColors ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Size:</span>
                <span className="font-medium">{formatFileSize(estimatedSize)}</span>
              </div>
            </div>
          </div>

          {/* Export Settings */}
          <div className="space-y-3">
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
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Button
                  onClick={() => setFormat("ascii")}
                  variant={format === "ascii" ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  ASCII
                </Button>
                <Button
                  onClick={() => setFormat("binary")}
                  variant={format === "binary" ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  Binary
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {format === "ascii" ? "Human-readable, larger file" : "Compact, smaller file"}
              </div>
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
          </div>

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
          <Button onClick={handleExport} disabled={isExporting || !filename.trim()} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Exporting..." : "Export PLY"}
          </Button>

          {/* Usage Info */}
          <div className="text-xs text-gray-500 space-y-1">
            <div className="font-medium">Compatible with:</div>
            <div>• Blender (File → Import → Stanford PLY)</div>
            <div>• Unity (Drag PLY to Assets folder)</div>
            <div>• Houdini, MeshLab, CloudCompare</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
