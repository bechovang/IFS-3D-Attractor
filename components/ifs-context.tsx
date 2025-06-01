"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { IFSMatrix, IFSSettings } from "@/types/ifs"

interface IFSContextType {
  matrices: IFSMatrix[]
  settings: IFSSettings
  isGenerating: boolean
  attractorPoints: Float32Array | null
  pointColors: Float32Array | null
  isHighQualityRendering: boolean
  addMatrix: (newMatrix?: Partial<IFSMatrix>) => void
  removeMatrix: (id: string) => void
  updateMatrix: (id: string, matrix: Partial<IFSMatrix>) => void
  updateSettings: (settings: Partial<IFSSettings>) => void
  generateAttractor: () => void
  clearAll: () => void
  loadPreset: (preset: string) => void
  setHighQualityRendering: (value: boolean) => void
}

const IFSContext = createContext<IFSContextType | undefined>(undefined)

const TRANSFORMATION_COLORS = ["#16a085", "#e74c3c", "#9b59b6", "#f39c12", "#3498db", "#e91e63", "#27ae60", "#f1c40f"]

const defaultMatrices: IFSMatrix[] = [
  {
    id: "1",
    name: "f₁",
    a: 0.5,
    c: 0,
    e: 0,
    tx: -1,
    b: 0,
    d: 0.5,
    f: 0,
    ty: 1,
    g: 0.1,
    h: -0.1,
    i: 0.3,
    tz: 0.5,
    probability: 0.25,
    enabled: true,
    color: TRANSFORMATION_COLORS[0],
  },
  {
    id: "2",
    name: "f₂",
    a: 0.5,
    c: 0,
    e: 0,
    tx: 1,
    b: 0,
    d: 0.5,
    f: 0,
    ty: 1,
    g: -0.1,
    h: -0.1,
    i: 0.3,
    tz: 0.5,
    probability: 0.25,
    enabled: true,
    color: TRANSFORMATION_COLORS[1],
  },
  {
    id: "3",
    name: "f₃",
    a: 0.5,
    c: 0,
    e: 0,
    tx: -1,
    b: 0,
    d: 0.5,
    f: 0,
    ty: -1,
    g: 0.1,
    h: 0.1,
    i: 0.3,
    tz: 0.5,
    probability: 0.25,
    enabled: true,
    color: TRANSFORMATION_COLORS[2],
  },
  {
    id: "4",
    name: "f₄",
    a: 0.5,
    c: 0,
    e: 0,
    tx: 1,
    b: 0,
    d: 0.5,
    f: 0,
    ty: -1,
    g: -0.1,
    h: 0.1,
    i: 0.3,
    tz: 0.5,
    probability: 0.25,
    enabled: true,
    color: TRANSFORMATION_COLORS[3],
  },
]

// Optimized default settings for better performance
const defaultSettings: IFSSettings = {
  iterations: 50000,
  skipInitial: 1000,
  randomSeed: true,
  autoNormalize: true,
  pointSize: 3.0,
  colorMode: "function",
  backgroundColor: "#ffffff", // White background
  pointColor: "#00ff88",
  showBezierSurface: false,
  autoRotate: false,
  orbitControlsEnabled: true, // Enable dragging by default
  volumetricOpacity: 0.3,
  volumetricGamma: 1.8,
  volumetricIntensity: 1.2,
}

export function IFSProvider({ children }: { children: ReactNode }) {
  const [matrices, setMatrices] = useState<IFSMatrix[]>(defaultMatrices)
  const [settings, setSettings] = useState<IFSSettings>(defaultSettings)
  const [isGenerating, setIsGenerating] = useState(false)
  const [attractorPoints, setAttractorPoints] = useState<Float32Array | null>(null)
  const [pointColors, setPointColors] = useState<Float32Array | null>(null)
  const [isHighQualityRendering, setIsHighQualityRendering] = useState(false)

  const addMatrix = useCallback(
    (newMatrix?: Partial<IFSMatrix>) => {
      const defaultMatrix: IFSMatrix = {
        id: Date.now().toString(),
        name: `f₅`,
        a: 1,
        c: 0,
        e: 0,
        tx: 0,
        b: 0,
        d: 1,
        f: 0,
        ty: 0,
        g: 0,
        h: 0,
        i: 1,
        tz: 0,
        probability: 0.25,
        enabled: true,
        color: TRANSFORMATION_COLORS[matrices.length % TRANSFORMATION_COLORS.length],
      }

      setMatrices((prev) => [...prev, { ...defaultMatrix, ...newMatrix }])
    },
    [matrices.length],
  )

  const removeMatrix = useCallback((id: string) => {
    setMatrices((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const updateMatrix = useCallback((id: string, updates: Partial<IFSMatrix>) => {
    setMatrices((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)))
  }, [])

  const updateSettings = useCallback((updates: Partial<IFSSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }, [])

  const setHighQualityRenderingCallback = useCallback((value: boolean) => {
    setIsHighQualityRendering(value)
  }, [])

  // Memoized probability normalization
  const normalizeProbabilities = useCallback((matrices: IFSMatrix[]) => {
    const enabledMatrices = matrices.filter((m) => m.enabled)
    const totalProb = enabledMatrices.reduce((sum, m) => sum + m.probability, 0)

    if (totalProb > 0) {
      return matrices.map((m) => ({
        ...m,
        probability: m.enabled ? m.probability / totalProb : 0,
      }))
    }
    return matrices
  }, [])

  // Main generateAttractor function
  const generateAttractor = useCallback(async () => {
    setIsGenerating(true)
    setIsHighQualityRendering(false) // Exit high quality rendering when generating new points

    // Use setTimeout to prevent blocking the main thread
    setTimeout(() => {
      try {
        const workingMatrices = settings.autoNormalize ? normalizeProbabilities(matrices) : matrices
        const enabledMatrices = workingMatrices.filter((m) => m.enabled)

        if (enabledMatrices.length === 0) {
          setAttractorPoints(null)
          setPointColors(null)
          setIsGenerating(false)
          return
        }

        const points = new Float32Array(settings.iterations * 3)
        const colors = new Float32Array(settings.iterations * 3)
        let x = 0,
          y = 0,
          z = 0
        let pointIndex = 0

        // Pre-calculate cumulative probabilities
        const cumProbs: number[] = []
        let cumSum = 0
        for (const matrix of enabledMatrices) {
          cumSum += matrix.probability
          cumProbs.push(cumSum)
        }

        // Pre-parse colors for better performance
        const parsedColors = enabledMatrices.map((matrix) => {
          const color = matrix.color
          return {
            r: Number.parseInt(color.slice(1, 3), 16) / 255,
            g: Number.parseInt(color.slice(3, 5), 16) / 255,
            b: Number.parseInt(color.slice(5, 7), 16) / 255,
          }
        })

        // Optimized generation loop
        for (let i = 0; i < settings.iterations + settings.skipInitial; i++) {
          const rand = Math.random() * cumSum
          let chosenMatrix = enabledMatrices[0]
          let matrixIndex = 0

          // Binary search for better performance with many matrices
          for (let j = 0; j < cumProbs.length; j++) {
            if (rand <= cumProbs[j]) {
              chosenMatrix = enabledMatrices[j]
              matrixIndex = j
              break
            }
          }

          // Apply transformation
          const newX = chosenMatrix.a * x + chosenMatrix.c * y + chosenMatrix.e * z + chosenMatrix.tx
          const newY = chosenMatrix.b * x + chosenMatrix.d * y + chosenMatrix.f * z + chosenMatrix.ty
          const newZ = chosenMatrix.g * x + chosenMatrix.h * y + chosenMatrix.i * z + chosenMatrix.tz

          x = newX
          y = newY
          z = newZ

          if (i >= settings.skipInitial) {
            const idx = pointIndex * 3
            points[idx] = x * 5
            points[idx + 1] = y * 5
            points[idx + 2] = z * 5

            const color = parsedColors[matrixIndex]
            colors[idx] = color.r
            colors[idx + 1] = color.g
            colors[idx + 2] = color.b

            pointIndex++
          }
        }

        setAttractorPoints(points)
        setPointColors(colors)
      } catch (error) {
        console.error("Error generating attractor:", error)
        setAttractorPoints(null)
        setPointColors(null)
      } finally {
        setIsGenerating(false)
      }
    }, 10) // Small delay to prevent blocking
  }, [matrices, settings, normalizeProbabilities])

  const clearAll = useCallback(() => {
    setMatrices([])
    setAttractorPoints(null)
    setPointColors(null)
  }, [])

  const loadPreset = useCallback((preset: string) => {
    switch (preset) {
      case "default":
        setMatrices(defaultMatrices)
        break
      case "simple":
        setMatrices([
          {
            id: "1",
            name: "f₁",
            a: 0.5,
            c: 0,
            e: 0,
            tx: -0.5,
            b: 0,
            d: 0.5,
            f: 0,
            ty: 0.5,
            g: 0,
            h: 0,
            i: 0.5,
            tz: 0,
            probability: 0.5,
            enabled: true,
            color: TRANSFORMATION_COLORS[0],
          },
          {
            id: "2",
            name: "f₂",
            a: 0.5,
            c: 0,
            e: 0,
            tx: 0.5,
            b: 0,
            d: 0.5,
            f: 0,
            ty: -0.5,
            g: 0,
            h: 0,
            i: 0.5,
            tz: 0,
            probability: 0.5,
            enabled: true,
            color: TRANSFORMATION_COLORS[1],
          },
        ])
        break
      case "performance":
        setMatrices([
          {
            id: "1",
            name: "f₁",
            a: 0.6,
            c: 0,
            e: 0,
            tx: 0,
            b: 0,
            d: 0.6,
            f: 0,
            ty: 0,
            g: 0,
            h: 0,
            i: 0.6,
            tz: 0.3,
            probability: 1.0,
            enabled: true,
            color: TRANSFORMATION_COLORS[0],
          },
        ])
        break
    }
  }, [])

  return (
    <IFSContext.Provider
      value={{
        matrices,
        settings,
        isGenerating,
        attractorPoints,
        pointColors,
        isHighQualityRendering,
        addMatrix,
        removeMatrix,
        updateMatrix,
        updateSettings,
        generateAttractor,
        clearAll,
        loadPreset,
        setHighQualityRendering: setHighQualityRenderingCallback,
      }}
    >
      {children}
    </IFSContext.Provider>
  )
}

export function useIFS() {
  const context = useContext(IFSContext)
  if (!context) {
    throw new Error("useIFS must be used within IFSProvider")
  }
  return context
}
