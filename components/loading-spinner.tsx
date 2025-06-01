"use client"

import { useIFS } from "./ifs-context"

export default function LoadingSpinner() {
  const { isGenerating, darkMode } = useIFS()

  if (!isGenerating) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
      <div
        className={`${darkMode ? "bg-gray-800/95 border-gray-700/30" : "bg-white/95 border-white/30"} backdrop-blur-md rounded-2xl shadow-2xl border p-8 flex flex-col items-center`}
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-t-transparent border-r-purple-400 border-b-transparent border-l-purple-400 rounded-full animate-spin animate-reverse"></div>
        </div>
        <div className="text-xl font-bold text-gray-800 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Đang tạo fractal...
        </div>
        <div className="text-sm text-gray-600 mt-2">Vui lòng đợi trong giây lát</div>
        <div className="mt-4 flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
