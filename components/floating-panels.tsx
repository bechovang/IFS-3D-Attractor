"use client"

import type React from "react" // Ensure React is imported if JSX is used

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Settings,
  Code,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Pause,
  Move,
  Pen,
  FileJson,
  Sparkles,
  Archive,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ControlsPanel from "@/components/controls-panel"
import FormulaDisplay from "@/components/formula-display"
import IFSMatrixEditor from "@/components/ifs-matrix-editor"
import JsonImportExport from "@/components/json-import-export"
import FractalPresets from "@/components/fractal-presets"
import { useIFS } from "./ifs-context"
import DarkModeToggle from "./dark-mode-toggle"
import LanguageSelector from "./language-selector"
import { useI18n } from "./i18n-context"
import SavedFractalsPanel from "./saved-fractals-panel"

export default function FloatingPanels() {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const { generateAttractor, isGenerating, settings, updateSettings, darkMode } = useIFS()
  const { t } = useI18n()

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setActivePanel(null)
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  const togglePanel = (panelName: string) => {
    setActivePanel((prev) => (prev === panelName ? null : panelName))
  }

  return (
    <>
      {/* Enhanced View Controls */}
      <div className="absolute top-6 right-6 z-10 flex gap-3" data-tutorial="camera-controls">
        <div
          className={`${darkMode ? "bg-gray-800/90 border-gray-700/20" : "bg-white/90 border-white/20"} backdrop-blur-sm rounded-xl shadow-lg border p-2 flex gap-2`}
        >
          <Button
            onClick={() => updateSettings({ autoRotate: !settings.autoRotate })}
            variant={settings.autoRotate ? "default" : "outline"}
            size="sm"
            className={`h-9 px-3 transition-all duration-200 ${
              darkMode && !settings.autoRotate ? "bg-gray-700 border-gray-600 hover:bg-gray-600" : ""
            }`}
            title={settings.autoRotate ? "Dừng xoay tự động" : "Bắt đầu xoay tự động"}
          >
            {settings.autoRotate ? <Pause className="w-4 h-4 mr-2" /> : <RotateCw className="w-4 h-4 mr-2" />}
            {settings.autoRotate ? t.stop : t.rotate}
          </Button>

          <Button
            onClick={() => updateSettings({ orbitControlsEnabled: !settings.orbitControlsEnabled })}
            variant={settings.orbitControlsEnabled ? "default" : "outline"}
            size="sm"
            className={`h-9 px-3 transition-all duration-200 ${
              darkMode && !settings.orbitControlsEnabled ? "bg-gray-700 border-gray-600 hover:bg-gray-600" : ""
            }`}
            title={settings.orbitControlsEnabled ? "Khóa điều khiển camera" : "Mở khóa điều khiển camera"}
          >
            <Move className="w-4 h-4 mr-2" />
            {settings.orbitControlsEnabled ? t.lock : t.unlock}
          </Button>

          <LanguageSelector />
          <DarkModeToggle />
        </div>
      </div>

      {/* Enhanced Floating Action Buttons */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-3">
        <div className="relative">
          <Button
            onClick={() => generateAttractor()}
            disabled={isGenerating}
            className={`rounded-full w-16 h-16 shadow-xl transition-all duration-300 ${
              isGenerating
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse scale-110"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-110"
            }`}
            title={isGenerating ? "Đang tạo fractal..." : "Tạo fractal mới"}
            data-tutorial="generate-button"
          >
            <Play className={`w-7 h-7 ${isGenerating ? "animate-spin" : ""}`} />
          </Button>
          {isGenerating && (
            <div className="absolute inset-0 rounded-full border-4 border-yellow-300 border-t-transparent animate-spin"></div>
          )}
        </div>

        <div
          className={`${darkMode ? "bg-gray-800/90 border-gray-700/20" : "bg-white/90 border-white/20"} backdrop-blur-sm rounded-2xl shadow-lg border p-3 flex flex-col gap-2`}
        >
          {/* Button for Saved Fractals Panel */}
          <Button
            onClick={() => togglePanel("saved")}
            className={`rounded-full w-12 h-12 shadow-md transition-all duration-200 ${
              activePanel === "saved"
                ? "bg-gradient-to-r from-sky-500 to-cyan-600 scale-110"
                : "bg-gradient-to-r from-sky-400 to-cyan-500 hover:from-sky-500 hover:to-cyan-600 hover:scale-105"
            }`}
            title="Fractal đã lưu"
            data-tutorial="saved-button"
          >
            <Archive className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => togglePanel("presets")}
            className={`rounded-full w-12 h-12 shadow-md transition-all duration-200 ${
              activePanel === "presets"
                ? "bg-gradient-to-r from-pink-500 to-rose-600 scale-110"
                : "bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 hover:scale-105"
            }`}
            title="Mẫu fractal có sẵn"
            data-tutorial="presets-button"
          >
            <Sparkles className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => togglePanel("controls")}
            className={`rounded-full w-12 h-12 shadow-md transition-all duration-200 ${
              activePanel === "controls"
                ? "bg-gradient-to-r from-blue-600 to-indigo-700 scale-110"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
            }`}
            title="Cài đặt và điều khiển"
            data-tutorial="controls-button"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => togglePanel("formula")}
            className={`rounded-full w-12 h-12 shadow-md transition-all duration-200 ${
              activePanel === "formula"
                ? "bg-gradient-to-r from-purple-600 to-violet-700 scale-110"
                : "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 hover:scale-105"
            }`}
            title="Công thức toán học"
            data-tutorial="formula-button"
          >
            <Code className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => togglePanel("matrix")}
            className={`rounded-full w-12 h-12 shadow-md transition-all duration-200 ${
              activePanel === "matrix"
                ? "bg-gradient-to-r from-orange-600 to-amber-700 scale-110"
                : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 hover:scale-105"
            }`}
            title="Chỉnh sửa ma trận"
            data-tutorial="matrix-button"
          >
            <Pen className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => togglePanel("json")}
            className={`rounded-full w-12 h-12 shadow-md transition-all duration-200 ${
              activePanel === "json"
                ? "bg-gradient-to-r from-teal-600 to-cyan-700 scale-110"
                : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 hover:scale-105"
            }`}
            title="Nhập/Xuất JSON"
            data-tutorial="json-button"
          >
            <FileJson className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Enhanced Panels */}
      <AnimatePresence>
        {activePanel === "saved" && (
          <FloatingPanel title={`🗄️ Fractal Đã Lưu`} onClose={() => setActivePanel(null)} position="left">
            <SavedFractalsPanel />
          </FloatingPanel>
        )}
        {activePanel === "presets" && (
          <FloatingPanel title={`🌟 ${t.fractalPresets}`} onClose={() => setActivePanel(null)} position="left">
            <FractalPresets />
          </FloatingPanel>
        )}
        {activePanel === "controls" && (
          <FloatingPanel title={`⚙️ ${t.controls}`} onClose={() => setActivePanel(null)} position="right">
            <ControlsPanel />
          </FloatingPanel>
        )}
        {activePanel === "formula" && (
          <FloatingPanel title={`📐 ${t.formulas}`} onClose={() => setActivePanel(null)} position="left">
            <FormulaDisplay />
          </FloatingPanel>
        )}
        {activePanel === "matrix" && (
          <FloatingPanel title={`🔢 ${t.matrixInput}`} onClose={() => setActivePanel(null)} position="left">
            <IFSMatrixEditor />
          </FloatingPanel>
        )}
        {activePanel === "json" && (
          <FloatingPanel title={`💾 ${t.json} Import/Export`} onClose={() => setActivePanel(null)} position="right">
            <JsonImportExport />
          </FloatingPanel>
        )}
      </AnimatePresence>
    </>
  )
}

interface FloatingPanelProps {
  title: string
  children: React.ReactNode
  onClose: () => void
  position: "left" | "right" | "bottom"
}

function FloatingPanel({ title, children, onClose, position }: FloatingPanelProps) {
  const { darkMode } = useIFS()

  const variants = {
    right: {
      hidden: { x: 400, opacity: 0, scale: 0.95 },
      visible: { x: 0, opacity: 1, scale: 1 },
      exit: { x: 400, opacity: 0, scale: 0.95 },
    },
    left: {
      hidden: { x: -400, opacity: 0, scale: 0.95 },
      visible: { x: 0, opacity: 1, scale: 1 },
      exit: { x: -400, opacity: 0, scale: 0.95 },
    },
    bottom: {
      hidden: { y: 400, opacity: 0, scale: 0.95 },
      visible: { y: 0, opacity: 1, scale: 1 },
      exit: { y: 400, opacity: 0, scale: 0.95 },
    },
  }

  const positionStyles = {
    right: "top-0 right-0 h-full w-96",
    left: "top-0 left-0 h-full w-96",
    bottom: "bottom-0 left-0 right-0 h-96",
  }

  return (
    <motion.div
      className={`fixed z-30 ${darkMode ? "bg-gray-800/95 border-gray-700/30" : "bg-white/95 border-white/30"} backdrop-blur-md shadow-2xl border rounded-2xl overflow-hidden ${positionStyles[position]}`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants[position]}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className={`${darkMode ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gradient-to-r from-gray-50 to-white"} px-6 py-4 flex items-center justify-between border-b ${darkMode ? "border-gray-700/50" : "border-gray-200/50"}`}
      >
        <h2 className={`font-bold ${darkMode ? "text-white" : "text-gray-800"} flex items-center text-lg`}>
          {position === "right" && <ChevronRight className="w-5 h-5 mr-2 text-gray-500" />}
          {position === "left" && <ChevronLeft className="w-5 h-5 mr-2 text-gray-500" />}
          {title}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className={`h-8 w-8 p-0 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} rounded-full transition-colors`}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="p-0 overflow-y-auto custom-scrollbar" style={{ maxHeight: "calc(100% - 65px)" }}>
        {children}
      </div>
    </motion.div>
  )
}
