"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Code, Play, X, ChevronLeft, ChevronRight, RotateCw, Pause, Move, Pen, FileJson } from "lucide-react"
import { Button } from "@/components/ui/button"
import ControlsPanel from "@/components/controls-panel"
import FormulaDisplay from "@/components/formula-display"
import IFSMatrixEditor from "@/components/ifs-matrix-editor"
import JsonImportExport from "@/components/json-import-export"
import { useIFS } from "./ifs-context"

export default function FloatingPanels() {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const { generateAttractor, isGenerating, settings, updateSettings } = useIFS()

  const togglePanel = (panelName: string) => {
    if (activePanel === panelName) {
      setActivePanel(null)
    } else {
      setActivePanel(panelName)
    }
  }

  return (
    <>
      {/* View Controls - Thêm các nút điều khiển */}
      <div className="absolute top-6 right-6 z-10 flex gap-2">
        <Button
          onClick={() => updateSettings({ autoRotate: !settings.autoRotate })}
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm"
        >
          {settings.autoRotate ? <Pause className="w-4 h-4 mr-1" /> : <RotateCw className="w-4 h-4 mr-1" />}
          {settings.autoRotate ? "Dừng xoay" : "Tự xoay"}
        </Button>

        <Button
          onClick={() => updateSettings({ orbitControlsEnabled: !settings.orbitControlsEnabled })}
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm"
        >
          <Move className="w-4 h-4 mr-1" />
          {settings.orbitControlsEnabled ? "Tắt điều khiển" : "Bật điều khiển"}
        </Button>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-3">
        <Button
          onClick={() => generateAttractor()}
          disabled={isGenerating}
          className={`rounded-full w-14 h-14 shadow-lg ${
            isGenerating ? "bg-yellow-500" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <Play className={`w-6 h-6 ${isGenerating ? "animate-pulse" : ""}`} />
        </Button>

        <Button
          onClick={() => togglePanel("controls")}
          className={`rounded-full w-12 h-12 shadow-lg ${
            activePanel === "controls" ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Settings className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => togglePanel("formula")}
          className={`rounded-full w-12 h-12 shadow-lg ${
            activePanel === "formula" ? "bg-purple-700" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          <Code className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => togglePanel("matrix")}
          className={`rounded-full w-12 h-12 shadow-lg ${
            activePanel === "matrix" ? "bg-orange-700" : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          <Pen className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => togglePanel("json")}
          className={`rounded-full w-12 h-12 shadow-lg ${
            activePanel === "json" ? "bg-teal-700" : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          <FileJson className="w-5 h-5" />
        </Button>
      </div>

      {/* Panels */}
      <AnimatePresence>
        {activePanel === "controls" && (
          <FloatingPanel title="Controls" onClose={() => setActivePanel(null)} position="right">
            <ControlsPanel />
          </FloatingPanel>
        )}

        {activePanel === "formula" && (
          <FloatingPanel title="Formulas" onClose={() => setActivePanel(null)} position="left">
            <FormulaDisplay />
          </FloatingPanel>
        )}

        {activePanel === "matrix" && (
          <FloatingPanel title="Matrix Input" onClose={() => setActivePanel(null)} position="bottom">
            <IFSMatrixEditor />
          </FloatingPanel>
        )}

        {activePanel === "json" && (
          <FloatingPanel title="JSON Import/Export" onClose={() => setActivePanel(null)} position="right">
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
  // Define animation variants based on position
  const variants = {
    right: {
      hidden: { x: 400, opacity: 0 },
      visible: { x: 0, opacity: 1 },
      exit: { x: 400, opacity: 0 },
    },
    left: {
      hidden: { x: -400, opacity: 0 },
      visible: { x: 0, opacity: 1 },
      exit: { x: -400, opacity: 0 },
    },
    bottom: {
      hidden: { y: 400, opacity: 0 },
      visible: { y: 0, opacity: 1 },
      exit: { y: 400, opacity: 0 },
    },
  }

  // Define position styles
  const positionStyles = {
    right: "top-0 right-0 h-full w-96",
    left: "top-0 left-0 h-full w-96",
    bottom: "bottom-0 left-0 right-0 h-96",
  }

  return (
    <motion.div
      className={`fixed z-30 bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden ${positionStyles[position]}`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants[position]}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Panel Header */}
      <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <h2 className="font-semibold text-gray-800 flex items-center">
          {position === "right" && <ChevronRight className="w-4 h-4 mr-2" />}
          {position === "left" && <ChevronLeft className="w-4 h-4 mr-2" />}
          {title}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Panel Content */}
      <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100% - 48px)" }}>
        {children}
      </div>
    </motion.div>
  )
}
