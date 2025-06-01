"use client"

import { useAttractor } from "./attractor-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ViewPanel() {
  const { state, updateView } = useAttractor()

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h3 className="text-white text-sm font-bold mb-3">View</h3>

      <Tabs defaultValue="render" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-700 h-8">
          <TabsTrigger value="render" className="text-xs">
            Render
          </TabsTrigger>
          <TabsTrigger value="lighting" className="text-xs">
            Lighting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="render" className="space-y-3 mt-3">
          {/* Render Mode */}
          <div>
            <Label className="text-gray-300 text-xs">Render</Label>
            <Select value={state.view.renderMode} onValueChange={(value: any) => updateView({ renderMode: value })}>
              <SelectTrigger className="h-7 text-xs bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="points" className="text-white text-xs">
                  Points
                </SelectItem>
                <SelectItem value="solid" className="text-white text-xs">
                  Solid
                </SelectItem>
                <SelectItem value="glow" className="text-white text-xs">
                  Glow
                </SelectItem>
                <SelectItem value="volumetric" className="text-white text-xs">
                  Volumetric
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-gray-300 text-xs">Width</Label>
              <Input
                type="number"
                value={state.view.width}
                onChange={(e) => updateView({ width: Number.parseInt(e.target.value) || 800 })}
                className="h-7 text-xs bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Height</Label>
              <Input
                type="number"
                value={state.view.height}
                onChange={(e) => updateView({ height: Number.parseInt(e.target.value) || 600 })}
                className="h-7 text-xs bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Scale & Zoom */}
          <div>
            <Label className="text-gray-300 text-xs">Scale: {state.view.scale}</Label>
            <Slider
              value={[state.view.scale]}
              onValueChange={([value]) => updateView({ scale: value })}
              min={0.1}
              max={5}
              step={0.1}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-300 text-xs">Zoom: {state.view.zoom}%</Label>
            <Slider
              value={[state.view.zoom]}
              onValueChange={([value]) => updateView({ zoom: value })}
              min={10}
              max={500}
              step={10}
              className="mt-1"
            />
          </div>

          {/* Visual Properties */}
          <div>
            <Label className="text-gray-300 text-xs">Gamma: {state.view.gamma}</Label>
            <Slider
              value={[state.view.gamma]}
              onValueChange={([value]) => updateView({ gamma: value })}
              min={0.1}
              max={3}
              step={0.1}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-300 text-xs">Opacity: {state.view.opacity}</Label>
            <Slider
              value={[state.view.opacity]}
              onValueChange={([value]) => updateView({ opacity: value })}
              min={0.1}
              max={1}
              step={0.1}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-300 text-xs">Roughness: {state.view.roughness}</Label>
            <Slider
              value={[state.view.roughness]}
              onValueChange={([value]) => updateView({ roughness: value })}
              min={0}
              max={1}
              step={0.1}
              className="mt-1"
            />
          </div>
        </TabsContent>

        <TabsContent value="lighting" className="space-y-3 mt-3">
          {/* Background */}
          <div>
            <Label className="text-gray-300 text-xs">Background</Label>
            <Input
              type="color"
              value={state.view.backgroundColor}
              onChange={(e) => updateView({ backgroundColor: e.target.value })}
              className="w-full h-7 bg-gray-700 border-gray-600"
            />
          </div>

          {/* Ambient */}
          <div>
            <Label className="text-gray-300 text-xs">Ambient</Label>
            <Input
              type="color"
              value={state.view.ambientColor}
              onChange={(e) => updateView({ ambientColor: e.target.value })}
              className="w-full h-7 bg-gray-700 border-gray-600"
            />
          </div>

          {/* Diffuse */}
          <div>
            <Label className="text-gray-300 text-xs">Diffuse</Label>
            <Input
              type="color"
              value={state.view.diffuseColor}
              onChange={(e) => updateView({ diffuseColor: e.target.value })}
              className="w-full h-7 bg-gray-700 border-gray-600"
            />
          </div>

          {/* Secondary */}
          <div>
            <Label className="text-gray-300 text-xs">Secondary</Label>
            <Input
              type="color"
              value={state.view.secondaryColor}
              onChange={(e) => updateView({ secondaryColor: e.target.value })}
              className="w-full h-7 bg-gray-700 border-gray-600"
            />
          </div>

          {/* Specular */}
          <div>
            <Label className="text-gray-300 text-xs">Specular</Label>
            <Input
              type="color"
              value={state.view.specularColor}
              onChange={(e) => updateView({ specularColor: e.target.value })}
              className="w-full h-7 bg-gray-700 border-gray-600"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
