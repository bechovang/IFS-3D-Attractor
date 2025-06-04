"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, X, SkipForward } from "lucide-react"
import { useTutorial } from "./tutorial-context"
import { useIFS } from "./ifs-context"

export default function TutorialOverlay() {
  const { isActive, currentStep, steps, nextStep, prevStep, skipTutorial } = useTutorial()
  const { darkMode } = useIFS()
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

  const currentStepData = steps[currentStep]

  useEffect(() => {
    if (isActive && currentStepData) {
      const updateTargetRect = () => {
        const element = document.querySelector(currentStepData.targetElement)
        if (element) {
          setTargetRect(element.getBoundingClientRect())
        }
      }

      updateTargetRect()
      window.addEventListener("resize", updateTargetRect)
      window.addEventListener("scroll", updateTargetRect)

      return () => {
        window.removeEventListener("resize", updateTargetRect)
        window.removeEventListener("scroll", updateTargetRect)
      }
    }
  }, [isActive, currentStepData])

  if (!isActive || !currentStepData) return null

  const getModalPosition = () => {
    if (!targetRect) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }

    const modalWidth = 400
    const modalHeight = 200
    const padding = 20

    let top = targetRect.top
    let left = targetRect.left

    switch (currentStepData.position) {
      case "bottom":
        top = targetRect.bottom + padding
        left = targetRect.left + targetRect.width / 2 - modalWidth / 2
        break
      case "top":
        top = targetRect.top - modalHeight - padding
        left = targetRect.left + targetRect.width / 2 - modalWidth / 2
        break
      case "left":
        top = targetRect.top + targetRect.height / 2 - modalHeight / 2
        left = targetRect.left - modalWidth - padding
        break
      case "right":
        top = targetRect.top + targetRect.height / 2 - modalHeight / 2
        left = targetRect.right + padding
        break
    }

    // Ensure modal stays within viewport
    top = Math.max(padding, Math.min(top, window.innerHeight - modalHeight - padding))
    left = Math.max(padding, Math.min(left, window.innerWidth - modalWidth - padding))

    return { top: `${top}px`, left: `${left}px` }
  }

  const getSpotlightStyle = () => {
    if (!targetRect) return {}

    return {
      top: targetRect.top - 8,
      left: targetRect.left - 8,
      width: targetRect.width + 16,
      height: targetRect.height + 16,
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        style={{ pointerEvents: "auto" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Spotlight */}
        {targetRect && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute rounded-lg"
            style={{
              ...getSpotlightStyle(),
              boxShadow: `
                0 0 0 4px rgba(59, 130, 246, 0.5),
                0 0 0 8px rgba(59, 130, 246, 0.3),
                0 0 20px rgba(59, 130, 246, 0.4)
              `,
              background: "transparent",
              border: "2px solid rgba(59, 130, 246, 0.8)",
            }}
          />
        )}

        {/* Tutorial Modal */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
          className="absolute"
          style={getModalPosition()}
        >
          <Card className={`w-96 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-2xl`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {currentStepData.title}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={skipTutorial} className="h-8 w-8 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Bước {currentStep + 1} / {steps.length}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {currentStepData.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Quay lại
                  </Button>

                  <Button variant="outline" size="sm" onClick={skipTutorial} className="flex items-center gap-1">
                    <SkipForward className="w-4 h-4" />
                    Bỏ qua
                  </Button>
                </div>

                <Button onClick={nextStep} size="sm" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
                  {currentStep === steps.length - 1 ? "Hoàn thành" : "Tiếp theo"}
                  {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
