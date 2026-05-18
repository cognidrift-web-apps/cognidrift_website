import { useState, useEffect, useRef } from 'react'

const WAVE_LINES = [
  { color: '#06b6d4', speed: 1.8, offset: 0, opacity: 0.9 },
  { color: '#8b5cf6', speed: 1.4, offset: 2, opacity: 0.6 },
  { color: '#3b82f6', speed: 2.1, offset: 4, opacity: 0.5 },
  { color: '#d946ef', speed: 1.6, offset: 1, opacity: 0.3 },
]

const LoadingScreen = () => {
  const [visible, setVisible] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const w = 200
    const h = 40
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    let rafId
    const start = performance.now()

    const draw = (now) => {
      const t = now * 0.001
      const elapsed = (now - start) * 0.001
      const waveDelay = Math.max(0, elapsed - 0.8)
      const ramp = Math.min(1, waveDelay / 1.2)
      const breath = 0.6 + 0.4 * Math.sin(t * 1.2)
      const amp = ramp * breath

      ctx.clearRect(0, 0, w, h)
      const cy = h / 2

      for (const line of WAVE_LINES) {
        ctx.beginPath()
        ctx.strokeStyle = line.color
        ctx.globalAlpha = line.opacity * ramp
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        const segs = 80
        for (let i = 0; i <= segs; i++) {
          const r = i / segs
          const x = r * w
          const taper = Math.sin(Math.PI * r)
          const nx = r * 8 - 4
          const wave =
            Math.sin(nx * 0.6 - t * line.speed + line.offset) *
            Math.cos(nx * 0.3 - t * 0.8)
          const y = cy + wave * taper * amp * 0.8 * (h * 0.38)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [visible])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div
        className="flex flex-col items-center gap-6"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}
      >
        <div className="ld-logo-wrap">
          <svg viewBox="0 0 100 100" width="58" height="58" fill="none">
            <defs>
              <linearGradient id="ld-bl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="ld-pr" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
              <linearGradient id="ld-br" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* < bracket */}
            <path
              d="M 30,16 L 8,50 L 30,84"
              stroke="url(#ld-bl)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ld-draw ld-d1"
            />
            {/* / slash */}
            <path
              d="M 57,16 L 43,84"
              stroke="url(#ld-pr)"
              strokeWidth="9"
              strokeLinecap="round"
              className="ld-draw ld-d2"
            />
            {/* > bracket */}
            <path
              d="M 70,16 L 92,50 L 70,84"
              stroke="url(#ld-br)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ld-draw ld-d3"
            />
          </svg>
        </div>

        <canvas ref={canvasRef} style={{ width: 200, height: 40 }} />
      </div>

      <style>{`
        .ld-draw {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
        }
        .ld-d1 { animation: ld-on 0.55s ease-out 0.1s forwards; }
        .ld-d2 { animation: ld-on 0.45s ease-out 0.3s forwards; }
        .ld-d3 { animation: ld-on 0.55s ease-out 0.5s forwards; }
        @keyframes ld-on {
          to { stroke-dashoffset: 0; }
        }
        .ld-logo-wrap {
          animation: ld-float 3.5s ease-in-out 1.2s infinite;
        }
        @keyframes ld-float {
          0%, 100% {
            transform: perspective(400px) rotateY(0deg);
            filter: drop-shadow(0 0 8px rgba(59,130,246,0.15));
          }
          30% {
            transform: perspective(400px) rotateY(12deg);
            filter: drop-shadow(0 0 16px rgba(139,92,246,0.3));
          }
          70% {
            transform: perspective(400px) rotateY(-12deg);
            filter: drop-shadow(0 0 16px rgba(6,182,212,0.3));
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen
