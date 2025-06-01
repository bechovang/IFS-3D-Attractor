"use client"

import { useRef, useMemo, useFrame } from "@react-three/fiber"
import { Points } from "@react-three/drei"
import { type BufferGeometry, Color } from "three"
import type { AttractorType, AttractorParams } from "@/types/attractors"
import { generateAttractorPoints } from "@/utils/attractor-math"

interface AttractorRendererProps {
  type: AttractorType
  params: AttractorParams[AttractorType]
  colorScheme: string
  pointSize: number
  isAnimating: boolean
}

export function AttractorRenderer({ type, params, colorScheme, pointSize, isAnimating }: AttractorRendererProps) {
  const pointsRef = useRef<any>()
  const geometryRef = useRef<BufferGeometry>()

  const { positions, colors } = useMemo(() => {
    const points = generateAttractorPoints(type, params)
    const positions = new Float32Array(points.length * 3)
    const colors = new Float32Array(points.length * 3)

    points.forEach((point, i) => {
      positions[i * 3] = point.x
      positions[i * 3 + 1] = point.y
      positions[i * 3 + 2] = point.z

      // Color based on scheme
      let color: Color
      switch (colorScheme) {
        case "rainbow":
          const hue = (i / points.length) * 360
          color = new Color().setHSL(hue / 360, 1, 0.5)
          break
        case "fire":
          const t = i / points.length
          color = new Color().setHSL(t * 0.15, 1, 0.5 + t * 0.3)
          break
        case "ice":
          const t2 = i / points.length
          color = new Color().setHSL(0.6 - t2 * 0.2, 0.8, 0.4 + t2 * 0.4)
          break
        case "plasma":
          const t3 = i / points.length
          color = new Color().setHSL(0.8 - t3 * 0.3, 1, 0.3 + t3 * 0.5)
          break
        default:
          color = new Color(0x00ff88)
      }

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    })

    return { positions, colors }
  }, [type, params, colorScheme])

  useFrame((state) => {
    if (isAnimating && pointsRef.current) {
      pointsRef.current.rotation.y += 0.005
      pointsRef.current.rotation.x += 0.002
    }
  })

  return (
    <Points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={pointSize} vertexColors transparent opacity={0.8} sizeAttenuation={false} />
    </Points>
  )
}
