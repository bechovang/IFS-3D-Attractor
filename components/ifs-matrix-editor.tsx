"use client"

import { useState } from "react"
import { useIFS } from "./ifs-context"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Trash2, Copy, Pen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { IFSMatrix } from "@/types/ifs"

export default function IFSMatrixEditor() {
  const { matrices, addMatrix, removeMatrix, updateMatrix } = useIFS()

  // State để lưu giá trị đang nhập (dưới dạng string)
  const [inputValues, setInputValues] = useState<Record<string, string>>({})

  const updateMatrixField = (id: string, field: keyof IFSMatrix, value: number | boolean | string) => {
    updateMatrix(id, { [field]: value })
  }

  const duplicateMatrix = (matrix: IFSMatrix) => {
    const newMatrix = {
      ...matrix,
      id: Date.now().toString(),
      name: `${matrix.name}'`,
    }
    addMatrix(newMatrix)
  }

  const getInputKey = (matrixId: string, field: keyof IFSMatrix) => {
    return `${matrixId}_${field}`
  }

  const renderMatrixInput = (matrix: IFSMatrix, field: keyof IFSMatrix, placeholder: string, tabIndex: number) => {
    const inputKey = getInputKey(matrix.id, field)

    // Lấy giá trị từ state tạm thời hoặc từ matrix
    const displayValue = inputValues[inputKey] !== undefined ? inputValues[inputKey] : matrix[field]?.toString() || ""

    return (
      <Input
        type="text"
        value={displayValue}
        onChange={(e) => {
          const value = e.target.value

          // Lưu giá trị đang nhập vào state tạm thời
          setInputValues((prev) => ({
            ...prev,
            [inputKey]: value,
          }))

          // Nếu là số hợp lệ, cập nhật vào matrix
          if (value === "" || value === "0") {
            updateMatrixField(matrix.id, field, 0)
          } else {
            const numValue = Number(value)
            if (!Number.isNaN(numValue) && value !== "-" && value !== "." && value !== "-.") {
              updateMatrixField(matrix.id, field, numValue)
            }
          }
        }}
        onBlur={(e) => {
          const value = e.target.value
          const inputKey = getInputKey(matrix.id, field)

          // Xóa giá trị tạm thời
          setInputValues((prev) => {
            const newValues = { ...prev }
            delete newValues[inputKey]
            return newValues
          })

          // Chuyển đổi thành số cuối cùng
          if (value === "" || value === "-" || value === "." || value === "-.") {
            updateMatrixField(matrix.id, field, 0)
          } else {
            const numValue = Number(value)
            if (!Number.isNaN(numValue)) {
              updateMatrixField(matrix.id, field, numValue)
            } else {
              updateMatrixField(matrix.id, field, 0)
            }
          }
        }}
        onFocus={(e) => {
          // Khi focus, hiển thị giá trị thực từ matrix
          const inputKey = getInputKey(matrix.id, field)
          const currentValue = matrix[field]

          if (currentValue === 0) {
            setInputValues((prev) => ({
              ...prev,
              [inputKey]: "0",
            }))
          } else if (currentValue !== undefined) {
            setInputValues((prev) => ({
              ...prev,
              [inputKey]: currentValue.toString(),
            }))
          }
        }}
        className="h-6 text-xs bg-white border-gray-300 w-14"
        placeholder={placeholder}
        tabIndex={tabIndex}
      />
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-800 font-semibold text-sm">Matrix Input</h3>
        <Button onClick={() => addMatrix()} size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 text-xs">
          <Pen className="w-3 h-3 mr-1" />
          Add Matrix
        </Button>
      </div>

      {matrices.length === 0 ? (
        <div className="text-center py-4 text-gray-400 text-xs">
          <p>No matrices defined.</p>
          <p>Click "Add Matrix" to start creating your IFS attractor.</p>
        </div>
      ) : (
        <Tabs defaultValue={matrices[0].id}>
          <TabsList className="w-full flex overflow-x-auto">
            {matrices.map((matrix) => (
              <TabsTrigger
                key={matrix.id}
                value={matrix.id}
                className="flex-1"
                style={{
                  color: matrix.enabled ? matrix.color : "gray",
                  opacity: matrix.enabled ? 1 : 0.5,
                }}
              >
                {matrix.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {matrices.map((matrix) => (
            <TabsContent key={matrix.id} value={matrix.id} className="pt-3">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-3 space-y-3">
                  {/* Matrix Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={matrix.enabled}
                        onCheckedChange={(enabled) => updateMatrixField(matrix.id, "enabled", enabled)}
                      />
                      <Input
                        value={matrix.name}
                        onChange={(e) => updateMatrixField(matrix.id, "name", e.target.value)}
                        className="h-7 text-xs w-20 bg-white border-gray-300"
                      />
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: matrix.color }} />
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateMatrix(matrix)}
                        className="h-6 w-6 p-0 text-blue-500"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMatrix(matrix.id)}
                        className="h-6 w-6 p-0 text-red-400"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Matrix Input Tabs */}
                  <Tabs defaultValue="matrix">
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="matrix">Matrix</TabsTrigger>
                      <TabsTrigger value="probability">Probability</TabsTrigger>
                    </TabsList>

                    <TabsContent value="matrix" className="pt-3">
                      {/* Compact Matrix Input */}
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center mb-2">
                          <span style={{ color: matrix.color }} className="font-semibold text-xs mr-2">
                            {matrix.name}(x) =
                          </span>
                        </div>

                        {/* Matrix equation in compact form */}
                        <div className="flex flex-col space-y-2">
                          {/* First row: Matrix multiplication */}
                          <div className="flex items-center">
                            <div className="flex items-center mr-2">
                              <span className="text-xs mr-1">[</span>
                              <div className="grid grid-cols-3 gap-1">
                                {renderMatrixInput(matrix, "a", "a", 1)}
                                {renderMatrixInput(matrix, "c", "c", 2)}
                                {renderMatrixInput(matrix, "e", "e", 3)}
                              </div>
                              <span className="text-xs mx-1">]</span>
                            </div>
                            <span className="text-xs mx-1">×</span>
                            <span className="text-xs mx-1">[x]</span>
                            <span className="text-xs mx-1">+</span>
                            <div className="flex items-center">
                              <span className="text-xs mr-1">[</span>
                              {renderMatrixInput(matrix, "tx", "tx", 10)}
                              <span className="text-xs mx-1">]</span>
                            </div>
                          </div>

                          {/* Second row */}
                          <div className="flex items-center">
                            <div className="flex items-center mr-2">
                              <span className="text-xs mr-1">[</span>
                              <div className="grid grid-cols-3 gap-1">
                                {renderMatrixInput(matrix, "b", "b", 4)}
                                {renderMatrixInput(matrix, "d", "d", 5)}
                                {renderMatrixInput(matrix, "f", "f", 6)}
                              </div>
                              <span className="text-xs mx-1">]</span>
                            </div>
                            <span className="text-xs mx-1">×</span>
                            <span className="text-xs mx-1">[y]</span>
                            <span className="text-xs mx-1">+</span>
                            <div className="flex items-center">
                              <span className="text-xs mr-1">[</span>
                              {renderMatrixInput(matrix, "ty", "ty", 11)}
                              <span className="text-xs mx-1">]</span>
                            </div>
                          </div>

                          {/* Third row */}
                          <div className="flex items-center">
                            <div className="flex items-center mr-2">
                              <span className="text-xs mr-1">[</span>
                              <div className="grid grid-cols-3 gap-1">
                                {renderMatrixInput(matrix, "g", "g", 7)}
                                {renderMatrixInput(matrix, "h", "h", 8)}
                                {renderMatrixInput(matrix, "i", "i", 9)}
                              </div>
                              <span className="text-xs mx-1">]</span>
                            </div>
                            <span className="text-xs mx-1">×</span>
                            <span className="text-xs mx-1">[z]</span>
                            <span className="text-xs mx-1">+</span>
                            <div className="flex items-center">
                              <span className="text-xs mr-1">[</span>
                              {renderMatrixInput(matrix, "tz", "tz", 12)}
                              <span className="text-xs mx-1">]</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="probability" className="pt-3">
                      {/* Probability */}
                      <div>
                        <Label className="text-gray-600 text-xs">Probability: {matrix.probability.toFixed(3)}</Label>
                        <Slider
                          value={[matrix.probability]}
                          onValueChange={([value]) => updateMatrixField(matrix.id, "probability", value)}
                          min={0}
                          max={1}
                          step={0.001}
                          className="mt-2"
                          disabled={!matrix.enabled}
                        />
                      </div>

                      {/* Color Picker */}
                      <div className="mt-3">
                        <Label className="text-gray-600 text-xs">Color</Label>
                        <div className="flex items-center mt-1">
                          <input
                            type="color"
                            value={matrix.color}
                            onChange={(e) => updateMatrixField(matrix.id, "color", e.target.value)}
                            className="w-8 h-8 rounded border border-gray-300"
                          />
                          <span className="ml-2 text-xs text-gray-600">{matrix.color}</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
