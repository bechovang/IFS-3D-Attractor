"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useIFS } from "./ifs-context"

// Vertex shader for high quality rendering
const vertexShader = `
varying vec3 vPosition;
varying vec3 vColor;
varying vec3 vNormal;

void main() {
  vPosition = position;
  vColor = color;
  
  // Use a simple normal calculation for points
  vNormal = normalize(position);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 3.0;
}
`

// Fragment shader for high quality rendering with volumetric effects
const fragmentShader = `
uniform vec3 uAmbientLight;
uniform vec3 uDirectionalLight;
uniform vec3 uLightPosition;
uniform float uGamma;
uniform float uOpacity;
uniform float uGlowStrength;
uniform float uShadowStrength;
uniform float uSpecularStrength;
uniform vec3 uSpecularColor;

varying vec3 vPosition;
varying vec3 vColor;
varying vec3 vNormal;

void main() {
  // Calculate distance from center of point (for soft particles)
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);
  if (r > 1.0) {
    discard;
  }
  
  // Calculate lighting
  vec3 lightDir = normalize(uLightPosition - vPosition);
  float diffuse = max(dot(vNormal, lightDir), 0.0);
  
  // Specular highlight
  vec3 viewDir = normalize(-vPosition);
  vec3 reflectDir = reflect(-lightDir, vNormal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
  vec3 specular = uSpecularStrength * spec * uSpecularColor;
  
  // Soft shadow effect
  float shadow = 1.0 - (uShadowStrength * (1.0 - diffuse));
  
  // Glow effect based on density
  float glow = uGlowStrength * (1.0 - r);
  
  // Combine lighting components
  vec3 ambient = uAmbientLight * vColor;
  vec3 directional = uDirectionalLight * vColor * diffuse * shadow;
  
  // Final color with gamma correction
  vec3 finalColor = ambient + directional + specular + (glow * vColor);
  finalColor = pow(finalColor, vec3(1.0 / uGamma));
  
  // Apply soft particle edge
  float alpha = uOpacity * (1.0 - r * r);
  
  gl_FragColor = vec4(finalColor, alpha);
}
`

export default function HighQualityRenderer({
  points,
  colors,
  isRendering,
}: {
  points: Float32Array
  colors: Float32Array
  isRendering: boolean
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const { camera } = useThree()
  const { settings } = useIFS()

  // Create geometry once and reuse
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(points, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [points, colors])

  // Create shader material with uniforms
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uAmbientLight: { value: new THREE.Color(0x333333) },
        uDirectionalLight: { value: new THREE.Color(0xffffff) },
        uLightPosition: { value: new THREE.Vector3(10, 10, 10) },
        uGamma: { value: 1.8 },
        uOpacity: { value: 0.7 },
        uGlowStrength: { value: 0.4 },
        uShadowStrength: { value: 0.6 },
        uSpecularStrength: { value: 0.5 },
        uSpecularColor: { value: new THREE.Color(0xffffff) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    })
  }, [])

  // Store original camera position for animation
  const originalCameraPosition = useMemo(() => {
    return camera.position.clone()
  }, [camera])

  // Animate camera to a good viewing position when rendering starts
  useEffect(() => {
    if (isRendering) {
      // Save current position before animating
      originalCameraPosition.copy(camera.position)

      // Disable controls in parent component via settings
    } else {
      // Restore camera position when exiting render mode
      camera.position.copy(originalCameraPosition)
    }
  }, [isRendering, camera, originalCameraPosition])

  // Update shader uniforms based on settings
  useFrame(() => {
    if (pointsRef.current && shaderMaterial) {
      // Update light position to follow camera slightly
      shaderMaterial.uniforms.uLightPosition.value.set(
        camera.position.x * 0.5,
        camera.position.y * 0.5 + 5,
        camera.position.z * 0.5 + 5,
      )

      // Update other uniforms from settings
      shaderMaterial.uniforms.uGamma.value = settings.volumetricGamma || 1.8
      shaderMaterial.uniforms.uOpacity.value = settings.volumetricOpacity || 0.7
      shaderMaterial.uniforms.uGlowStrength.value = settings.volumetricIntensity || 0.4
    }
  })

  // Only render when in rendering mode
  if (!isRendering) return null

  return (
    <points ref={pointsRef}>
      <primitive object={geometry} attach="geometry" />
      <primitive object={shaderMaterial} attach="material" />
    </points>
  )
}
