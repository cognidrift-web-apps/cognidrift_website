# CogniHub Showcase Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite CogniHubShowcase.jsx as a single-flow, non-interactive marketing demo with typing animation, upgraded rich content, and real brand icons. Update Home.jsx section description and add model icon grid to "Pick Your Model" step.

**Architecture:** Single conversation auto-plays in a 420px glass-morphism panel. User messages type char-by-char in the input field then animate up as sent bubbles. AI responses include an upgraded bar chart and new summary table. Model breadth shown via icon pills in the left column, not in the demo itself.

**Tech Stack:** React 18, Framer Motion, Tailwind CSS, Lucide icons, react-icons (SiOpenai, SiMeta), inline SVGs for Claude/Gemini/Mistral/DeepSeek.

---

### Task 1: Rewrite CogniHubShowcase.jsx

**Files:**
- Rewrite: `src/components/CogniHubShowcase.jsx`

- [ ] **Step 1: Delete all existing code and write the new component shell**

Replace the entire file with:

```jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { BarChart3, Table2 } from 'lucide-react'
import { SiOpenai } from 'react-icons/si'
import GlowCard from './ui/GlowCard'

const MESSAGES = [
  { role: 'user', text: 'Analyze our Q1 sales and show regional breakdown' },
  { role: 'ai', text: "Here's your Q1 regional sales analysis:" },
  { role: 'ai', text: '', richContent: 'chart' },
  { role: 'ai', text: '', richContent: 'table' },
  { role: 'user', text: 'Which region should we focus on next quarter?' },
  { role: 'ai', text: 'West region shows the strongest momentum at +34% growth. I\'d recommend increasing investment there while investigating the North region\'s decline.' },
]

const CHAR_DELAY = 40
const PAUSE_AFTER_TYPING = 300
const AI_MESSAGE_DELAY = 800
const AI_TYPING_DELAY = 600
const HOLD_AFTER_COMPLETE = 4000

const SalesChart = () => {
  const bars = [
    { label: 'West', pct: 85, color: 'from-blue-400 to-blue-500', value: '$2.1M' },
    { label: 'East', pct: 62, color: 'from-cyan-400 to-cyan-500', value: '$1.5M' },
    { label: 'North', pct: 45, color: 'from-teal-400 to-teal-500', value: '$1.1M' },
    { label: 'South', pct: 72, color: 'from-indigo-400 to-indigo-500', value: '$1.8M' },
  ]

  return (
    <div className="mt-2 bg-white/90 rounded-xl border border-blue-100 p-3 shadow-sm">
      <div className="flex items-center gap-1.5 mb-3">
        <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-[10px] font-bold text-gray-700">Q1 Revenue by Region</span>
      </div>
      <div className="relative">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-b border-gray-100 w-full" />
          ))}
        </div>
        <div className="relative flex items-end gap-3 h-[64px]">
          {bars.map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${bar.pct}%` }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                className={`w-full rounded-t bg-gradient-to-t ${bar.color} relative`}
              >
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] font-bold text-gray-500 whitespace-nowrap">
                  {bar.value}
                </span>
              </motion.div>
              <span className="text-[8px] text-gray-400 font-medium">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SummaryTable = () => {
  const rows = [
    { metric: 'Total Revenue', value: '$6.5M', change: '+18%' },
    { metric: 'QoQ Growth', value: '18.2%', change: '+4.1pp' },
    { metric: 'Top Region', value: 'West', change: '+34%' },
  ]

  return (
    <div className="mt-2 bg-white/90 rounded-xl border border-blue-100 p-3 shadow-sm">
      <div className="flex items-center gap-1.5 mb-2">
        <Table2 className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-[10px] font-bold text-gray-700">Performance Summary</span>
      </div>
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-2.5 py-1.5 font-semibold text-gray-600">Metric</th>
              <th className="text-right px-2.5 py-1.5 font-semibold text-gray-600">Value</th>
              <th className="text-right px-2.5 py-1.5 font-semibold text-gray-600">Change</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i < rows.length - 1 ? 'border-b border-gray-100' : ''}>
                <td className="px-2.5 py-1.5 text-gray-700 font-medium">{row.metric}</td>
                <td className="px-2.5 py-1.5 text-right text-gray-900 font-semibold">{row.value}</td>
                <td className="px-2.5 py-1.5 text-right text-green-600 font-semibold">{row.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const RichContent = ({ type }) => {
  switch (type) {
    case 'chart': return <SalesChart />
    case 'table': return <SummaryTable />
    default: return null
  }
}

const CogniHubShowcase = () => {
  const [visibleMessages, setVisibleMessages] = useState([])
  const [typingText, setTypingText] = useState('')
  const [isTypingInInput, setIsTypingInInput] = useState(false)
  const timerRef = useRef(null)
  const scrollRef = useRef(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [])

  const typeInInput = useCallback((text) => {
    return new Promise((resolve) => {
      let i = 0
      setIsTypingInInput(true)
      setTypingText('')
      const typeChar = () => {
        if (i < text.length) {
          i++
          setTypingText(text.slice(0, i))
          timerRef.current = setTimeout(typeChar, CHAR_DELAY)
        } else {
          timerRef.current = setTimeout(() => {
            setIsTypingInInput(false)
            setTypingText('')
            resolve()
          }, PAUSE_AFTER_TYPING)
        }
      }
      timerRef.current = setTimeout(typeChar, 200)
    })
  }, [])

  const runSequence = useCallback(async () => {
    setVisibleMessages([])
    setTypingText('')
    setIsTypingInInput(false)

    for (let i = 0; i < MESSAGES.length; i++) {
      const msg = MESSAGES[i]

      if (msg.role === 'user') {
        await typeInInput(msg.text)
        setVisibleMessages(prev => [...prev, msg])
        await new Promise(r => { timerRef.current = setTimeout(r, 500) })
        setTimeout(scrollToBottom, 50)
      } else {
        await new Promise(r => { timerRef.current = setTimeout(r, i === 1 ? AI_TYPING_DELAY : AI_MESSAGE_DELAY) })
        setVisibleMessages(prev => [...prev, msg])
        setTimeout(scrollToBottom, 50)
        if (msg.richContent) {
          await new Promise(r => { timerRef.current = setTimeout(r, 300) })
        }
      }
    }

    await new Promise(r => { timerRef.current = setTimeout(r, HOLD_AFTER_COMPLETE) })
    runSequence()
  }, [typeInInput, scrollToBottom])

  useEffect(() => {
    const startTimer = setTimeout(() => runSequence(), 800)
    return () => {
      clearTimeout(startTimer)
      clearTimer()
    }
  }, [runSequence, clearTimer])

  return (
    <div className="relative w-full pointer-events-none select-none">
      <GlowCard glowColor="cyan-purple" glowSize="md">
        <div className="relative bg-white p-3 lg:p-4 overflow-hidden">
          <div className="relative z-10">
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-50/60 via-blue-50/60 to-indigo-50/60 rounded-2xl shadow-sm border border-white/40 h-[420px] flex flex-col overflow-hidden">

              {/* Top Bar */}
              <div className="px-4 py-2.5 border-b border-gray-100/80 flex items-center justify-between bg-white/60 backdrop-blur-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 shadow-sm">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-[#10a37f]">
                    <SiOpenai className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-blue-700">GPT-4o</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-gray-400 font-medium">Connected</span>
                </div>
              </div>

              {/* Top fade mask */}
              <div className="absolute top-[46px] left-0 right-0 h-6 bg-gradient-to-b from-white/80 to-transparent z-10 pointer-events-none" />

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
                <AnimatePresence mode="popLayout">
                  {visibleMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {msg.role === 'user' ? (
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-[#10a37f]">
                            <SiOpenai className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}

                        <div>
                          {msg.role === 'user' ? (
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl rounded-tr-sm px-3.5 py-2.5 border border-white/40 shadow-md">
                              <p className="text-sm text-gray-800 leading-relaxed">{msg.text}</p>
                            </div>
                          ) : (
                            <div>
                              {msg.text && (
                                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-lg">
                                  <p className="text-sm leading-relaxed">{msg.text}</p>
                                </div>
                              )}
                              {msg.richContent && <RichContent type={msg.richContent} />}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input Bar */}
              <div className="px-4 py-3 border-t border-gray-100/80 bg-white/60 backdrop-blur-sm flex items-center gap-3">
                <div className="flex-1 bg-white rounded-xl px-4 py-2.5 border border-gray-200 text-sm min-h-[40px] flex items-center">
                  {isTypingInInput ? (
                    <span className="text-gray-800">{typingText}<span className="inline-block w-0.5 h-4 bg-gray-800 ml-0.5 animate-pulse" /></span>
                  ) : (
                    <span className="text-gray-400">Ask anything...</span>
                  )}
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  )
}

export default CogniHubShowcase
```

- [ ] **Step 2: Verify the build compiles**

Run: `cd /Users/qratul/research_and_dev/cognidrift_website/frontend && npx vite build 2>&1 | tail -20`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/CogniHubShowcase.jsx
git commit -m "feat: rewrite CogniHub demo as single-flow non-interactive showcase

Replace multi-model cycling demo with single conversation flow.
Add typing animation in input field, upgraded bar chart with grid
lines, new summary table component. Remove all clickable elements.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 2: Update Home.jsx — description + model icon grid

**Files:**
- Modify: `src/pages/Home.jsx` (CogniHub section, lines ~639-731)

- [ ] **Step 1: Update the section description**

Find:
```jsx
<motion.p variants={fadeInUp} className="section-subtitle">
  Stop paying for ChatGPT, Claude, and Gemini separately. One dashboard, every model, your whole team.
</motion.p>
```

Replace with:
```jsx
<motion.p variants={fadeInUp} className="section-subtitle">
  One workspace for every AI model. Build custom agents, share with your team, and unify your AI costs.
</motion.p>
```

- [ ] **Step 2: Add model icons to "Pick Your Model" step**

Find the workflow steps array (line ~674) and replace the first step:

```jsx
{ icon: Sparkles, title: 'Pick Your Model', desc: 'Choose GPT, Claude, Gemini, or Mistral from the dropdown', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500' },
```

Replace with:
```jsx
{ icon: Sparkles, title: 'Pick Your Model', desc: 'Choose from leading AI models', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500', showModelIcons: true },
```

- [ ] **Step 3: Add model icons row inside the step renderer**

Find the step description paragraph inside the `.map()` renderer:
```jsx
<p className="text-sm sm:text-base text-text-secondary leading-relaxed">
  {step.desc}
</p>
```

Replace with:
```jsx
<p className="text-sm sm:text-base text-text-secondary leading-relaxed">
  {step.desc}
</p>
{step.showModelIcons && (
  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
    {/* OpenAI */}
    <div className="w-7 h-7 rounded-full bg-[#10a37f] flex items-center justify-center" title="GPT">
      <SiOpenai className="w-3.5 h-3.5 text-white" />
    </div>
    {/* Claude */}
    <div className="w-7 h-7 rounded-full bg-[#d4a27f] flex items-center justify-center" title="Claude">
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.1 11.5L12 3l-4.1 8.5L12 21l4.1-9.5z" />
      </svg>
    </div>
    {/* Gemini */}
    <div className="w-7 h-7 rounded-full bg-[#4285f4] flex items-center justify-center" title="Gemini">
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5L8 14 2 9.5h7.5z" />
      </svg>
    </div>
    {/* Mistral */}
    <div className="w-7 h-7 rounded-full bg-[#f97316] flex items-center justify-center" title="Mistral">
      <span className="text-[10px] font-black text-white">M</span>
    </div>
    {/* Llama */}
    <div className="w-7 h-7 rounded-full bg-[#0668E1] flex items-center justify-center" title="Llama">
      <SiMeta className="w-3.5 h-3.5 text-white" />
    </div>
    {/* DeepSeek */}
    <div className="w-7 h-7 rounded-full bg-[#7c3aed] flex items-center justify-center" title="DeepSeek">
      <span className="text-[9px] font-black text-white">DS</span>
    </div>
  </div>
)}
```

- [ ] **Step 4: Add SiMeta import**

Find the react-icons import line in Home.jsx and add `SiMeta`. Find:
```jsx
import { SiOpenai } from 'react-icons/si'
```

If SiOpenai is not currently imported, add a new import line. If there's an existing react-icons import, add SiMeta to it. The exact import will depend on what's already there. Add:
```jsx
import { SiMeta } from 'react-icons/si'
```

Also ensure `SiOpenai` is imported if the model icons use it.

- [ ] **Step 5: Verify the build compiles**

Run: `cd /Users/qratul/research_and_dev/cognidrift_website/frontend && npx vite build 2>&1 | tail -20`
Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: update CogniHub section description and add model icon grid

New description mentions agent building, team sharing, unified costs.
Pick Your Model step now shows 6 brand icons (GPT, Claude, Gemini,
Mistral, Llama, DeepSeek) as colored pills.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 3: Visual verification

**Files:** None (verification only)

- [ ] **Step 1: Start dev server and check in browser**

Run: `cd /Users/qratul/research_and_dev/cognidrift_website/frontend && npx vite --port 3000`

Open `http://localhost:3000` and scroll to the CogniHub section.

Verify:
1. Section header shows updated description mentioning agents, sharing, costs
2. "Pick Your Model" step shows 6 model icon pills in a row
3. Demo panel shows single conversation auto-playing
4. User messages type char-by-char in input field then animate up as bubbles
5. AI responses appear with chart and table rich content
6. Bar chart has grid lines, value labels, animated bars
7. Summary table has header row, 3 data rows with green change values
8. Nothing in the demo is clickable (pointer-events-none)
9. Top bar shows static "GPT-4o" badge with no dropdown
10. Conversation loops after hold period
11. Demo height is ~420px, visually consistent with other section demos
12. No regressions in other homepage sections

- [ ] **Step 2: Check mobile responsiveness**

Resize browser to 375px width. Verify:
1. Layout stacks to single column
2. Model icon pills wrap if needed
3. Demo panel is full width and readable
4. No horizontal overflow

- [ ] **Step 3: Final build check**

Run: `cd /Users/qratul/research_and_dev/cognidrift_website/frontend && npx vite build 2>&1 | tail -20`
Expected: Build succeeds, no warnings about CogniHubShowcase.
