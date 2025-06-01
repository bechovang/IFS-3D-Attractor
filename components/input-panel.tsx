"use client"

import { useAttractor } from "./attractor-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCcw, Download } from "lucide-react"
import type { AttractorType, Matrix3x4 } from "./attractor-context"

export default function InputPanel() {
  const { state, updateParams, updateType, resetToDefaults, exportImage } = useAttractor()

  const attractorTypes = [
    { value: "lorenz", label: "Lorenz" },
    { value: "rossler", label: "Rössler" },
    { value: "clifford", label: "Clifford" },
    { value: "pickover", label: "Pickover" },
    { value: "dejong", label: "Peter de Jong" },
    { value: "ifs", label: "IFS" },
  ]

  const updateMatrix = (index: number, field: keyof Matrix3x4, value: number) => {
    const newMatrices = [...(state.params.matrices || [])]
    newMatrices[index] = { ...newMatrices[index], [field]: value }
    updateParams({ matrices: newMatrices })
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-bold">Attractor</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={exportImage}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Attractor Type Selection */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm">Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={state.type} onValueChange={(value: AttractorType) => updateType(value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {attractorTypes.map((type) => (
                <SelectItem key={type.value} value={type.value} className="text-white">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {state.type === "ifs" && (
            <div className="mt-2">
              <Label className="text-gray-300 text-xs">Matrices: {state.params.numMatrices}</Label>
              <Slider
                value={[state.params.numMatrices || 4]}
                onValueChange={([value]) => updateParams({ numMatrices: value })}
                min={2}
                max={8}
                step={1}
                className="mt-1"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Parameters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm">Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="main" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="main" className="text-xs">
                Main
              </TabsTrigger>
              <TabsTrigger value="simulation" className="text-xs">
                Simulation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="main" className="space-y-3 mt-3">
              {/* Lorenz Parameters */}
              {state.type === "lorenz" && (
                <>
                  <div>
                    <Label className="text-gray-300 text-xs">σ (sigma): {state.params.sigma}</Label>
                    <Slider
                      value={[state.params.sigma || 10]}
                      onValueChange={([value]) => updateParams({ sigma: value })}
                      min={0.1}
                      max={20}
                      step={0.1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">ρ (rho): {state.params.rho}</Label>
                    <Slider
                      value={[state.params.rho || 28]}
                      onValueChange={([value]) => updateParams({ rho: value })}
                      min={0.1}
                      max={50}
                      step={0.1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">β (beta): {state.params.beta?.toFixed(3)}</Label>
                    <Slider
                      value={[state.params.beta || 8 / 3]}
                      onValueChange={([value]) => updateParams({ beta: value })}
                      min={0.1}
                      max={5}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {/* Rossler Parameters */}
              {state.type === "rossler" && (
                <>
                  <div>
                    <Label className="text-gray-300 text-xs">a: {state.params.a}</Label>
                    <Slider
                      value={[state.params.a || 0.2]}
                      onValueChange={([value]) => updateParams({ a: value })}
                      min={0.01}
                      max={1}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">b: {state.params.b}</Label>
                    <Slider
                      value={[state.params.b || 0.2]}
                      onValueChange={([value]) => updateParams({ b: value })}
                      min={0.01}
                      max={1}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">c: {state.params.c}</Label>
                    <Slider
                      value={[state.params.c || 5.7]}
                      onValueChange={([value]) => updateParams({ c: value })}
                      min={1}
                      max={10}
                      step={0.1}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {/* Clifford Parameters */}
              {state.type === "clifford" && (
                <>
                  <div>
                    <Label className="text-gray-300 text-xs">a: {state.params.clifford_a}</Label>
                    <Slider
                      value={[state.params.clifford_a || -1.4]}
                      onValueChange={([value]) => updateParams({ clifford_a: value })}
                      min={-3}
                      max={3}
                      step={0.1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">b: {state.params.clifford_b}</Label>
                    <Slider
                      value={[state.params.clifford_b || 1.6]}
                      onValueChange={([value]) => updateParams({ clifford_b: value })}
                      min={-3}
                      max={3}
                      step={0.1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">c: {state.params.clifford_c}</Label>
                    <Slider
                      value={[state.params.clifford_c || 1.0]}
                      onValueChange={([value]) => updateParams({ clifford_c: value })}
                      min={-3}
                      max={3}
                      step={0.1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">d: {state.params.clifford_d}</Label>
                    <Slider
                      value={[state.params.clifford_d || 0.7]}
                      onValueChange={([value]) => updateParams({ clifford_d: value })}
                      min={-3}
                      max={3}
                      step={0.1}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {/* Pickover Parameters */}
              {state.type === "pickover" && (
                <>
                  <div>
                    <Label className="text-gray-300 text-xs">A: {state.params.pickover_a}</Label>
                    <Slider
                      value={[state.params.pickover_a || -2.24]}
                      onValueChange={([value]) => updateParams({ pickover_a: value })}
                      min={-5}
                      max={5}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">B: {state.params.pickover_b}</Label>
                    <Slider
                      value={[state.params.pickover_b || 0.43]}
                      onValueChange={([value]) => updateParams({ pickover_b: value })}
                      min={-5}
                      max={5}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">C: {state.params.pickover_c}</Label>
                    <Slider
                      value={[state.params.pickover_c || -0.65]}
                      onValueChange={([value]) => updateParams({ pickover_c: value })}
                      min={-5}
                      max={5}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">D: {state.params.pickover_d}</Label>
                    <Slider
                      value={[state.params.pickover_d || -2.43]}
                      onValueChange={([value]) => updateParams({ pickover_d: value })}
                      min={-5}
                      max={5}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {/* Peter de Jong Parameters */}
              {state.type === "dejong" && (
                <>
                  <div>
                    <Label className="text-gray-300 text-xs">a: {state.params.dejong_a}</Label>
                    <Slider
                      value={[state.params.dejong_a || 1.4]}
                      onValueChange={([value]) => updateParams({ dejong_a: value })}
                      min={-3}
                      max={3}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">b: {state.params.dejong_b}</Label>
                    <Slider
                      value={[state.params.dejong_b || -2.3]}
                      onValueChange={([value]) => updateParams({ dejong_b: value })}
                      min={-3}
                      max={3}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">c: {state.params.dejong_c}</Label>
                    <Slider
                      value={[state.params.dejong_c || 2.4]}
                      onValueChange={([value]) => updateParams({ dejong_c: value })}
                      min={-3}
                      max={3}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">d: {state.params.dejong_d}</Label>
                    <Slider
                      value={[state.params.dejong_d || -2.1]}
                      onValueChange={([value]) => updateParams({ dejong_d: value })}
                      min={-3}
                      max={3}
                      step={0.01}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {/* IFS Matrices */}
              {state.type === "ifs" && (
                <div className="space-y-3">
                  {state.params.matrices?.slice(0, state.params.numMatrices).map((matrix, index) => (
                    <div key={index} className="border border-gray-600 rounded p-2">
                      <Label className="text-gray-300 text-xs font-bold">Matrix {index}</Label>
                      <div className="grid grid-cols-4 gap-1 mt-1">
                        {Object.entries(matrix)
                          .filter(([key]) => key.startsWith("m"))
                          .map(([key, value]) => (
                            <Input
                              key={key}
                              type="number"
                              value={value}
                              onChange={(e) =>
                                updateMatrix(index, key as keyof Matrix3x4, Number.parseFloat(e.target.value) || 0)
                              }
                              className="h-6 text-xs bg-gray-700 border-gray-600 text-white"
                              step={0.01}
                            />
                          ))}
                      </div>
                      <div className="mt-1">
                        <Label className="text-gray-300 text-xs">Prob: {matrix.prob}</Label>
                        <Slider
                          value={[matrix.prob]}
                          onValueChange={([value]) => updateMatrix(index, "prob", value)}
                          min={0}
                          max={1}
                          step={0.01}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="simulation" className="space-y-3 mt-3">
              {/* Initial Point */}
              <div>
                <Label className="text-gray-300 text-xs font-bold">Initial Point</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div>
                    <Label className="text-gray-300 text-xs">x₀</Label>
                    <Input
                      type="number"
                      value={state.params.initialX}
                      onChange={(e) => updateParams({ initialX: Number.parseFloat(e.target.value) || 0 })}
                      className="h-8 text-xs bg-gray-700 border-gray-600 text-white"
                      step={0.1}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">y₀</Label>
                    <Input
                      type="number"
                      value={state.params.initialY}
                      onChange={(e) => updateParams({ initialY: Number.parseFloat(e.target.value) || 0 })}
                      className="h-8 text-xs bg-gray-700 border-gray-600 text-white"
                      step={0.1}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">z₀</Label>
                    <Input
                      type="number"
                      value={state.params.initialZ}
                      onChange={(e) => updateParams({ initialZ: Number.parseFloat(e.target.value) || 0 })}
                      className="h-8 text-xs bg-gray-700 border-gray-600 text-white"
                      step={0.1}
                    />
                  </div>
                </div>
              </div>

              {/* Iterations */}
              <div>
                <Label className="text-gray-300 text-xs">Iterations: {state.params.iterations.toLocaleString()}</Label>
                <Slider
                  value={[state.params.iterations]}
                  onValueChange={([value]) => updateParams({ iterations: value })}
                  min={1000}
                  max={1000000}
                  step={1000}
                  className="mt-1"
                />
              </div>

              {/* Step Size */}
              <div>
                <Label className="text-gray-300 text-xs">Step Size (Δt): {state.params.stepSize}</Label>
                <Slider
                  value={[state.params.stepSize]}
                  onValueChange={([value]) => updateParams({ stepSize: value })}
                  min={0.001}
                  max={0.1}
                  step={0.001}
                  className="mt-1"
                />
              </div>

              {/* Randomness */}
              <div>
                <Label className="text-gray-300 text-xs">Randomness: {state.params.randomness}</Label>
                <Slider
                  value={[state.params.randomness]}
                  onValueChange={([value]) => updateParams({ randomness: value })}
                  min={0}
                  max={200}
                  step={1}
                  className="mt-1"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
