import SEOMeta from '../../components/SEOMeta'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Headphones, Monitor, Users, ClipboardList,
  Phone, Calendar, Clock, Star, CheckCircle2, ArrowRight,
  TrendingUp, MessageSquare, Zap, Target, Award, BarChart3,
  Globe, Shield, Cpu, PhoneCall, Settings, Activity
} from 'lucide-react'

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

// Real-time Metrics Dashboard
const LiveMetricsDashboard = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeAgents, setActiveAgents] = useState(0)
  const [callsInQueue, setCallsInQueue] = useState(0)
  const [avgWaitTime, setAvgWaitTime] = useState(0)

  useEffect(() => {
    if (isInView) {
      // Simulate real-time metrics
      const interval = setInterval(() => {
        setActiveAgents(prev => Math.min(prev + Math.floor(Math.random() * 5), 247))
        setCallsInQueue(prev => {
          const newVal = prev + Math.floor(Math.random() * 3) - 1
          return Math.max(0, Math.min(newVal, 12))
        })
        setAvgWaitTime(prev => {
          const newVal = prev + (Math.random() - 0.5) * 2
          return Math.max(0, Math.min(newVal, 5))
        })
      }, 1000)

      // Initialize values
      setActiveAgents(234)
      setCallsInQueue(3)
      setAvgWaitTime(0.8)

      return () => clearInterval(interval)
    }
  }, [isInView])

  return (
    <div ref={ref} className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-text-primary font-semibold">Live Dashboard</h4>
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-green-600 text-xs">Live</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50/70 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{activeAgents}</div>
          <div className="text-xs text-text-secondary mt-1">AI Agents Active</div>
        </div>
        <div className="bg-blue-50/70 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{callsInQueue}</div>
          <div className="text-xs text-text-secondary mt-1">Calls in Queue</div>
        </div>
        <div className="bg-blue-50/70 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{avgWaitTime.toFixed(1)}s</div>
          <div className="text-xs text-text-secondary mt-1">Avg Wait Time</div>
        </div>
      </div>

      {/* Live Call Activity */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-secondary">Call Activity</span>
          <span className="text-xs text-text-muted">Last 60 seconds</span>
        </div>
        <div className="flex items-end gap-1 h-16">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: [
                  `${20 + Math.random() * 80}%`,
                  `${20 + Math.random() * 80}%`,
                  `${20 + Math.random() * 80}%`
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
              className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Animated Wave Visualization
const WaveVisualization = ({ color }) => {
  return (
    <div className="flex items-center justify-center gap-1 h-16 opacity-25">
      {[...Array(12)].map((_, i) => (
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
          className={`w-2 ${color} rounded-full`}
          style={{ height: '100%' }}
        />
      ))}
    </div>
  )
}

// Section Card Component
const SectionCard = ({
  icon: Icon,
  title,
  description,
  features,
  stats,
  visual,
  color,
  bgGradient,
  iconBg,
  accentColor,
  index
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100"
    >
      {/* Top Accent Bar */}
      <div className={`h-1.5 ${accentColor}`} />

      <div className="grid lg:grid-cols-2">
        {/* Content Side */}
        <div className={`p-8 lg:p-10 ${bgGradient}`}>
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg relative`}
            >
              <Icon className={`w-8 h-8 ${color}`} />
              {/* Pulse effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 ${iconBg} rounded-2xl`}
              />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-gray-100"
              >
                <div className={`text-2xl font-bold ${color}`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Features List */}
          <div className="space-y-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3"
              >
                <CheckCircle2 className={`w-5 h-5 ${color} flex-shrink-0`} />
                <span className="text-gray-700 text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Side */}
        <div className="p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-sm"
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const CallCenters = () => {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Call Centers Sections Data
  const sections = [
    {
      icon: Headphones,
      title: "BPO & Contact Centers",
      description: "Scale your operations infinitely with AI agents that never sleep.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      accentColor: "bg-gradient-to-r from-blue-500 to-primary-500",
      stats: [
        { value: 80, suffix: "%", label: "Cost Reduction" },
        { value: 10, suffix: "x", label: "Scalability" },
        { value: 99.9, suffix: "%", label: "Uptime" }
      ],
      features: [
        "Unlimited concurrent call handling",
        "Multi-language support (50+ languages)",
        "Seamless CRM integration",
        "Real-time sentiment analysis",
        "Quality assurance automation"
      ],
      visual: <LiveMetricsDashboard />
    },
    {
      icon: Monitor,
      title: "Technical Support Centers",
      description: "Tier-1 automation with intelligent escalation to human agents.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      accentColor: "bg-gradient-to-r from-blue-500 to-primary-500",
      stats: [
        { value: 65, suffix: "%", label: "First Call Resolution" },
        { value: 45, suffix: "%", label: "Reduced Escalations" },
        { value: 24, suffix: "/7", label: "Availability" }
      ],
      features: [
        "Automated troubleshooting flows",
        "Knowledge base integration",
        "Smart ticket creation",
        "Priority-based routing",
        "Technical documentation access"
      ],
      visual: (
        <div className="space-y-4">
          {/* Support Flow Visualization */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100/70 rounded-xl flex items-center justify-center">
                <Monitor className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-text-primary font-semibold text-sm">Tech Support AI</div>
                <div className="text-blue-500 text-xs">Processing...</div>
              </div>
            </div>
            <WaveVisualization color="bg-blue-400" />
            <div className="mt-4 space-y-2">
              {[
                { label: "Issue Identified", status: "complete", color: "bg-green-500" },
                { label: "Solution Found", status: "complete", color: "bg-green-500" },
                { label: "Applying Fix", status: "active", color: "bg-blue-500" }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    animate={step.status === 'active' ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className={`w-3 h-3 ${step.color} rounded-full`}
                  />
                  <span className="text-text-secondary text-sm">{step.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Users,
      title: "Customer Service Operations",
      description: "24/7 support with human-like conversations and instant resolution.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      accentColor: "bg-gradient-to-r from-blue-500 to-primary-500",
      stats: [
        { value: 95, suffix: "%", label: "CSAT Score" },
        { value: 70, suffix: "%", label: "Self-Service" },
        { value: 0, suffix: "s", prefix: "<3", label: "Wait Time" }
      ],
      features: [
        "Natural conversation handling",
        "Order status & tracking",
        "Returns & refund processing",
        "Account management",
        "Proactive customer outreach"
      ],
      visual: (
        <div className="space-y-4">
          {/* Customer Satisfaction Visual */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">Customer Satisfaction</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: star * 0.1 }}
                  >
                    <Star className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-400'}`} />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Response Time", value: 98, color: "bg-blue-600" },
                { label: "Resolution Rate", value: 94, color: "bg-blue-500" },
                { label: "Agent Helpfulness", value: 96, color: "bg-blue-400" }
              ].map((metric, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{metric.label}</span>
                    <span className="font-semibold text-gray-900">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                      className={`h-full rounded-full ${metric.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      icon: ClipboardList,
      title: "Appointment Scheduling Services",
      description: "High-volume booking automation with zero double-bookings.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      accentColor: "bg-gradient-to-r from-blue-500 to-primary-500",
      stats: [
        { value: 50, suffix: "K+", label: "Daily Bookings" },
        { value: 40, suffix: "%", label: "More Efficiency" },
        { value: 0, suffix: "", prefix: "Zero", label: "Conflicts" }
      ],
      features: [
        "Multi-calendar synchronization",
        "Automated confirmations & reminders",
        "Rescheduling & cancellation handling",
        "Resource allocation optimization",
        "Waitlist management"
      ],
      visual: (
        <div className="space-y-4">
          {/* Scheduling Visual */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">Today's Schedule</span>
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div className="space-y-3">
              {[
                { time: "9:00 AM", title: "Dr. Smith - Check-up", status: "confirmed" },
                { time: "10:30 AM", title: "Team Meeting", status: "pending" },
                { time: "2:00 PM", title: "Client Consultation", status: "confirmed" },
                { time: "4:00 PM", title: "Follow-up Call", status: "auto-scheduled" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="text-xs font-mono text-gray-500 w-16">{item.time}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100/70 text-blue-700'
                  }`}>
                    {item.status === 'auto-scheduled' ? 'AI Booked' : item.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen">
      <SEOMeta
        title="AI for Call Centers - Intelligent Call Center Automation"
        description="Transform your call center with CogniDrift's AI automation. AI agents for business that handle inbound/outbound calls, reduce wait times, and improve customer satisfaction."
        keywords="AI for call centers, conversational AI platform, AI agents for business, AI workflow automation"
        url="/industries/call-centers"
      />
      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pb-20 bg-white">
        <div ref={heroRef} className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 border border-blue-200"
          >
            Enterprise Call Center AI
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI for <span className="text-blue-600">Call Centers</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Scale your call center operations to infinity. AI-powered agents that handle millions of calls
            with consistent quality, zero wait times, and 24/7 availability.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-4 text-lg"
              >
                Request Enterprise Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </Link>
            <Link to="/resources/case-studies">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                View ROI Calculator
              </motion.button>
            </Link>
          </div>
        </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: PhoneCall, value: 100, suffix: "M+", label: "Calls/Month", color: "text-blue-600" },
            { icon: Globe, value: 50, suffix: "+", label: "Languages", color: "text-blue-600" },
            { icon: TrendingUp, value: 80, suffix: "%", label: "Cost Savings", color: "text-blue-600" },
            { icon: Shield, value: 99.99, suffix: "%", label: "Uptime SLA", color: "text-blue-600" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className={`text-3xl font-bold ${stat.color}`}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </section>

      {/* Section Cards */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {sections.map((section, index) => (
            <SectionCard key={index} {...section} index={index} />
          ))}
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 text-center relative overflow-hidden border-2 border-primary-100"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6 relative z-10 border border-blue-100">
            <Headphones className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Get Started</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6 relative z-10">
            Ready to <span className="bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">Transform Your Call Center?</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 relative z-10">
            Join enterprise leaders handling 100M+ calls monthly with AI. Get a custom demo tailored to your operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto btn-primary px-8 py-4 text-lg"
              >
                Get Enterprise Demo
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/resources/case-studies">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300"
              >
                View Case Studies
              </motion.button>
            </Link>
          </div>
        </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CallCenters
