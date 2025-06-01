export type Language = "en" | "vi" | "zh" | "ja" | "ko" | "es" | "fr" | "de" | "ru"

export interface Translation {
  // Common
  loading: string
  generate: string
  export: string
  import: string
  reset: string
  close: string
  save: string
  cancel: string
  delete: string
  copy: string

  // App Title
  appTitle: string
  appSubtitle: string

  // Navigation
  presets: string
  controls: string
  formulas: string
  matrix: string
  json: string
  help: string

  // Controls
  autoRotate: string
  stop: string
  rotate: string
  lock: string
  unlock: string
  performance: string
  quality: string
  fastMode: string
  qualityMode: string
  iterations: string
  pointSize: string
  opacity: string
  gamma: string
  intensity: string
  backgroundColor: string

  // Matrix Editor
  matrixInput: string
  addMatrix: string
  probability: string
  color: string
  enabled: string

  // Export
  exportPNG: string
  exportPLY: string
  exportJSON: string
  highQualityRender: string
  exitRenderMode: string
  renderModeActive: string

  // Presets
  fractalPresets: string
  loadFractal: string
  difficulty: string
  easy: string
  medium: string
  hard: string
  transformations: string

  // Help
  helpTitle: string
  basics: string
  advanced: string
  keyboardShortcuts: string
  whatIsIFS: string
  ifsDescription: string
  basicSteps: string
  step1: string
  step1Description: string
  step2: string
  step2Description: string
  step3: string
  step3Description: string

  // Performance
  performanceWarning: string
  optimizeForPerformance: string
  performanceStats: string
  points: string
  functions: string
  optimal: string
  good: string
  heavy: string

  // Messages
  generating: string
  pleaseWait: string
  exportSuccess: string
  importSuccess: string
  error: string
  noMatrices: string
  addMatrixToStart: string

  // PLY Export specific
  pointDensity: string
  meshQuality: string
  previewQuality: string
  standardQuality: string
  highQuality: string
  ultraQuality: string
  customQuality: string
  totalPoints: string
  exportPoints: string
  samplingRatio: string
  estimatedSize: string
  meshRecommendations: string
  recommendedAlgorithms: string
  suitableFor: string
  softwareCompatibility: string
  meshGenerationSoftware: string
  threeDSoftwareImport: string
  highPointCountWarning: string
  exportPointsButton: string
}
