import { motion } from 'framer-motion'
import { Mic, Brain, MessageSquare, CheckCircle, Zap, User, Bot } from 'lucide-react'
import { BsRobot } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import GlowCard from './ui/GlowCard'

const AIConversationFlow = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [messages, setMessages] = useState([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const conversationSteps = [
    { icon: Mic, title: 'Listening', description: 'AI captures voice input', color: 'blue' },
    { icon: Brain, title: 'Processing', description: 'Understanding intent', color: 'purple' },
    { icon: MessageSquare, title: 'Responding', description: 'Generating answer', color: 'indigo' },
    { icon: CheckCircle, title: 'Action', description: 'Completing task', color: 'green' }
  ]

  const sampleConversation = [
    { type: 'user', text: "Hi, I'd like to book an appointment", delay: 0 },
    { type: 'ai', text: "Of course! I'd be happy to help. What service are you interested in?", delay: 2000 },
    { type: 'user', text: "Dental cleaning", delay: 4000 },
    { type: 'ai', text: "Great! What date and time works best for you?", delay: 6000 }
  ]

  useEffect(() => {
    // Only start if animation has been triggered
    if (!hasStarted) return
    
    // Reset on mount
    setMessages([])
    setCurrentMessageIndex(0)
    setTypingText('')
    
    const stepInterval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % conversationSteps.length)
    }, 2000)

    return () => {
      clearInterval(stepInterval)
    }
  }, [hasStarted])

  // Handle sequential message typing
  useEffect(() => {
    if (!hasStarted || currentMessageIndex >= sampleConversation.length) return

    const currentMsg = sampleConversation[currentMessageIndex]
    const fullText = currentMsg.text
    let charIndex = 0

    setIsTyping(true)
    setTypingText('')

    // Delay before starting to type
    const startDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          setTypingText(fullText.substring(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
          
          // Add complete message to messages array
          setMessages(prev => [...prev, { ...currentMsg, text: fullText }])
          
          // Move to next message after a brief pause
          setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1)
          }, 800)
        }
      }, 50) // Speed of typing - increased from 30 to 50 for slower typing

      return () => clearInterval(typingInterval)
    }, currentMessageIndex === 0 ? 500 : 1000)

    return () => clearTimeout(startDelay)
  }, [currentMessageIndex, hasStarted])

  return (
    <div className="relative w-full h-full">
      {/* Main Container with Glow */}
      <GlowCard glowColor="purple" glowSize="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileInView={() => {
            if (!hasStarted) {
              setHasStarted(true)
            }
            return {}
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 overflow-hidden"
        >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
              backgroundSize: '200% 200%'
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Processing Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              AI Processing Pipeline
            </h3>
            <div className="flex items-center justify-between gap-3">
              {conversationSteps.map((step, i) => {
                const isActive = i === activeStep
                const isPassed = i < activeStep
                const colorClasses = {
                  blue: 'from-blue-500 to-blue-600',
                  purple: 'from-purple-500 to-purple-600',
                  indigo: 'from-indigo-500 to-indigo-600',
                  green: 'from-green-500 to-green-600'
                }

                return (
                  <div key={i} className="flex-1">
                    <motion.div
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3, repeat: isActive ? Infinity : 0 }}
                      className="relative"
                    >
                      {/* Step Circle */}
                      <motion.div
                        animate={{
                          backgroundColor: isActive || isPassed ? 'white' : '#e5e7eb',
                          borderColor: isActive || isPassed ? '#4f46e5' : '#d1d5db'
                        }}
                        className={`w-16 h-16 mx-auto rounded-2xl border-4 flex items-center justify-center shadow-lg transition-all duration-300 ${
                          isActive ? 'shadow-indigo-500/50' : ''
                        }`}
                      >
                        <motion.div
                          animate={{
                            scale: isActive ? [1, 1.2, 1] : 1,
                            rotate: isActive ? [0, 360] : 0
                          }}
                          transition={{
                            scale: { duration: 0.5, repeat: isActive ? Infinity : 0 },
                            rotate: { duration: 1, repeat: isActive ? Infinity : 0, ease: 'linear' }
                          }}
                        >
                          <step.icon className={`w-7 h-7 ${isActive || isPassed ? 'text-indigo-600' : 'text-gray-400'}`} />
                        </motion.div>
                      </motion.div>

                      {/* Label */}
                      <div className="mt-3 text-center">
                        <p className={`text-sm font-bold ${isActive ? 'text-indigo-600' : 'text-gray-600'}`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                      </div>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="absolute inset-0 bg-green-400 rounded-full"
                          />
                          <div className="relative w-3 h-3 bg-white rounded-full" />
                        </motion.div>
                      )}

                      {/* Connection Line */}
                      {i < conversationSteps.length - 1 && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isPassed ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-1 bg-gradient-to-r ${colorClasses[step.color]} origin-left`}
                        />
                      )}
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Conversation Display */}
          <div className="bg-white rounded-2xl p-6 shadow-inner border-2 border-gray-100 min-h-[300px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <BsRobot className="w-10 h-10 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">AI Receptionist</p>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full"
              >
                Live Demo
              </motion.div>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[80%]">
                    {msg.type === 'ai' && (
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <BsRobot className="w-8 h-8 text-purple-600" />
                      </div>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`px-4 py-3 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                      } shadow-md`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </motion.div>
                    {msg.type === 'user' && (
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <FaUserCircle className="w-8 h-8 text-blue-500" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Currently Typing Message */}
              {isTyping && typingText && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${sampleConversation[currentMessageIndex].type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[80%]">
                    {sampleConversation[currentMessageIndex].type === 'ai' && (
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <BsRobot className="w-8 h-8 text-purple-600" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        sampleConversation[currentMessageIndex].type === 'user'
                          ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                      } shadow-md`}
                    >
                      <p className="text-sm leading-relaxed">
                        {typingText}
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block ml-0.5"
                        >
                          |
                        </motion.span>
                      </p>
                    </div>
                    {sampleConversation[currentMessageIndex].type === 'user' && (
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <FaUserCircle className="w-8 h-8 text-blue-500" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Typing Indicator - show when waiting for next AI message */}
              {!isTyping && messages.length > 0 && messages.length < sampleConversation.length && currentMessageIndex < sampleConversation.length && sampleConversation[currentMessageIndex]?.type === 'ai' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <BsRobot className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-md">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5 + Math.random() * 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="absolute w-2 h-2 bg-indigo-400 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>
      </GlowCard>
    </div>
  )
}

export default AIConversationFlow
