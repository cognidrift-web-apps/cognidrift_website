import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { BarChart3, Table2, Bot, Plug, Check, MessageSquare } from 'lucide-react'
import { SiOpenai, SiSalesforce, SiHubspot } from 'react-icons/si'
import GlowCard from './ui/GlowCard'
import { ClaudeIcon, GeminiIcon } from './ui/AIProviderIcons'

const MODELS = [
  {
    id: 'gpt',
    label: 'GPT-4o',
    color: 'bg-[#10a37f]',
    icon: (cls) => <SiOpenai className={cls} />,
  },
  {
    id: 'gemini',
    label: 'Gemini',
    color: 'bg-[#4285f4]',
    icon: (cls) => <GeminiIcon className={cls} />,
  },
  {
    id: 'claude',
    label: 'Claude',
    color: 'bg-[#D97757]',
    icon: (cls) => <ClaudeIcon className={cls} />,
  },
]

const MESSAGES = [
  { role: 'user', text: 'Set up a sales agent with Salesforce and HubSpot' },
  { role: 'ai', text: 'Sales Agent configured with your integrations:', richContent: 'agentCard' },
  { role: 'user', text: 'Analyze Q1 performance across regions' },
  { role: 'ai', text: "Here's the Q1 regional breakdown:" },
  { role: 'ai', text: '', richContent: 'areaChart' },
  { role: 'ai', text: '', richContent: 'table' },
  { role: 'user', text: 'Push this report to Salesforce' },
  { role: 'ai', text: 'Done! Report synced to your Salesforce dashboard. Your team has been notified.' },
]

const CHAR_DELAY = 40
const PAUSE_AFTER_TYPING = 300
const AI_MESSAGE_DELAY = 800
const AI_TYPING_DELAY = 600
const HOLD_AFTER_COMPLETE = 4000
const MODEL_SWITCH_DELAY = 700

const AgentCard = () => {
  const integrations = [
    { name: 'Salesforce', icon: SiSalesforce, color: '#00A1E0' },
    { name: 'HubSpot', icon: SiHubspot, color: '#FF7A59' },
  ]

  return (
    <div className="mt-2 bg-white/90 rounded-xl border border-blue-100 p-3 shadow-sm">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-800">Sales Analyst Agent</p>
          <p className="text-[9px] text-green-600 font-medium flex items-center gap-0.5">
            <Check className="w-2.5 h-2.5" /> Active
          </p>
        </div>
      </div>
      <div className="space-y-1.5">
        {integrations.map((int) => (
          <div key={int.name} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-50 border border-gray-100">
            <int.icon className="w-3.5 h-3.5" style={{ color: int.color }} />
            <span className="text-[10px] font-medium text-gray-700">{int.name}</span>
            <div className="ml-auto flex items-center gap-1">
              <Plug className="w-2.5 h-2.5 text-green-500" />
              <span className="text-[8px] text-green-600 font-semibold">Connected</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const AreaChart = () => {
  const regions = [
    { label: 'West', data: [1.2, 1.4, 1.7, 2.1], color: '#3b82f6', gradient: ['#3b82f620', '#3b82f605'] },
    { label: 'South', data: [1.0, 1.2, 1.5, 1.8], color: '#6366f1', gradient: ['#6366f118', '#6366f105'] },
    { label: 'East', data: [1.1, 1.2, 1.3, 1.5], color: '#06b6d4', gradient: ['#06b6d415', '#06b6d405'] },
    { label: 'North', data: [1.3, 1.2, 1.1, 1.1], color: '#94a3b8', gradient: ['#94a3b812', '#94a3b805'] },
  ]
  const quarters = ['Q2 \'25', 'Q3 \'25', 'Q4 \'25', 'Q1 \'26']
  const w = 240
  const h = 80
  const padL = 24
  const padR = 8
  const padT = 8
  const padB = 4
  const plotW = w - padL - padR
  const plotH = h - padT - padB

  const maxVal = 2.3
  const minVal = 0.8
  const toX = (i) => padL + (i / 3) * plotW
  const toY = (v) => padT + plotH - ((v - minVal) / (maxVal - minVal)) * plotH

  const makePath = (data) => {
    const pts = data.map((v, i) => ({ x: toX(i), y: toY(v) }))
    let d = `M${pts[0].x},${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1]
      const curr = pts[i]
      const cpx = (prev.x + curr.x) / 2
      d += ` C${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`
    }
    return d
  }

  const makeArea = (data) => {
    const line = makePath(data)
    const lastX = toX(data.length - 1)
    const firstX = toX(0)
    const bottom = padT + plotH
    return `${line} L${lastX},${bottom} L${firstX},${bottom} Z`
  }

  const yTicks = [1.0, 1.5, 2.0]

  return (
    <div className="mt-2 bg-white/90 rounded-xl border border-blue-100 p-3 shadow-sm">
      <div className="flex items-center gap-1.5 mb-2">
        <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-[10px] font-bold text-gray-700">Revenue Trend by Region ($M)</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h + 14}`} className="w-full">
        <defs>
          {regions.map((r) => (
            <linearGradient key={r.label} id={`grad-${r.label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={r.gradient[0]} />
              <stop offset="100%" stopColor={r.gradient[1]} />
            </linearGradient>
          ))}
        </defs>

        {/* Y-axis ticks */}
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={padL} y1={toY(v)} x2={w - padR} y2={toY(v)} stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="3 2" />
            <text x={padL - 3} y={toY(v) + 2} textAnchor="end" style={{ fontSize: '5.5px' }} className="fill-gray-400">
              {v.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Area fills */}
        {regions.map((r) => (
          <motion.path
            key={`area-${r.label}`}
            d={makeArea(r.data)}
            fill={`url(#grad-${r.label})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        ))}

        {/* Lines */}
        {regions.map((r, ri) => (
          <motion.path
            key={`line-${r.label}`}
            d={makePath(r.data)}
            fill="none"
            stroke={r.color}
            strokeWidth={ri === 0 ? 2 : 1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.15 + ri * 0.1, ease: 'easeOut' }}
          />
        ))}

        {/* End dots */}
        {regions.map((r, ri) => (
          <motion.circle
            key={`dot-${r.label}`}
            cx={toX(3)}
            cy={toY(r.data[3])}
            r={ri === 0 ? 3 : 2}
            fill="white"
            stroke={r.color}
            strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          />
        ))}

        {/* Value labels on last points */}
        {regions.slice(0, 2).map((r) => (
          <motion.text
            key={`val-${r.label}`}
            x={toX(3) + 5}
            y={toY(r.data[3]) + 2}
            style={{ fontSize: '5.5px', fontWeight: 700 }}
            fill={r.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ${r.data[3]}M
          </motion.text>
        ))}

        {/* Quarter labels */}
        {quarters.map((q, i) => (
          <text key={q} x={toX(i)} y={h + 10} textAnchor="middle" className="fill-gray-400" style={{ fontSize: '5.5px' }}>
            {q}
          </text>
        ))}
      </svg>
      {/* Legend */}
      <div className="flex items-center gap-3 mt-1 flex-wrap">
        {regions.map((r) => (
          <div key={r.label} className="flex items-center gap-1">
            <div className="w-3 h-[2px] rounded-full" style={{ backgroundColor: r.color }} />
            <span className="text-[8px] font-medium text-gray-500">{r.label}</span>
          </div>
        ))}
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
    case 'agentCard': return <AgentCard />
    case 'areaChart': return <AreaChart />
    case 'table': return <SummaryTable />
    default: return null
  }
}

const CogniHubShowcase = ({ compact = false }) => {
  const [visibleMessages, setVisibleMessages] = useState([])
  const [typingText, setTypingText] = useState('')
  const [isTypingInInput, setIsTypingInInput] = useState(false)
  const [activeModelIndex, setActiveModelIndex] = useState(-1)
  const [activeTab, setActiveTab] = useState('chat')
  const timerRef = useRef(null)
  const charTimerRef = useRef(null)
  const scrollRef = useRef(null)

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (charTimerRef.current) {
      clearTimeout(charTimerRef.current)
      charTimerRef.current = null
    }
  }, [])

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const delay = (ms) => new Promise((resolve) => {
      timerRef.current = setTimeout(() => {
        if (!cancelled) resolve()
      }, ms)
    })

    const typeInInput = (text) => new Promise((resolve) => {
      let i = 0
      setIsTypingInInput(true)
      setTypingText('')
      const typeChar = () => {
        if (cancelled) return
        if (i < text.length) {
          i++
          setTypingText(text.slice(0, i))
          charTimerRef.current = setTimeout(typeChar, CHAR_DELAY)
        } else {
          charTimerRef.current = setTimeout(() => {
            if (cancelled) return
            setIsTypingInInput(false)
            setTypingText('')
            resolve()
          }, PAUSE_AFTER_TYPING)
        }
      }
      charTimerRef.current = setTimeout(typeChar, 200)
    })

    const runSequence = async () => {
      while (!cancelled) {
        setVisibleMessages([])
        setTypingText('')
        setIsTypingInInput(false)
        setActiveModelIndex(-1)
        setActiveTab('chat')

        await delay(600)

        for (let m = 0; m < MODELS.length; m++) {
          if (cancelled) return
          setActiveModelIndex(m)
          await delay(MODEL_SWITCH_DELAY)
        }

        await delay(400)

        for (let i = 0; i < MESSAGES.length; i++) {
          if (cancelled) return
          const msg = MESSAGES[i]

          if (msg.role === 'user') {
            await typeInInput(msg.text)
            if (cancelled) return
            setVisibleMessages(prev => [...prev, msg])
            await delay(500)
            setTimeout(scrollToBottom, 50)
          } else {
            await delay(i <= 1 ? AI_TYPING_DELAY : AI_MESSAGE_DELAY)
            if (cancelled) return
            if (msg.richContent === 'agentCard') setActiveTab('agents')
            if (msg.richContent === 'areaChart') setActiveTab('chat')
            setVisibleMessages(prev => [...prev, msg])
            setTimeout(scrollToBottom, 50)
            if (msg.richContent) {
              await delay(400)
              setTimeout(scrollToBottom, 50)
            }
          }
        }

        if (cancelled) return
        await delay(HOLD_AFTER_COMPLETE)
      }
    }

    const startTimer = setTimeout(() => {
      if (!cancelled) runSequence()
    }, 800)

    return () => {
      cancelled = true
      clearTimeout(startTimer)
      clearTimers()
    }
  }, [clearTimers, scrollToBottom])

  const activeModel = activeModelIndex >= 0 ? MODELS[activeModelIndex] : null

  return (
    <div className="relative w-full pointer-events-none select-none">
      <GlowCard glowColor="cyan-purple" glowSize="md">
        <div className="relative bg-white p-3 lg:p-4 overflow-hidden">
          <div className="relative z-10">
            <div className={`relative backdrop-blur-xl bg-gradient-to-br from-slate-50/60 via-blue-50/60 to-indigo-50/60 rounded-2xl shadow-sm border border-white/40 ${compact ? 'h-[360px]' : 'h-[420px]'} flex flex-col overflow-hidden`}>

              {/* Top Bar */}
              <div className="px-3 py-2 border-b border-gray-100/80 flex items-center justify-between bg-white/60 backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  {/* Model selector pill */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 shadow-sm min-w-[100px] h-[30px]">
                    <AnimatePresence mode="wait">
                      {activeModel ? (
                        <motion.div
                          key={activeModel.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-center gap-1.5"
                        >
                          <div className={`w-4.5 h-4.5 rounded flex items-center justify-center ${activeModel.color}`}>
                            {activeModel.icon('w-2.5 h-2.5 text-white')}
                          </div>
                          <span className="text-[11px] font-semibold text-blue-700">{activeModel.label}</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="placeholder"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-[11px] text-gray-400"
                        >
                          Select model...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-5 bg-gray-200" />

                  {/* Tab pills */}
                  <div className="flex items-center gap-1">
                    <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-300 ${
                      activeTab === 'chat'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'text-gray-400'
                    }`}>
                      <MessageSquare className="w-3 h-3" />
                      <span>Chat</span>
                    </div>
                    <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-300 ${
                      activeTab === 'agents'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'text-gray-400'
                    }`}>
                      <Bot className="w-3 h-3" />
                      <span>Agents</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${activeModel ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`} />
                  <span className="text-[10px] text-gray-400 font-medium">
                    {activeModel ? 'Connected' : 'Idle'}
                  </span>
                </div>
              </div>

              {/* Top fade mask */}
              <div className="absolute top-[46px] left-0 right-0 h-6 bg-gradient-to-b from-white/80 to-transparent z-10 pointer-events-none" />

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
                <AnimatePresence mode="popLayout">
                  {visibleMessages.map((msg, i) => (
                    <motion.div
                      key={`msg-${i}`}
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
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${activeModel?.color || 'bg-gray-300'}`}>
                            {activeModel?.icon('w-3.5 h-3.5 text-white')}
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
                    <span className="text-gray-800">
                      {typingText}
                      <span className="inline-block w-0.5 h-4 bg-gray-800 ml-0.5 animate-pulse" />
                    </span>
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
