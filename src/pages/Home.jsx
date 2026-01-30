import { Link } from 'react-router-dom'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack'
import Testimonials from '../components/Testimonials'
import ClientLogos from '../components/ClientLogos'
import TrustBadges from '../components/TrustBadges'
import PressLogos from '../components/PressLogos'
import DemoCalls from '../components/DemoCalls'
import FAQ from '../components/FAQ'
import TryNowSection from '../components/TryNowSection'
import AnimatedDashboard from '../components/AnimatedDashboard'
import AIConversationFlow from '../components/AIConversationFlow'
import AnimatedCalendar from '../components/AnimatedCalendar'
import FloatingNotifications from '../components/FloatingNotifications'
import {
  Phone,
  Clock,
  Calendar,
  MessageSquare,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Users,
  Building2,
  Stethoscope,
  Home as HomeIcon,
  Briefcase,
  ArrowRight,
  Play,
  Check,
  PhoneCall,
  Bot,
  Bell,
  ChevronRight,
  Mic,
  Sparkles,
  TrendingUp
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Counter animation hook
const useCounter = (end, duration = 2000, inView) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, inView])

  return count
}

// Notification Card Component
const NotificationCard = ({ avatar, name, title, action, time, delay, className }) => (
  <motion.div
    initial={{ opacity: 0, x: 50, y: 20 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    className={`notification-card ${className}`}
  >
    <div className="avatar bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
      {avatar}
    </div>
    <div className="content">
      <p className="text-sm text-text-primary">
        <span className="font-semibold">{name}</span>
        <span className="text-text-secondary">, {title}</span>
      </p>
      <p className="text-xs text-text-muted">{action}</p>
    </div>
    <span className="badge">{time}</span>
  </motion.div>
)

// Feature Card Component - Enhanced with Better Typography & Hover
const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="card-feature group"
    >
      <div className="icon-wrapper">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <h3 className="text-xl lg:text-2xl font-bold text-text-primary mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  )
}

// Workflow Step Component
const WorkflowStep = ({ number, icon: Icon, title, description, isLast }) => (
  <div className="workflow-step">
    <div className="step-icon">
      <Icon className="w-8 h-8" />
    </div>
    <div className="step-number absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white text-sm rounded-full flex items-center justify-center font-bold">
      {number}
    </div>
    <h4 className="text-lg font-semibold text-text-primary mb-2">{title}</h4>
    <p className="text-sm text-text-secondary max-w-[200px]">{description}</p>
  </div>
)

// Industry Card Component - Enhanced with Hover Scale
const IndustryCard = ({ icon: Icon, title, description, features, isActive }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`p-6 lg:p-8 rounded-2xl border cursor-pointer ${
      isActive
        ? 'border-primary-600 bg-primary-50 shadow-xl'
        : 'border-neutral-border bg-white hover:border-primary-300 hover:shadow-xl'
    }`}
  >
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
      isActive ? 'bg-primary-600 text-white shadow-lg' : 'bg-primary-50 text-primary-600'
    }`}>
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl lg:text-2xl font-bold text-text-primary mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>
    <p className="text-text-secondary mb-5 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-text-secondary font-medium">
          <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
)

// Stat Item Component
const StatItem = ({ number, suffix, label }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useCounter(number, 2000, isInView)

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

const Home = () => {
  const [activeIndustry, setActiveIndustry] = useState(0)

  const features = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Never miss a call. Your AI receptionist works around the clock, even on holidays.'
    },
    {
      icon: MessageSquare,
      title: 'Natural Conversations',
      description: 'Advanced AI that understands context and responds naturally like a human.'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Automatically book appointments and sync with your calendar systems.'
    },
    {
      icon: Phone,
      title: 'Intelligent Routing',
      description: 'Route calls to the right person or department based on intent detection.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Get insights into call patterns, customer needs, and conversion rates.'
    },
    {
      icon: Globe,
      title: 'Multi-language',
      description: 'Communicate with customers in multiple languages seamlessly.'
    },
    {
      icon: Zap,
      title: 'CRM Integration',
      description: 'Connect with Salesforce, HubSpot, and other popular CRM platforms.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'HIPAA-ready infrastructure with enterprise-grade encryption.'
    }
  ]

  const industries = [
    {
      icon: Stethoscope,
      title: 'Healthcare',
      description: 'HIPAA-compliant AI for medical practices and clinics.',
      features: ['Patient scheduling', 'Insurance verification', 'Prescription refills', 'Appointment reminders']
    },
    {
      icon: Briefcase,
      title: 'Insurance',
      description: 'Handle claims inquiries and policy questions 24/7.',
      features: ['Claims status updates', 'Policy information', 'Quote requests', 'Agent routing']
    },
    {
      icon: HomeIcon,
      title: 'Real Estate',
      description: 'Qualify leads and schedule property viewings automatically.',
      features: ['Lead qualification', 'Showing scheduling', 'Property inquiries', 'Agent matching']
    },
    {
      icon: Building2,
      title: 'Professional Services',
      description: 'Custom solutions for law firms, accounting, and consulting.',
      features: ['Consultation booking', 'Client intake', 'Document requests', 'Follow-up calls']
    }
  ]

  const integrations = [
    'Salesforce', 'HubSpot', 'Zoho', 'Google Calendar',
    'Calendly', 'Microsoft 365', 'Slack', 'Twilio'
  ]

  const stats = [
    { number: 67, suffix: '%', label: 'Calls outside business hours' },
    { number: 1200, suffix: '+', label: 'Average cost per missed lead' },
    { number: 35, suffix: '%', label: 'Reduction in no-shows' }
  ]

  return (
    <div className="bg-white overflow-hidden">
      {/* Floating Notifications */}
      <FloatingNotifications />

      {/* Hero Section - MyAIFrontDesk Inspired */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-0 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-purple-100/20 via-blue-50/10 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col items-center justify-center">
          {/* Center Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal text-text-primary mb-6 leading-[1.1]"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '400', letterSpacing: '-0.01em' }}
            >
              Never miss leads, bookings, or support calls again with your{' '}
              <span className="relative inline-block font-semibold text-primary-600">
                AI receptionist
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-primary-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-text-secondary mb-6 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              Pick up the phone, schedule appointments, and answer questions with Frontdesk's 24/7 phone receptionist & CRM.
            </motion.p>

            <motion.div
              variants={fadeInUp}
            >
              <Link to="/contact">
                <button 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  Start Free
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Voice Wave Animation at Bottom - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full h-[280px] flex items-center justify-center gap-[3px] px-8 -mt-8"
        >
          {Array.from({ length: 80 }).map((_, i) => {
              // Create varied heights for wave effect - more natural pattern
              const baseHeights = [45, 55, 75, 95, 115, 135, 160, 140, 120, 95, 70, 85, 105, 135, 155, 145, 125, 100, 80, 70, 85, 115, 145, 165, 150, 130, 105, 85, 70, 80, 105, 135, 160, 145, 115, 90, 75, 95, 125, 150, 165, 140, 110, 85, 75, 90, 115, 140, 125, 95, 70, 80, 105, 135, 155, 140, 115, 90, 75, 85]
              const height = baseHeights[i % baseHeights.length]
              const delay = i * 0.015
              const duration = 1.0 + (i % 5) * 0.15
              
              return (
                <motion.div
                  key={i}
                  className="flex-shrink-0 rounded-full"
                  style={{
                    width: '14px',
                    background: 'linear-gradient(to top, rgb(59, 130, 246), rgb(139, 92, 246))',
                    transformOrigin: 'bottom'
                  }}
                  initial={{ height: `${height * 0.35}px` }}
                  animate={{
                    height: [
                      `${height * 0.35}px`,
                      `${height}px`,
                      `${height * 0.55}px`,
                      `${height * 0.95}px`,
                      `${height * 0.35}px`
                    ]
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay
                  }}
                />
              )
            })}
        </motion.div>
      </section>

      {/* Press Logos Section */}
      <PressLogos />

      {/* Problem Section - Enhanced Typography */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
          >
            {/* Eyebrow with animated underline */}
            <motion.div
              variants={fadeInUp}
              className="relative inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-red-600 font-bold px-6 py-2 bg-red-50 rounded-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                The Problem
              </span>
            </motion.div>

            {/* Main Heading with split animation */}
            <motion.h2
              variants={fadeInUp}
              className="hero-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.05]"
            >
              <span className="block text-text-primary mb-2">
                Your Team{' '}
                <motion.span
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="relative z-10">Shouldn't Be</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-primary-500/20 -rotate-1"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  />
                </motion.span>
              </span>
              <span className="block">
                <motion.span
                  className="relative inline-block text-red-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Stuck on the Phone
                  {/* Animated underline */}
                  <motion.span
                    className="absolute -bottom-3 left-0 right-0 h-1 bg-red-600 rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </motion.span>
              </span>
            </motion.h2>

            {/* Subtitle with better typography */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light max-w-3xl mx-auto"
            >
              Every <span className="text-red-600 font-semibold">missed call</span> is a missed opportunity.{' '}
              Every <span className="text-red-600 font-semibold">hour on the phone</span> is an hour{' '}
              <span className="relative inline-block">
                away from your core business
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </span>.
            </motion.p>
          </motion.div>

          {/* Cards with enhanced design */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {[
              { icon: Phone, title: 'Missed Calls = Lost Revenue', desc: 'Up to $1,200 lost per unanswered lead call', color: 'red' },
              { icon: Users, title: 'Staff Burnout', desc: 'Repetitive call handling drains your team', color: 'blue' },
              { icon: Clock, title: 'After-Hours Silence', desc: '67% of calls come outside business hours', color: 'cyan' },
              { icon: Calendar, title: 'Manual Scheduling', desc: 'Hours wasted on booking and reminders', color: 'red' }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white border-2 border-neutral-border hover:border-red-300 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Icon with animation */}
                <motion.div
                  className={`relative w-16 h-16 mx-auto mb-6 bg-${item.color}-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className={`w-8 h-8 text-${item.color}-600`} />

                  {/* Pulse ring on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-${item.color}-400 opacity-0 group-hover:opacity-20`}
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Title with better typography */}
                <h3 className="relative text-xl font-bold text-text-primary mb-3 leading-tight group-hover:text-red-600 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative text-base text-text-secondary leading-relaxed font-normal">
                  {item.desc}
                </p>

                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-red-500 opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-300"
                  initial={{ scale: 0, originX: 1, originY: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section - Enhanced */}
      <section className="py-20 lg:py-28 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">How It Works</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title hero-display">
              Meet Your <span className="text-gradient">AI Receptionist</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              A simple, powerful process that transforms how you handle calls.
            </motion.p>
          </motion.div>

          {/* Two Column Layout: Text + Visual */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-16">
            {/* Left: Workflow Steps */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {[
                { icon: PhoneCall, title: 'Call Comes In', desc: 'Customer calls your business number', color: 'blue' },
                { icon: Bot, title: 'AI Engages', desc: 'Natural conversation and intent detection', color: 'purple' },
                { icon: Calendar, title: 'Smart Action', desc: 'Books, routes, or logs automatically', color: 'indigo' },
                { icon: Bell, title: "You're Notified", desc: 'Real-time summary and recording', color: 'green' }
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start gap-5 group"
                >
                  <div className={`relative flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                    <step.icon className="w-7 h-7 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-neutral-offWhite flex items-center justify-center">
                      <span className="text-sm font-black text-gray-900">{i + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: Animated AI Conversation Flow */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <AIConversationFlow />
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <Link to="/services">
              <button className="btn-primary animate-glow">
                See How It Works
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Industry Solutions - Enhanced */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">Industry Solutions</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title hero-display">
              Built for <span className="text-gradient">Your Industry</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              Specialized AI solutions designed for the unique needs of your business sector.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {industries.map((industry, i) => (
              <motion.div key={i} variants={fadeInUp} onClick={() => setActiveIndustry(i)}>
                <IndustryCard {...industry} isActive={activeIndustry === i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Calls Section */}
      <DemoCalls />

      {/* Trust Elements */}
      <ClientLogos />
      <Testimonials />
      <TrustBadges />

      {/* Try Now Section */}
      <TryNowSection />

      {/* Live Demo Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="inline-block text-sm uppercase tracking-wider text-primary-200 font-semibold mb-4">
                Try It Yourself
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
                Don't Take Our Word For It
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-primary-100 mb-8">
                Experience our AI voice agent firsthand. Click the chat widget in the bottom right corner
                to have a conversation with our AI.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2 animate-glow">
                  <Mic className="w-5 h-5" />
                  Talk to Our AI
                </button>
                <Link to="/contact">
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors animate-glow">
                    Want This For Your Business?
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse-ring"></div>
                    <Mic className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-white font-semibold text-lg mb-2">Click to Start</p>
                  <p className="text-primary-200 text-sm">Experience AI-powered conversations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid - Unique Bento Style */}
      <section className="relative py-24 lg:py-32 bg-neutral-offWhite overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-primary-300 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-indigo rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full mb-6"
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest" style={{ fontFamily: 'Montserrat, sans-serif' }}>Powerful Features</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="hero-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary mb-6"
            >
              Everything You Need,{' '}
              <span className="relative inline-block">
                <span className="text-gradient">Nothing You Don't</span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 300 12"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                >
                  <motion.path
                    d="M0,6 Q75,0 150,6 T300,6"
                    stroke="#2563EB"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
            >
              A complete suite of AI-powered features designed to transform how your business handles communication
            </motion.p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const layouts = [
                'lg:col-span-2 lg:row-span-2', // Large
                'lg:col-span-2', // Wide
                'lg:col-span-1', // Regular
                'lg:col-span-1', // Regular
                'lg:col-span-1', // Regular
                'lg:col-span-2', // Wide
                'lg:col-span-1', // Regular
                'lg:col-span-2 lg:row-span-1' // Wide
              ]

              const colorSchemes = [
                { bg: 'bg-blue-500', lightBg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200', glow: 'shadow-blue-500/20' },
                { bg: 'bg-cyan-500', lightBg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-200', glow: 'shadow-cyan-500/20' },
                { bg: 'bg-purple-500', lightBg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200', glow: 'shadow-purple-500/20' },
                { bg: 'bg-teal-500', lightBg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-200', glow: 'shadow-teal-500/20' },
                { bg: 'bg-indigo-500', lightBg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-200', glow: 'shadow-indigo-500/20' },
                { bg: 'bg-violet-500', lightBg: 'bg-violet-50', icon: 'text-violet-600', border: 'border-violet-200', glow: 'shadow-violet-500/20' },
                { bg: 'bg-pink-500', lightBg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-200', glow: 'shadow-pink-500/20' },
                { bg: 'bg-sky-500', lightBg: 'bg-sky-50', icon: 'text-sky-600', border: 'border-sky-200', glow: 'shadow-sky-500/20' }
              ]

              const layout = layouts[index % layouts.length]
              const colors = colorSchemes[index % colorSchemes.length]
              const isLarge = layout.includes('row-span-2')

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`${layout} group`}
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative h-full bg-white rounded-3xl p-6 lg:p-8 border-2 ${colors.border} overflow-hidden shadow-lg hover:shadow-2xl ${colors.glow} transition-all duration-500`}
                  >
                    {/* Background Pattern */}
                    <div className={`absolute inset-0 ${colors.lightBg} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>

                    {/* Decorative Circle */}
                    <motion.div
                      className={`absolute -top-10 -right-10 w-40 h-40 ${colors.bg} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex w-16 h-16 ${isLarge ? 'lg:w-20 lg:h-20' : ''} ${colors.lightBg} rounded-2xl items-center justify-center mb-6 shadow-md group-hover:shadow-xl transition-shadow`}
                      >
                        <Icon className={`w-8 h-8 ${isLarge ? 'lg:w-10 lg:h-10' : ''} ${colors.icon}`} />
                      </motion.div>

                      {/* Title */}
                      <h3 className={`${isLarge ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'} font-bold text-text-primary mb-3 leading-tight group-hover:text-primary-600 transition-colors`}>
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-text-secondary ${isLarge ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} leading-relaxed flex-grow`}>
                        {feature.description}
                      </p>

                      {/* Hover Arrow */}
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className={`mt-4 flex items-center gap-2 ${colors.icon} font-semibold text-sm`}
                      >
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Floating Badge for Large Cards */}
                    {isLarge && (
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-6 right-6 bg-white rounded-full px-4 py-2 shadow-lg"
                      >
                        <span className={`text-xs font-bold ${colors.icon} uppercase tracking-wide`}>Popular</span>
                      </motion.div>
                    )}

                    {/* Corner Accent */}
                    <div className={`absolute bottom-0 right-0 w-24 h-24 ${colors.bg} opacity-5 rounded-tl-full transition-all duration-500 group-hover:w-32 group-hover:h-32`}></div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link to="/services">
              <button className="btn-primary text-lg px-10 py-5 animate-glow group">
                Explore All Features
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Smart Scheduling Showcase */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Animated Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedCalendar />
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-full mb-6"
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">Smart Scheduling</span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Appointments Book <span className="text-blue-600">Themselves</span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Watch appointments get scheduled automatically. Your AI receptionist handles the entire booking process - checking availability, confirming times, and sending reminders.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="space-y-4"
              >
                {[
                  { icon: Check, text: 'Real-time calendar sync with Google Calendar, Outlook & more' },
                  { icon: Check, text: 'Automatic conflict detection and resolution' },
                  { icon: Check, text: 'Smart reminder system reduces no-shows by 35%' },
                  { icon: Check, text: 'Multi-timezone support for global businesses' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <item.icon className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8">
                <Link to="/services">
                  <button className="btn-primary">
                    Learn About Scheduling
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analytics Showcase */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <motion.div
            animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-20 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full mb-6"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">Real-Time Analytics</span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                See Every <span className="text-indigo-600">Interaction</span> Live
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Get instant insights into every call, message, and appointment. Our live dashboard shows you exactly what's happening with your AI receptionist in real-time.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="space-y-4"
              >
                {[
                  { icon: TrendingUp, text: 'Track call volume, response times, and conversion rates' },
                  { icon: Users, text: 'Monitor active conversations and customer sentiment' },
                  { icon: Clock, text: 'Identify peak hours and optimize staffing' },
                  { icon: Check, text: 'Export detailed reports for your team' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <item.icon className="w-4 h-4 text-indigo-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8">
                <Link to="/services">
                  <button className="btn-primary">
                    Explore Analytics
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Animated Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedDashboard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative py-32 bg-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 left-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-20 right-0 w-96 h-96 bg-accent-indigo rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full mb-6 shadow-lg"
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">Integrations</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold text-text-primary mb-6"
            >
              Connects With{' '}
              <span className="relative inline-block">
                <span className="text-primary-600">Everything</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-primary-500/20 -rotate-1"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              Seamlessly integrates with your existing tools and workflows
            </motion.p>
          </motion.div>

          {/* Animated logo cards */}
          <div className="relative">
            {/* Scrolling container */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6"
            >
              {integrations.map((name, i) => {
                const colors = [
                  { bg: 'bg-blue-500', light: 'bg-blue-50', hover: 'bg-blue-100', text: 'text-blue-600', glow: 'shadow-blue-500/30' },
                  { bg: 'bg-purple-500', light: 'bg-purple-50', hover: 'bg-purple-100', text: 'text-purple-600', glow: 'shadow-purple-500/30' },
                  { bg: 'bg-cyan-500', light: 'bg-cyan-50', hover: 'bg-cyan-100', text: 'text-cyan-600', glow: 'shadow-cyan-500/30' },
                  { bg: 'bg-teal-500', light: 'bg-teal-50', hover: 'bg-teal-100', text: 'text-teal-600', glow: 'shadow-teal-500/30' },
                  { bg: 'bg-indigo-500', light: 'bg-indigo-50', hover: 'bg-indigo-100', text: 'text-indigo-600', glow: 'shadow-indigo-500/30' },
                  { bg: 'bg-violet-500', light: 'bg-violet-50', hover: 'bg-violet-100', text: 'text-violet-600', glow: 'shadow-violet-500/30' },
                  { bg: 'bg-pink-500', light: 'bg-pink-50', hover: 'bg-pink-100', text: 'text-pink-600', glow: 'shadow-pink-500/30' },
                  { bg: 'bg-sky-500', light: 'bg-sky-50', hover: 'bg-sky-100', text: 'text-sky-600', glow: 'shadow-sky-500/30' },
                ]
                const color = colors[i % colors.length]

                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ y: -12, scale: 1.08 }}
                    className="group relative"
                  >
                    {/* Enhanced glow effect on hover */}
                    <motion.div
                      className={`absolute -inset-3 ${color.bg} opacity-0 group-hover:opacity-30 rounded-3xl blur-2xl transition-all duration-500`}
                    />

                    {/* Card with gradient border */}
                    <div className={`relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 group-hover:border-transparent group-hover:shadow-2xl ${color.glow} rounded-2xl p-6 aspect-square flex items-center justify-center transition-all duration-300 overflow-hidden`}>
                      {/* Animated background pattern */}
                      <div className={`absolute inset-0 ${color.light} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                      {/* Shine effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      />

                      <div className="relative text-center z-10">
                        {/* Icon with enhanced styling */}
                        <motion.div
                          whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                          className={`w-16 h-16 mx-auto mb-3 ${color.light} group-hover:${color.bg} rounded-2xl flex items-center justify-center font-black text-3xl ${color.text} group-hover:text-white shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                        >
                          {name.charAt(0)}
                        </motion.div>
                        <p className={`text-base font-black text-gray-900 group-hover:text-white group-hover:drop-shadow-lg transition-all duration-300`}>
                          {name}
                        </p>
                      </div>

                      {/* Hover background overlay */}
                      <motion.div
                        className={`absolute inset-0 ${color.bg} opacity-0 group-hover:opacity-90 rounded-2xl transition-all duration-300`}
                      />

                      {/* Corner accents */}
                      <div className={`absolute top-0 right-0 w-10 h-10 ${color.bg} opacity-20 rounded-bl-3xl`}></div>
                      <div className={`absolute bottom-0 left-0 w-10 h-10 ${color.bg} opacity-20 rounded-tr-3xl`}></div>

                      {/* Pulsing dot */}
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute top-3 right-3 w-3 h-3 rounded-full ${color.bg} shadow-lg`}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Floating CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-primary-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-glow transition-all duration-300 group"
              >
                <span>Explore All Integrations</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.span>
              </motion.button>

              {/* Stats below button */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
                className="mt-6 text-sm text-text-muted"
              >
                <span className="font-semibold text-primary-600">50+</span> integrations and counting
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <StatItem {...stat} />
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center text-primary-200 text-sm mt-12"
          >
            Sources: Forbes, BIA/Kelsey, Harvard Business Review
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section - Enhanced */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-10 md:p-16 lg:p-20 text-center relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <motion.h2 variants={fadeInUp} className="hero-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 relative z-10">
              Ready to Stop Missing Calls?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Join businesses that never miss a lead. Book a <span className="font-bold text-white">15-minute demo</span> to see how
              CogniDrift can transform your customer communications.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link to="/contact">
                <button className="bg-white text-primary-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-xl flex items-center justify-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <PhoneCall className="w-5 h-5" />
                  Book Your Demo
                </button>
              </Link>
              <button className="bg-primary-500 text-white border-2 border-white/30 px-10 py-5 rounded-xl font-bold text-lg hover:bg-primary-400 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <Sparkles className="w-5 h-5" />
                Try Our AI First
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
