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
    if (!hasStarted) return

    // If we've reached the end, reset after a pause
    if (currentMessageIndex >= sampleConversation.length) {
      const resetTimeout = setTimeout(() => {
        setMessages([])
        setCurrentMessageIndex(0)
        setTypingText('')
      }, 3000) // Wait 3 seconds before restarting
      
      return () => clearTimeout(resetTimeout)
    }

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
        <div className="relative z-10">
          {/* Conversation Display */}
          <div className="relative backdrop-blur-xl bg-white/20 rounded-2xl p-6 shadow-2xl border border-white/40 min-h-[300px]" style={{ backdropFilter: 'blur(20px) saturate(180%)' }}>
            {/* Glass shimmer effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none" />

            <div className="relative flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <BsRobot className="w-10 h-10 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">AI Web Widget</p>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <span className="text-xs text-gray-600">Online</span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs text-indigo-700 font-semibold bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30"
              >
                Live Demo
              </motion.div>
            </div>

            {/* Messages */}
            <div className="relative space-y-4">
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
                          ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-br-sm shadow-lg'
                          : 'bg-white/50 backdrop-blur-sm text-gray-800 rounded-bl-sm border border-white/40 shadow-lg'
                      }`}
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
                          ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-br-sm shadow-lg'
                          : 'bg-white/50 backdrop-blur-sm text-gray-800 rounded-bl-sm border border-white/40 shadow-lg'
                      }`}
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
                  <div className="bg-white/50 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-sm border border-white/40 shadow-lg">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </motion.div>
      </GlowCard>
    </div>
  )
}

export default AIConversationFlow
