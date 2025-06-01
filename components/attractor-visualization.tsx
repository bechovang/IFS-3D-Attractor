"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useAttractor } from "./attractor-context"
import * as THREE from "three"

export default function AttractorVisualization() {
  const pointsRef = useRef<THREE.Points>(null)
  const { state } = useAttractor()

  // Generate attractor points
  const points = useMemo(() => {
    const positions = new Float32Array(state.params.iterations * 3)
    let x = state.params.initialX
    let y = state.params.initialY
    let z = state.params.initialZ

    if (state.type === "lorenz") {
      const { sigma, rho, beta, stepSize } = state.params
      for (let i = 0; i < state.params.iterations; i++) {
        const dx = sigma! * (y - x)
        const dy = x * (rho! - z) - y
        const dz = x * y - beta! * z

        x += dx * stepSize
        y += dy * stepSize
        z += dz * stepSize

        positions[i * 3] = x * state.view.scale
        positions[i * 3 + 1] = y * state.view.scale
        positions[i * 3 + 2] = z * state.view.scale
      }
    } else if (state.type === "rossler") {
      const { a, b, c, stepSize } = state.params
      for (let i = 0; i < state.params.iterations; i++) {
        const dx = -y - z
        const dy = x + a! * y
        const dz = b! + z * (x - c!)

        x += dx * stepSize
        y += dy * stepSize
        z += dz * stepSize

        positions[i * 3] = x * state.view.scale * 2
        positions[i * 3 + 1] = y * state.view.scale * 2
        positions[i * 3 + 2] = z * state.view.scale * 2
      }
    } else if (state.type === "clifford") {
      const { clifford_a, clifford_b, clifford_c, clifford_d } = state.params
      for (let i = 0; i < state.params.iterations; i++) {
        const newX = Math.sin(clifford_a! * y) + clifford_c! * Math.cos(clifford_a! * x)
        const newY = Math.sin(clifford_b! * x) + clifford_d! * Math.cos(clifford_b! * y)

        x = newX
        y = newY

        positions[i * 3] = x * state.view.scale * 10
        positions[i * 3 + 1] = y * state.view.scale * 10
        positions[i * 3 + 2] = (Math.sin(x * 0.1) + Math.cos(y * 0.1)) * state.view.scale * 5
      }
    } else if (state.type === "pickover") {
      const { pickover_a, pickover_b, pickover_c, pickover_d } = state.params
      for (let i = 0; i < state.params.iterations; i++) {
        const newX = Math.sin(pickover_a! * y) - z * Math.cos(pickover_b! * x)
        const newY = z * Math.sin(pickover_c! * x) - Math.cos(pickover_d! * y)
        const newZ = Math.sin(x)

        x = newX
        y = newY
        z = newZ

        positions[i * 3] = x * state.view.scale * 10
        positions[i * 3 + 1] = y * state.view.scale * 10
        positions[i * 3 + 2] = z * state.view.scale * 10
      }
    } else if (state.type === "dejong") {
      const { dejong_a, dejong_b, dejong_c, dejong_d } = state.params
      for (let i = 0; i < state.params.iterations; i++) {
        const newX = Math.sin(dejong_a! * y) - Math.cos(dejong_b! * x)
        const newY = Math.sin(dejong_c! * x) - Math.cos(dejong_d! * y)

        x = newX
        y = newY

        positions[i * 3] = x * state.view.scale * 10
        positions[i * 3 + 1] = y * state.view.scale * 10
        positions[i * 3 + 2] = Math.sin(x + y) * Math.cos(x - y) * state.view.scale * 5
      }
    } else if (state.type === "ifs") {
      const matrices = state.params.matrices || []
      for (let i = 0; i < state.params.iterations; i++) {
        // Choose random matrix based on probabilities
        const rand = Math.random()
        let matrixIndex = 0
        let cumProb = 0

        for (let j = 0; j < matrices.length; j++) {
          cumProb += matrices[j].prob
          if (rand <= cumProb) {
            matrixIndex = j
            break
          }
        }

        const m = matrices[matrixIndex]
        if (m) {
          const newX = m.m0 * x + m.m1 * y + m.m2 * z + m.m3
          const newY = m.m4 * x + m.m5 * y + m.m6 * z + m.m7
          const newZ = m.m8 * x + m.m9 * y + m.m10 * z + m.m11

          x = newX
          y = newY
          z = newZ
        }

        if (i > 100) {
          // Skip initial transient
          positions[i * 3] = x * state.view.scale * 10
          positions[i * 3 + 1] = y * state.view.scale * 10
          positions[i * 3 + 2] = z * state.view.scale * 10
        }
      }
    }

    return positions
  }, [state.type, state.params, state.view.scale])

  // Animate rotation
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05
    }
  })

  const pointSize = state.view.renderMode === "glow" ? 2 : 1

  return (
    <>
      <color attach="background" args={[state.view.backgroundColor]} />
      <ambientLight intensity={0.2} color={state.view.ambientColor} />
      <pointLight position={[10, 10, 10]} intensity={1} color={state.view.diffuseColor} />

      <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={state.view.diffuseColor}
          size={pointSize}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={state.view.opacity}
          blending={state.view.renderMode === "glow" ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </Points>
    </>
  )
}
