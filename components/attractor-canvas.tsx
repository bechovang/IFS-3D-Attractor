"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useIFS } from "./ifs-context"
import HighQualityRenderer from "./high-quality-renderer"
import * as THREE from "three"

// Optimized Bézier surface with reduced complexity
function BezierSurface() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Reduced geometry complexity for better performance
  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(30, 30, 16, 16) // Reduced from 64x64 to 16x16
    const positions = geometry.attributes.position.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = Math.sin(x * 0.08) * Math.cos(y * 0.08) * 2
      positions[i + 2] = z - 15
    }

    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
    return geometry
  }, [])

  // Slower animation to reduce frame calculations
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.02) * 0.03
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -15]}>
      <meshBasicMaterial // Changed from meshStandardMaterial for better performance
        color="#e8f4f8"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Thêm component AxesHelper
function AxesHelper() {
  const axesGeometry = useMemo(() => {
    // X Axis - Red
    const xGeometry = new THREE.BufferGeometry()
    xGeometry.setAttribute("position", new THREE.Float32BufferAttribute([-20, 0, 0, 20, 0, 0], 3))

    // Y Axis - Green
    const yGeometry = new THREE.BufferGeometry()
    yGeometry.setAttribute("position", new THREE.Float32BufferAttribute([0, -20, 0, 0, 20, 0], 3))

    // Z Axis - Blue
    const zGeometry = new THREE.BufferGeometry()
    zGeometry.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, -20, 0, 0, 20], 3))

    return { xGeometry, yGeometry, zGeometry }
  }, [])

  return (
    <group>
      {/* X Axis - Red */}
      <line geometry={axesGeometry.xGeometry}>
        <lineBasicMaterial color="red" />
      </line>

      {/* Y Axis - Green */}
      <line geometry={axesGeometry.yGeometry}>
        <lineBasicMaterial color="green" />
      </line>

      {/* Z Axis - Blue */}
      <line geometry={axesGeometry.zGeometry}>
        <lineBasicMaterial color="blue" />
      </line>

      {/* Axis Labels using spheres */}
      <mesh position={[21, 0, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={[0, 21, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <mesh position={[0, 0, 21]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </group>
  )
}

// Cập nhật OptimizedPointCloud để hỗ trợ tự động xoay
function OptimizedPointCloud({
  points,
  colors,
  pointSize,
  autoRotate,
  isHighQualityRendering,
}: {
  points: Float32Array
  colors: Float32Array
  pointSize: number
  autoRotate: boolean
  isHighQualityRendering: boolean
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const geometryRef = useRef<THREE.BufferGeometry>(null)

  // Create geometry once and reuse
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(points, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [points, colors])

  // Rotation chỉ khi autoRotate = true và không trong chế độ render cao cấp
  useFrame((state, delta) => {
    if (pointsRef.current && autoRotate && !isHighQualityRendering) {
      pointsRef.current.rotation.y += delta * 0.1
    }
  })

  // Hide when in high quality rendering mode
  if (isHighQualityRendering) return null

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} {...geometry} />
      <pointsMaterial
        size={pointSize}
        sizeAttenuation={false}
        transparent={false}
        vertexColors={true}
        depthWrite={true}
      />
    </points>
  )
}

// Thêm darkMode vào AttractorCanvas
export default function AttractorCanvas() {
  const { attractorPoints, pointColors, settings, isHighQualityRendering, setHighQualityRendering, darkMode } = useIFS()
  const { gl, camera, controls } = useThree()

  // Detect user interaction to exit high quality rendering mode
  useEffect(() => {
    if (!isHighQualityRendering) return

    // Function to handle any user interaction
    const handleInteraction = () => {
      if (isHighQualityRendering) {
        setHighQualityRendering(false)
      }
    }

    // Add event listeners for mouse and touch events
    const canvas = gl.domElement
    canvas.addEventListener("mousedown", handleInteraction)
    canvas.addEventListener("touchstart", handleInteraction)
    canvas.addEventListener("wheel", handleInteraction)

    // Disable controls when in high quality rendering mode
    if (controls) {
      controls.enabled = !isHighQualityRendering
    }

    return () => {
      // Clean up event listeners
      canvas.removeEventListener("mousedown", handleInteraction)
      canvas.removeEventListener("touchstart", handleInteraction)
      canvas.removeEventListener("wheel", handleInteraction)

      // Re-enable controls when component unmounts or rendering mode changes
      if (controls) {
        controls.enabled = true
      }
    }
  }, [isHighQualityRendering, setHighQualityRendering, gl, controls])

  // Memoize lighting setup
  const lightingSetup = useMemo(
    () => (
      <>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
      </>
    ),
    [],
  )

  // Sử dụng màu nền dựa trên chế độ dark mode
  const backgroundColor = darkMode ? settings.backgroundColorDark : settings.backgroundColor

  if (!attractorPoints || !pointColors) {
    return (
      <>
        <color attach="background" args={[backgroundColor]} />
        {lightingSetup}
        <AxesHelper />
        {settings.showBezierSurface && <BezierSurface />}
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color="#cccccc" wireframe />
        </mesh>
      </>
    )
  }

  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      {lightingSetup}

      {/* Only show axes and bezier surface when not in high quality rendering */}
      {!isHighQualityRendering && (
        <>
          <AxesHelper />
          {settings.showBezierSurface && <BezierSurface />}
        </>
      )}

      {/* Regular point cloud rendering */}
      <OptimizedPointCloud
        points={attractorPoints}
        colors={pointColors}
        pointSize={settings.pointSize}
        autoRotate={settings.autoRotate || false}
        isHighQualityRendering={isHighQualityRendering}
      />

      {/* High quality rendering */}
      {isHighQualityRendering && (
        <HighQualityRenderer points={attractorPoints} colors={pointColors} isRendering={isHighQualityRendering} />
      )}
    </>
  )
}
