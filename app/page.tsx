"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import AttractorCanvas from "@/components/attractor-canvas"
import { IFSProvider } from "@/components/ifs-context"
import FloatingPanels from "@/components/floating-panels"
import { useIFS } from "@/components/ifs-context"
import LoadingSpinner from "@/components/loading-spinner"
import { I18nProvider } from "@/components/i18n-context"
import { TutorialProvider } from "@/components/tutorial-context"
import TutorialOverlay from "@/components/tutorial-overlay"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { useTutorial } from "@/components/tutorial-context"

// Wrapper component cho OrbitControls
function OrbitControlsWrapper() {
  const { settings } = useIFS()

  return (
    <OrbitControls
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      enabled={settings.orbitControlsEnabled}
      zoomSpeed={0.6}
      panSpeed={0.5}
      rotateSpeed={0.4}
      maxDistance={200}
      minDistance={5}
      enableDamping={false}
    />
  )
}

// Loading fallback component
function CanvasLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-white text-lg">Loading...</div>
    </div>
  )
}

// Main App Component
function AppContent() {
  const { darkMode } = useIFS()
  const { startTutorial } = useTutorial()

  return (
    <div
      className={`w-full h-screen relative overflow-hidden ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200"}`}
    >
      {/* 3D Visualization */}
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 50], fov: 60 }}
          className="w-full h-full"
          performance={{ min: 0.5 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <AttractorCanvas />
            <OrbitControlsWrapper />
          </Suspense>
        </Canvas>
      </div>

      {/* Enhanced Title Overlay with Tutorial Button */}
      <div className="absolute top-6 left-6 z-10" id="app-title">
        <div
          className={`${darkMode ? "bg-gray-800/90 border-gray-700/20" : "bg-white/90 border-white/20"} rounded-xl shadow-lg border p-4 flex items-center gap-3`}
        >
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
              <span className="text-2xl mr-3">✨</span>
              IFS 3D Attractor
            </h1>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Explore the world of 3D fractals
            </p>
          </div>

          {/* Tutorial Button */}
          <Button
            onClick={startTutorial}
            variant="outline"
            size="sm"
            className={`rounded-full w-10 h-10 p-0 ${
              darkMode
                ? "bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500 hover:from-blue-700 hover:to-purple-700 text-white"
                : "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400 hover:from-blue-600 hover:to-purple-600 text-white"
            } transition-all duration-200 hover:scale-110 shadow-lg`}
            title="Hướng dẫn sử dụng step-by-step"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Floating Panels */}
      <FloatingPanels />

      {/* Loading Spinner */}
      <LoadingSpinner />

      {/* Tutorial Overlay */}
      <TutorialOverlay />

      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <I18nProvider>
      <IFSProvider>
        <TutorialProvider>
          <AppContent />
        </TutorialProvider>
      </IFSProvider>
    </I18nProvider>
  )
}
