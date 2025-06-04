"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { IFSMatrix, IFSSettings, SavedIFS } from "@/types/ifs" // Added SavedIFS

interface IFSContextType {
  matrices: IFSMatrix[]
  settings: IFSSettings
  isGenerating: boolean
  attractorPoints: Float32Array | null
  pointColors: Float32Array | null
  isHighQualityRendering: boolean
  darkMode: boolean
  savedFractals: SavedIFS[] // New state for saved fractals
  addMatrix: (newMatrix?: Partial<IFSMatrix>) => void
  removeMatrix: (id: string) => void
  updateMatrix: (id: string, matrix: Partial<IFSMatrix>) => void
  updateSettings: (settings: Partial<IFSSettings>) => void
  generateAttractor: () => void
  clearAll: () => void
  loadPreset: (preset: string) => void
  setHighQualityRendering: (value: boolean) => void
  toggleDarkMode: () => void
  saveCurrentFractal: (name: string) => void // New function
  loadSavedFractal: (id: string) => void // New function
  deleteSavedFractal: (id: string) => void // New function
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

const defaultSettings: IFSSettings = {
  iterations: 50000,
  skipInitial: 1000,
  randomSeed: true,
  autoNormalize: true,
  pointSize: 3.0,
  colorMode: "function",
  backgroundColor: "#f8fafc",
  backgroundColorDark: "#111827",
  pointColor: "#00ff88",
  showBezierSurface: false,
  autoRotate: false,
  orbitControlsEnabled: true,
  volumetricOpacity: 0.3,
  volumetricGamma: 1.8,
  volumetricIntensity: 1.2,
  backgroundType: "solid-black",
}

const LOCAL_STORAGE_KEY = "ifsSavedFractals"

export function IFSProvider({ children }: { children: ReactNode }) {
  const [matrices, setMatrices] = useState<IFSMatrix[]>(defaultMatrices)
  const [settings, setSettings] = useState<IFSSettings>(defaultSettings)
  const [isGenerating, setIsGenerating] = useState(false)
  const [attractorPoints, setAttractorPoints] = useState<Float32Array | null>(null)
  const [pointColors, setPointColors] = useState<Float32Array | null>(null)
  const [isHighQualityRendering, setIsHighQualityRendering] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [savedFractals, setSavedFractals] = useState<SavedIFS[]>([])

  // Load saved fractals from localStorage on mount
  useEffect(() => {
    try {
      const storedFractals = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (storedFractals) {
        setSavedFractals(JSON.parse(storedFractals))
      }
    } catch (error) {
      console.error("Failed to load saved fractals from localStorage:", error)
      // Optionally clear corrupted data
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [])

  // Save to localStorage whenever savedFractals changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedFractals))
    } catch (error) {
      console.error("Failed to save fractals to localStorage:", error)
    }
  }, [savedFractals])

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev)
  }, [])

  const addMatrix = useCallback(
    (newMatrix?: Partial<IFSMatrix>) => {
      const defaultMatrix: IFSMatrix = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 7), // more unique id
        name: `f${matrices.length + 1}`,
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

  const normalizeProbabilities = useCallback((currentMatrices: IFSMatrix[]) => {
    const enabledMatrices = currentMatrices.filter((m) => m.enabled)
    if (enabledMatrices.length === 0) return currentMatrices

    const totalProb = enabledMatrices.reduce((sum, m) => sum + m.probability, 0)
    if (totalProb > 0 && totalProb !== 1) {
      // Normalize only if needed
      return currentMatrices.map((m) => (m.enabled ? { ...m, probability: m.probability / totalProb } : m))
    }
    return currentMatrices
  }, [])

  const generateAttractor = useCallback(async () => {
    setIsGenerating(true)
    setIsHighQualityRendering(false)

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

        const cumProbs: number[] = []
        let cumSum = 0
        for (const matrix of enabledMatrices) {
          cumSum += matrix.probability
          cumProbs.push(cumSum)
        }

        const parsedColors = enabledMatrices.map((matrix) => {
          const color = matrix.color
          return {
            r: Number.parseInt(color.slice(1, 3), 16) / 255,
            g: Number.parseInt(color.slice(3, 5), 16) / 255,
            b: Number.parseInt(color.slice(5, 7), 16) / 255,
          }
        })

        for (let i = 0; i < settings.iterations + settings.skipInitial; i++) {
          const rand = Math.random() * (cumSum > 0 ? cumSum : 1) // Ensure rand is not NaN if cumSum is 0
          let chosenMatrixIndex = 0
          for (let j = 0; j < cumProbs.length; j++) {
            if (rand <= cumProbs[j]) {
              chosenMatrixIndex = j
              break
            }
          }
          const chosenMatrix = enabledMatrices[chosenMatrixIndex]
          if (!chosenMatrix) continue // Should not happen if enabledMatrices is not empty

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
            const color = parsedColors[chosenMatrixIndex]
            colors[idx] = color.r
            colors[idx + 1] = color.g
            colors[idx + 2] = color.b
            pointIndex++
          }
        }
        setAttractorPoints(points.slice(0, pointIndex * 3))
        setPointColors(colors.slice(0, pointIndex * 3))
      } catch (error) {
        console.error("Error generating attractor:", error)
        setAttractorPoints(null)
        setPointColors(null)
      } finally {
        setIsGenerating(false)
      }
    }, 10)
  }, [matrices, settings, normalizeProbabilities])

  const clearAll = useCallback(() => {
    setMatrices([])
    setAttractorPoints(null)
    setPointColors(null)
  }, [])

  const loadPreset = useCallback((presetName: string) => {
    // This function might need adjustment if presets are also stored in `savedFractals`
    // or if it's purely for hardcoded presets.
    // For now, assuming it loads hardcoded presets:
    switch (presetName) {
      case "default":
        setMatrices(defaultMatrices)
        setSettings(defaultSettings)
        break
      // Add other hardcoded presets if any
    }
  }, [])

  // New functions for saved fractals
  const saveCurrentFractal = useCallback(
    (name: string) => {
      if (!name.trim()) {
        alert("Vui lòng nhập tên cho fractal.") // Please enter a name for the fractal.
        return
      }
      const newSavedFractal: SavedIFS = {
        id: Date.now().toString(),
        name,
        matrices: JSON.parse(JSON.stringify(matrices)), // Deep copy
        settings: JSON.parse(JSON.stringify(settings)), // Deep copy
        timestamp: Date.now(),
      }
      setSavedFractals((prev) => [newSavedFractal, ...prev]) // Add to the beginning of the list
    },
    [matrices, settings],
  )

  const loadSavedFractal = useCallback(
    (id: string) => {
      const fractalToLoad = savedFractals.find((f) => f.id === id)
      if (fractalToLoad) {
        setMatrices(JSON.parse(JSON.stringify(fractalToLoad.matrices))) // Deep copy
        setSettings(JSON.parse(JSON.stringify(fractalToLoad.settings))) // Deep copy
        // Optionally, regenerate attractor after loading
        // generateAttractor(); // This might be too immediate, let user decide.
      }
    },
    [savedFractals],
  )

  const deleteSavedFractal = useCallback((id: string) => {
    setSavedFractals((prev) => prev.filter((f) => f.id !== id))
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
        darkMode,
        savedFractals,
        addMatrix,
        removeMatrix,
        updateMatrix,
        updateSettings,
        generateAttractor,
        clearAll,
        loadPreset,
        setHighQualityRendering: setHighQualityRenderingCallback,
        toggleDarkMode,
        saveCurrentFractal,
        loadSavedFractal,
        deleteSavedFractal,
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
