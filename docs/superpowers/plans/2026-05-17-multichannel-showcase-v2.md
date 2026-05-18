# Multi-Channel Showcase v2 + CogniChat Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign MultiChannelShowcase with flipped message alignment, scrolling stream, rich content cards, and glow animations; plus upgrade CogniChat product page hero and feature cards.

**Architecture:** Rewrite the conversation data file with 8-message scripts and richContent metadata, rebuild the showcase component with scrolling container + rich content renderers, then update WebChatbot.jsx hero layout and feature card styling.

**Tech Stack:** React, Framer Motion, Tailwind CSS, Lucide React, react-icons (SiWhatsapp), GlowCard component.

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/data/showcaseConversations.js` | Rewrite | 3 channels (no Slack), 8 messages each, richContent fields |
| `src/components/MultiChannelShowcase.jsx` | Rewrite | Flipped sides, glow, scrolling stream, rich content, center header |
| `src/pages/products/WebChatbot.jsx` | Modify | Hero compact layout, blended showcase, premium feature cards |

---

### Task 1: Rewrite Showcase Conversations Data

**Files:**
- Rewrite: `frontend/src/data/showcaseConversations.js`

- [ ] **Step 1: Replace the entire file contents**

```js
import { MessageSquare, Smartphone } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

export const channels = [
  {
    id: 'webchat',
    label: 'Web Chat',
    icon: MessageSquare,
    statusLabel: 'Online',
    headerTitle: 'CogniDrift AI',
  },
  {
    id: 'sms',
    label: 'SMS',
    icon: Smartphone,
    statusLabel: 'SMS',
    headerTitle: 'CogniDrift AI',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: SiWhatsapp,
    statusLabel: 'WhatsApp',
    headerTitle: 'CogniDrift AI',
    showCheckMarks: true,
  },
]

export const conversations = {
  webchat: [
    { type: 'user', text: 'Hey, do you offer any plans for small businesses?' },
    { type: 'ai', text: 'Absolutely! Here\'s a quick look at our plans:' },
    { type: 'ai', text: '', richContent: { type: 'pricingCard', plans: [{ name: 'Starter', price: '$29/mo' }, { name: 'Pro', price: '$69/mo' }, { name: 'Enterprise', price: '$149/mo' }] } },
    { type: 'user', text: 'The Pro plan looks good. Can I book a demo?' },
    { type: 'ai', text: 'Of course! Pick a time that works:' },
    { type: 'ai', text: '', richContent: { type: 'appointmentButton', label: 'Book a Free Demo' } },
    { type: 'user', text: 'Done! Booked for Thursday' },
    { type: 'ai', text: 'See you Thursday! I\'ve sent a confirmation to your email.' },
  ],
  sms: [
    { type: 'ai', text: 'Hi Mike! We noticed you missed your 10am appointment today. Would you like to reschedule?' },
    { type: 'user', text: 'Yeah sorry, got held up. Are you still open today?' },
    { type: 'ai', text: 'No problem! We\'re open until 6pm today.' },
    { type: 'user', text: 'Can I come in at 3?' },
    { type: 'ai', text: '3pm works! I\'ve reserved a spot for you:' },
    { type: 'ai', text: '', richContent: { type: 'calendarCard', date: 'Today', time: '3:00 PM', status: 'Confirmed' } },
    { type: 'user', text: 'Perfect, see you then' },
    { type: 'ai', text: 'See you at 3! Text HELP anytime if plans change.' },
  ],
  whatsapp: [
    { type: 'user', text: 'Hi, I need an emergency plumbing repair' },
    { type: 'ai', text: 'I can help! What\'s the issue?' },
    { type: 'user', text: 'Leaking pipe under the kitchen sink' },
    { type: 'ai', text: 'Got it. We have a technician available today at 2pm. Sound good?' },
    { type: 'user', text: 'Yes please!' },
    { type: 'ai', text: 'Booked! Here\'s your appointment details:' },
    { type: 'ai', text: '', richContent: { type: 'confirmationCard', service: 'Plumbing Repair', date: 'Today', time: '2:00 PM', address: '123 Main St, Suite 4' } },
    { type: 'user', text: 'Thanks so much!' },
  ],
}
```

- [ ] **Step 2: Verify build**

Run: `cd frontend && npx vite build 2>&1 | tail -5`
Expected: Build succeeds (component still imports this file but hasn't been rewritten yet -- unused richContent fields are just data, no breakage).

- [ ] **Step 3: Commit**

```bash
git add src/data/showcaseConversations.js
git commit -m "feat: rewrite showcase conversations with rich content and 8-message scripts"
```

---

### Task 2: Rewrite MultiChannelShowcase Component

**Files:**
- Rewrite: `frontend/src/components/MultiChannelShowcase.jsx`

- [ ] **Step 1: Replace the entire component file**

```jsx
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
    <p className="text-[10px] text-indigo-500 font-medium text-center mt-1.5 cursor-pointer hover:underline">View Full Pricing →</p>
  </div>
)

const AppointmentButton = ({ label }) => (
  <div className="mt-2">
    <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-indigo-200 shadow-sm cursor-pointer hover:bg-indigo-50 transition-colors">
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
    <p className="text-[10px] text-indigo-500 font-medium mt-1.5 cursor-pointer hover:underline">Add to Calendar →</p>
  </div>
)

const ConfirmationCard = ({ service, date, time, address }) => (
  <div className="mt-2 bg-white/80 rounded-xl border border-blue-100 p-3 shadow-sm">
    <p className="text-xs font-bold text-gray-900">{service}</p>
    <p className="text-[10px] text-gray-600">{date} at {time}</p>
    <p className="text-[10px] text-gray-500 mt-0.5">{address}</p>
    <p className="text-[10px] text-indigo-500 font-medium mt-1.5 cursor-pointer hover:underline">Get Directions →</p>
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

  const containerHeight = compact ? 'h-[300px]' : 'h-[380px]'
  const ChannelIcon = activeChannel.icon

  return (
    <div className="relative w-full h-full">
      <GlowCard glowColor="purple" glowSize="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onViewportEnter={() => {
            if (!hasStarted) setHasStarted(true)
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative bg-white p-3 lg:p-4 overflow-hidden"
        >
          <div className="relative z-10">
            <div
              className={`relative backdrop-blur-xl bg-gradient-to-br from-indigo-50/60 via-purple-50/60 to-pink-50/60 rounded-2xl p-4 shadow-sm border border-white/40 ${containerHeight} flex flex-col overflow-hidden`}
              style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none" />

              {/* Header - Center Aligned */}
              <div className="relative flex flex-col items-center text-center mb-3">
                <div className="flex items-center gap-2">
                  <ChannelIcon className="w-6 h-6 text-indigo-600" />
                  <p className="text-sm font-bold text-gray-800">{activeChannel.headerTitle}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-green-500 rounded-full"
                  />
                  <span className="text-[11px] text-gray-500">{activeChannel.statusLabel}</span>
                </div>
              </div>

              {/* Channel Tabs */}
              <div className="relative flex justify-center gap-2 mb-3">
                {channels.map((channel, index) => {
                  const TabIcon = channel.icon
                  const isActive = index === activeChannelIndex
                  return (
                    <button
                      key={channel.id}
                      onClick={() => handleTabClick(index)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
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

              {/* Messages - Scrolling Container */}
              <div
                ref={scrollContainerRef}
                className="relative flex-1 overflow-y-auto overflow-x-hidden space-y-2.5 scrollbar-hide"
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
                        className="flex justify-end items-end gap-2 flex-row-reverse"
                      >
                        <div className="w-6 h-6 flex items-center justify-center">
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
```

- [ ] **Step 2: Add scrollbar-hide utility to globals.css**

Find `frontend/src/app/globals.css` (or `frontend/src/index.css` -- whichever is the global stylesheet). Add at the end:

```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 3: Verify build**

Run: `cd frontend && npx vite build 2>&1 | tail -5`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/MultiChannelShowcase.jsx src/app/globals.css
git commit -m "feat: rewrite MultiChannelShowcase with flipped sides, glow, scrolling stream, rich content"
```

Note: If the global CSS file is `src/index.css` instead of `src/app/globals.css`, adjust the git add path accordingly.

---

### Task 3: Update CogniChat Product Page

**Files:**
- Modify: `frontend/src/pages/products/WebChatbot.jsx`

Three changes: hero layout (title + icon + subtitle + remove CTAs + widen/fade showcase), reduce padding, upgrade feature cards.

- [ ] **Step 1: Update imports**

Find (line 3):
```jsx
import { Bot, MessageSquare, Users, Zap, CheckCircle2, ArrowRight, Globe, BarChart3, Shield, Headphones } from 'lucide-react'
```

Replace with (remove ArrowRight since CTAs are gone):
```jsx
import { Bot, MessageSquare, Users, Zap, CheckCircle2, Globe, BarChart3, Shield, Headphones } from 'lucide-react'
```

Find (line 4):
```jsx
import { Link } from 'react-router-dom'
```

Remove this line entirely (no longer needed -- CTAs are gone).

- [ ] **Step 2: Update hero section**

Find the hero section (lines 82-137):
```jsx
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Icon */}
            <motion.div
              initial={iconInitial}
              animate={iconAnimate}
              transition={{ duration: 0.5, type: 'spring' }}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100/70 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8"
            >
              <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
            </motion.div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 sm:mb-6">
              AI <span className="text-blue-600">Web Chatbot</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Capture, qualify, and convert website visitors in real time with an intelligent chatbot that never sleeps.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full sm:w-auto"
                >
                  Schedule a Demo
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <a href="#pricing">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-blue-600 bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  View Pricing
                </motion.button>
              </a>
            </div>

            {/* Multi-Channel Showcase */}
            <div className="mt-10 sm:mt-12 max-w-xl mx-auto">
              <MultiChannelShowcase compact />
            </div>
          </motion.div>
        </div>
      </section>
```

Replace with:
```jsx
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Title with Icon */}
            <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
              <motion.div
                initial={iconInitial}
                animate={iconAnimate}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/70 rounded-xl flex items-center justify-center"
              >
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
                <span className="text-blue-600">CogniChat</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Every customer answered. Every channel covered.
            </p>

            {/* Multi-Channel Showcase - Wider + Faded */}
            <div
              className="mt-6 sm:mt-8 max-w-2xl mx-auto opacity-90"
              style={{
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            >
              <MultiChannelShowcase compact />
            </div>
          </motion.div>
        </div>
      </section>
```

- [ ] **Step 3: Upgrade the features section cards**

Find the features grid (lines 183-204):
```jsx
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-14 h-14 bg-blue-100/70 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
```

Replace with:
```jsx
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const colorSchemes = [
                { lightBg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200', glow: 'shadow-blue-500/20', bg: 'bg-blue-500' },
                { lightBg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200', glow: 'shadow-purple-500/20', bg: 'bg-purple-500' },
                { lightBg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-200', glow: 'shadow-cyan-500/20', bg: 'bg-cyan-500' },
                { lightBg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-200', glow: 'shadow-teal-500/20', bg: 'bg-teal-500' },
              ]
              const colors = colorSchemes[index % colorSchemes.length]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative h-full bg-white rounded-2xl p-6 sm:p-8 border-2 ${colors.border} overflow-hidden shadow-md hover:shadow-xl ${colors.glow} transition-all duration-500`}
                  >
                    <div className={`absolute inset-0 ${colors.lightBg} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                    <motion.div className={`absolute -top-10 -right-10 w-32 h-32 ${colors.bg} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex w-12 h-12 ${colors.lightBg} rounded-xl items-center justify-center mb-4 shadow-md group-hover:shadow-xl transition-shadow`}
                      >
                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                    </div>

                    <div className={`absolute bottom-0 right-0 w-16 h-16 ${colors.bg} opacity-5 rounded-tl-full transition-all duration-500 group-hover:w-24 group-hover:h-24`} />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
```

- [ ] **Step 4: Verify build**

Run: `cd frontend && npx vite build 2>&1 | tail -5`
Expected: Build succeeds.

- [ ] **Step 5: Verify visually**

Run dev server (`npx vite --port 5180`) and navigate to `http://localhost:5180/products/web-chatbot`:
1. Hero: Bot icon inline left of "CogniChat" title
2. Subtitle: "Every customer answered. Every channel covered."
3. No "Schedule a Demo" / "View Pricing" buttons
4. Showcase wider (max-w-2xl) with bottom fade effect
5. Features section cards have colored borders, glow, decorative circles, spring animations
6. Scroll to ensure pricing and details are easily reachable (compact hero)

- [ ] **Step 6: Commit**

```bash
git add src/pages/products/WebChatbot.jsx
git commit -m "feat: redesign CogniChat hero (compact + blended showcase) and upgrade feature cards"
```

---

### Task 4: Final Verification

- [ ] **Step 1: Full build check**

```bash
cd frontend && npx vite build 2>&1 | tail -10
```
Expected: Clean build, no warnings.

- [ ] **Step 2: Visual verification on Homepage**

Navigate to `http://localhost:5180/`:
1. Scroll to "Every Customer Answered" section
2. AI messages appear on the RIGHT side with purple gradient + glow pulse
3. Customer messages on LEFT with white/glass bubbles
4. Messages scroll up as new ones appear, older ones fade behind top mask
5. Header centered (icon + title + status stacked center)
6. 3 tabs only (Web Chat, SMS, WhatsApp)
7. Rich content renders: pricing card on webchat, calendar card on SMS, confirmation card on WhatsApp
8. Auto-cycles to next channel after last message + 3s hold
9. No layout shift during any animation

- [ ] **Step 3: Visual verification on CogniChat page**

Navigate to `http://localhost:5180/products/web-chatbot`:
1. Hero is compact: icon left of "CogniChat", subtitle, blended showcase
2. No CTA buttons
3. Showcase fades at bottom, pricing section visible without much scrolling
4. Showcase has same 3-channel behavior as homepage
5. Feature cards have colored borders, glow, hover animations matching Homepage style

- [ ] **Step 4: Navigation test**

Navigate between pages (Home -> CogniChat -> About -> Home) and verify:
1. No page flickering
2. Showcase re-triggers on viewport enter
3. No console errors
