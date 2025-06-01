"use client"

import { useState } from "react"
import { useIFS } from "./ifs-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Download, Zap, Settings, FileText, Camera } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PLYExportDialog from "./ply-export-dialog"

export default function ControlsPanel() {
  const {
    settings,
    updateSettings,
    loadPreset,
    isGenerating,
    matrices,
    attractorPoints,
    isHighQualityRendering,
    setHighQualityRendering,
  } = useIFS()
  const [showPLYDialog, setShowPLYDialog] = useState(false)

  const exportImage = () => {
    const canvas = document.querySelector("canvas")
    if (canvas) {
      const link = document.createElement("a")
      link.download = `ifs-3d-attractor-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  // Performance optimization presets
  const optimizeForPerformance = () => {
    updateSettings({
      iterations: 25000,
      pointSize: 4.0,
      showBezierSurface: false,
    })
  }

  const optimizeForQuality = () => {
    updateSettings({
      iterations: 100000,
      pointSize: 2.0,
      showBezierSurface: true,
    })
  }

  // Toggle high quality rendering
  const toggleHighQualityRendering = () => {
    setHighQualityRendering(!isHighQualityRendering)
  }

  return (
    <>
      <div className="space-y-5">
        {/* Performance Warning */}
        {settings.iterations > 75000 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800 font-medium">High iteration count may cause lag</span>
            </div>
            <Button onClick={optimizeForPerformance} size="sm" variant="outline" className="mt-2 text-xs">
              Optimize for Performance
            </Button>
          </div>
        )}

        {/* Export and Render Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={exportImage} disabled={!attractorPoints} className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PNG
          </Button>
          <Button
            onClick={() => setShowPLYDialog(true)}
            disabled={!attractorPoints}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Export PLY
          </Button>
        </div>

        {/* High Quality Render Button */}
        <Button
          onClick={toggleHighQualityRendering}
          disabled={!attractorPoints}
          className={`w-full ${
            isHighQualityRendering ? "bg-purple-700 hover:bg-purple-800" : "bg-purple-600 hover:bg-purple-700"
          }`}
          size="sm"
        >
          <Camera className="w-4 h-4 mr-2" />
          {isHighQualityRendering ? "Exit Render Mode" : "High Quality Render"}
        </Button>

        {isHighQualityRendering && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Camera className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-800 font-medium">
                Render mode active. Click, drag or zoom to exit.
              </span>
            </div>
          </div>
        )}

        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={optimizeForPerformance} variant="outline" size="sm" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Fast Mode
              </Button>
              <Button onClick={optimizeForQuality} variant="outline" size="sm" className="text-xs">
                <Settings className="w-3 h-3 mr-1" />
                Quality Mode
              </Button>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Label className="text-gray-700 text-sm font-medium">
                  Iterations: {(settings?.iterations || 0).toLocaleString()}
                </Label>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    !settings?.iterations || settings.iterations <= 25000
                      ? "bg-green-100 text-green-700"
                      : settings.iterations <= 50000
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {!settings?.iterations || settings.iterations <= 25000
                    ? "Fast"
                    : settings.iterations <= 50000
                      ? "Medium"
                      : "Slow"}
                </span>
              </div>
              <Slider
                value={[settings.iterations]}
                onValueChange={([value]) => updateSettings({ iterations: value })}
                min={10000}
                max={150000}
                step={5000}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-700 text-sm font-medium">
                Point Size: {(settings?.pointSize || 0).toFixed(1)}
              </Label>
              <Slider
                value={[settings.pointSize]}
                onValueChange={([value]) => updateSettings({ pointSize: value })}
                min={1}
                max={8}
                step={0.5}
                className="mt-2"
              />
            </div>

            {/* Performance Stats */}
            {attractorPoints && settings && (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Performance Stats</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Points:</span>
                    <span className="font-medium text-blue-600">{(attractorPoints.length / 3).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Functions:</span>
                    <span className="font-medium text-green-600">{matrices?.filter((m) => m.enabled).length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance:</span>
                    <span
                      className={`font-medium ${
                        settings.iterations <= 25000
                          ? "text-green-600"
                          : settings.iterations <= 50000
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {settings.iterations <= 25000 ? "Optimal" : settings.iterations <= 50000 ? "Good" : "Heavy"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Presets Tab */}
          <TabsContent value="presets" className="space-y-4 pt-3">
            <Label className="text-gray-700 text-sm font-medium">Pattern Presets</Label>
            <div className="grid grid-cols-1 gap-2">
              <Button onClick={() => loadPreset("performance")} variant="outline" className="justify-start text-sm">
                ⚡ Single Function (Fastest)
              </Button>
              <Button onClick={() => loadPreset("simple")} variant="outline" className="justify-start text-sm">
                🔹 Simple 2-Function
              </Button>
              <Button onClick={() => loadPreset("default")} variant="outline" className="justify-start text-sm">
                🌟 Default 4-Function
              </Button>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4 pt-3">
            <div className="flex items-center justify-between">
              <Label className="text-gray-700 text-sm font-medium">
                Bézier Surface
                <span className="text-xs text-gray-500 ml-1">(impacts performance)</span>
              </Label>
              <Switch
                checked={settings.showBezierSurface}
                onCheckedChange={(showBezierSurface) => updateSettings({ showBezierSurface })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-gray-700 text-sm font-medium">Auto-normalize</Label>
              <Switch
                checked={settings.autoNormalize}
                onCheckedChange={(autoNormalize) => updateSettings({ autoNormalize })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-gray-700 text-sm font-medium">Background Color</Label>
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                className="w-8 h-8 rounded border border-gray-300"
              />
            </div>

            {/* Render Quality Settings */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Render Quality Settings</h4>

              <div>
                <Label className="text-gray-700 text-sm font-medium">
                  Opacity: {(settings?.volumetricOpacity || 0.3).toFixed(1)}
                </Label>
                <Slider
                  value={[settings?.volumetricOpacity || 0.3]}
                  onValueChange={([value]) => updateSettings({ volumetricOpacity: value })}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  className="mt-2"
                />
              </div>

              <div className="mt-3">
                <Label className="text-gray-700 text-sm font-medium">
                  Gamma: {(settings?.volumetricGamma || 1.8).toFixed(1)}
                </Label>
                <Slider
                  value={[settings?.volumetricGamma || 1.8]}
                  onValueChange={([value]) => updateSettings({ volumetricGamma: value })}
                  min={1.0}
                  max={2.5}
                  step={0.1}
                  className="mt-2"
                />
              </div>

              <div className="mt-3">
                <Label className="text-gray-700 text-sm font-medium">
                  Intensity: {(settings?.volumetricIntensity || 1.2).toFixed(1)}
                </Label>
                <Slider
                  value={[settings?.volumetricIntensity || 1.2]}
                  onValueChange={([value]) => updateSettings({ volumetricIntensity: value })}
                  min={0.5}
                  max={2.5}
                  step={0.1}
                  className="mt-2"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* PLY Export Dialog */}
      <PLYExportDialog isOpen={showPLYDialog} onClose={() => setShowPLYDialog(false)} />
    </>
  )
}
