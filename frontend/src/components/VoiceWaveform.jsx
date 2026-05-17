import { useRef, useEffect } from 'react'

const RING_COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#a855f7']

const VoiceWaveform = ({ size = 120, active = true, intensity = 0.8 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let rafId
    const dpr = window.devicePixelRatio || 1

    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const center = size / 2
    const maxRadius = size * 0.4
    const ringCount = size <= 32 ? 2 : 4

    const draw = (time) => {
      const t = time * 0.001
      ctx.clearRect(0, 0, size, size)

      for (let i = 0; i < ringCount; i++) {
        const baseRadius = maxRadius * (0.3 + i * 0.2)
        const oscillation = Math.sin(t * (2 + i * 0.5) + i * 1.2) * intensity * maxRadius * 0.12
        const radius = baseRadius + oscillation

        ctx.beginPath()
        ctx.arc(center, center, radius, 0, Math.PI * 2)
        ctx.strokeStyle = RING_COLORS[i % RING_COLORS.length]
        ctx.globalAlpha = 0.8 - i * 0.15
        ctx.lineWidth = size <= 32 ? 1.5 : 2
        ctx.stroke()
      }

      ctx.globalAlpha = 1

      if (active) {
        rafId = requestAnimationFrame(draw)
      }
    }

    if (active) {
      rafId = requestAnimationFrame(draw)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [size, active, intensity])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
    />
  )
}

export default VoiceWaveform
