"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type AttractorType = "lorenz" | "rossler" | "clifford" | "pickover" | "dejong" | "ifs"

export interface Matrix3x4 {
  m0: number
  m1: number
  m2: number
  m3: number
  m4: number
  m5: number
  m6: number
  m7: number
  m8: number
  m9: number
  m10: number
  m11: number
  prob: number
}

export interface AttractorParams {
  // Lorenz
  sigma?: number
  rho?: number
  beta?: number

  // Rossler
  a?: number
  b?: number
  c?: number

  // Clifford
  clifford_a?: number
  clifford_b?: number
  clifford_c?: number
  clifford_d?: number

  // Pickover
  pickover_a?: number
  pickover_b?: number
  pickover_c?: number
  pickover_d?: number

  // Peter de Jong
  dejong_a?: number
  dejong_b?: number
  dejong_c?: number
  dejong_d?: number

  // IFS
  matrices?: Matrix3x4[]
  numMatrices?: number

  // Simulation
  iterations: number
  stepSize: number
  randomness: number
  initialX: number
  initialY: number
  initialZ: number
}

export interface ViewSettings {
  renderMode: "points" | "solid" | "glow" | "volumetric"
  width: number
  height: number
  updates: number
  scale: number
  zoom: number
  gamma: number
  opacity: number
  roughness: number
  backgroundColor: string
  ambientColor: string
  diffuseColor: string
  secondaryColor: string
  specularColor: string
}

export interface AttractorState {
  type: AttractorType
  params: AttractorParams
  view: ViewSettings
}

interface AttractorContextType {
  state: AttractorState
  updateParams: (params: Partial<AttractorParams>) => void
  updateView: (view: Partial<ViewSettings>) => void
  updateType: (type: AttractorType) => void
  exportImage: () => void
  resetToDefaults: () => void
}

const defaultIFSMatrices: Matrix3x4[] = [
  {
    m0: 0.85,
    m1: 0.04,
    m2: 0,
    m3: 0,
    m4: -0.04,
    m5: 0.85,
    m6: 0,
    m7: 1.6,
    m8: 0,
    m9: 0,
    m10: 0.85,
    m11: 0,
    prob: 0.85,
  },
  { m0: 0.2, m1: -0.26, m2: 0, m3: 0, m4: 0.23, m5: 0.22, m6: 0, m7: 1.6, m8: 0, m9: 0, m10: 0.07, m11: 0, prob: 0.07 },
  {
    m0: -0.15,
    m1: 0.28,
    m2: 0,
    m3: 0,
    m4: 0.26,
    m5: 0.24,
    m6: 0,
    m7: 0.44,
    m8: 0,
    m9: 0,
    m10: 0.07,
    m11: 0,
    prob: 0.07,
  },
  { m0: 0, m1: 0, m2: 0, m3: 0, m4: 0, m5: 0.16, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, prob: 0.01 },
]

const defaultState: AttractorState = {
  type: "lorenz",
  params: {
    // Lorenz defaults
    sigma: 10,
    rho: 28,
    beta: 8 / 3,

    // Rossler defaults
    a: 0.2,
    b: 0.2,
    c: 5.7,

    // Clifford defaults
    clifford_a: -1.4,
    clifford_b: 1.6,
    clifford_c: 1.0,
    clifford_d: 0.7,

    // Pickover defaults
    pickover_a: -2.24,
    pickover_b: 0.43,
    pickover_c: -0.65,
    pickover_d: -2.43,

    // Peter de Jong defaults
    dejong_a: 1.4,
    dejong_b: -2.3,
    dejong_c: 2.4,
    dejong_d: -2.1,

    // IFS defaults
    matrices: defaultIFSMatrices,
    numMatrices: 4,

    // Simulation defaults
    iterations: 50000,
    stepSize: 0.01,
    randomness: 100,
    initialX: 0.1,
    initialY: 0.0,
    initialZ: 0.0,
  },
  view: {
    renderMode: "glow",
    width: 800,
    height: 600,
    updates: 1,
    scale: 1.0,
    zoom: 100,
    gamma: 1.0,
    opacity: 0.8,
    roughness: 0.5,
    backgroundColor: "#000000",
    ambientColor: "#1a1a1a",
    diffuseColor: "#00ffff",
    secondaryColor: "#ff0080",
    specularColor: "#ffffff",
  },
}

const AttractorContext = createContext<AttractorContextType | undefined>(undefined)

export function AttractorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AttractorState>(defaultState)

  const updateParams = (params: Partial<AttractorParams>) => {
    setState((prev) => ({
      ...prev,
      params: { ...prev.params, ...params },
    }))
  }

  const updateView = (view: Partial<ViewSettings>) => {
    setState((prev) => ({
      ...prev,
      view: { ...prev.view, ...view },
    }))
  }

  const updateType = (type: AttractorType) => {
    setState((prev) => ({ ...prev, type }))
  }

  const resetToDefaults = () => {
    setState(defaultState)
  }

  const exportImage = () => {
    const canvas = document.querySelector("canvas")
    if (canvas) {
      const link = document.createElement("a")
      link.download = `chaoscope-${state.type}-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <AttractorContext.Provider value={{ state, updateParams, updateView, updateType, exportImage, resetToDefaults }}>
      {children}
    </AttractorContext.Provider>
  )
}

export function useAttractor() {
  const context = useContext(AttractorContext)
  if (!context) {
    throw new Error("useAttractor must be used within AttractorProvider")
  }
  return context
}
