import { motion, AnimatePresence } from 'framer-motion'
import { Check, Calendar } from 'lucide-react'
import { BsRobot } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { useState, useEffect, useCallback, useRef } from 'react'
import GlowCard from './ui/GlowCard'
import { channels, conversations } from '../data/showcaseConversations'

const MESSAGE_DELAY = 1000
const HOLD_AFTER_COMPLETE = 3000

// --- Rich Content Renderers ---

const PricingCard = ({ plans }) => (
  <div className="mt-2 bg-white/80 rounded-xl border border-indigo-100 p-2.5 shadow-sm">
    <div className="grid grid-cols-3 gap-1.5 text-center">
      {plans.map((plan) => (
        <div key={plan.name} className="px-1.5 py-2 rounded-lg bg-indigo-50/60">
          <p className="text-[10px] font-semibold text-indigo-700">{plan.name}</p>
          <p className="text-xs font-bold text-gray-900">{plan.price}</p>
        </div>
      ))}
    </div>
    <p className="text-[10px] text-indigo-500 font-medium text-center mt-1.5 select-none">View Full Pricing →</p>
  </div>
)

const AppointmentButton = ({ label }) => (
  <div className="mt-2">
    <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-indigo-200 shadow-sm select-none">
      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
      <span className="text-xs font-semibold text-indigo-600">{label}</span>
    </div>
  </div>
)

const CalendarCard = ({ date, time, status }) => (
  <div className="mt-2 bg-white/80 rounded-xl border border-green-100 p-3 shadow-sm">
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4 text-green-600" />
      <div>
        <p className="text-xs font-bold text-gray-900">{date}, {time}</p>
        <p className="text-[10px] text-green-600 font-medium">{status} ✓</p>
      </div>
    </div>
    <p className="text-[10px] text-indigo-500 font-medium mt-1.5 select-none">Add to Calendar →</p>
  </div>
)

const ConfirmationCard = ({ service, date, time, address }) => (
  <div className="mt-2 bg-white/80 rounded-xl border border-blue-100 p-3 shadow-sm">
    <p className="text-xs font-bold text-gray-900">{service}</p>
    <p className="text-[10px] text-gray-600">{date} at {time}</p>
    <p className="text-[10px] text-gray-500 mt-0.5">{address}</p>
    <p className="text-[10px] text-indigo-500 font-medium mt-1.5 select-none">Get Directions →</p>
  </div>
)

const RichContent = ({ content }) => {
  if (!content) return null
  switch (content.type) {
    case 'pricingCard': return <PricingCard plans={content.plans} />
    case 'appointmentButton': return <AppointmentButton label={content.label} />
    case 'calendarCard': return <CalendarCard date={content.date} time={content.time} status={content.status} />
    case 'confirmationCard': return <ConfirmationCard service={content.service} date={content.date} time={content.time} address={content.address} />
    default: return null
  }
}

// --- Main Component ---

const MultiChannelShowcase = ({ compact = false }) => {
  const [activeChannelIndex, setActiveChannelIndex] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [showTypingIndicator, setShowTypingIndicator] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const timerRef = useRef(null)
  const messagesEndRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (hasStarted) return
    const timer = setTimeout(() => setHasStarted(true), 800)
    return () => clearTimeout(timer)
  }, [hasStarted])

  const activeChannel = channels[activeChannelIndex]
  const activeConversation = conversations[activeChannel.id]

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [])

  const startMessageSequence = useCallback(() => {
    setVisibleMessages(0)
    setShowTypingIndicator(false)

    let currentMsg = 0
    const msgs = activeConversation

    const showNext = () => {
      if (currentMsg >= msgs.length) {
        timerRef.current = setTimeout(() => {
          setActiveChannelIndex(prev => (prev + 1) % channels.length)
        }, HOLD_AFTER_COMPLETE)
        return
      }

      const isAiMsg = msgs[currentMsg].type === 'ai'

      if (isAiMsg && currentMsg > 0) {
        setShowTypingIndicator(true)
        timerRef.current = setTimeout(() => {
          setShowTypingIndicator(false)
          currentMsg++
          setVisibleMessages(currentMsg)
          setTimeout(scrollToBottom, 50)
          timerRef.current = setTimeout(showNext, MESSAGE_DELAY)
        }, 600)
      } else {
        timerRef.current = setTimeout(() => {
          currentMsg++
          setVisibleMessages(currentMsg)
          setTimeout(scrollToBottom, 50)
          timerRef.current = setTimeout(showNext, MESSAGE_DELAY)
        }, currentMsg === 0 ? 500 : MESSAGE_DELAY)
      }
    }

    showNext()
  }, [activeConversation, scrollToBottom])

  useEffect(() => {
    if (!hasStarted) return
    clearTimer()
    setVisibleMessages(0)
    setShowTypingIndicator(false)

    const startDelay = setTimeout(() => {
      startMessageSequence()
    }, 400)

    return () => {
      clearTimer()
      clearTimeout(startDelay)
    }
  }, [activeChannelIndex, hasStarted, clearTimer, startMessageSequence])

  const handleTabClick = useCallback((index) => {
    if (index === activeChannelIndex) return
    clearTimer()
    setActiveChannelIndex(index)
  }, [activeChannelIndex, clearTimer])

  const containerHeight = compact ? 'h-[360px]' : 'h-[460px]'

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <GlowCard glowColor="purple" glowSize="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-white p-3 lg:p-4 overflow-hidden"
        >
          <div className="relative z-10">
            <div
              className={`relative backdrop-blur-xl bg-gradient-to-br from-indigo-50/60 via-purple-50/60 to-pink-50/60 rounded-2xl p-4 shadow-sm border border-white/40 ${containerHeight} flex flex-col overflow-hidden`}
              style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none" />

              {/* Compact Header + Tabs */}
              <div className="relative flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-green-500 rounded-full"
                  />
                  <p className="text-sm font-bold text-gray-800">{activeChannel.headerTitle}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {channels.map((channel, index) => {
                    const TabIcon = channel.icon
                    const isActive = index === activeChannelIndex
                    return (
                      <button
                        key={channel.id}
                        onClick={() => handleTabClick(index)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-white/60 text-indigo-600 border border-indigo-200/50 shadow-sm'
                            : 'bg-white/30 text-gray-500 border border-white/30 hover:bg-white/40'
                        }`}
                      >
                        <TabIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{channel.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Messages - Scrolling Container */}
              <div
                ref={scrollContainerRef}
                className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-2.5 scrollbar-hide"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%)',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChannel.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5 pb-2"
                  >
                    {activeConversation.slice(0, visibleMessages).map((msg, i) => (
                      <motion.div
                        key={`${activeChannel.id}-${i}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`flex ${msg.type === 'ai' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end gap-2 max-w-[85%] ${msg.type === 'ai' ? 'flex-row-reverse' : ''}`}>
                          {msg.type === 'ai' ? (
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                              <BsRobot className="w-6 h-6 text-purple-600" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                              <FaUserCircle className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <motion.div
                              initial={msg.type === 'ai' ? { boxShadow: '0 0 0px rgba(139,92,246,0)' } : {}}
                              animate={msg.type === 'ai' ? { boxShadow: ['0 0 20px rgba(139,92,246,0.4)', '0 0 8px rgba(139,92,246,0.1)'] } : {}}
                              transition={msg.type === 'ai' ? { duration: 0.8, delay: 0.1 } : {}}
                              className={`px-3.5 py-2.5 rounded-2xl ${
                                msg.type === 'ai'
                                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm shadow-lg'
                                  : 'bg-white/50 backdrop-blur-sm text-gray-800 rounded-bl-sm border border-white/40 shadow-lg'
                              }`}
                            >
                              {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
                              {msg.richContent && <RichContent content={msg.richContent} />}
                            </motion.div>
                            {activeChannel.showCheckMarks && msg.type === 'ai' && (
                              <div className="flex justify-end gap-0.5 mt-0.5 mr-1">
                                <Check className="w-3 h-3 text-blue-400" />
                                <Check className="w-3 h-3 text-blue-400 -ml-1.5" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {showTypingIndicator && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-end"
                      >
                        <div className="flex items-end gap-2 flex-row-reverse max-w-[85%]">
                          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            <BsRobot className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="bg-gradient-to-br from-indigo-500/80 to-purple-600/80 px-4 py-3 rounded-2xl rounded-br-sm shadow-lg">
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                                  className="w-1.5 h-1.5 bg-white/80 rounded-full"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </GlowCard>
    </div>
  )
}

export default MultiChannelShowcase
