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
      enableDamping={false} // Disabled damping for immediate response
      // dampingFactor={0.05} // Removed as it's not needed when damping is disabled
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

      {/* Enhanced Title Overlay */}
      <div className="absolute top-6 left-6 z-10">
        <div
          className={`${darkMode ? "bg-gray-800/90 border-gray-700/20" : "bg-white/90 border-white/20"} backdrop-blur-sm rounded-xl shadow-lg border p-4`}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
            <span className="text-2xl mr-3">✨</span>
            IFS 3D Attractor
          </h1>
          <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Explore the world of 3D fractals
          </p>
        </div>
      </div>

      {/* Floating Panels */}
      <FloatingPanels />

      {/* Loading Spinner */}
      <LoadingSpinner />

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
        <AppContent />
      </IFSProvider>
    </I18nProvider>
  )
}
