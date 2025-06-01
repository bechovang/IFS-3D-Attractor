"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useIFS } from "./ifs-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Upload, Copy, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function JsonImportExport() {
  const { matrices, settings, addMatrix, removeMatrix, updateSettings, clearAll } = useIFS()
  const [importText, setImportText] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Tạo dữ liệu JSON để xuất
  const exportData = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    matrices: matrices,
    settings: settings,
  }

  // JSON mẫu
  const sampleJson = {
    version: "1.0",
    timestamp: "2024-01-01T00:00:00.000Z",
    matrices: [
      {
        id: "sample1",
        name: "f₁",
        a: 0.5,
        c: 0,
        e: 0,
        tx: -1,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 1,
        g: 0.1,
        h: -0.1,
        i: 0.3,
        tz: 0.5,
        probability: 0.25,
        enabled: true,
        color: "#16a085",
      },
      {
        id: "sample2",
        name: "f₂",
        a: 0.5,
        c: 0,
        e: 0,
        tx: 1,
        b: 0,
        d: 0.5,
        f: 0,
        ty: 1,
        g: -0.1,
        h: -0.1,
        i: 0.3,
        tz: 0.5,
        probability: 0.25,
        enabled: true,
        color: "#e74c3c",
      },
    ],
    settings: {
      iterations: 50000,
      skipInitial: 1000,
      randomSeed: true,
      autoNormalize: true,
      pointSize: 3.0,
      colorMode: "function",
      backgroundColor: "#f8fafc",
      pointColor: "#00ff88",
      showBezierSurface: false,
      autoRotate: true,
      orbitControlsEnabled: true,
    },
  }

  // Xuất file JSON
  const exportToFile = () => {
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `ifs-attractor-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setMessage({ type: "success", text: "File đã được xuất thành công!" })
    setTimeout(() => setMessage(null), 3000)
  }

  // Copy JSON hiện tại
  const copyCurrentJson = () => {
    const dataStr = JSON.stringify(exportData, null, 2)
    navigator.clipboard.writeText(dataStr).then(() => {
      setMessage({ type: "success", text: "JSON đã được copy vào clipboard!" })
      setTimeout(() => setMessage(null), 3000)
    })
  }

  // Copy JSON mẫu
  const copySampleJson = () => {
    const dataStr = JSON.stringify(sampleJson, null, 2)
    navigator.clipboard.writeText(dataStr).then(() => {
      setMessage({ type: "success", text: "JSON mẫu đã được copy vào clipboard!" })
      setTimeout(() => setMessage(null), 3000)
    })
  }

  // Nhập từ file
  const importFromFile = () => {
    fileInputRef.current?.click()
  }

  // Xử lý file được chọn
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setImportText(content)
      processImport(content)
    }
    reader.readAsText(file)
  }

  // Nhập từ text
  const importFromText = () => {
    processImport(importText)
  }

  // Xử lý nhập dữ liệu
  const processImport = (jsonText: string) => {
    try {
      const data = JSON.parse(jsonText)

      // Kiểm tra cấu trúc dữ liệu
      if (!data.matrices || !Array.isArray(data.matrices)) {
        throw new Error("Dữ liệu không hợp lệ: thiếu mảng matrices")
      }

      // Xóa dữ liệu hiện tại
      clearAll()

      // Nhập matrices
      data.matrices.forEach((matrix: any) => {
        // Tạo ID mới để tránh trùng lặp
        const newMatrix = {
          ...matrix,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        }
        addMatrix(newMatrix)
      })

      // Nhập settings nếu có
      if (data.settings) {
        updateSettings(data.settings)
      }

      setMessage({ type: "success", text: `Đã nhập thành công ${data.matrices.length} ma trận!` })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({
        type: "error",
        text: `Lỗi nhập dữ liệu: ${error instanceof Error ? error.message : "Không xác định"}`,
      })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  // Load JSON mẫu
  const loadSampleData = () => {
    const jsonText = JSON.stringify(sampleJson, null, 2)
    setImportText(jsonText)
    processImport(jsonText)
  }

  return (
    <div className="space-y-4">
      {/* Thông báo */}
      {message && (
        <Alert className={message.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
          {message.type === "success" ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="export">Xuất</TabsTrigger>
          <TabsTrigger value="import">Nhập</TabsTrigger>
          <TabsTrigger value="sample">Mẫu</TabsTrigger>
        </TabsList>

        {/* Tab Xuất */}
        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Xuất dữ liệu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={exportToFile} className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Tải file JSON
                </Button>
                <Button onClick={copyCurrentJson} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy JSON
                </Button>
              </div>

              <div>
                <Label className="text-xs text-gray-600">Preview JSON hiện tại:</Label>
                <Textarea
                  value={JSON.stringify(exportData, null, 2)}
                  readOnly
                  className="h-32 text-xs font-mono bg-gray-50"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Nhập */}
        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Nhập dữ liệu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={importFromFile} variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Chọn file JSON
                </Button>
                <Button onClick={importFromText} className="bg-green-600 hover:bg-green-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Nhập từ text
                </Button>
              </div>

              <div>
                <Label className="text-xs text-gray-600">Dán JSON vào đây:</Label>
                <Textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Dán nội dung JSON vào đây..."
                  className="h-32 text-xs font-mono"
                />
              </div>

              <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                <strong>Lưu ý:</strong> Nhập dữ liệu sẽ xóa toàn bộ ma trận hiện tại và thay thế bằng dữ liệu mới.
              </div>
            </CardContent>
          </Card>

          {/* Input file ẩn */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </TabsContent>

        {/* Tab Mẫu */}
        <TabsContent value="sample" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                JSON mẫu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={loadSampleData} className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Load mẫu
                </Button>
                <Button onClick={copySampleJson} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy mẫu
                </Button>
              </div>

              <div>
                <Label className="text-xs text-gray-600">Cấu trúc JSON mẫu:</Label>
                <Textarea
                  value={JSON.stringify(sampleJson, null, 2)}
                  readOnly
                  className="h-40 text-xs font-mono bg-gray-50"
                />
              </div>

              <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                <strong>Cấu trúc JSON:</strong>
                <ul className="mt-1 space-y-1">
                  <li>
                    • <code>version</code>: Phiên bản định dạng
                  </li>
                  <li>
                    • <code>timestamp</code>: Thời gian tạo
                  </li>
                  <li>
                    • <code>matrices</code>: Mảng các ma trận biến đổi
                  </li>
                  <li>
                    • <code>settings</code>: Cài đặt hiển thị và tính toán
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
