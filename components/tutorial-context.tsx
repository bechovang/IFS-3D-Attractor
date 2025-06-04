"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface TutorialStep {
  id: string
  title: string
  description: string
  targetElement: string
  position: "top" | "bottom" | "left" | "right"
  action?: () => void
}

interface TutorialContextType {
  isActive: boolean
  currentStep: number
  steps: TutorialStep[]
  startTutorial: () => void
  nextStep: () => void
  prevStep: () => void
  skipTutorial: () => void
  endTutorial: () => void
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined)

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "🎉 Chào mừng đến với IFS 3D Attractor!",
    description: "Khám phá thế giới fractal 3D tuyệt đẹp. Hãy cùng tìm hiểu các tính năng chính của ứng dụng.",
    targetElement: "#app-title",
    position: "bottom",
  },
  {
    id: "presets",
    title: "✨ Fractal Presets",
    description: "Bắt đầu với các mẫu fractal có sẵn. Chọn một preset để xem fractal đẹp mắt ngay lập tức!",
    targetElement: "[data-tutorial='presets-button']",
    position: "left",
  },
  {
    id: "generate",
    title: "▶️ Tạo Fractal",
    description: "Nhấn nút này để tạo fractal mới với các thông số hiện tại. Mỗi lần tạo sẽ cho ra kết quả khác nhau!",
    targetElement: "[data-tutorial='generate-button']",
    position: "left",
  },
  {
    id: "camera-controls",
    title: "🖱️ Điều khiển Camera",
    description: "Sử dụng chuột để xoay, zoom và di chuyển camera. Bạn có thể khóa/mở khóa điều khiển bằng nút này.",
    targetElement: "[data-tutorial='camera-controls']",
    position: "bottom",
  },
  {
    id: "saved-fractals",
    title: "💾 Lưu Fractal",
    description: "Lưu lại những fractal yêu thích của bạn để xem lại sau. Quản lý bộ sưu tập fractal cá nhân!",
    targetElement: "[data-tutorial='saved-button']",
    position: "left",
  },
  {
    id: "settings",
    title: "⚙️ Cài đặt",
    description: "Điều chỉnh chất lượng hiển thị, số lượng điểm, màu sắc và nhiều tùy chọn khác để tối ưu trải nghiệm.",
    targetElement: "[data-tutorial='controls-button']",
    position: "left",
  },
  {
    id: "export",
    title: "📤 Xuất File",
    description:
      "Xuất fractal dưới nhiều định dạng: PNG (ảnh), PLY/LAS/LAZ (point cloud), JSON (cấu hình), FBX/OBJ (3D model).",
    targetElement: "[data-tutorial='json-button']",
    position: "left",
  },
  {
    id: "matrix-editor",
    title: "✏️ Chỉnh sửa Ma trận",
    description: "Tùy chỉnh ma trận IFS để tạo ra những fractal độc đáo. Thay đổi các hệ số để khám phá hình dạng mới!",
    targetElement: "[data-tutorial='matrix-button']",
    position: "left",
  },
  {
    id: "formula",
    title: "📐 Công thức Toán học",
    description: "Xem các công thức toán học đằng sau fractal. Hiểu rõ cơ sở khoa học của những hình ảnh đẹp mắt này.",
    targetElement: "[data-tutorial='formula-button']",
    position: "left",
  },
  {
    id: "complete",
    title: "🎓 Hoàn thành!",
    description:
      "Bạn đã tìm hiểu xong các tính năng chính! Hãy bắt đầu khám phá và tạo ra những fractal tuyệt đẹp của riêng bạn.",
    targetElement: "#app-title",
    position: "bottom",
  },
]

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const startTutorial = useCallback(() => {
    setIsActive(true)
    setCurrentStep(0)
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      endTutorial()
    }
  }, [currentStep])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const skipTutorial = useCallback(() => {
    setIsActive(false)
    setCurrentStep(0)
  }, [])

  const endTutorial = useCallback(() => {
    setIsActive(false)
    setCurrentStep(0)
  }, [])

  const value: TutorialContextType = {
    isActive,
    currentStep,
    steps: tutorialSteps,
    startTutorial,
    nextStep,
    prevStep,
    skipTutorial,
    endTutorial,
  }

  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>
}

export function useTutorial() {
  const context = useContext(TutorialContext)
  if (context === undefined) {
    throw new Error("useTutorial must be used within a TutorialProvider")
  }
  return context
}
