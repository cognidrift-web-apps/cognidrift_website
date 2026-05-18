import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageSquare, ArrowRight, Calendar, Send, CheckCircle } from 'lucide-react'
import { BsRobot } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { useState, useEffect, useRef, useCallback } from 'react'
import { fadeInUp, staggerContainer } from '../utils/motionVariants'

const MESSAGES = [
  { role: 'ai', text: "Hello! CogniDrift AI speaking, how can I help you today?" },
  { role: 'caller', text: "Hi, I'd like to book an appointment for Monday afternoon" },
  { role: 'ai', text: "Sure! Let me check Dr. Chen's availability for Monday..." },
  { role: 'action', icon: Calendar, loading: 'Checking availability...', resolved: 'Monday 1:00 PM — Available' },
  { role: 'ai', text: "Great news! Dr. Chen has an opening at 1:00 PM. Shall I book it?" },
  { role: 'caller', text: "Yes, please book that slot" },
  { role: 'ai', text: "Booked! Would you like a confirmation SMS?" },
  { role: 'caller', text: "Yes please" },
  { role: 'action', icon: Send, loading: 'Sending confirmation...', resolved: 'Confirmation SMS sent!' },
  { role: 'ai', text: "Done! Confirmation sent to your phone. Anything else?" },
]

const STAGE_DURATIONS = { incoming: 4500, connected: 3500, complete: 3500 }
const CHAR_DELAY = 50



const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const StatusBar = () => (
  <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] font-semibold text-gray-400">
    <span>9:41</span>
    <div className="flex items-center gap-1">
      <div className="flex items-end gap-[2px]">
        {[4, 6, 8, 10].map((h, i) => (
          <div key={i} className="w-[3px] rounded-sm bg-gray-300" style={{ height: h }} />
        ))}
      </div>
      <div className="w-5 h-2.5 border border-gray-300 rounded-sm relative ml-1">
        <div className="absolute inset-[1px] rounded-[1px] bg-gray-300" style={{ width: '70%' }} />
      </div>
    </div>
  </div>
)

const AudioVisualizer = ({ active, ended }) => {
  const canvasRef = useRef(null)
  const ampRef = useRef(0.12)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const w = 140
    const h = 40
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    let rafId

    const waves = [
      { r: 99, g: 102, b: 241, a: 0.55, spd: 2.2, off: 0, mul: 1.0, lw: 2.5 },
      { r: 139, g: 92, b: 246, a: 0.35, spd: 1.6, off: 2, mul: 0.7, lw: 2 },
      { r: 168, g: 85, b: 247, a: 0.22, spd: 3.0, off: 4, mul: 0.5, lw: 1.5 },
    ]

    const draw = (now) => {
      const t = now * 0.001

      const target = ended ? 0.02 : active ? 1 : 0.12
      ampRef.current += (target - ampRef.current) * 0.045
      const baseAmp = ampRef.current

      const speechMod = active
        ? 0.55 + 0.45 * Math.abs(Math.sin(t * 1.1) * Math.sin(t * 0.4 + 1.7))
        : 1.0
      const amp = baseAmp * speechMod

      ctx.clearRect(0, 0, w, h)
      const cy = h / 2

      for (const l of waves) {
        ctx.save()

        if (amp > 0.1) {
          ctx.shadowBlur = 10 * amp
          ctx.shadowColor = `rgba(${l.r},${l.g},${l.b},${0.3 * amp})`
        }

        ctx.beginPath()
        const segs = 70
        for (let i = 0; i <= segs; i++) {
          const ratio = i / segs
          const x = ratio * w
          const taper = Math.sin(Math.PI * ratio)
          const nx = ratio * 8 - 4
          const wave =
            Math.sin(nx * 0.6 + t * l.spd + l.off) * 0.55 +
            Math.sin(nx * 1.1 + t * l.spd * 0.7 + l.off * 0.5) * 0.28 +
            Math.cos(nx * 0.4 + t * l.spd * 1.3) * 0.17
          const y = cy + wave * taper * amp * l.mul * h * 0.42

          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        const grad = ctx.createLinearGradient(0, 0, w, 0)
        grad.addColorStop(0, `rgba(${l.r},${l.g},${l.b},0)`)
        grad.addColorStop(0.12, `rgba(${l.r},${l.g},${l.b},${l.a * Math.min(amp * 1.5, 1)})`)
        grad.addColorStop(0.88, `rgba(${l.r},${l.g},${l.b},${l.a * Math.min(amp * 1.5, 1)})`)
        grad.addColorStop(1, `rgba(${l.r},${l.g},${l.b},0)`)

        ctx.strokeStyle = grad
        ctx.lineWidth = l.lw
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()

        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [active, ended])

  return <canvas ref={canvasRef} style={{ width: 140, height: 40 }} />
}

const IncomingCallScreen = () => (
  <div className="flex flex-col items-center h-full bg-gradient-to-b from-blue-50 via-white to-cyan-50/30 px-4 pt-10 pb-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.08),transparent_70%)]" />

    <p className="text-[11px] text-blue-500/70 uppercase tracking-[0.25em] mb-8 relative z-10 font-medium">
      Incoming Call
    </p>

    <motion.div className="relative mb-5 z-10">
      <div className="w-[76px] h-[76px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-200/50">
        <Phone className="w-9 h-9 text-white" />
      </div>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ scale: [1, 2.5], opacity: [0.45, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
          className="absolute inset-0 border-2 border-blue-300/40 rounded-full"
        />
      ))}
    </motion.div>

    <h3 className="text-lg font-bold text-gray-900 mb-0.5 relative z-10">Sarah Mitchell</h3>
    <p className="text-[11px] text-gray-400 mb-1 relative z-10">Mobile</p>
    <motion.p
      animate={{ opacity: [1, 0.35, 1] }}
      transition={{ duration: 1.4, repeat: Infinity }}
      className="text-xs text-blue-500/70 mb-auto relative z-10"
    >
      Ringing...
    </motion.p>

    <div className="flex items-center gap-10 relative z-10 mb-2">
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200/40">
          <Phone className="w-6 h-6 text-white rotate-[135deg]" />
        </div>
        <span className="text-[10px] text-gray-400">Decline</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              '0 4px 20px rgba(34,197,94,0.2)',
              '0 4px 30px rgba(34,197,94,0.5)',
              '0 4px 20px rgba(34,197,94,0.2)'
            ]
          }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center"
        >
          <Phone className="w-6 h-6 text-white" />
        </motion.div>
        <span className="text-[10px] text-gray-400">Accept</span>
      </div>
    </div>
  </div>
)

const ConnectedScreen = ({ timer }) => (
  <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-indigo-50/30 via-white to-purple-50/20 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.06),transparent_60%)]" />

    <div className="absolute top-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 bg-green-500 rounded-full" />
      <span className="text-[11px] font-semibold text-green-600">Connected</span>
      <span className="text-[11px] text-gray-400 ml-1">{formatTime(timer)}</span>
    </div>

    <motion.div className="relative mb-5 z-10">
      <div className="w-[72px] h-[72px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-200/50">
        <BsRobot className="w-8 h-8 text-white" />
      </div>
      {[0, 1].map(i => (
        <motion.div
          key={i}
          animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
          className="absolute inset-0 border-2 border-purple-300/40 rounded-full"
        />
      ))}
    </motion.div>

    <h3 className="text-base font-bold text-gray-900 mb-1 relative z-10">CogniDrift AI</h3>
    <AudioVisualizer active ended={false} />
    <motion.p
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-xs text-purple-500/60 relative z-10 mt-1"
    >
      Answering...
    </motion.p>
  </div>
)

const CallerBubble = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex justify-start"
  >
    <div className="flex items-end gap-2 max-w-[85%]">
      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
        <FaUserCircle className="w-6 h-6 text-gray-400" />
      </div>
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl rounded-bl-sm px-3.5 py-2.5 border border-white/40 shadow-lg">
        <p className="text-sm text-gray-800 leading-relaxed">{text}</p>
      </div>
    </div>
  </motion.div>
)

const AIBubble = ({ text, onComplete }) => {
  const [charCount, setCharCount] = useState(0)
  const [showFlash, setShowFlash] = useState(false)
  const calledRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const flashTimer = useRef(null)
  const completeTimer = useRef(null)

  useEffect(() => {
    if (charCount >= text.length) {
      if (!calledRef.current) {
        calledRef.current = true
        setShowFlash(true)
        flashTimer.current = setTimeout(() => setShowFlash(false), 450)
        completeTimer.current = setTimeout(() => onCompleteRef.current?.(), 800)
      }
      return
    }
    const id = setTimeout(() => setCharCount(c => c + 1), CHAR_DELAY)
    return () => clearTimeout(id)
  }, [charCount, text.length])

  useEffect(() => {
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current)
      if (completeTimer.current) clearTimeout(completeTimer.current)
    }
  }, [])

  const isTyping = charCount < text.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-end"
    >
      <div className="flex items-end gap-2 flex-row-reverse max-w-[85%]">
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <BsRobot className="w-6 h-6 text-purple-600" />
        </div>
        <motion.div
          animate={
            showFlash
              ? { boxShadow: '0 0 24px rgba(139,92,246,0.55)' }
              : { boxShadow: '0 0 0px rgba(139,92,246,0)' }
          }
          transition={{ duration: showFlash ? 0.12 : 0.5 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl rounded-br-sm px-3.5 py-2.5 shadow-lg"
        >
          <p className="text-sm leading-relaxed">
            {text.slice(0, charCount)}
            {isTyping && <span className="inline-block w-[2px] h-3.5 bg-white/60 ml-0.5 trynow-cursor" />}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

const ActionCard = ({ message, resolved }) => {
  const Icon = message.icon
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center py-1"
    >
      <div className="flex flex-col items-center gap-1.5">
        <motion.div
          animate={
            resolved
              ? { boxShadow: '0 0 16px rgba(34,197,94,0.25)' }
              : { boxShadow: ['0 0 6px rgba(99,102,241,0.15)', '0 0 18px rgba(99,102,241,0.35)', '0 0 6px rgba(99,102,241,0.15)'] }
          }
          transition={resolved ? {} : { duration: 1.5, repeat: Infinity }}
          className={`relative w-11 h-11 rounded-xl flex items-center justify-center ${
            resolved ? 'bg-green-50 border border-green-200' : 'bg-indigo-50 border border-indigo-200/60'
          }`}
        >
          <Icon className={`w-5 h-5 ${resolved ? 'text-green-600' : 'text-indigo-500'}`} />
          {resolved && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.div>
        <span className={`text-[11px] font-medium ${resolved ? 'text-green-600' : 'text-gray-500'}`}>
          {resolved ? message.resolved : message.loading}
        </span>
      </div>
    </motion.div>
  )
}

const TranscriptScreen = ({ visibleMessages, resolvedActions, timer, ended, aiSpeaking, onAiComplete }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleMessages.length])

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-100">
        <div className={`w-1.5 h-1.5 rounded-full ${ended ? 'bg-red-400' : 'bg-green-500'}`} />
        <span className={`text-[11px] font-semibold ${ended ? 'text-red-500' : 'text-green-600'}`}>
          {ended ? 'Call Ended' : 'Active Call'}
        </span>
        <span className="text-[11px] text-gray-400 ml-1">{formatTime(timer)}</span>
      </div>

      <div className="flex-1 relative overflow-hidden min-h-0">
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

        <div ref={scrollRef} className="h-full overflow-y-auto px-3 py-3 space-y-2.5 trynow-hide-scrollbar">
          {visibleMessages.map((msg, i) => {
            if (msg.role === 'caller') return <CallerBubble key={i} text={msg.text} />
            if (msg.role === 'ai') return <AIBubble key={i} text={msg.text} onComplete={onAiComplete} />
            if (msg.role === 'action') return <ActionCard key={i} message={msg} resolved={resolvedActions.has(i)} />
            return null
          })}
        </div>
      </div>

      <div className="px-3 py-2.5 border-t border-gray-100 bg-gray-50/30 flex flex-col items-center gap-1">
        <AudioVisualizer active={aiSpeaking} ended={ended} />
        <p className="text-[10px] text-center font-medium text-gray-400 tracking-wide">
          {ended ? 'Call Complete' : aiSpeaking ? 'AI Speaking...' : 'Listening...'}
        </p>
      </div>
    </div>
  )
}

const TryNowSection = ({ compact = false }) => {
  const [stage, setStage] = useState(0)
  const [timer, setTimer] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)
  const [resolvedActions, setResolvedActions] = useState(new Set())
  const [ended, setEnded] = useState(false)
  const [aiSpeaking, setAiSpeaking] = useState(false)
  const advanceRef = useRef(null)
  const convTimerRef = useRef(null)

  const resetAll = useCallback(() => {
    setStage(0)
    setTimer(0)
    setVisibleCount(0)
    setResolvedActions(new Set())
    setEnded(false)
    setAiSpeaking(false)
  }, [])

  useEffect(() => {
    if (stage >= 1 && stage <= 3) {
      const id = setInterval(() => setTimer(t => t + 1), 1000)
      return () => clearInterval(id)
    }
  }, [stage])

  useEffect(() => {
    if (stage === 0) {
      const id = setTimeout(() => setStage(1), STAGE_DURATIONS.incoming)
      return () => clearTimeout(id)
    }
    if (stage === 1) {
      const id = setTimeout(() => setStage(2), STAGE_DURATIONS.connected)
      return () => clearTimeout(id)
    }
    if (stage === 3) {
      setEnded(true)
      const id = setTimeout(resetAll, STAGE_DURATIONS.complete)
      return () => clearTimeout(id)
    }
  }, [stage, resetAll])

  useEffect(() => {
    if (stage !== 2) {
      advanceRef.current = null
      return
    }

    let step = 0

    const advance = () => {
      if (step >= MESSAGES.length) {
        convTimerRef.current = setTimeout(() => setStage(3), 2500)
        return
      }

      const msg = MESSAGES[step]
      const idx = step
      step++
      setVisibleCount(step)

      if (msg.role === 'ai') {
        setAiSpeaking(true)
      } else if (msg.role === 'caller') {
        setAiSpeaking(false)
        convTimerRef.current = setTimeout(advance, 2000)
      } else if (msg.role === 'action') {
        setAiSpeaking(true)
        convTimerRef.current = setTimeout(() => {
          setResolvedActions(prev => new Set([...prev, idx]))
          setAiSpeaking(false)
          convTimerRef.current = setTimeout(advance, 1200)
        }, 1800)
      }
    }

    advanceRef.current = advance
    convTimerRef.current = setTimeout(advance, 600)

    return () => {
      advanceRef.current = null
      if (convTimerRef.current) clearTimeout(convTimerRef.current)
    }
  }, [stage])

  const handleAiComplete = useCallback(() => {
    setAiSpeaking(false)
    convTimerRef.current = setTimeout(() => {
      advanceRef.current?.()
    }, 1500)
  }, [])

  const visibleMessages = MESSAGES.slice(0, visibleCount)

  if (compact) {
    return (
      <div className="relative flex justify-center">
        <div className="phone-holo-wrap w-[260px] sm:w-[280px] lg:w-[300px]">
          <div className="relative bg-white rounded-[2.5rem] p-[3px] z-10 shadow-2xl shadow-blue-100/40">
            <div className="bg-white rounded-[2.3rem] overflow-hidden border border-gray-100">
              <div className="aspect-[9/19] flex flex-col">
                <div className="flex justify-center pt-1.5 pb-0.5 bg-white">
                  <div className="w-20 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                  </div>
                </div>

                <StatusBar />

                <div className="flex-1 overflow-hidden min-h-0">
                  <AnimatePresence mode="wait">
                    {stage === 0 && (
                      <motion.div key="incoming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
                        <IncomingCallScreen />
                      </motion.div>
                    )}
                    {stage === 1 && (
                      <motion.div key="connected" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
                        <ConnectedScreen timer={timer} />
                      </motion.div>
                    )}
                    {(stage === 2 || stage === 3) && (
                      <motion.div key="transcript" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
                        <TranscriptScreen
                          visibleMessages={visibleMessages}
                          resolvedActions={resolvedActions}
                          timer={timer}
                          ended={ended}
                          aiSpeaking={aiSpeaking}
                          onAiComplete={handleAiComplete}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .phone-holo-wrap {
            position: relative;
          }
          .phone-holo-wrap::before {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 2.8rem;
            background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6, #8b5cf6, #ec4899);
            background-size: 200% 100%;
            animation: holo-shift 3s linear infinite;
            filter: blur(8px);
            opacity: 0.3;
            z-index: 0;
          }
          .phone-holo-wrap::after {
            content: '';
            position: absolute;
            inset: -1.5px;
            border-radius: 2.6rem;
            background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6, #8b5cf6, #ec4899);
            background-size: 200% 100%;
            animation: holo-shift 3s linear infinite;
            opacity: 0.5;
            z-index: 1;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            padding: 1.5px;
          }
          @keyframes holo-shift {
            to { background-position: -200% 0; }
          }
          .trynow-hide-scrollbar::-webkit-scrollbar { display: none; }
          .trynow-hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .trynow-cursor {
            animation: trynow-blink 0.5s step-end infinite;
          }
          @keyframes trynow-blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <section id="try-it-live" className="py-14 lg:py-20 bg-neutral-offWhite scroll-mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="section-header"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Voice Agent: Cogni<span className="text-fuchsia-500">Voice</span></span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-title hero-display">
            Try It <span className="text-gradient">Live</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle">
            Listen to a live call: from greeting to booked appointment.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-4 mt-6">
              <a
                href="tel:+18445841083"
                className="group relative flex items-center gap-4 bg-white border-2 border-blue-100 rounded-2xl p-5 overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer"
                style={{ animation: 'pulse-glow-blue 3s infinite' }}
              >
                <div
                  className="group-hover:animate-[shine-sweep_0.75s_ease-in-out] absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', transform: 'translateX(-100%) skewX(-15deg)' }}
                />
                <div className="relative z-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-14 h-14" style={{ stroke: 'url(#trynow-icon-gradient)' }} />
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <linearGradient id="trynow-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="35%" stopColor="#3b82f6" />
                        <stop offset="70%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="font-bold text-lg group-hover:text-blue-600 transition-colors text-gradient">Call Now</p>
                  <p className="text-xl md:text-2xl font-bold text-text-primary tracking-wide font-mono">+1 (844) 584-1083</p>
                  <p className="text-sm text-text-secondary mt-1">Speak with our AI receptionist by calling this number</p>
                </div>
                <div className="relative z-10 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>

              <a
                href="sms:+18445841083"
                className="group relative flex items-center gap-4 bg-white border-2 border-blue-100 rounded-2xl p-5 overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer"
                style={{ animation: 'pulse-glow-blue 3s infinite' }}
              >
                <div
                  className="group-hover:animate-[shine-sweep_0.75s_ease-in-out] absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', transform: 'translateX(-100%) skewX(-15deg)' }}
                />
                <div className="relative z-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-14 h-14" style={{ stroke: 'url(#trynow-icon-gradient)' }} />
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="font-bold text-lg group-hover:text-blue-600 transition-colors text-gradient">Text Now</p>
                  <p className="text-xl md:text-2xl font-bold text-text-primary tracking-wide font-mono">+1 (844) 584-1083</p>
                  <p className="text-sm text-text-secondary mt-1">Send a message and get instant AI-powered responses</p>
                </div>
                <div className="relative z-10 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex justify-center mt-8 lg:mt-0"
          >
            <div className="phone-holo-wrap w-[260px] sm:w-[280px] lg:w-[300px]">
              <div className="relative bg-white rounded-[2.5rem] p-[3px] z-10 shadow-2xl shadow-blue-100/40">
                <div className="bg-white rounded-[2.3rem] overflow-hidden border border-gray-100">
                  <div className="aspect-[9/19] flex flex-col">
                    <div className="flex justify-center pt-1.5 pb-0.5 bg-white">
                      <div className="w-20 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                      </div>
                    </div>

                    <StatusBar />

                    <div className="flex-1 overflow-hidden min-h-0">
                      <AnimatePresence mode="wait">
                        {stage === 0 && (
                          <motion.div key="incoming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
                            <IncomingCallScreen />
                          </motion.div>
                        )}
                        {stage === 1 && (
                          <motion.div key="connected" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
                            <ConnectedScreen timer={timer} />
                          </motion.div>
                        )}
                        {(stage === 2 || stage === 3) && (
                          <motion.div key="transcript" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
                            <TranscriptScreen
                              visibleMessages={visibleMessages}
                              resolvedActions={resolvedActions}
                              timer={timer}
                              ended={ended}
                              aiSpeaking={aiSpeaking}
                              onAiComplete={handleAiComplete}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow-blue {
          0%, 100% { box-shadow: 0 0 15px rgba(37, 99, 235, 0.2); border-color: rgba(37, 99, 235, 0.3); }
          50% { box-shadow: 0 0 25px rgba(37, 99, 235, 0.6); border-color: rgba(37, 99, 235, 0.8); }
        }
        @keyframes shine-sweep {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .phone-holo-wrap {
          position: relative;
        }
        .phone-holo-wrap::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 2.8rem;
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 100%;
          animation: holo-shift 3s linear infinite;
          filter: blur(8px);
          opacity: 0.3;
          z-index: 0;
        }
        .phone-holo-wrap::after {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: 2.6rem;
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 100%;
          animation: holo-shift 3s linear infinite;
          opacity: 0.5;
          z-index: 1;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1.5px;
        }
        @keyframes holo-shift {
          to { background-position: -200% 0; }
        }
        .trynow-hide-scrollbar::-webkit-scrollbar { display: none; }
        .trynow-hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .trynow-cursor {
          animation: trynow-blink 0.5s step-end infinite;
        }
        @keyframes trynow-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default TryNowSection
