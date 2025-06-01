"use client"

import { useState } from "react"
import { useAttractor } from "./attractor-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ChevronRight, ChevronLeft, Download, Palette, Settings } from "lucide-react"

export default function ControlPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { state, updateParams, updateState, exportImage } = useAttractor()

  const attractorTypes = [
    { value: "lorenz", label: "Lorenz Attractor" },
    { value: "rossler", label: "Rössler Attractor" },
    { value: "clifford", label: "Clifford Attractor" },
  ]

  const colorPresets = ["#00ffff", "#ff0080", "#80ff00", "#ff8000", "#8000ff", "#ffff00", "#ff0040", "#0080ff"]

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-20 bg-black/80 hover:bg-black/90 text-white border border-gray-600"
        size="sm"
      >
        {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        <Settings className="w-4 h-4 ml-1" />
      </Button>

      {/* Control Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-sm border-l border-gray-700 transform transition-transform duration-300 z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          <div className="pt-16">
            <h2 className="text-white text-xl font-bold mb-4">Controls</h2>

            {/* Attractor Type */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm">Attractor Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={state.type}
                  onValueChange={(value: "lorenz" | "rossler" | "clifford") => updateState({ type: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {attractorTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-white">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Parameters */}
            {state.type === "lorenz" && (
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Lorenz Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300 text-xs">Sigma: {state.params.sigma}</Label>
                    <Slider
                      value={[state.params.sigma]}
                      onValueChange={([value]) => updateParams({ sigma: value })}
                      min={1}
                      max={20}
                      step={0.1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Rho: {state.params.rho}</Label>
                    <Slider
                      value={[state.params.rho]}
                      onValueChange={([value]) => updateParams({ rho: value })}
                      min={1}
                      max={50}
                      step={0.1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Beta: {state.params.beta.toFixed(2)}</Label>
                    <Slider
                      value={[state.params.beta]}
                      onValueChange={([value]) => updateParams({ beta: value })}
                      min={0.1}
                      max={5}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Simulation Settings */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm">Simulation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 text-xs">Steps: {state.params.steps}</Label>
                  <Slider
                    value={[state.params.steps]}
                    onValueChange={([value]) => updateParams({ steps: value })}
                    min={1000}
                    max={50000}
                    step={1000}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs">Scale: {state.params.scale}</Label>
                  <Slider
                    value={[state.params.scale]}
                    onValueChange={([value]) => updateParams({ scale: value })}
                    min={0.1}
                    max={3}
                    step={0.1}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs">Point Size: {state.pointSize}</Label>
                  <Slider
                    value={[state.pointSize]}
                    onValueChange={([value]) => updateState({ pointSize: value })}
                    min={0.5}
                    max={5}
                    step={0.1}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Color Settings */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center">
                  <Palette className="w-4 h-4 mr-2" />
                  Colors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 text-xs">Custom Color</Label>
                  <Input
                    type="color"
                    value={state.color}
                    onChange={(e) => updateState({ color: e.target.value })}
                    className="w-full h-10 mt-1 bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs">Presets</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {colorPresets.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => updateState({ color })}
                        className={`w-full h-8 rounded border-2 ${
                          state.color === color ? "border-white" : "border-gray-600"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export */}
            <Button onClick={exportImage} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Image
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
