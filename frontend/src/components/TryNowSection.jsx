import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageSquare, ArrowRight, Calendar, Search, Send, Headphones, Mic } from 'lucide-react'
import { useState, useEffect } from 'react'
import GlowCard from './ui/GlowCard'

const TryNowSection = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [phoneFrame, setPhoneFrame] = useState(0) // 0 = call interface, 1 = voice orb

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  // Scenarios for the rotating bubbles
  const scenarios = [
    {
      id: 0,
      userText: "Is there any slot available for a demo next Tuesday?",
      aiLabel: "Google Cal API",
      aiIcon: Calendar,
      aiColor: "blue",
      aiStatus: "Success",
      aiContent: {
        line1: { label: "Check:", value: "Tuesday, 10th" },
        line2: { label: "Status:", value: "Available", highlight: true }
      }
    },
    {
      id: 1,
      userText: "Where is my order? Order ID is 5592.",
      aiLabel: "CRM Lookup",
      aiIcon: Search,
      aiColor: "blue",
      aiStatus: "Fetched",
      aiContent: {
        line1: { label: "Order:", value: "#5592" },
        line2: { label: "Status:", value: "Out for Delivery", highlight: true }
      }
    },
    {
      id: 2,
      userText: "Send me the address to my phone, please.",
      aiLabel: "SMS Sent",
      aiIcon: Send,
      aiColor: "blue",
      aiStatus: "Delivered",
      aiContent: {
        line1: { label: "To:", value: "+1 (XXX) XXX-1234" },
        line2: { label: "Message:", value: "Address sent!", highlight: true }
      }
    },
    {
      id: 3,
      userText: "I have a complex billing issue. I need a human.",
      aiLabel: "Live Transfer",
      aiIcon: Headphones,
      aiColor: "blue",
      aiStatus: "Connecting",
      aiContent: {
        line1: { label: "Transfer to:", value: "Support Desk" },
        line2: { label: "Wait time:", value: "< 1 min", highlight: true }
      }
    }
  ]

  // Auto-rotate scenarios and frames
  useEffect(() => {
    let scenarioInterval
    let frameTimeout
    
    // Function to cycle through all notifications
    const cycleNotifications = () => {
      setCurrentStep(0)
      let step = 0
      
      scenarioInterval = setInterval(() => {
        step = (step + 1) % scenarios.length
        setCurrentStep(step)
        
        // After completing all scenarios, switch back to frame 0
        if (step === 0) {
          clearInterval(scenarioInterval)
          setPhoneFrame(0)
          
          // After 5 seconds on frame 0, start the cycle again
          frameTimeout = setTimeout(() => {
            setPhoneFrame(1)
            cycleNotifications()
          }, 5000)
        }
      }, 4000)
    }
    
    // Start with frame 0 for 5 seconds, then switch to frame 1 and start notifications
    const initialTimeout = setTimeout(() => {
      setPhoneFrame(1)
      cycleNotifications()
    }, 5000)
    
    return () => {
      clearInterval(scenarioInterval)
      clearTimeout(frameTimeout)
      clearTimeout(initialTimeout)
    }
  }, [])

  const currentScenario = scenarios[currentStep]

  // Color mappings
  const colorMap = {
    green: {
      bg: 'bg-green-500',
      bgLight: 'bg-green-50',
      text: 'text-green-500',
      border: 'border-green-200',
      statusBg: 'bg-green-900/50',
      statusText: 'text-green-300'
    },
    blue: {
      bg: 'bg-blue-500',
      bgLight: 'bg-blue-100/70',
      text: 'text-blue-600',
      border: 'border-blue-200',
      statusBg: 'bg-blue-900/50',
      statusText: 'text-blue-300'
    },
    purple: {
      bg: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      text: 'text-purple-500',
      border: 'border-purple-200',
      statusBg: 'bg-purple-900/50',
      statusText: 'text-purple-300'
    },
    orange: {
      bg: 'bg-orange-500',
      bgLight: 'bg-orange-50',
      text: 'text-orange-500',
      border: 'border-orange-200',
      statusBg: 'bg-orange-900/50',
      statusText: 'text-orange-300'
    }
  }

  const colors = colorMap[currentScenario.aiColor]
  const IconComponent = currentScenario.aiIcon

  // Glow animation styles
  const glowStyles = `
    @keyframes pulse-glow-green {
      0%, 100% { box-shadow: 0 0 15px rgba(34, 197, 94, 0.2); border-color: rgba(34, 197, 94, 0.3); }
      50% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.6); border-color: rgba(34, 197, 94, 0.8); }
    }
    @keyframes pulse-glow-blue {
      0%, 100% { box-shadow: 0 0 15px rgba(37, 99, 235, 0.2); border-color: rgba(37, 99, 235, 0.3); }
      50% { box-shadow: 0 0 25px rgba(37, 99, 235, 0.6); border-color: rgba(37, 99, 235, 0.8); }
    }
    @keyframes shine-sweep {
      0% { transform: translateX(-100%) skewX(-15deg); }
      100% { transform: translateX(200%) skewX(-15deg); }
    }
  `

  return (
    <section id="try-it-live" className="py-14 lg:py-20 bg-white scroll-mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered */}
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
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Try It Live</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-title hero-display">
            Pull Out <span className="text-gradient">Your Phone!</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle">
            Experience our AI receptionist <span className="font-bold text-text-primary">right now</span>.
            Call or text the number below.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Contact Methods */}
            <style>{glowStyles}</style>
            <motion.div
              variants={fadeInUp}
              className="space-y-4 mt-6"
            >
              {/* Phone Number */}
              <a
                href="tel:+18445841083"
                className="group relative flex items-center gap-4 bg-white border-2 border-blue-100 rounded-2xl p-5 overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer"
                style={{ animation: 'pulse-glow-blue 3s infinite' }}
              >
                <div className="group-hover:animate-[shine-sweep_0.75s_ease-in-out] absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', transform: 'translateX(-100%) skewX(-15deg)' }} />

                <div className="relative z-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-14 h-14 text-blue-600" />
                </div>

                <div className="relative z-10 flex-1 min-w-0">
                  <p className="font-bold text-text-primary text-lg group-hover:text-blue-600 transition-colors">Call Now</p>
                  <p className="text-xl md:text-2xl font-bold text-text-primary tracking-wide font-mono">
                    +1 (844) 584-1083
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    Speak with our AI receptionist by calling this number
                  </p>
                </div>

                <div className="relative z-10 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>

              {/* Text Message */}
              <a
                href="sms:+18445841083"
                className="group relative flex items-center gap-4 bg-white border-2 border-blue-100 rounded-2xl p-5 overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer"
                style={{ animation: 'pulse-glow-blue 3s infinite' }}
              >
                <div className="group-hover:animate-[shine-sweep_0.75s_ease-in-out] absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', transform: 'translateX(-100%) skewX(-15deg)' }} />

                <div className="relative z-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-14 h-14 text-blue-600" />
                </div>

                <div className="relative z-10 flex-1 min-w-0">
                  <p className="font-bold text-text-primary text-lg group-hover:text-blue-600 transition-colors">Text Now</p>
                  <p className="text-xl md:text-2xl font-bold text-text-primary tracking-wide font-mono">
                    +1 (844) 584-1083
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    Send a message and get instant AI-powered responses
                  </p>
                </div>

                <div className="relative z-10 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup with Rotating Bubbles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center mt-8 lg:mt-0"
          >
            <div className="relative w-[240px] sm:w-[260px] lg:w-[280px]">
              {/* Phone with Glow Effect */}
              <GlowCard glowColor="cyan-purple" glowSize="md" borderRadius="3xl" showCornerAccents={false} padding="sm">
                {/* Phone Frame */}
                <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-[2rem] p-3 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>

                {/* Screen */}
                <div className="relative bg-white rounded-[2rem] overflow-hidden aspect-[9/18] shadow-inner">
                  <AnimatePresence mode="wait">
                    {phoneFrame === 0 ? (
                      /* Frame 1: Call Interface */
                      <motion.div
                        key="call-interface"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white p-6 flex flex-col items-center justify-center"
                      >
                        {/* Profile Picture */}
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 3, -3, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="relative mb-5"
                        >
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                            <Phone className="w-12 h-12 text-white" />
                          </div>
                          {/* Pulse rings */}
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: [1, 2.5],
                                opacity: [0.5, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: "easeOut"
                              }}
                              className="absolute inset-0 border-3 border-blue-500 rounded-full"
                            />
                          ))}
                        </motion.div>

                        {/* Caller Info */}
                        <h3 className="text-lg font-bold text-text-primary mb-1">
                          CogniDrift AI
                        </h3>
                        <p className="text-sm text-text-secondary mb-0.5">
                          AI Receptionist
                        </p>
                        <p className="text-xs text-blue-600 font-medium mb-6">
                          Incoming call...
                        </p>

                        {/* Call Actions */}
                        <div className="flex items-center gap-5">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <Phone className="w-6 h-6 text-white rotate-135" />
                          </motion.button>

                          <motion.button
                            animate={{
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                '0 8px 24px rgba(34, 197, 94, 0.3)',
                                '0 12px 32px rgba(34, 197, 94, 0.5)',
                                '0 8px 24px rgba(34, 197, 94, 0.3)'
                              ]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl"
                          >
                            <Phone className="w-8 h-8 text-white" />
                          </motion.button>
                        </div>

                        {/* Status Indicator */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                          <span className="text-[10px] font-semibold text-text-primary whitespace-nowrap">
                            AI Ready to Answer
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      /* Frame 2: Voice Orb */
                      <motion.div
                        key="voice-orb"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white p-6 flex flex-col items-center justify-center"
                      >
                        {/* Profile Picture */}
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 3, -3, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="relative mb-5"
                        >
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                            <Phone className="w-12 h-12 text-white" />
                          </div>
                          {/* Pulse rings */}
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: [1, 2.5],
                                opacity: [0.5, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: "easeOut"
                              }}
                              className="absolute inset-0 border-3 border-blue-500 rounded-full"
                            />
                          ))}
                        </motion.div>

                        {/* Caller Info */}
                        <h3 className="text-lg font-bold text-text-primary mb-1">
                          CogniDrift AI
                        </h3>
                        <p className="text-sm text-text-secondary mb-0.5">
                          AI Receptionist
                        </p>
                        <p className="text-xs text-blue-600 font-medium mb-6">
                          Ongoing call...
                        </p>

                        {/* Animated Voice Orb */}
                        <div className="relative flex items-center justify-center">
                          {/* Outer glow rings */}
                          {[0, 1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: [1, 2.5],
                                opacity: [0.6, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.75,
                                ease: "easeOut"
                              }}
                              className="absolute w-24 h-24 rounded-full"
                              style={{
                                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
                              }}
                            />
                          ))}
                          
                          {/* Main orb */}
                          <motion.div
                            animate={{
                              scale: [1, 1.15, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="relative w-32 h-32 rounded-full flex items-center justify-center"
                            style={{
                              background: 'radial-gradient(circle at 30% 30%, #60a5fa, #3b82f6, #2563eb)',
                              boxShadow: '0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)'
                            }}
                          >
                            {/* Inner light effect */}
                            <motion.div
                              animate={{
                                opacity: [0.3, 0.7, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="absolute inset-4 rounded-full"
                              style={{
                                background: 'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.8), transparent 60%)'
                              }}
                            />
                            
                            {/* Sound waves inside */}
                            <div className="relative flex items-center gap-1">
                              {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                  key={i}
                                  animate={{
                                    scaleY: [0.3, 1, 0.3],
                                  }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeInOut"
                                  }}
                                  className="w-1 bg-white rounded-full"
                                  style={{
                                    height: i === 2 ? '32px' : i === 1 || i === 3 ? '24px' : '16px'
                                  }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              </GlowCard>

              {/* Rotating Bubble Notifications - Only show with Frame 2 (Voice Orb) */}
              {phoneFrame === 1 && (
                <AnimatePresence mode="wait">
                  {/* Left Bubble - User Voice */}
                  <motion.div
                    key={`user-${currentStep}`}
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute -left-20 sm:-left-24 lg:-left-28 top-16 sm:top-20 lg:top-24 w-32 sm:w-36 lg:w-40 z-20"
                  >
                  {/* Bubble with right tail */}
                  <div className="relative">
                    <div className="relative backdrop-blur-xl bg-white/30 rounded-[20px] rounded-br-md p-3.5 shadow-2xl border border-white/40 overflow-hidden" style={{ backdropFilter: 'blur(20px) saturate(180%)' }}>
                      {/* Glass shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                      
                      {/* Animated Icon Orb - Centered */}
                      <div className="relative flex items-center justify-center mb-2 pb-2 border-b border-gray-300/50">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="relative"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-100/70 flex items-center justify-center shadow-md">
                            <Mic className="w-4 h-4 text-blue-600" />
                          </div>
                          {/* Pulse ring */}
                          <motion.div
                            animate={{
                              scale: [1, 1.8],
                              opacity: [0.6, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut"
                            }}
                            className="absolute inset-0 rounded-full border-2 border-blue-500"
                          />
                        </motion.div>
                      </div>
                      {/* Message */}
                      <p className="relative text-[10px] font-semibold text-gray-900 leading-relaxed text-center">
                        {currentScenario.userText}
                      </p>
                    </div>
                    {/* Attractive tail with outline */}
                    <svg className="absolute -right-2 bottom-3" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0 Q10 5, 20 20 L0 10 Z" fill="rgba(255, 255, 255, 0.3)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>

                {/* Right Bubble - AI Response */}
                <motion.div
                  key={`ai-${currentStep}`}
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  className="absolute -right-20 sm:-right-28 lg:-right-32 bottom-24 sm:bottom-32 lg:bottom-36 w-36 sm:w-40 lg:w-44 z-20"
                >
                  {/* Bubble with left tail */}
                  <div className="relative">
                    <div className="relative backdrop-blur-xl bg-white/30 rounded-[20px] rounded-bl-md p-3.5 shadow-2xl border border-white/40 overflow-hidden" style={{ backdropFilter: 'blur(20px) saturate(180%)' }}>
                      {/* Glass shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                      
                      {/* Header with Animated Orb */}
                      <div className="relative flex items-center justify-between mb-2 pb-2 border-b border-gray-300/50">
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="relative"
                          >
                            <div className={`${colors.bgLight} w-7 h-7 rounded-full flex items-center justify-center shadow-md`}>
                              <IconComponent className={`w-3.5 h-3.5 ${colors.text}`} />
                            </div>
                            {/* Pulse ring */}
                            <motion.div
                              animate={{
                                scale: [1, 1.8],
                                opacity: [0.6, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                              className={`absolute inset-0 rounded-full border-2 ${colors.text.replace('text-', 'border-')}`}
                            />
                          </motion.div>
                          <span className="text-[9px] font-bold uppercase tracking-wide text-gray-900">{currentScenario.aiLabel}</span>
                        </div>

                      </div>
                      {/* Content */}
                      <div className="relative space-y-1.5">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-gray-600">{currentScenario.aiContent.line1.label}</span>
                          <span className="text-gray-900 font-semibold">{currentScenario.aiContent.line1.value}</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span className="text-gray-600">{currentScenario.aiContent.line2.label}</span>
                          <span className={currentScenario.aiContent.line2.highlight ? colors.text + ' font-semibold' : 'text-gray-900 font-semibold'}>
                            {currentScenario.aiContent.line2.value}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Attractive tail with outline */}
                    <svg className="absolute -left-2 bottom-4" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 0 Q10 5, 0 20 L20 10 Z" fill="rgba(255, 255, 255, 0.3)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TryNowSection
