# TryNowSection Conversation Flow — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the TryNowSection phone mockup with an animated AI receptionist conversation flow inside a holographic bright phone frame.

**Architecture:** Two files — VoiceWaveform.jsx (Canvas 2D circular pulse, ~80 lines) and TryNowSection.jsx (full rewrite, ~400 lines with stage machine). No new dependencies.

**Tech Stack:** React + Framer Motion + Canvas 2D + Tailwind CSS

---

### Task 1: Create VoiceWaveform Canvas 2D Component

**Files:**
- Create: `src/components/VoiceWaveform.jsx`

- [ ] **Step 1: Create the VoiceWaveform component**

```jsx
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
```

- [ ] **Step 2: Verify it renders**

Run the dev server if not running: `npm run dev`
Import VoiceWaveform temporarily in any visible component to confirm the circular pulsing rings render correctly. Remove the test import after verification.

- [ ] **Step 3: Commit**

```bash
git add src/components/VoiceWaveform.jsx
git commit -m "feat: add VoiceWaveform Canvas 2D component"
```

---

### Task 2: Rewrite TryNowSection — Holographic Phone Frame + Conversation Stages

**Files:**
- Rewrite: `src/components/TryNowSection.jsx`

This is the main task. The full component includes:
- Holographic border CSS (rotating conic gradient via pseudo-element)
- Phone frame with notch, status bar
- 4-stage state machine (incoming → connected → transcript → complete → loop)
- Message rendering (caller bubbles left, AI bubbles right, action cards center)
- VoiceWaveform integration (large in connected stage, small indicator in transcript)
- Left column CTA cards (copied verbatim from current implementation)

- [ ] **Step 1: Write the complete TryNowSection component**

```jsx
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageSquare, ArrowRight, Calendar, Search, Send, CheckCircle } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import VoiceWaveform from './VoiceWaveform'

const MESSAGES = [
  { role: 'caller', text: "Hi, I'd like to book an appointment for next Tuesday" },
  { role: 'ai', text: "Of course! Let me check Dr. Chen's availability for Tuesday..." },
  { role: 'action', icon: Calendar, loading: 'Checking schedule...', resolved: 'Tuesday 2:00 PM — Available' },
  { role: 'ai', text: "I've booked you for Tuesday at 2:00 PM with Dr. Chen" },
  { role: 'action', icon: Send, loading: 'Sending confirmation SMS...', resolved: 'SMS sent to (555) 867-5309' },
  { role: 'caller', text: 'Can you check if my insurance is on file?' },
  { role: 'ai', text: 'Let me look that up for you...' },
  { role: 'action', icon: Search, loading: 'Checking patient records...', resolved: 'Blue Cross PPO — Active' },
  { role: 'ai', text: 'Your Blue Cross PPO is active and on file' },
  { role: 'ai', text: "You're all set! You'll receive a reminder 24 hours before" },
]

const STAGE_DURATIONS = [4000, 4000, 0, 3000]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
}

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const HoloBorder = ({ children }) => (
  <div className="phone-holo-wrap relative">
    <div className="phone-holo-border absolute inset-0 rounded-[2.5rem]" />
    <div className="relative bg-white rounded-[2.5rem] overflow-hidden z-10">
      {children}
    </div>
  </div>
)

const StatusBar = () => (
  <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] font-semibold text-gray-500">
    <span>9:41</span>
    <div className="flex items-center gap-1">
      <div className="flex gap-[2px]">
        {[4,6,8,10].map((h, i) => (
          <div key={i} className="w-[3px] rounded-sm bg-gray-400" style={{ height: h }} />
        ))}
      </div>
      <div className="w-5 h-2.5 border border-gray-400 rounded-sm relative ml-1">
        <div className="absolute inset-[1px] bg-gray-400 rounded-[1px]" style={{ width: '70%' }} />
      </div>
    </div>
  </div>
)

const IncomingCallScreen = () => (
  <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-blue-50 to-white px-4">
    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-6">Incoming Call</p>
    <motion.div className="relative mb-4" animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
        <Phone className="w-9 h-9 text-white" />
      </div>
      {[0,1,2].map(i => (
        <motion.div key={i} animate={{ scale: [1, 2.5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }} className="absolute inset-0 border-2 border-cyan-400 rounded-full" />
      ))}
    </motion.div>
    <h3 className="text-sm font-bold text-gray-900 mb-0.5">Sarah Mitchell</h3>
    <p className="text-[11px] text-gray-400 mb-8">+1 (555) 867-5309</p>
    <div className="flex items-center gap-6">
      <div className="w-11 h-11 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
        <Phone className="w-5 h-5 text-white rotate-[135deg]" />
      </div>
      <motion.div animate={{ scale: [1, 1.08, 1], boxShadow: ['0 4px 20px rgba(34,197,94,0.3)','0 8px 30px rgba(34,197,94,0.5)','0 4px 20px rgba(34,197,94,0.3)'] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl">
        <Phone className="w-7 h-7 text-white" />
      </motion.div>
    </div>
  </div>
)

const ConnectedScreen = ({ timer }) => (
  <div className="flex flex-col items-center justify-center h-full bg-white px-4">
    <div className="flex items-center gap-1.5 mb-8">
      <div className="w-2 h-2 bg-green-500 rounded-full" />
      <span className="text-[11px] font-semibold text-green-600">Connected</span>
      <span className="text-[11px] text-gray-400 ml-1">{formatTime(timer)}</span>
    </div>
    <VoiceWaveform size={100} active intensity={0.8} />
    <h3 className="text-sm font-bold text-gray-900 mt-6 mb-1">CogniDrift AI</h3>
    <motion.p animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-[11px] text-gray-400">
      Speaking...
    </motion.p>
  </div>
)

const ActionCard = ({ message, resolved }) => {
  const Icon = message.icon
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`mx-auto max-w-[90%] rounded-lg px-3 py-2 flex items-center gap-2 text-[10px] ${resolved ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
      {resolved ? <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" /> : <Icon className="w-3 h-3 text-gray-400 flex-shrink-0" />}
      <span className={resolved ? 'text-green-700 font-medium' : 'text-gray-500'}>
        {resolved ? message.resolved : message.loading}
      </span>
      {!resolved && (
        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="text-gray-300 ml-auto">...</motion.span>
      )}
    </motion.div>
  )
}

const TranscriptScreen = ({ visibleMessages, resolvedActions, timer, ended }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleMessages.length, resolvedActions])

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-100">
        <div className={`w-2 h-2 rounded-full ${ended ? 'bg-red-500' : 'bg-green-500'}`} />
        <span className={`text-[11px] font-semibold ${ended ? 'text-red-500' : 'text-green-600'}`}>
          {ended ? 'Call Ended' : 'Connected'}
        </span>
        <span className="text-[11px] text-gray-400 ml-1">{formatTime(timer)}</span>
        <div className="ml-auto">
          <VoiceWaveform size={20} active={!ended} intensity={0.5} />
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-2" style={{ scrollBehavior: 'smooth' }}>
        {visibleMessages.map((msg, i) => {
          if (msg.role === 'caller') {
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-3 py-2 max-w-[85%]">
                  <p className="text-xs text-gray-900">{msg.text}</p>
                </div>
              </motion.div>
            )
          }
          if (msg.role === 'ai') {
            return (
              <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
                <div className="bg-white border-l-2 border-cyan-400 shadow-sm shadow-cyan-100/50 rounded-2xl rounded-br-md px-3 py-2 max-w-[85%]">
                  <p className="text-xs text-gray-900">{msg.text}</p>
                </div>
              </motion.div>
            )
          }
          if (msg.role === 'action') {
            const isResolved = resolvedActions.has(i)
            return <ActionCard key={i} message={msg} resolved={isResolved} />
          }
          return null
        })}
      </div>
    </div>
  )
}

const TryNowSection = () => {
  const [stage, setStage] = useState(0)
  const [timer, setTimer] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)
  const [resolvedActions, setResolvedActions] = useState(new Set())
  const [ended, setEnded] = useState(false)
  const timerRef = useRef(null)

  const resetAll = useCallback(() => {
    setStage(0)
    setTimer(0)
    setVisibleCount(0)
    setResolvedActions(new Set())
    setEnded(false)
  }, [])

  useEffect(() => {
    if (stage >= 1 && stage <= 3) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000)
      return () => clearInterval(timerRef.current)
    }
  }, [stage])

  useEffect(() => {
    if (stage === 0) {
      const id = setTimeout(() => setStage(1), STAGE_DURATIONS[0])
      return () => clearTimeout(id)
    }
    if (stage === 1) {
      const id = setTimeout(() => setStage(2), STAGE_DURATIONS[1])
      return () => clearTimeout(id)
    }
    if (stage === 2) {
      if (visibleCount >= MESSAGES.length) {
        const id = setTimeout(() => setStage(3), 1500)
        return () => clearTimeout(id)
      }
      const msg = MESSAGES[visibleCount]
      const delay = msg?.role === 'action' ? 800 : 1500
      const id = setTimeout(() => {
        setVisibleCount(c => c + 1)
        if (msg?.role === 'action') {
          const actionIndex = visibleCount
          setTimeout(() => {
            setResolvedActions(prev => new Set([...prev, actionIndex]))
          }, 1000)
        }
      }, delay)
      return () => clearTimeout(id)
    }
    if (stage === 3) {
      setEnded(true)
      const id = setTimeout(resetAll, STAGE_DURATIONS[3])
      return () => clearTimeout(id)
    }
  }, [stage, visibleCount, resetAll])

  const visibleMessages = MESSAGES.slice(0, visibleCount)

  return (
    <section id="try-it-live" className="py-14 lg:py-20 bg-neutral-offWhite scroll-mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="section-header">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6">
            <Phone className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Experience AI Live</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-title hero-display">
            See Our AI <span className="text-gradient">In Action</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle">
            Watch how our AI receptionist handles a real call — then try it yourself.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Column — CTA Cards (unchanged) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="space-y-4 mt-6">
              <a href="tel:+18445841083" className="group relative flex items-center gap-4 bg-white border-2 border-blue-100 rounded-2xl p-5 overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer" style={{ animation: 'pulse-glow-blue 3s infinite' }}>
                <div className="group-hover:animate-[shine-sweep_0.75s_ease-in-out] absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', transform: 'translateX(-100%) skewX(-15deg)' }} />
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

              <a href="sms:+18445841083" className="group relative flex items-center gap-4 bg-white border-2 border-blue-100 rounded-2xl p-5 overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer" style={{ animation: 'pulse-glow-blue 3s infinite' }}>
                <div className="group-hover:animate-[shine-sweep_0.75s_ease-in-out] absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', transform: 'translateX(-100%) skewX(-15deg)' }} />
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

          {/* Right Column — Phone Mockup */}
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} className="relative flex justify-center mt-8 lg:mt-0">
            <div className="w-[240px] sm:w-[260px] lg:w-[300px]">
              <HoloBorder>
                <div className="aspect-[9/19] flex flex-col">
                  <div className="flex justify-center pt-1.5 pb-0.5">
                    <div className="w-20 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-300 rounded-full" />
                    </div>
                  </div>
                  <StatusBar />
                  <div className="flex-1 overflow-hidden">
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
                          <TranscriptScreen visibleMessages={visibleMessages} resolvedActions={resolvedActions} timer={timer} ended={ended} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </HoloBorder>
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
        @keyframes holo-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .phone-holo-wrap {
          padding: 3px;
          position: relative;
        }
        .phone-holo-border {
          background: conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4);
          animation: holo-spin 4s linear infinite;
          filter: blur(6px);
          opacity: 0.8;
        }
        .phone-holo-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 2.5rem;
          padding: 3px;
          background: conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: holo-spin 4s linear infinite;
        }
      `}</style>
    </section>
  )
}

export default TryNowSection
```

- [ ] **Step 2: Verify all stages render**

Open the homepage in browser. Confirm:
1. Incoming call screen shows with pulse rings and accept/decline buttons
2. After 4s, transitions to connected screen with VoiceWaveform
3. After 4s, transitions to transcript with messages appearing one by one
4. Action cards show loading then resolve to green
5. Call ended state shows, then loops back
6. Holographic border animates around phone frame
7. Left column CTA cards still work (call/text links)

- [ ] **Step 3: Commit**

```bash
git add src/components/TryNowSection.jsx
git commit -m "feat: rewrite TryNowSection with conversation flow and holo phone frame"
```

---

### Task 3: Final Verification

- [ ] **Step 1: Full visual check**

1. Scroll to TryNowSection on homepage
2. Verify holographic border is bright/colorful (not dark)
3. Verify phone screen is white/light background throughout all stages
4. Verify conversation reads naturally
5. Verify action cards transition from loading → resolved
6. Verify waveform is visible in connected stage and as small indicator in transcript
7. Watch full loop (incoming → connected → transcript → complete → incoming)
8. Click Call Now / Text Now links to verify they still work
9. Test on mobile viewport (phone stacks below CTA cards)

- [ ] **Step 2: Build check**

```bash
npm run build
```

Verify no warnings or errors.
