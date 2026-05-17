import { useRef, useEffect } from 'react'

const LINES = [
  { color: '#06b6d4', speed: 2.0, offset: 0, opacity: 0.8 },
  { color: '#8b5cf6', speed: 1.5, offset: 2, opacity: 0.6 },
  { color: '#3b82f6', speed: 2.2, offset: 4, opacity: 0.5 },
  { color: '#2dd4bf', speed: 1.8, offset: 1, opacity: 0.4 },
]

const SEGMENTS = 100
const AMPLITUDE = 0.8

const SiriWaveBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = (time) => {
      const t = time * 0.001
      const { width, height } = canvas.getBoundingClientRect()

      ctx.clearRect(0, 0, width, height)

      for (const line of LINES) {
        ctx.beginPath()
        ctx.strokeStyle = line.color
        ctx.globalAlpha = line.opacity
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        for (let i = 0; i <= SEGMENTS; i++) {
          const ratio = i / SEGMENTS
          const x = ratio * width
          const normalizedX = ratio * 12 - 6

          const taper = Math.sin(Math.PI * ratio)
          const centerFade = 1 - Math.pow(Math.abs(ratio - 0.5) * 2, 4) * 0.3
          const wave = Math.sin(normalizedX * 0.5 + t * line.speed + line.offset) *
                       Math.cos(normalizedX * 0.3 + t)

          const y = height / 2 + wave * taper * centerFade * AMPLITUDE * (height * 0.15)

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
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: 0.85 }}
      />
    </div>
  )
}

export default SiriWaveBackground
