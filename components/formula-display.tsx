"use client"

import { useIFS } from "./ifs-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FormulaDisplay() {
  const { matrices } = useIFS()
  const enabledMatrices = matrices.filter((m) => m.enabled)

  const formatMatrix = (matrix: any) => {
    return [
      [matrix.a.toFixed(2), matrix.c.toFixed(2), matrix.e.toFixed(2)],
      [matrix.b.toFixed(2), matrix.d.toFixed(2), matrix.f.toFixed(2)],
      [matrix.g.toFixed(2), matrix.h.toFixed(2), matrix.i.toFixed(2)],
    ]
  }

  const formatVector = (matrix: any) => {
    return [matrix.tx.toFixed(2), matrix.ty.toFixed(2), matrix.tz.toFixed(2)]
  }

  if (enabledMatrices.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No active transformation functions.</p>
        <p className="text-sm mt-1">Enable matrices to see formulas.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue={enabledMatrices[0].id}>
        <TabsList className="w-full flex overflow-x-auto">
          {enabledMatrices.map((matrix) => (
            <TabsTrigger
              key={matrix.id}
              value={matrix.id}
              className="flex-1"
              style={{ color: matrix.color, borderColor: matrix.color }}
            >
              {matrix.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {enabledMatrices.map((matrix) => (
          <TabsContent key={matrix.id} value={matrix.id} className="pt-4">
            <div className="space-y-3">
              {/* Function header */}
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: matrix.color }} />
                <span className="text-lg font-semibold" style={{ color: matrix.color }}>
                  {matrix.name}(x, y, z)
                </span>
              </div>

              {/* Matrix equation */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-sm font-mono">
                  <span style={{ color: matrix.color }} className="font-semibold">
                    {matrix.name}(x⃗) =
                  </span>

                  {/* Matrix part */}
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-1">[</div>
                    <div className="flex flex-col space-y-1">
                      {formatMatrix(matrix).map((row, i) => (
                        <div key={i} className="flex space-x-3">
                          {row.map((val, j) => (
                            <span key={j} className="w-8 text-center text-xs">
                              {val}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">]</div>
                  </div>

                  <span className="text-sm">x⃗ +</span>

                  {/* Vector part */}
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-1">[</div>
                    <div className="flex flex-col space-y-1">
                      {formatVector(matrix).map((val, i) => (
                        <div key={i} className="text-xs text-center w-8">
                          {val}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">]</div>
                  </div>
                </div>

                {/* Probability */}
                <div className="mt-2 text-xs text-gray-600">Probability: {(matrix.probability * 100).toFixed(1)}%</div>
              </div>

              {/* Matrix visualization */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Matrix Visualization</h4>
                <div className="grid grid-cols-3 gap-1 text-xs font-mono">
                  {formatMatrix(matrix).map((row, i) =>
                    row.map((val, j) => (
                      <div
                        key={`${i}-${j}`}
                        className="bg-white border border-gray-200 rounded p-1 text-center"
                        style={{ opacity: Number(val) !== 0 ? 1 : 0.3 }}
                      >
                        {val}
                      </div>
                    )),
                  )}
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs font-mono mt-1">
                  {formatVector(matrix).map((val, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-200 rounded p-1 text-center"
                      style={{ opacity: Number(val) !== 0 ? 1 : 0.3 }}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
