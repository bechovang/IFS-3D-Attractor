"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useIFS } from "./ifs-context"
import { Play, Sparkles, Settings, Code, Pen, FileJson, Info, Eye, ArrowUp, CuboidIcon, Keyboard } from "lucide-react"

export default function HelpPanel() {
  const { generateAttractor, darkMode } = useIFS()

  return (
    <div className="space-y-4">
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className={`grid w-full grid-cols-3 ${darkMode ? "bg-gray-700" : ""}`}>
          <TabsTrigger value="basics">Cơ bản</TabsTrigger>
          <TabsTrigger value="controls">Điều khiển</TabsTrigger>
          <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4 pt-3">
          <div
            className={`${darkMode ? "bg-blue-900/30 border-blue-800" : "bg-blue-50 border-blue-100"} p-4 rounded-lg border`}
          >
            <h3 className={`text-lg font-semibold ${darkMode ? "text-blue-300" : "text-blue-800"} mb-2`}>
              IFS 3D Attractor là gì?
            </h3>
            <p className={`text-sm ${darkMode ? "text-blue-200" : "text-blue-700"}`}>
              IFS (Iterated Function System) là một phương pháp tạo ra các hình fractal bằng cách áp dụng nhiều phép
              biến đổi tuyến tính lặp đi lặp lại. Ứng dụng này cho phép bạn tạo và khám phá các fractal 3D đẹp mắt.
            </p>
          </div>

          <h3 className={`text-md font-semibold mt-4 ${darkMode ? "text-gray-200" : ""}`}>Các bước cơ bản:</h3>

          <div className="space-y-2">
            <div className={`flex items-start space-x-3 p-3 ${darkMode ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}>
              <div className="bg-pink-100 p-2 rounded-full">
                <Sparkles className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h4 className={`font-medium ${darkMode ? "text-gray-200" : ""}`}>1. Chọn một mẫu fractal</h4>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
                  Nhấn nút <Sparkles className="w-3 h-3 inline" /> để mở bảng Fractal Presets và chọn một mẫu có sẵn.
                </p>
              </div>
            </div>

            <div className={`flex items-start space-x-3 p-3 ${darkMode ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}>
              <div className="bg-green-100 p-2 rounded-full">
                <Play className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className={`font-medium ${darkMode ? "text-gray-200" : ""}`}>2. Tạo fractal</h4>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
                  Nhấn nút <Play className="w-3 h-3 inline" /> để tạo fractal từ các ma trận đã chọn.
                </p>
                <Button
                  onClick={() => generateAttractor()}
                  size="sm"
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Tạo fractal ngay
                </Button>
              </div>
            </div>

            <div className={`flex items-start space-x-3 p-3 ${darkMode ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}>
              <div className="bg-blue-100 p-2 rounded-full">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className={`font-medium ${darkMode ? "text-gray-200" : ""}`}>3. Khám phá fractal</h4>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
                  Sử dụng chuột để xoay, phóng to/nhỏ, hoặc dùng các nút góc nhìn ở bên trái màn hình.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="controls" className="space-y-4 pt-3">
          <h3 className={`text-md font-semibold ${darkMode ? "text-gray-200" : ""}`}>Các nút điều khiển:</h3>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="camera" className={darkMode ? "border-gray-700" : ""}>
              <AccordionTrigger
                className={`text-sm font-medium ${darkMode ? "text-gray-200 hover:text-gray-100" : ""}`}
              >
                Điều khiển góc nhìn
              </AccordionTrigger>
              <AccordionContent>
                <div className={`space-y-2 text-sm ${darkMode ? "text-gray-300" : ""}`}>
                  <div className="flex items-center space-x-2">
                    <div className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} p-1 rounded`}>
                      <Eye className="w-4 h-4" />
                    </div>
                    <span>Mặt trước - Nhìn thẳng vào mô hình (Phím 1)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} p-1 rounded`}>
                      <ArrowUp className="w-4 h-4" />
                    </div>
                    <span>Mặt trên - Nhìn từ trên xuống (Phím 2)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} p-1 rounded`}>
                      <CuboidIcon className="w-4 h-4" />
                    </div>
                    <span>Góc nhìn đẳng thị - Nhìn từ góc 45 độ (Phím 6)</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="panels" className={darkMode ? "border-gray-700" : ""}>
              <AccordionTrigger
                className={`text-sm font-medium ${darkMode ? "text-gray-200 hover:text-gray-100" : ""}`}
              >
                Các bảng điều khiển
              </AccordionTrigger>
              <AccordionContent>
                <div className={`space-y-2 text-sm ${darkMode ? "text-gray-300" : ""}`}>
                  <div className="flex items-center space-x-2">
                    <div className="bg-pink-100 p-1 rounded">
                      <Sparkles className="w-4 h-4 text-pink-600" />
                    </div>
                    <span>Fractal Presets - Các mẫu fractal có sẵn</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-1 rounded">
                      <Settings className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Controls - Điều chỉnh hiệu suất và hiển thị</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-purple-100 p-1 rounded">
                      <Code className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Formulas - Xem công thức toán học</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-orange-100 p-1 rounded">
                      <Pen className="w-4 h-4 text-orange-600" />
                    </div>
                    <span>Matrix Input - Chỉnh sửa ma trận biến đổi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-teal-100 p-1 rounded">
                      <FileJson className="w-4 h-4 text-teal-600" />
                    </div>
                    <span>JSON Import/Export - Lưu và chia sẻ fractal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} p-1 rounded`}>
                      <Info className="w-4 h-4 text-gray-600" />
                    </div>
                    <span>Hướng dẫn - Bảng hướng dẫn này</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="keyboard" className={darkMode ? "border-gray-700" : ""}>
              <AccordionTrigger
                className={`text-sm font-medium ${darkMode ? "text-gray-200 hover:text-gray-100" : ""}`}
              >
                Phím tắt
              </AccordionTrigger>
              <AccordionContent>
                <div className={`space-y-2 text-sm ${darkMode ? "text-gray-300" : ""}`}>
                  <div className="flex items-center space-x-2">
                    <div className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} p-1 rounded`}>
                      <Keyboard className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Các phím tắt:</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <p>
                      <span className="font-mono bg-gray-700 text-gray-200 px-1 rounded">1-6</span>
                      <span className="ml-2">Chuyển đổi giữa các góc nhìn</span>
                    </p>
                    <p>
                      <span className="font-mono bg-gray-700 text-gray-200 px-1 rounded">R</span>
                      <span className="ml-2">Đặt lại góc nhìn về mặc định</span>
                    </p>
                    <p>
                      <span className="font-mono bg-gray-700 text-gray-200 px-1 rounded">Esc</span>
                      <span className="ml-2">Quay lại vị trí trước đó</span>
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 pt-3">
          <h3 className={`text-md font-semibold ${darkMode ? "text-gray-200" : ""}`}>Tính năng nâng cao:</h3>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="matrix" className={darkMode ? "border-gray-700" : ""}>
              <AccordionTrigger
                className={`text-sm font-medium ${darkMode ? "text-gray-200 hover:text-gray-100" : ""}`}
              >
                Hiểu về ma trận IFS
              </AccordionTrigger>
              <AccordionContent>
                <div className={`text-sm space-y-2 ${darkMode ? "text-gray-300" : ""}`}>
                  <p>
                    Mỗi ma trận IFS là một phép biến đổi tuyến tính 3D, được biểu diễn bởi ma trận 3x3 và vector dịch
                    chuyển:
                  </p>
                  <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-3 rounded font-mono text-xs`}>
                    <div>[a c e] [x] [tx] [x']</div>
                    <div>[b d f] [y] + [ty] = [y']</div>
                    <div>[g h i] [z] [tz] [z']</div>
                  </div>
                  <p>
                    Mỗi ma trận có một xác suất được chọn trong quá trình lặp. Tổng xác suất của tất cả ma trận phải
                    bằng 1.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="export" className={darkMode ? "border-gray-700" : ""}>
              <AccordionTrigger
                className={`text-sm font-medium ${darkMode ? "text-gray-200 hover:text-gray-100" : ""}`}
              >
                Xuất và chia sẻ fractal
              </AccordionTrigger>
              <AccordionContent>
                <div className={`text-sm space-y-2 ${darkMode ? "text-gray-300" : ""}`}>
                  <p>Bạn có thể xuất fractal của mình theo nhiều cách:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Xuất PNG:</strong> Lưu ảnh chụp màn hình hiện tại
                    </li>
                    <li>
                      <strong>Xuất PLY:</strong> Lưu dưới dạng file 3D để mở trong Blender, Unity...
                    </li>
                    <li>
                      <strong>Xuất JSON:</strong> Lưu cấu hình để chia sẻ hoặc sử dụng lại sau
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="performance" className={darkMode ? "border-gray-700" : ""}>
              <AccordionTrigger
                className={`text-sm font-medium ${darkMode ? "text-gray-200 hover:text-gray-100" : ""}`}
              >
                Tối ưu hiệu suất
              </AccordionTrigger>
              <AccordionContent>
                <div className={`text-sm space-y-2 ${darkMode ? "text-gray-300" : ""}`}>
                  <p>Để cải thiện hiệu suất khi làm việc với fractal phức tạp:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Giảm số lượng điểm (iterations) xuống 25,000 - 50,000</li>
                    <li>Tắt tính năng Bézier Surface</li>
                    <li>Tăng kích thước điểm (point size) để dễ nhìn hơn</li>
                    <li>Sử dụng chế độ "Fast Mode" trong bảng Controls</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>

      <div className={`mt-6 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <h3 className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Phím tắt</h3>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-2 rounded`}>
            <span className={`font-mono ${darkMode ? "bg-gray-600" : "bg-gray-200"} px-1 rounded`}>1-6</span>
            <span className="ml-2">Các góc nhìn</span>
          </div>
          <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-2 rounded`}>
            <span className={`font-mono ${darkMode ? "bg-gray-600" : "bg-gray-200"} px-1 rounded`}>R</span>
            <span className="ml-2">Đặt lại góc nhìn</span>
          </div>
          <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-2 rounded`}>
            <span className={`font-mono ${darkMode ? "bg-gray-600" : "bg-gray-200"} px-1 rounded`}>Esc</span>
            <span className="ml-2">Quay lại vị trí trước</span>
          </div>
          <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-2 rounded`}>
            <span className={`font-mono ${darkMode ? "bg-gray-600" : "bg-gray-200"} px-1 rounded`}>Kéo chuột</span>
            <span className="ml-2">Xoay mô hình</span>
          </div>
        </div>
      </div>
    </div>
  )
}
