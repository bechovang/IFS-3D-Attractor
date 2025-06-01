"use client"

import { useState } from "react"
import { useIFS } from "./ifs-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, Sparkles } from "lucide-react"
import type { IFSMatrix } from "@/types/ifs"

interface FractalPreset {
  name: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  matrices: Omit<IFSMatrix, "id">[]
  settings?: any
}

const FRACTAL_PRESETS: FractalPreset[] = [
  {
    name: "Sierpinski Triangle",
    description: "Classic 2D fractal triangle with 3 transformations",
    difficulty: "Easy",
    matrices: [
      {
        name: "f₁",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 1,
        tz: 0,
        probability: 0.333,
        enabled: true,
        color: "#e74c3c",
      },
      {
        name: "f₂",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 0.5,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 1,
        tz: 0,
        probability: 0.333,
        enabled: true,
        color: "#3498db",
      },
      {
        name: "f₃",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 0.25,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0.433,
        g: 0,
        h: 0,
        i: 1,
        tz: 0,
        probability: 0.334,
        enabled: true,
        color: "#2ecc71",
      },
    ],
  },
  {
    name: "Tetrahedron Fractal",
    description: "3D Sierpinski tetrahedron with 4 corner transformations",
    difficulty: "Medium",
    matrices: [
      {
        name: "f₁",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 0,
        probability: 0.25,
        enabled: true,
        color: "#e74c3c",
      },
      {
        name: "f₂",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 1,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 0,
        probability: 0.25,
        enabled: true,
        color: "#3498db",
      },
      {
        name: "f₃",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 0.5,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0.866,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 0,
        probability: 0.25,
        enabled: true,
        color: "#2ecc71",
      },
      {
        name: "f₄",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 0.5,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0.289,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 0.816,
        probability: 0.25,
        enabled: true,
        color: "#f39c12",
      },
    ],
  },
  {
    name: "Barnsley Fern",
    description: "Famous fern-like fractal with 4 transformations",
    difficulty: "Medium",
    matrices: [
      {
        name: "Stem",
        a: 0,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.16,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 1,
        tz: 0,
        probability: 0.01,
        enabled: true,
        color: "#8b4513",
      },
      {
        name: "Left",
        a: 0.85,
        c: 0.04,
        e: 0,
        tx: 0,
        b: -0.04,
        d: 0.85,
        f: 0,
        ty: 1.6,
        g: 0,
        h: 0,
        i: 1,
        tz: 0,
        probability: 0.85,
        enabled: true,
        color: "#228b22",
      },
      {
        name: "Right",
        a: 0.2,
        c: -0.26,
        e: 0,
        tx: 0,
        b: 0.23,
        d: 0.22,
        f: 0,
        ty: 1.6,
        g: 0,
        h: 0,
        i: 1,
        tz: 0,
        probability: 0.07,
        enabled: true,
        color: "#32cd32",
      },
      {
        name: "Tip",
        a: -0.15,
        c: 0.28,
        e: 0,
        tx: 0,
        b: 0.26,
        d: 0.24,
        f: 0,
        ty: 0.44,
        g: 0,
        h: 0,
        i: 1,
        tz: 0,
        probability: 0.07,
        enabled: true,
        color: "#90ee90",
      },
    ],
  },
  {
    name: "Dragon Curve",
    description: "Heighway dragon fractal",
    difficulty: "Medium",
    matrices: [
      {
        name: "f₁",
        a: 0.5,
        c: -0.5,
        e: 0,
        tx: 0,
        b: 0.5,
        d: 0.5,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 1,
        tz: 0,
        probability: 0.5,
        enabled: true,
        color: "#e74c3c",
      },
      {
        name: "f₂",
        a: -0.5,
        c: -0.5,
        e: 0,
        tx: 1,
        b: 0.5,
        d: -0.5,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 1,
        tz: 0,
        probability: 0.5,
        enabled: true,
        color: "#9b59b6",
      },
    ],
  },
  {
    name: "3D Cube Fractal",
    description: "3D fractal based on cube corners",
    difficulty: "Hard",
    matrices: [
      {
        name: "Corner1",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#e74c3c",
      },
      {
        name: "Corner2",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 1,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#3498db",
      },
      {
        name: "Corner3",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 1,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#2ecc71",
      },
      {
        name: "Corner4",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 1,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 1,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#f39c12",
      },
      {
        name: "Corner5",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 1,
        probability: 0.125,
        enabled: true,
        color: "#9b59b6",
      },
      {
        name: "Corner6",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 1,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 1,
        probability: 0.125,
        enabled: true,
        color: "#e91e63",
      },
      {
        name: "Corner7",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 1,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 1,
        probability: 0.125,
        enabled: true,
        color: "#00bcd4",
      },
      {
        name: "Corner8",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 1,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 1,
        g: 0,
        h: 0,
        i: 0.5,
        tz: 1,
        probability: 0.125,
        enabled: true,
        color: "#ff5722",
      },
    ],
  },
  {
    name: "Spiral Tree",
    description: "3D spiral tree fractal",
    difficulty: "Hard",
    matrices: [
      {
        name: "Trunk",
        a: 0.6,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.6,
        f: 0,
        ty: 0.4,
        g: 0,
        h: 0,
        i: 0.6,
        tz: 0,
        probability: 0.4,
        enabled: true,
        color: "#8b4513",
      },
      {
        name: "Branch1",
        a: 0.4,
        c: -0.2,
        e: 0,
        tx: 0.2,
        b: 0.2,
        d: 0.4,
        f: 0,
        ty: 0.6,
        g: 0,
        h: 0,
        i: 0.4,
        tz: 0.1,
        probability: 0.2,
        enabled: true,
        color: "#228b22",
      },
      {
        name: "Branch2",
        a: 0.4,
        c: 0.2,
        e: 0,
        tx: -0.2,
        b: -0.2,
        d: 0.4,
        f: 0,
        ty: 0.6,
        g: 0,
        h: 0,
        i: 0.4,
        tz: 0.1,
        probability: 0.2,
        enabled: true,
        color: "#32cd32",
      },
      {
        name: "Twist",
        a: 0.3,
        c: 0,
        e: -0.1,
        tx: 0,
        b: 0,
        d: 0.3,
        f: 0.1,
        ty: 0.8,
        g: 0.1,
        h: -0.1,
        i: 0.3,
        tz: 0.2,
        probability: 0.2,
        enabled: true,
        color: "#90ee90",
      },
    ],
  },
  {
    name: "Menger Sponge",
    description: "3D Menger sponge fractal",
    difficulty: "Hard",
    matrices: [
      // 20 transformations for Menger sponge (simplified to 8 for performance)
      {
        name: "Block1",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#e74c3c",
      },
      {
        name: "Block2",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0.667,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#3498db",
      },
      {
        name: "Block3",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0.667,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#2ecc71",
      },
      {
        name: "Block4",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0.667,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0.667,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#f39c12",
      },
      {
        name: "Block5",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0.667,
        probability: 0.125,
        enabled: true,
        color: "#9b59b6",
      },
      {
        name: "Block6",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0.667,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0.667,
        probability: 0.125,
        enabled: true,
        color: "#e91e63",
      },
      {
        name: "Block7",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0.667,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0.667,
        probability: 0.125,
        enabled: true,
        color: "#00bcd4",
      },
      {
        name: "Block8",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0.667,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0.667,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0.667,
        probability: 0.125,
        enabled: true,
        color: "#ff5722",
      },
    ],
  },
  {
    name: "Cantor Dust 3D",
    description: "3D version of Cantor set",
    difficulty: "Medium",
    matrices: [
      {
        name: "Left",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#e74c3c",
      },
      {
        name: "Right",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0.667,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#3498db",
      },
      {
        name: "Front",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0.667,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#2ecc71",
      },
      {
        name: "Back",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0.667,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0.667,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0,
        probability: 0.125,
        enabled: true,
        color: "#f39c12",
      },
      {
        name: "Top-Left",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0.667,
        probability: 0.125,
        enabled: true,
        color: "#9b59b6",
      },
      {
        name: "Top-Right",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0.667,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0.667,
        probability: 0.125,
        enabled: true,
        color: "#e91e63",
      },
      {
        name: "Top-Front",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0.667,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0.667,
        probability: 0.125,
        enabled: true,
        color: "#00bcd4",
      },
      {
        name: "Top-Back",
        a: 0.333,
        c: 0,
        e: 0,
        tx: 0.667,
        b: 0,
        d: 0.333,
        f: 0,
        ty: 0.667,
        g: 0,
        h: 0,
        i: 0.333,
        tz: 0.667,
        probability: 0.125,
        enabled: true,
        color: "#ff5722",
      },
    ],
  },
]

export default function FractalPresets() {
  const { clearAll, addMatrix, updateSettings, generateAttractor } = useIFS()
  const [selectedPreset, setSelectedPreset] = useState<FractalPreset | null>(null)

  const loadPreset = (preset: FractalPreset) => {
    // Clear existing matrices
    clearAll()

    // Add new matrices
    preset.matrices.forEach((matrix) => {
      addMatrix({
        ...matrix,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      })
    })

    // Update settings if provided
    if (preset.settings) {
      updateSettings(preset.settings)
    }

    // Generate the fractal
    setTimeout(() => {
      generateAttractor()
    }, 100)
  }

  const copyPresetJSON = (preset: FractalPreset) => {
    const jsonData = {
      version: "1.0",
      name: preset.name,
      description: preset.description,
      matrices: preset.matrices.map((matrix, index) => ({
        ...matrix,
        id: `preset_${index}`,
      })),
      settings: preset.settings || {
        iterations: 50000,
        skipInitial: 1000,
        randomSeed: true,
        autoNormalize: true,
        pointSize: 3.0,
        colorMode: "function",
        backgroundColor: "#ffffff",
        pointColor: "#00ff88",
        showBezierSurface: false,
        autoRotate: false,
        orbitControlsEnabled: true,
      },
    }

    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2)).then(() => {
      alert(`${preset.name} JSON copied to clipboard!`)
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-bold text-gray-800">Fractal Presets</h3>
      </div>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-3">
          <div className="grid gap-3">
            {FRACTAL_PRESETS.map((preset, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">{preset.name}</CardTitle>
                    <Badge className={getDifficultyColor(preset.difficulty)}>{preset.difficulty}</Badge>
                  </div>
                  <p className="text-xs text-gray-600">{preset.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => loadPreset(preset)}
                      size="sm"
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      Load Fractal
                    </Button>
                    <Button onClick={() => copyPresetJSON(preset)} size="sm" variant="outline" className="px-3">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button onClick={() => setSelectedPreset(preset)} size="sm" variant="outline" className="px-3">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">{preset.matrices.length} transformations</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-3">
          {selectedPreset ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {selectedPreset.name}
                  <Badge className={getDifficultyColor(selectedPreset.difficulty)}>{selectedPreset.difficulty}</Badge>
                </CardTitle>
                <p className="text-sm text-gray-600">{selectedPreset.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">JSON Data:</h4>
                    <Textarea
                      value={JSON.stringify(
                        {
                          version: "1.0",
                          name: selectedPreset.name,
                          matrices: selectedPreset.matrices,
                          settings: selectedPreset.settings || {},
                        },
                        null,
                        2,
                      )}
                      readOnly
                      className="h-40 text-xs font-mono bg-gray-50"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => loadPreset(selectedPreset)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      Load This Fractal
                    </Button>
                    <Button onClick={() => copyPresetJSON(selectedPreset)} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy JSON
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a fractal from the Gallery tab to view details</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
