import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Scale, Calculator, Shield, Home, Briefcase, Megaphone,
  Phone, Calendar, Clock, Star, CheckCircle2, ArrowRight,
  Users, TrendingUp, MessageSquare, FileText, DollarSign,
  Zap, Target, Award, Building2, Gavel, PieChart, BarChart3
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

// Animated Donut Chart
const DonutChart = ({ segments, size = 120 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  let cumulativePercent = 0

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 42 42" className="donut-chart">
      <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f3f4f6" strokeWidth="5" />
      {segments.map((segment, index) => {
        const strokeDasharray = `${segment.percent} ${100 - segment.percent}`
        const strokeDashoffset = 25 - cumulativePercent
        cumulativePercent += segment.percent

        return (
          <motion.circle
            key={index}
            cx="21"
            cy="21"
            r="15.91549430918954"
            fill="transparent"
            stroke={segment.color}
            strokeWidth="5"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDasharray: "0 100" }}
            animate={isInView ? { strokeDasharray } : { strokeDasharray: "0 100" }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        )
      })}
    </svg>
  )
}

// Animated Line Chart
const LineChart = ({ data, color }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const width = 200
  const height = 80
  const points = data.map((d, i) => `${(i / (data.length - 1)) * width},${height - (d / 100) * height}`).join(' ')

  return (
    <svg ref={ref} width={width} height={height} className="overflow-visible">
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2 }}
      />
      {data.map((d, i) => (
        <motion.circle
          key={i}
          cx={(i / (data.length - 1)) * width}
          cy={height - (d / 100) * height}
          r="4"
          fill={color}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
        />
      ))}
    </svg>
  )
}

// Professional Section Card Component
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
  index
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isReversed = index % 2 === 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100"
    >
      <div className={`grid lg:grid-cols-5 ${isReversed ? 'direction-rtl' : ''}`}>
        {/* Content Side - 3 columns */}
        <div className={`lg:col-span-3 p-8 lg:p-10 ${bgGradient} ${isReversed ? 'lg:order-2' : ''}`}>
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg relative`}
            >
              <Icon className={`w-8 h-8 ${color}`} />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${iconBg} shadow`}
              />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 20 : -20 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm"
              >
                <CheckCircle2 className={`w-5 h-5 ${color} flex-shrink-0`} />
                <span className="text-gray-700 text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="bg-white rounded-xl px-5 py-4 shadow-sm text-center"
              >
                <div className={`text-2xl font-bold ${color}`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Side - 2 columns */}
        <div className={`lg:col-span-2 p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center ${isReversed ? 'lg:order-1' : ''}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const ProfessionalServices = () => {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Professional Services Sections Data
  const sections = [
    {
      icon: Scale,
      title: "Legal Practices",
      description: "Client intake, case inquiries, and consultation scheduling for law firms.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 85, suffix: "%", label: "Lead Capture" },
        { value: 60, suffix: "%", label: "Time Saved" },
        { value: 40, suffix: "%", label: "More Clients" }
      ],
      features: [
        "New client intake automation",
        "Case type qualification",
        "Consultation scheduling",
        "Document request handling",
        "Conflict check assistance",
        "Court date reminders"
      ],
      visual: (
        <div className="text-center">
          <div className="relative w-40 h-40 mx-auto mb-4">
            <DonutChart
              segments={[
                { percent: 35, color: "#2563eb" },
                { percent: 25, color: "#3b82f6" },
                { percent: 20, color: "#60a5fa" },
                { percent: 20, color: "#93c5fd" }
              ]}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Scale className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="text-gray-600">Personal Injury 35%</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-gray-600">Family Law 25%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Calculator,
      title: "Financial Services & Accounting",
      description: "Account inquiries, appointment scheduling, and tax season support.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 75, suffix: "%", label: "Inquiries Handled" },
        { value: 50, suffix: "%", label: "More Appointments" },
        { value: 35, suffix: "%", label: "Revenue Growth" }
      ],
      features: [
        "Tax preparation scheduling",
        "Account status inquiries",
        "Document submission reminders",
        "Billing & payment questions",
        "New client onboarding",
        "Financial review bookings"
      ],
      visual: (
        <div className="text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600">Revenue Growth</span>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <LineChart data={[20, 35, 45, 60, 55, 75, 85]} color="#2563eb" />
            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <span>Jan</span>
              <span>Jul</span>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Shield,
      title: "Insurance Agencies",
      description: "Quote requests, claims support, and policy inquiries 24/7.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 90, suffix: "%", label: "Quote Capture" },
        { value: 55, suffix: "%", label: "Faster Claims" },
        { value: 70, suffix: "%", label: "Client Retention" }
      ],
      features: [
        "Quote request handling",
        "Policy information inquiries",
        "Claims initiation support",
        "Payment & billing assistance",
        "Coverage questions",
        "Renewal reminders"
      ],
      visual: (
        <div className="space-y-4">
          {[
            { label: "Auto Insurance", value: 85, color: "bg-blue-600" },
            { label: "Home Insurance", value: 72, color: "bg-blue-500" },
            { label: "Life Insurance", value: 58, color: "bg-blue-400" }
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-semibold text-gray-900">{item.value}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      icon: Home,
      title: "Real Estate Agencies",
      description: "Lead capture, showing scheduling, and property inquiries.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 80, suffix: "%", label: "Lead Capture" },
        { value: 45, suffix: "%", label: "More Showings" },
        { value: 30, suffix: "%", label: "Faster Sales" }
      ],
      features: [
        "Property inquiry handling",
        "Showing scheduling",
        "Lead qualification",
        "Market update calls",
        "Open house coordination",
        "Agent routing"
      ],
      visual: (
        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Home, label: "Listings", value: "247" },
              { icon: Users, label: "Leads", value: "1.2K" },
              { icon: Calendar, label: "Showings", value: "89" },
              { icon: DollarSign, label: "Sales", value: "$4.2M" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-lg text-center"
              >
                <item.icon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      icon: Briefcase,
      title: "Consulting Firms",
      description: "Discovery calls, client management, and project scheduling.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 65, suffix: "%", label: "Qualified Leads" },
        { value: 40, suffix: "%", label: "Time Saved" },
        { value: 55, suffix: "%", label: "More Projects" }
      ],
      features: [
        "Discovery call scheduling",
        "Project inquiry handling",
        "Proposal follow-ups",
        "Client meeting coordination",
        "Expert matching",
        "Retainer inquiries"
      ],
      visual: (
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative w-40 h-40 mx-auto"
          >
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
              <motion.div
                key={idx}
                className="absolute w-12 h-12 bg-blue-100/70 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-60px) rotate(-${angle}deg)`
                }}
              >
                {[Briefcase, Users, Target, BarChart3, FileText, Award][idx] && (
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {(() => {
                      const icons = [Briefcase, Users, Target, BarChart3, FileText, Award]
                      const IconComponent = icons[idx]
                      return <IconComponent className="w-6 h-6 text-blue-600" />
                    })()}
                  </motion.div>
                )}
              </motion.div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      icon: Megaphone,
      title: "Marketing Agencies",
      description: "Lead qualification, onboarding, and campaign inquiries.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 70, suffix: "%", label: "Lead Qualified" },
        { value: 50, suffix: "%", label: "Faster Onboard" },
        { value: 45, suffix: "%", label: "More Clients" }
      ],
      features: [
        "Lead qualification calls",
        "Service package inquiries",
        "Campaign status updates",
        "Client onboarding calls",
        "Meeting scheduling",
        "Proposal follow-ups"
      ],
      visual: (
        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-lg">
            <div className="w-12 h-12 bg-blue-100/70 rounded-xl flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">New Lead</div>
              <div className="text-xs text-gray-500">Qualified automatically</div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-auto w-3 h-3 bg-green-500 rounded-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["SEO", "PPC", "Social"].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-blue-100/70 text-blue-600 text-xs font-semibold py-2 px-3 rounded-lg text-center"
              >
                {service}
              </motion.div>
            ))}
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 pt-24 pb-20">
      {/* Hero Section */}
      <div ref={heroRef} className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Animated Badge Row */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {[
              { icon: Scale, label: "Legal", color: "bg-blue-100/70 text-blue-600" },
              { icon: Calculator, label: "Financial", color: "bg-blue-100/70 text-blue-600" },
              { icon: Shield, label: "Insurance", color: "bg-blue-100/70 text-blue-600" },
              { icon: Home, label: "Real Estate", color: "bg-blue-100/70 text-blue-600" },
              { icon: Briefcase, label: "Consulting", color: "bg-blue-100/70 text-blue-600" },
              { icon: Megaphone, label: "Marketing", color: "bg-blue-100/70 text-blue-600" }
            ].map(({ icon: Icon, label, color }, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${color} shadow-sm cursor-pointer`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-semibold">{label}</span>
              </motion.div>
            ))}
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 border border-blue-200"
          >
            Enterprise-Grade AI Solutions
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI for <span className="text-blue-600">Professional Services</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Streamline client intake, qualify prospects, and automate communication.
            AI-powered solutions designed for professional service firms.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-4 text-lg"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </Link>
            <Link to="/resources/case-studies">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                View Case Studies
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { icon: Building2, value: 2, suffix: "K+", label: "Professional Firms", color: "text-blue-600" },
            { icon: Phone, value: 8, suffix: "M+", label: "Calls Handled", color: "text-blue-600" },
            { icon: Target, value: 85, suffix: "%", label: "Lead Qualification", color: "text-blue-600" },
            { icon: Award, value: 99, suffix: "%", label: "Client Satisfaction", color: "text-blue-600" }
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

        {/* Section Cards */}
        <div className="space-y-8 mb-20">
          {sections.map((section, index) => (
            <SectionCard key={index} {...section} index={index} />
          ))}
        </div>

        {/* CTA Section */}
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
            <Briefcase className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Get Started</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6 relative z-10">
            Ready to <span className="bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">Elevate Your Professional Practice?</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 relative z-10">
            Join 2,000+ professional firms using AI to capture leads, qualify prospects, and deliver exceptional client service.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto btn-primary px-8 py-4 text-lg"
              >
                Request a Demo
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
    </div>
  )
}

export default ProfessionalServices
