"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import AttractorCanvas from "@/components/attractor-canvas"
import { IFSProvider } from "@/components/ifs-context"
import FloatingPanels from "@/components/floating-panels"
import { useIFS } from "@/components/ifs-context"

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
      enableDamping={true} // Enable damping for smoother interaction
      dampingFactor={0.05}
    />
  )
}

export default function Home() {
  return (
    <IFSProvider>
      <div className="w-full h-screen bg-gradient-to-br from-gray-100 to-gray-200 relative">
        {/* 3D Visualization */}
        <div className="w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 50], fov: 60 }}
            className="w-full h-full"
            performance={{ min: 0.5 }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <AttractorCanvas />
              <OrbitControlsWrapper />
            </Suspense>
          </Canvas>
        </div>

        {/* Title Overlay */}
        <div className="absolute top-6 left-6 z-10">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center">
            <span className="text-2xl mr-2">✨</span>
            IFS 3D Attractor
          </h1>
        </div>

        {/* Floating Panels */}
        <FloatingPanels />
      </div>
    </IFSProvider>
  )
}
