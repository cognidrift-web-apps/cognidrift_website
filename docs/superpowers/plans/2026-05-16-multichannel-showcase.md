# Multi-Channel AI Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the CLS-causing AIConversationFlow with a fixed-height, multi-channel showcase that cycles through Web Chat, SMS, WhatsApp, and Slack conversations.

**Architecture:** Create a data file for channel conversations, build a new `MultiChannelShowcase` component that reuses the existing GlowCard/glass-morphism visuals with fixed height + channel tabs + staggered fade-in animation, update Home.jsx header/steps, and add the component to the CogniChat product page hero.

**Tech Stack:** React, Framer Motion, Tailwind CSS, Lucide React, react-icons (SiWhatsapp, SiSlack), GlowCard component.

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/data/showcaseConversations.js` | Create | Channel configs (icon, label, color) and conversation scripts for all 4 channels |
| `src/components/MultiChannelShowcase.jsx` | Create | Fixed-height showcase with channel tabs, staggered fade-in, auto-cycling |
| `src/pages/Home.jsx` | Modify (lines 1-5 imports, 698-790 section) | Swap import, update header text, update workflow step text |
| `src/pages/products/WebChatbot.jsx` | Modify (lines 129-131, after CTA buttons) | Add MultiChannelShowcase in compact mode below hero CTAs |
| `src/components/AIConversationFlow.jsx` | Delete | Replaced by MultiChannelShowcase |

---

### Task 1: Create Showcase Conversations Data

**Files:**
- Create: `frontend/src/data/showcaseConversations.js`

- [ ] **Step 1: Create the data file**

```js
import { MessageSquare, Smartphone } from 'lucide-react'
import { SiWhatsapp, SiSlack } from 'react-icons/si'

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
  {
    id: 'slack',
    label: 'Slack',
    icon: SiSlack,
    statusLabel: '#customer-support',
    headerTitle: 'CogniDrift AI',
  },
]

export const conversations = {
  webchat: [
    { type: 'user', text: "Hi, I'd like to book a consultation" },
    { type: 'ai', text: 'Of course! What service are you interested in?' },
    { type: 'user', text: 'Dental cleaning' },
    { type: 'ai', text: 'I have openings Thursday at 2pm and Friday at 10am. Which works better?' },
  ],
  sms: [
    { type: 'ai', text: 'Hi Sarah! Quick reminder: your appointment is tomorrow at 2pm. Reply YES to confirm.' },
    { type: 'user', text: 'YES' },
    { type: 'ai', text: 'Confirmed! See you tomorrow. Reply HELP if you need to reschedule.' },
  ],
  whatsapp: [
    { type: 'user', text: 'What are your pricing plans?' },
    { type: 'ai', text: 'We have 3 plans starting at $29/mo. Would you like me to send the full comparison?' },
    { type: 'user', text: 'Yes please' },
    { type: 'ai', text: 'Here you go: cognidrift.com/pricing -- want me to schedule a quick walkthrough?' },
  ],
  slack: [
    { type: 'ai', text: 'New lead from website chat: Sarah Johnson, interested in dental cleaning. Intent: High.' },
    { type: 'ai', text: 'Appointment booked: Thursday 2pm. Confirmation sent via SMS.' },
    { type: 'user', text: "Thanks, I'll follow up with her tomorrow" },
    { type: 'ai', text: "Got it -- I've added a follow-up reminder to your calendar for tomorrow 9am." },
  ],
}
```

- [ ] **Step 2: Verify file loads**

Run: `cd frontend && npx vite build 2>&1 | tail -5`
Expected: Build succeeds (unused imports are tree-shaken, no errors).

- [ ] **Step 3: Commit**

```bash
git add src/data/showcaseConversations.js
git commit -m "feat: add multi-channel showcase conversation data"
```

---

### Task 2: Create MultiChannelShowcase Component

**Files:**
- Create: `frontend/src/components/MultiChannelShowcase.jsx`

This component replaces `AIConversationFlow.jsx`. It keeps the same visual shell (GlowCard, glass-morphism, message bubbles, avatars) but adds fixed height, channel tabs, staggered fade-in, and auto-cycling.

- [ ] **Step 1: Create the component file**

```jsx
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { BsRobot } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { useState, useEffect, useCallback, useRef } from 'react'
import GlowCard from './ui/GlowCard'
import { channels, conversations } from '../data/showcaseConversations'

const MESSAGE_STAGGER_DELAYS = [0.3, 0.8, 1.4, 2.0]
const HOLD_DURATION = 4000
const CYCLE_INTERVAL = 8000
const TYPING_INDICATOR_DURATION = 600

const MultiChannelShowcase = ({ compact = false }) => {
  const [activeChannelIndex, setActiveChannelIndex] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [showTypingIndicator, setShowTypingIndicator] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const cycleTimerRef = useRef(null)
  const animationTimerRef = useRef(null)

  const displayChannels = compact ? channels.slice(0, 3) : channels
  const activeChannel = displayChannels[activeChannelIndex]
  const activeConversation = conversations[activeChannel.id]

  const clearTimers = useCallback(() => {
    if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current)
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current)
  }, [])

  const startMessageSequence = useCallback(() => {
    setVisibleMessages(0)
    setShowTypingIndicator(false)

    const msgs = activeConversation
    let currentMsg = 0

    const showNext = () => {
      if (currentMsg >= msgs.length) {
        animationTimerRef.current = setTimeout(() => {
          setActiveChannelIndex(prev => (prev + 1) % displayChannels.length)
        }, HOLD_DURATION)
        return
      }

      const delay = MESSAGE_STAGGER_DELAYS[currentMsg] || (currentMsg * 0.6 + 0.3)
      const delayMs = delay * 1000

      if (currentMsg > 0 && msgs[currentMsg].type === 'ai') {
        animationTimerRef.current = setTimeout(() => {
          setShowTypingIndicator(true)
          animationTimerRef.current = setTimeout(() => {
            setShowTypingIndicator(false)
            currentMsg++
            setVisibleMessages(currentMsg)
            showNext()
          }, TYPING_INDICATOR_DURATION)
        }, delayMs - TYPING_INDICATOR_DURATION)
      } else {
        animationTimerRef.current = setTimeout(() => {
          currentMsg++
          setVisibleMessages(currentMsg)
          showNext()
        }, delayMs)
      }
    }

    showNext()
  }, [activeConversation, displayChannels.length])

  useEffect(() => {
    if (!hasStarted) return
    clearTimers()
    setVisibleMessages(0)
    setShowTypingIndicator(false)

    const startDelay = setTimeout(() => {
      startMessageSequence()
    }, 300)

    return () => {
      clearTimers()
      clearTimeout(startDelay)
    }
  }, [activeChannelIndex, hasStarted, clearTimers, startMessageSequence])

  const handleTabClick = useCallback((index) => {
    if (index === activeChannelIndex) return
    clearTimers()
    setActiveChannelIndex(index)
  }, [activeChannelIndex, clearTimers])

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
              className={`relative backdrop-blur-xl bg-gradient-to-br from-indigo-50/60 via-purple-50/60 to-pink-50/60 rounded-2xl p-4 shadow-sm border border-white/40 ${containerHeight} overflow-hidden`}
              style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none" />

              {/* Header */}
              <div className="relative flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <ChannelIcon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{activeChannel.headerTitle}</p>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                      <span className="text-xs text-gray-600">{activeChannel.statusLabel}</span>
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

              {/* Channel Tabs */}
              <div className="relative flex gap-2 mb-4">
                {displayChannels.map((channel, index) => {
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

              {/* Messages */}
              <div className="relative space-y-3 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChannel.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {activeConversation.slice(0, visibleMessages).map((msg, i) => (
                      <motion.div
                        key={`${activeChannel.id}-${i}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-end gap-2 max-w-[80%]">
                          {msg.type === 'ai' && (
                            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                              <BsRobot className="w-7 h-7 text-purple-600" />
                            </div>
                          )}
                          <div>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className={`px-3.5 py-2.5 rounded-2xl ${
                                msg.type === 'user'
                                  ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-br-sm shadow-lg'
                                  : 'bg-white/50 backdrop-blur-sm text-gray-800 rounded-bl-sm border border-white/40 shadow-lg'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{msg.text}</p>
                            </motion.div>
                            {activeChannel.showCheckMarks && msg.type === 'ai' && (
                              <div className="flex justify-end gap-0.5 mt-0.5 mr-1">
                                <Check className="w-3 h-3 text-blue-400" />
                                <Check className="w-3 h-3 text-blue-400 -ml-1.5" />
                              </div>
                            )}
                          </div>
                          {msg.type === 'user' && (
                            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                              <FaUserCircle className="w-7 h-7 text-blue-500" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {showTypingIndicator && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-end gap-2"
                      >
                        <div className="w-7 h-7 flex items-center justify-center">
                          <BsRobot className="w-7 h-7 text-purple-600" />
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-sm border border-white/40 shadow-lg">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                                className="w-2 h-2 bg-purple-400 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
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

- [ ] **Step 2: Verify build**

Run: `cd frontend && npx vite build 2>&1 | tail -5`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/MultiChannelShowcase.jsx
git commit -m "feat: add MultiChannelShowcase component with channel tabs and fixed height"
```

---

### Task 3: Update Homepage Section

**Files:**
- Modify: `frontend/src/pages/Home.jsx`

Three changes: swap import, update section header text, update workflow step text.

- [ ] **Step 1: Update the import**

Find this import (near the top of Home.jsx, around line 15-17):
```jsx
import AIConversationFlow from '../components/AIConversationFlow'
```

Replace with:
```jsx
import MultiChannelShowcase from '../components/MultiChannelShowcase'
```

- [ ] **Step 2: Update the section header**

Find (lines 708-720):
```jsx
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
            >
              <Zap className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">AI Chatting</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="section-title hero-display">
              Your AI<span className="text-gradient"> Web Widget</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              A simple, powerful process that transforms how you answer queries.
            </motion.p>
```

Replace with:
```jsx
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
            >
              <Zap className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">AI Assistant</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="section-title hero-display">
              Every Customer Answered.<span className="text-gradient"> Every Channel Covered.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              Your AI handles conversations on web chat, text, WhatsApp, and more -- capturing leads and booking appointments while you sleep.
            </motion.p>
```

- [ ] **Step 3: Update the workflow steps**

Find (lines 733-737):
```jsx
              {[
                { icon: Phone, title: 'Visitor Arrives', desc: 'Customer visits your website', color: 'blue', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500' },
                { icon: Bot, title: 'Widget Appears', desc: 'AI chat widget greets instantly', color: 'purple', bgColor: 'bg-purple-500/10', textColor: 'text-purple-500' },
                { icon: Calendar, title: 'Smart Assistance', desc: 'Answers questions, books appointments', color: 'indigo', bgColor: 'bg-indigo-500/10', textColor: 'text-indigo-500' },
                { icon: Bell, title: 'Lead Captured', desc: 'Information saved, ready to convert', color: 'green', bgColor: 'bg-green-500/10', textColor: 'text-green-500' }
              ].map((step, i) => (
```

Replace with:
```jsx
              {[
                { icon: Phone, title: 'Customer Reaches Out', desc: 'On your website, SMS, WhatsApp, or Slack -- your AI is already there.', color: 'blue', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500' },
                { icon: Bot, title: 'AI Responds Instantly', desc: 'Answers questions, shares info, and sounds like your best employee.', color: 'purple', bgColor: 'bg-purple-500/10', textColor: 'text-purple-500' },
                { icon: Calendar, title: 'Captures & Qualifies', desc: 'Collects contact details, understands intent, and scores every lead.', color: 'indigo', bgColor: 'bg-indigo-500/10', textColor: 'text-indigo-500' },
                { icon: Bell, title: 'Resolves or Hands Off', desc: 'Books the appointment, answers the FAQ, or transfers to your team with full context.', color: 'green', bgColor: 'bg-green-500/10', textColor: 'text-green-500' }
              ].map((step, i) => (
```

- [ ] **Step 4: Update the component usage**

Find (line 771):
```jsx
              <AIConversationFlow />
```

Replace with:
```jsx
              <MultiChannelShowcase />
```

- [ ] **Step 5: Verify build**

Run: `cd frontend && npx vite build 2>&1 | tail -5`
Expected: Build succeeds.

- [ ] **Step 6: Verify visually**

Run the dev server (`npx vite --port 5180`) and navigate to `http://localhost:5180`. Scroll to the "Every Customer Answered" section and verify:
1. The section header shows the new text
2. The workflow steps show the new titles and descriptions
3. The MultiChannelShowcase renders with channel tabs
4. Messages fade in one by one
5. After all messages show, it auto-cycles to the next channel
6. The container height stays fixed (no layout shift)
7. Clicking a tab manually switches channels

- [ ] **Step 7: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: update homepage to use MultiChannelShowcase with new header copy"
```

---

### Task 4: Add Showcase to CogniChat Product Page

**Files:**
- Modify: `frontend/src/pages/products/WebChatbot.jsx`

Add the MultiChannelShowcase in compact mode below the hero CTA buttons.

- [ ] **Step 1: Add the import**

At the top of `WebChatbot.jsx`, add after the existing imports (around line 6):
```jsx
import MultiChannelShowcase from '../../components/MultiChannelShowcase'
```

- [ ] **Step 2: Add the showcase below CTAs**

Find the closing `</div>` of the CTA buttons section (line 130):
```jsx
            </div>
          </motion.div>
        </div>
      </section>
```

Insert the showcase between `</div>` (end of CTA buttons) and `</motion.div>`:
```jsx
            </div>

            {/* Multi-Channel Showcase */}
            <div className="mt-10 sm:mt-12 max-w-xl mx-auto">
              <MultiChannelShowcase compact />
            </div>
          </motion.div>
        </div>
      </section>
```

- [ ] **Step 3: Verify build**

Run: `cd frontend && npx vite build 2>&1 | tail -5`
Expected: Build succeeds.

- [ ] **Step 4: Verify visually**

Navigate to `http://localhost:5180/products/web-chatbot` and verify:
1. The showcase renders below the CTA buttons
2. It uses the compact height (shorter than homepage)
3. Only 3 tabs show (Web Chat, SMS, WhatsApp -- no Slack)
4. Channel cycling and message animation work correctly

- [ ] **Step 5: Commit**

```bash
git add src/pages/products/WebChatbot.jsx
git commit -m "feat: add compact MultiChannelShowcase to CogniChat hero"
```

---

### Task 5: Remove Old Component

**Files:**
- Delete: `frontend/src/components/AIConversationFlow.jsx`

- [ ] **Step 1: Delete the old file**

```bash
git rm src/components/AIConversationFlow.jsx
```

- [ ] **Step 2: Verify no other imports reference it**

```bash
grep -rn "AIConversationFlow" src/ --include="*.jsx" --include="*.js"
```

Expected: No results. If any file still imports it, update that import to use `MultiChannelShowcase`.

- [ ] **Step 3: Verify build**

Run: `cd frontend && npx vite build 2>&1 | tail -5`
Expected: Build succeeds with no missing module errors.

- [ ] **Step 4: Commit**

```bash
git rm src/components/AIConversationFlow.jsx
git commit -m "chore: remove old AIConversationFlow component"
```

---

### Task 6: Final Verification

- [ ] **Step 1: Full build check**

```bash
cd frontend && npx vite build 2>&1 | tail -10
```
Expected: Clean build, no warnings about missing imports.

- [ ] **Step 2: Visual verification on Homepage**

Navigate to `http://localhost:5180/` and scroll to the showcase section:
1. Header reads "Every Customer Answered. Every Channel Covered."
2. Badge reads "AI ASSISTANT"
3. Workflow steps have new titles and descriptions
4. Widget has 4 channel tabs (Web Chat, SMS, WhatsApp, Slack)
5. Messages stagger in smoothly
6. Auto-cycles to next channel after messages complete + 4s hold
7. No layout shift during any animation
8. Clicking tabs switches channels immediately

- [ ] **Step 3: Visual verification on CogniChat page**

Navigate to `http://localhost:5180/products/web-chatbot`:
1. Showcase appears below CTA buttons in the hero
2. Compact height (shorter than homepage version)
3. Only 3 tabs (Web Chat, SMS, WhatsApp)
4. Same animation behavior as homepage

- [ ] **Step 4: Navigation test**

Navigate between pages (Home -> About -> Home -> CogniChat) and verify:
1. No page flickering on navigation
2. Showcase re-triggers animation when scrolled into view
3. No console errors
