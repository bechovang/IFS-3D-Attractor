"use client"

import type React from "react"

import { useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useState, useRef } from "react"
import { Vector3 } from "three"
import {
  Eye,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  CuboidIcon as Cube,
  RotateCw,
  Home,
  Keyboard,
} from "lucide-react"
import { useIFS } from "./ifs-context"

interface CameraPosition {
  name: string
  position: [number, number, number]
  icon: React.ReactNode
  tooltip: string
}

const CAMERA_POSITIONS: CameraPosition[] = [
  {
    name: "front",
    position: [0, 0, 50],
    icon: <Eye className="w-4 h-4" />,
    tooltip: "Mặt trước",
  },
  {
    name: "top",
    position: [0, 50, 0],
    icon: <ArrowUp className="w-4 h-4" />,
    tooltip: "Mặt trên",
  },
  {
    name: "right",
    position: [50, 0, 0],
    icon: <ArrowRight className="w-4 h-4" />,
    tooltip: "Mặt phải",
  },
  {
    name: "bottom",
    position: [0, -50, 0],
    icon: <ArrowDown className="w-4 h-4" />,
    tooltip: "Mặt dưới",
  },
  {
    name: "left",
    position: [-50, 0, 0],
    icon: <ArrowLeft className="w-4 h-4" />,
    tooltip: "Mặt trái",
  },
  {
    name: "isometric",
    position: [35, 35, 35],
    icon: <Cube className="w-4 h-4" />,
    tooltip: "Góc nhìn đẳng thị",
  },
]

export default function CameraControls() {
  const { camera, controls } = useThree()
  const [isAnimating, setIsAnimating] = useState(false)
  const [lastPosition, setLastPosition] = useState<Vector3 | null>(null)
  const [initialPosition, setInitialPosition] = useState<Vector3 | null>(null)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const { darkMode } = useIFS()
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (camera) {
      const initialPos = new Vector3(0, 0, 50) // Set default position
      camera.position.copy(initialPos)
      setInitialPosition(initialPos.clone())
      setLastPosition(initialPos.clone())
    }
  }, [camera])

  // Thêm keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!camera || isAnimating) return

      // Phím R để reset camera
      if (e.key === "r" || e.key === "R") {
        e.preventDefault()
        returnToInitialPosition()
      }

      // Phím 1-6 để chuyển góc nhìn
      if (e.key >= "1" && e.key <= "6") {
        e.preventDefault()
        const index = Number.parseInt(e.key) - 1
        if (index >= 0 && index < CAMERA_POSITIONS.length) {
          moveCamera(CAMERA_POSITIONS[index].position)
        }
      }

      // Phím Escape để quay lại vị trí trước
      if (e.key === "Escape") {
        e.preventDefault()
        returnToPreviousPosition()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [camera, isAnimating])

  // Sửa hàm moveCamera để đảm bảo animation kết thúc đúng cách
  const moveCamera = (position: [number, number, number]) => {
    if (!camera || isAnimating) return

    // Save current position
    setLastPosition(camera.position.clone())
    setIsAnimating(true)

    const targetPosition = new Vector3(...position)
    const startPosition = camera.position.clone()
    const startTime = Date.now()
    const duration = 1000

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      camera.position.lerpVectors(startPosition, targetPosition, easeProgress)

      // Update controls if available
      if (controls && controls.target) {
        controls.target.set(0, 0, 0)
        controls.update()
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        animationRef.current = null
      }
    }

    // Bắt đầu animation và hủy animation trước đó nếu có
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animationRef.current = requestAnimationFrame(animate)
  }

  // Tương tự sửa cho returnToPreviousPosition và returnToInitialPosition
  const returnToPreviousPosition = () => {
    if (!lastPosition || !camera || isAnimating) return

    setIsAnimating(true)
    const startPosition = camera.position.clone()
    const targetPosition = lastPosition.clone()
    const startTime = Date.now()
    const duration = 1000

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      camera.position.lerpVectors(startPosition, targetPosition, easeProgress)

      // Update controls if available
      if (controls && controls.target) {
        controls.target.set(0, 0, 0)
        controls.update()
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        animationRef.current = null
      }
    }

    // Bắt đầu animation và hủy animation trước đó nếu có
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animationRef.current = requestAnimationFrame(animate)
  }

  const returnToInitialPosition = () => {
    if (!initialPosition || !camera || isAnimating) return

    setIsAnimating(true)
    setLastPosition(camera.position.clone())

    const startPosition = camera.position.clone()
    const targetPosition = initialPosition.clone()
    const startTime = Date.now()
    const duration = 1000

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      camera.position.lerpVectors(startPosition, targetPosition, easeProgress)

      // Update controls if available
      if (controls && controls.target) {
        controls.target.set(0, 0, 0)
        controls.update()
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        animationRef.current = null
      }
    }

    // Bắt đầu animation và hủy animation trước đó nếu có
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animationRef.current = requestAnimationFrame(animate)
  }

  return (
    <Html
      position={[-30, 20, 0]}
      transform={false}
      occlude={false}
      style={{
        pointerEvents: "auto",
        userSelect: "none",
      }}
      className="camera-controls-container"
    >
      <div className="flex flex-col gap-3">
        <TooltipProvider>
          <div
            className={`${darkMode ? "bg-gray-800/90 border-gray-700/20" : "bg-white/90 border-white/20"} backdrop-blur-sm rounded-xl shadow-lg border p-3`}
          >
            <div className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-600"} mb-3 text-center`}>
              Góc nhìn
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {CAMERA_POSITIONS.map((pos, index) => (
                <Tooltip key={pos.name}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-9 w-9 p-0 relative ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-gray-200"
                          : "hover:bg-blue-50 hover:border-blue-300"
                      } transition-all duration-200`}
                      onClick={() => moveCamera(pos.position)}
                      disabled={isAnimating}
                    >
                      {pos.icon}
                      <span className="absolute top-0 right-0 text-[9px] opacity-60">{index + 1}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"}
                  >
                    {pos.tooltip} (Phím {index + 1})
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <div className={`pt-3 border-t ${darkMode ? "border-gray-700" : "border-gray-200"} space-y-2`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full h-8 text-xs ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-gray-200"
                        : "hover:bg-orange-50 hover:border-orange-300"
                    } transition-all duration-200`}
                    onClick={returnToPreviousPosition}
                    disabled={!lastPosition || isAnimating}
                  >
                    <RotateCw className="w-3 h-3 mr-2" />
                    Quay lại (Esc)
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className={darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"}>
                  Quay lại vị trí trước đó (Phím Esc)
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full h-8 text-xs ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-gray-200"
                        : "hover:bg-green-50 hover:border-green-300"
                    } transition-all duration-200`}
                    onClick={returnToInitialPosition}
                    disabled={!initialPosition || isAnimating}
                  >
                    <Home className="w-3 h-3 mr-2" />
                    Mặc định (R)
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className={darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"}>
                  Quay về vị trí mặc định (Phím R)
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full h-8 text-xs ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-gray-200"
                        : "hover:bg-blue-50 hover:border-blue-300"
                    } transition-all duration-200`}
                    onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                  >
                    <Keyboard className="w-3 h-3 mr-2" />
                    Phím tắt
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className={darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"}>
                  Hiển thị danh sách phím tắt
                </TooltipContent>
              </Tooltip>
            </div>

            {showKeyboardShortcuts && (
              <div className={`mt-3 pt-3 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>
                  Phím tắt:
                </div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} space-y-1`}>
                  <div className="flex justify-between">
                    <span>1-6</span>
                    <span>Các góc nhìn</span>
                  </div>
                  <div className="flex justify-between">
                    <span>R</span>
                    <span>Đặt lại góc nhìn</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Esc</span>
                    <span>Quay lại vị trí trước</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TooltipProvider>
      </div>
    </Html>
  )
}
