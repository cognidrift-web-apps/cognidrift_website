import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// Individual Animated Line Component
function SignalLine({ color, speed, offset, opacity }) {
  const lineRef = useRef()
  
  // Create the points container ONCE (stable reference)
  const segments = 100
  const [positions] = useState(() => {
    const arr = new Float32Array(segments * 3)
    for (let i = 0; i < segments; i++) {
      arr[i * 3] = (i / segments) * 12 - 6 
      arr[i * 3 + 1] = 0
      arr[i * 3 + 2] = 0
    }
    return arr
  })

  // Animate the Y positions every frame - Smooth, professional animation without mouse interaction
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    const array = lineRef.current.geometry.attributes.position.array

    for (let i = 0; i < segments; i++) {
      const x = (i / segments) * 12 - 6
      
      const taper = Math.sin(Math.PI * (i / segments))
      const wave = Math.sin(x * 0.5 + t * speed + offset) * Math.cos(x * 0.3 + t)
      
      // Fixed amplitude for consistent, professional animation
      const amplitude = 0.8
      
      array[i * 3 + 1] = wave * taper * amplitude
    }
    
    lineRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={segments} 
          array={positions} 
          itemSize={3} 
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color={color} 
        transparent={true} 
        opacity={opacity} 
        linewidth={3}
        linecap="round"
        linejoin="round"
      />
    </line>
  )
}

const SiriWaveBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <SignalLine color="#06b6d4" speed={2.0} offset={0} opacity={0.8} />
        <SignalLine color="#8b5cf6" speed={1.5} offset={2} opacity={0.6} />
        <SignalLine color="#3b82f6" speed={2.2} offset={4} opacity={0.5} />
        <SignalLine color="#2dd4bf" speed={1.8} offset={1} opacity={0.4} />
      </Canvas>
    </div>
  )
}

export default SiriWaveBackground
