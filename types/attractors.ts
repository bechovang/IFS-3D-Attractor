export type AttractorType = "lorenz" | "rossler" | "clifford" | "thomas"

export interface LorenzParams {
  sigma: number
  rho: number
  beta: number
  steps: number
  dt: number
}

export interface RosslerParams {
  a: number
  b: number
  c: number
  steps: number
  dt: number
}

export interface CliffordParams {
  a: number
  b: number
  c: number
  d: number
  steps: number
  dt: number
}

export interface ThomasParams {
  b: number
  steps: number
  dt: number
}

export interface AttractorParams {
  lorenz: LorenzParams
  rossler: RosslerParams
  clifford: CliffordParams
  thomas: ThomasParams
}

export interface Point3D {
  x: number
  y: number
  z: number
}
