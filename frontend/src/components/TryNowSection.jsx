import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageSquare, ArrowRight, Calendar, Search, Send, CheckCircle, Bot, User } from 'lucide-react'
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

const STAGE_DURATIONS = [4000, 3000, 0, 3000]

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

const StatusBar = ({ light }) => (
  <div className={`flex items-center justify-between px-5 pt-2 pb-1 text-[10px] font-semibold ${light ? 'text-white/70' : 'text-gray-500'}`}>
    <span>9:41</span>
    <div className="flex items-center gap-1">
      <div className="flex gap-[2px]">
        {[4, 6, 8, 10].map((h, i) => (
          <div key={i} className={`w-[3px] rounded-sm ${light ? 'bg-white/50' : 'bg-gray-400'}`} style={{ height: h }} />
        ))}
      </div>
      <div className={`w-5 h-2.5 border rounded-sm relative ml-1 ${light ? 'border-white/50' : 'border-gray-400'}`}>
        <div className={`absolute inset-[1px] rounded-[1px] ${light ? 'bg-white/50' : 'bg-gray-400'}`} style={{ width: '70%' }} />
      </div>
    </div>
  </div>
)

const VoiceBars = ({ active, size = 'md' }) => {
  const barConfigs = size === 'sm'
    ? [{ h: 8, d: 0.5 }, { h: 12, d: 0.7 }, { h: 16, d: 0.4 }, { h: 12, d: 0.6 }, { h: 8, d: 0.8 }]
    : [{ h: 14, d: 0.5 }, { h: 22, d: 0.7 }, { h: 30, d: 0.4 }, { h: 22, d: 0.6 }, { h: 14, d: 0.8 }, { h: 18, d: 0.3 }, { h: 26, d: 0.9 }]

  return (
    <div className="flex items-center gap-[3px]">
      {barConfigs.map((bar, i) => (
        <motion.div
          key={i}
          animate={active ? { scaleY: [0.3, 1, 0.3] } : { scaleY: 0.15 }}
          transition={active ? { duration: 0.6 + bar.d * 0.4, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' } : { duration: 0.3 }}
          className="rounded-full origin-center"
          style={{
            width: size === 'sm' ? 2.5 : 3,
            height: bar.h,
            background: 'linear-gradient(to top, #06b6d4, #8b5cf6)',
          }}
        />
      ))}
    </div>
  )
}

const IncomingCallScreen = () => (
  <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-slate-800 via-slate-900 to-gray-950 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.15),transparent_70%)]" />

    <p className="text-[10px] text-blue-300/80 uppercase tracking-[0.2em] mb-5 relative z-10">Incoming Call</p>

    <motion.div
      className="relative mb-4 z-10"
      animate={{ rotate: [-2, 2, -2, 2, 0] }}
      transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 1 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)]">
        <Phone className="w-9 h-9 text-white" />
      </div>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ scale: [1, 2.8], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
          className="absolute inset-0 border-2 border-blue-400/60 rounded-full"
        />
      ))}
    </motion.div>

    <h3 className="text-base font-bold text-white mb-1 relative z-10">Business Call</h3>
    <motion.p
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 1.2, repeat: Infinity }}
      className="text-[11px] text-blue-300/70 mb-8 relative z-10"
    >
      Ringing...
    </motion.p>

    <div className="flex items-center gap-8 relative z-10">
      <div className="w-12 h-12 bg-red-500/90 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
        <Phone className="w-5 h-5 text-white rotate-[135deg]" />
      </div>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 20px rgba(34,197,94,0.3)',
            '0 0 35px rgba(34,197,94,0.6)',
            '0 0 20px rgba(34,197,94,0.3)'
          ]
        }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center"
      >
        <Phone className="w-7 h-7 text-white" />
      </motion.div>
    </div>
  </div>
)

const ConnectedScreen = ({ timer }) => (
  <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-slate-800 via-slate-900 to-gray-950 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.12),transparent_60%)]" />

    <div className="flex items-center gap-1.5 mb-6 relative z-10">
      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 bg-green-400 rounded-full" />
      <span className="text-[11px] font-semibold text-green-400">Connected</span>
      <span className="text-[11px] text-white/40 ml-1">{formatTime(timer)}</span>
    </div>

    <div className="relative z-10 mb-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
        <Bot className="w-8 h-8 text-cyan-400" />
      </div>
      {[0, 1].map(i => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
          className="absolute inset-0 border border-cyan-400/30 rounded-full"
        />
      ))}
    </div>

    <h3 className="text-sm font-bold text-white mb-1 relative z-10">CogniDrift AI</h3>
    <motion.p
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-[11px] text-cyan-300/60 mb-6 relative z-10"
    >
      Answering...
    </motion.p>

    <div className="relative z-10">
      <VoiceBars active size="md" />
    </div>
  </div>
)

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    className="flex justify-end"
  >
    <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-2xl rounded-br-md px-3 py-2.5">
      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
        <Bot className="w-2.5 h-2.5 text-white" />
      </div>
      <VoiceBars active size="sm" />
    </div>
  </motion.div>
)

const ActionCard = ({ message, resolved }) => {
  const Icon = message.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mx-auto max-w-[92%] rounded-xl px-3 py-2 flex items-center gap-2 text-[10px] ${
        resolved
          ? 'bg-green-50 border border-green-300/60 shadow-sm shadow-green-100'
          : 'bg-gray-50 border border-gray-200'
      }`}
    >
      {resolved
        ? <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
        : <Icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
      }
      <span className={resolved ? 'text-green-700 font-semibold' : 'text-gray-500'}>
        {resolved ? message.resolved : message.loading}
      </span>
      {!resolved && (
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-gray-300 ml-auto"
        >
          ...
        </motion.span>
      )}
    </motion.div>
  )
}

const TranscriptScreen = ({ visibleMessages, resolvedActions, timer, ended, aiSpeaking, showTyping }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleMessages.length, resolvedActions, showTyping])

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top bar */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-b border-gray-200/80">
        <div className={`w-1.5 h-1.5 rounded-full ${ended ? 'bg-red-500' : 'bg-green-500'}`} />
        <span className={`text-[10px] font-semibold ${ended ? 'text-red-500' : 'text-green-600'}`}>
          {ended ? 'Call Ended' : 'Connected'}
        </span>
        <span className="text-[10px] text-gray-400 ml-0.5">{formatTime(timer)}</span>
        <div className="ml-auto">
          <VoiceWaveform size={16} active={!ended} intensity={0.5} />
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-2.5 py-2 space-y-2.5"
        style={{ scrollBehavior: 'smooth' }}
      >
        {visibleMessages.map((msg, i) => {
          if (msg.role === 'caller') {
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-end gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-gray-600" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-3 py-2 max-w-[80%] shadow-sm">
                  <p className="text-[11px] text-gray-800 leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            )
          }
          if (msg.role === 'ai') {
            return (
              <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-end gap-1.5 justify-end">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-2xl rounded-br-md px-3 py-2 max-w-[80%] shadow-sm shadow-cyan-50">
                  <p className="text-[11px] text-gray-800 leading-relaxed">{msg.text}</p>
                </div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-white" />
                </div>
              </motion.div>
            )
          }
          if (msg.role === 'action') {
            return <ActionCard key={i} message={msg} resolved={resolvedActions.has(i)} />
          }
          return null
        })}

        {showTyping && (
          <AnimatePresence>
            <TypingIndicator />
          </AnimatePresence>
        )}
      </div>

      {/* Bottom voice bar */}
      <div className="px-3 py-2 bg-white border-t border-gray-200/80 flex items-center justify-center gap-3">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-md">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <VoiceBars active={aiSpeaking && !ended} size="md" />
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
  const [showTyping, setShowTyping] = useState(false)
  const [aiSpeaking, setAiSpeaking] = useState(false)

  const resetAll = useCallback(() => {
    setStage(0)
    setTimer(0)
    setVisibleCount(0)
    setResolvedActions(new Set())
    setEnded(false)
    setShowTyping(false)
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
      const id = setTimeout(() => setStage(1), STAGE_DURATIONS[0])
      return () => clearTimeout(id)
    }
    if (stage === 1) {
      const id = setTimeout(() => setStage(2), STAGE_DURATIONS[1])
      return () => clearTimeout(id)
    }
    if (stage === 2) {
      if (visibleCount >= MESSAGES.length) {
        setShowTyping(false)
        setAiSpeaking(false)
        const id = setTimeout(() => setStage(3), 1500)
        return () => clearTimeout(id)
      }

      const nextMsg = MESSAGES[visibleCount]

      if (nextMsg?.role === 'ai') {
        setShowTyping(true)
        setAiSpeaking(true)
        const id = setTimeout(() => {
          setShowTyping(false)
          setVisibleCount(c => c + 1)
          setTimeout(() => setAiSpeaking(false), 500)
        }, 1200)
        return () => clearTimeout(id)
      }

      if (nextMsg?.role === 'action') {
        setAiSpeaking(true)
        const actionIndex = visibleCount
        const id = setTimeout(() => {
          setVisibleCount(c => c + 1)
          setTimeout(() => {
            setResolvedActions(prev => new Set([...prev, actionIndex]))
            setAiSpeaking(false)
          }, 1000)
        }, 600)
        return () => clearTimeout(id)
      }

      setAiSpeaking(false)
      const id = setTimeout(() => {
        setVisibleCount(c => c + 1)
      }, 1200)
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
        {/* Section Header */}
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
          {/* Left Column — CTA Cards */}
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

          {/* Right Column — Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex justify-center mt-8 lg:mt-0"
          >
            <div className="phone-holo-wrap w-[240px] sm:w-[260px] lg:w-[300px]">
              <div className="relative bg-gray-950 rounded-[2.5rem] p-[3px] z-10 shadow-2xl">
                <div className="bg-white rounded-[2.3rem] overflow-hidden">
                  <div className="aspect-[9/19] flex flex-col">
                    {/* Notch */}
                    <div className={`flex justify-center pt-1.5 pb-0.5 ${stage <= 1 ? 'bg-slate-800' : 'bg-white'}`}>
                      <div className={`w-20 h-5 rounded-full flex items-center justify-center ${stage <= 1 ? 'bg-gray-900' : 'bg-gray-100'}`}>
                        <div className={`w-2 h-2 rounded-full ${stage <= 1 ? 'bg-gray-700' : 'bg-gray-300'}`} />
                      </div>
                    </div>

                    <StatusBar light={stage <= 1} />

                    {/* Screen Content */}
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
                            <TranscriptScreen
                              visibleMessages={visibleMessages}
                              resolvedActions={resolvedActions}
                              timer={timer}
                              ended={ended}
                              aiSpeaking={aiSpeaking}
                              showTyping={showTyping}
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
          inset: -6px;
          border-radius: 2.8rem;
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 100%;
          animation: holo-shift 3s linear infinite;
          filter: blur(14px);
          opacity: 0.75;
          z-index: 0;
        }
        .phone-holo-wrap::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 2.6rem;
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 100%;
          animation: holo-shift 3s linear infinite;
          opacity: 0.9;
          z-index: 1;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 2px;
        }
        @keyframes holo-shift {
          to { background-position: -200% 0; }
        }
      `}</style>
    </section>
  )
}

export default TryNowSection
