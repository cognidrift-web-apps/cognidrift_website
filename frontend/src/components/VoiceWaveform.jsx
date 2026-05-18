import { useRef, useEffect } from 'react'

const LINES = [
  { color: '#06b6d4', speed: 2.0, offset: 0, opacity: 0.85 },
  { color: '#8b5cf6', speed: 1.6, offset: 2, opacity: 0.6 },
  { color: '#3b82f6', speed: 2.3, offset: 4, opacity: 0.5 },
  { color: '#2dd4bf', speed: 1.8, offset: 1, opacity: 0.35 },
]

const VoiceWaveform = ({ width = 200, height = 60, amplitude = 0.8, active = true }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let rafId
    const dpr = window.devicePixelRatio || 1

    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const draw = (time) => {
      const t = time * 0.001
      ctx.clearRect(0, 0, width, height)

      const centerY = height / 2

      for (const line of LINES) {
        ctx.beginPath()
        ctx.strokeStyle = line.color
        ctx.globalAlpha = line.opacity * (active ? 1 : 0.3)
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        const segments = Math.max(60, width / 2)
        for (let i = 0; i <= segments; i++) {
          const ratio = i / segments
          const x = ratio * width

          const taper = Math.sin(Math.PI * ratio)
          const normalizedX = ratio * 8 - 4
          const wave = Math.sin(normalizedX * 0.6 - t * line.speed + line.offset) *
                       Math.cos(normalizedX * 0.3 - t * 0.8)

          const amp = active ? amplitude : 0.1
          const y = centerY + wave * taper * amp * (height * 0.35)

          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.stroke()
      }

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [width, height, amplitude, active])

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
    />
  )
}

export default VoiceWaveform
