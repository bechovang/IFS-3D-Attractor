import type { AttractorType, AttractorParams, Point3D } from "@/types/attractors"

export function generateAttractorPoints(type: AttractorType, params: AttractorParams[AttractorType]): Point3D[] {
  switch (type) {
    case "lorenz":
      return generateLorenz(params as AttractorParams["lorenz"])
    case "rossler":
      return generateRossler(params as AttractorParams["rossler"])
    case "clifford":
      return generateClifford(params as AttractorParams["clifford"])
    case "thomas":
      return generateThomas(params as AttractorParams["thomas"])
    default:
      return []
  }
}

function generateLorenz(params: AttractorParams["lorenz"]): Point3D[] {
  const { sigma, rho, beta, steps, dt } = params
  const points: Point3D[] = []

  let x = 1,
    y = 1,
    z = 1

  for (let i = 0; i < steps; i++) {
    // Runge-Kutta 4th order method
    const dx1 = sigma * (y - x)
    const dy1 = x * (rho - z) - y
    const dz1 = x * y - beta * z

    const dx2 = sigma * (y + (dy1 * dt) / 2 - (x + (dx1 * dt) / 2))
    const dy2 = (x + (dx1 * dt) / 2) * (rho - (z + (dz1 * dt) / 2)) - (y + (dy1 * dt) / 2)
    const dz2 = (x + (dx1 * dt) / 2) * (y + (dy1 * dt) / 2) - beta * (z + (dz1 * dt) / 2)

    const dx3 = sigma * (y + (dy2 * dt) / 2 - (x + (dx2 * dt) / 2))
    const dy3 = (x + (dx2 * dt) / 2) * (rho - (z + (dz2 * dt) / 2)) - (y + (dy2 * dt) / 2)
    const dz3 = (x + (dx2 * dt) / 2) * (y + (dy2 * dt) / 2) - beta * (z + (dz2 * dt) / 2)

    const dx4 = sigma * (y + dy3 * dt - (x + dx3 * dt))
    const dy4 = (x + dx3 * dt) * (rho - (z + dz3 * dt)) - (y + dy3 * dt)
    const dz4 = (x + dx3 * dt) * (y + dy3 * dt) - beta * (z + dz3 * dt)

    x += ((dx1 + 2 * dx2 + 2 * dx3 + dx4) * dt) / 6
    y += ((dy1 + 2 * dy2 + 2 * dy3 + dy4) * dt) / 6
    z += ((dz1 + 2 * dz2 + 2 * dz3 + dz4) * dt) / 6

    if (i > 1000) {
      // Skip initial transient
      points.push({ x, y, z })
    }
  }

  return points
}

function generateRossler(params: AttractorParams["rossler"]): Point3D[] {
  const { a, b, c, steps, dt } = params
  const points: Point3D[] = []

  let x = 1,
    y = 1,
    z = 1

  for (let i = 0; i < steps; i++) {
    const dx = -y - z
    const dy = x + a * y
    const dz = b + z * (x - c)

    x += dx * dt
    y += dy * dt
    z += dz * dt

    if (i > 1000) {
      points.push({ x, y, z })
    }
  }

  return points
}

function generateClifford(params: AttractorParams["clifford"]): Point3D[] {
  const { a, b, c, d, steps } = params
  const points: Point3D[] = []

  let x = 0,
    y = 0

  for (let i = 0; i < steps; i++) {
    const newX = Math.sin(a * y) + c * Math.cos(a * x)
    const newY = Math.sin(b * x) + d * Math.cos(b * y)

    x = newX
    y = newY

    if (i > 100) {
      points.push({ x: x * 10, y: y * 10, z: Math.sin(x + y) * 5 })
    }
  }

  return points
}

function generateThomas(params: AttractorParams["thomas"]): Point3D[] {
  const { b, steps, dt } = params
  const points: Point3D[] = []

  let x = 1,
    y = 1,
    z = 1

  for (let i = 0; i < steps; i++) {
    const dx = Math.sin(y) - b * x
    const dy = Math.sin(z) - b * y
    const dz = Math.sin(x) - b * z

    x += dx * dt
    y += dy * dt
    z += dz * dt

    if (i > 1000) {
      points.push({ x: x * 10, y: y * 10, z: z * 10 })
    }
  }

  return points
}
