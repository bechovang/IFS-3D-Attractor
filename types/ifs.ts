export interface IFSMatrix {
  id: string
  name: string
  // 3x4 affine transformation matrix
  a: number // [0,0]
  c: number // [0,1]
  e: number // [0,2]
  tx: number // [0,3] translation x
  b: number // [1,0]
  d: number // [1,1]
  f: number // [1,2]
  ty: number // [1,3] translation y
  g: number // [2,0]
  h: number // [2,1]
  i: number // [2,2]
  tz: number // [2,3] translation z
  probability: number
  enabled: boolean
  color: string
}

export interface IFSSettings {
  iterations: number
  skipInitial: number
  randomSeed: boolean
  autoNormalize: boolean
  pointSize: number
  colorMode: "function" | "height" | "solid" | "rainbow"
  backgroundColor: string
  backgroundColorDark: string
  pointColor: string
  showBezierSurface: boolean
  autoRotate: boolean
  orbitControlsEnabled: boolean
  volumetricOpacity?: number
  volumetricGamma?: number
  volumetricIntensity?: number
  backgroundType?: string // Added in a previous step, ensure it's here
}

export interface Point3D {
  x: number
  y: number
  z: number
}

// New type for saved fractals
export interface SavedIFS {
  id: string // Unique ID, can be a timestamp
  name: string
  matrices: IFSMatrix[]
  settings: IFSSettings
  timestamp: number // Timestamp of when it was saved
  // thumbnail?: string; // Optional: for a data URL of a small preview image
}
