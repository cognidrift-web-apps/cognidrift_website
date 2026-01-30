import { motion } from 'framer-motion'
import { Mic, Brain, MessageSquare, CheckCircle, Zap, User, Bot } from 'lucide-react'
import { useState, useEffect } from 'react'

const AIConversationFlow = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [messages, setMessages] = useState([])

  const conversationSteps = [
    { icon: Mic, title: 'Listening', description: 'AI captures voice input', color: 'blue' },
    { icon: Brain, title: 'Processing', description: 'Understanding intent', color: 'purple' },
    { icon: MessageSquare, title: 'Responding', description: 'Generating answer', color: 'indigo' },
    { icon: CheckCircle, title: 'Action', description: 'Completing task', color: 'green' }
  ]

  const sampleConversation = [
    { type: 'user', text: "Hi, I'd like to book an appointment", delay: 0 },
    { type: 'ai', text: "Of course! I'd be happy to help. What service are you interested in?", delay: 1500 },
    { type: 'user', text: "Dental cleaning", delay: 3000 },
    { type: 'ai', text: "Great! What date and time works best for you?", delay: 4500 }
  ]

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % conversationSteps.length)
    }, 2500)

    const messageTimers = sampleConversation.map((msg, i) => 
      setTimeout(() => {
        setMessages(prev => [...prev, msg])
      }, msg.delay)
    )

    return () => {
      clearInterval(stepInterval)
      messageTimers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 border-2 border-indigo-100 overflow-hidden"
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
                      transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                      className="relative"
                    >
                      {/* Step Circle */}
                      <motion.div
                        animate={{
                          backgroundColor: isActive || isPassed ? 'white' : '#e5e7eb',
                          borderColor: isActive || isPassed ? '#4f46e5' : '#d1d5db'
                        }}
                        className={`w-16 h-16 mx-auto rounded-2xl border-4 flex items-center justify-center shadow-lg transition-all duration-500 ${
                          isActive ? 'shadow-indigo-500/50' : ''
                        }`}
                      >
                        <motion.div
                          animate={{
                            scale: isActive ? [1, 1.2, 1] : 1,
                            rotate: isActive ? [0, 360] : 0
                          }}
                          transition={{
                            scale: { duration: 1, repeat: isActive ? Infinity : 0 },
                            rotate: { duration: 2, repeat: isActive ? Infinity : 0, ease: 'linear' }
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
                            transition={{ duration: 1.5, repeat: Infinity }}
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
                          transition={{ duration: 0.5 }}
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {messages.length > 0 && messages.length < sampleConversation.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-md">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
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
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute w-2 h-2 bg-indigo-400 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default AIConversationFlow
