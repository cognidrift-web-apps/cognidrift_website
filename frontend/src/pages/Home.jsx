import SEOMeta from '../components/SEOMeta'
import { Link } from 'react-router-dom'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Typed from 'typed.js'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack'
// import Testimonials from '../components/Testimonials' // Hidden for future use
// import ClientLogos from '../components/ClientLogos' // Hidden for future use
import TrustBadges from '../components/TrustBadges'
// import DemoCalls from '../components/DemoCalls' // Hidden for future use
import TryNowSection from '../components/TryNowSection'
import VideoShowcaseSection from '../components/VideoShowcaseSection'
import AnimatedDashboard from '../components/AnimatedDashboard'
import AIConversationFlow from '../components/AIConversationFlow'
import AnimatedCalendar from '../components/AnimatedCalendar'
import FloatingNotifications from '../components/FloatingNotifications'
import SiriWaveBackground from '../components/SiriWaveBackground'
import Orb from '../components/ui/Orb'
import useRetellWebCall from '../hooks/useRetellWebCall'
import {
  SiSalesforce,
  SiHubspot,
  SiZoho,
  SiGooglecalendar,
  SiMicrosoftoutlook,
  SiSlack,
  SiTwilio,
  SiZapier,
  SiGoogle,
  SiMicrosoftteams,
  SiNotion,
  SiAirtable,
  SiMailchimp,
  SiStripe,
  SiShopify,
  SiWordpress,
  SiSquarespace,
  SiIntercom,
  SiZendesk,
  SiAsana,
  SiTrello,
  SiGithub,
  SiDropbox,
  SiFigma
} from 'react-icons/si'
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
  CheckCircle,
  PhoneCall,
  Bot,
  Bell,
  ChevronRight,
  Mic,
  Sparkles,
  TrendingUp,
  PhoneOff,
  Loader2
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
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-2 sm:mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{description}</p>
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
const IndustryCard = ({ icon: Icon, title, description, features, isActive, iconBgColor, iconTextColor }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`group relative p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 cursor-pointer overflow-hidden transition-all duration-300 h-full flex flex-col ${isActive
        ? 'border-primary-600 bg-primary-50 shadow-xl'
        : 'border-neutral-border bg-white hover:border-primary-300 hover:shadow-xl'
      }`}
  >
    {/* Hover gradient background */}
    <div className={`absolute inset-0 bg-primary-50 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

    {/* Icon with animation */}
    <motion.div
      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-shadow ${
        iconBgColor
          ? `${iconBgColor}`
          : isActive
            ? 'bg-primary-600 text-white shadow-lg'
            : 'bg-primary-50 text-primary-600 shadow-sm group-hover:shadow-md'
      }`}
      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${iconTextColor || ''}`} />

      {/* Pulse ring on hover */}
      <motion.div
        className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-primary-400 opacity-0 group-hover:opacity-20`}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>

    {/* Title */}
    <h3 className="relative text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors duration-300" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>

    {/* Description */}
    <p className="relative text-sm sm:text-base text-text-secondary mb-4 sm:mb-5 leading-relaxed">{description}</p>

    {/* Features list */}
    <ul className="relative space-y-2 sm:space-y-3 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary font-medium">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>

    {/* Animated corner accent */}
    <motion.div
      className="absolute top-0 right-0 w-20 h-20 bg-primary-500 opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-300"
    />
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
  const typedRef = useRef(null)

  // Retell AI Web Call hook
  const {
    callStatus,
    error: callError,
    startCall,
    endCall,
    isConnecting,
    isConnected
  } = useRetellWebCall()

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['leads', 'bookings', 'support calls', 'customers'],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    })

    return () => {
      typed.destroy()
    }
  }, [])

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
      features: ['Patient scheduling', 'Insurance verification', 'Prescription refills', 'Appointment reminders'],
      iconBgColor: 'bg-blue-100/70',
      iconTextColor: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Insurance',
      description: 'Handle claims inquiries and policy questions 24/7.',
      features: ['Claims status updates', 'Policy information', 'Quote requests', 'Agent routing'],
      iconBgColor: 'bg-blue-100/70',
      iconTextColor: 'text-blue-600'
    },
    {
      icon: HomeIcon,
      title: 'Real Estate',
      description: 'Qualify leads and schedule property viewings automatically.',
      features: ['Lead qualification', 'Showing scheduling', 'Property inquiries', 'Agent matching'],
      iconBgColor: 'bg-blue-100/70',
      iconTextColor: 'text-blue-600'
    },
    {
      icon: Building2,
      title: 'Professional Services',
      description: 'Custom solutions for law firms, accounting, and consulting.',
      features: ['Consultation booking', 'Client intake', 'Document requests', 'Follow-up calls'],
      iconBgColor: 'bg-blue-100/70',
      iconTextColor: 'text-blue-600'
    }
  ]

  const integrations = [
    { name: 'Salesforce', icon: SiSalesforce },
    { name: 'HubSpot', icon: SiHubspot },
    { name: 'Zoho', icon: SiZoho },
    { name: 'Google Calendar', icon: SiGooglecalendar },
    { name: 'Zapier', icon: SiZapier },
    { name: 'Outlook', icon: SiMicrosoftoutlook },
    { name: 'Slack', icon: SiSlack },
    { name: 'Twilio', icon: SiTwilio },
    { name: 'Google Ads', icon: SiGoogle },
    { name: 'Teams', icon: SiMicrosoftteams },
    { name: 'Notion', icon: SiNotion },
    { name: 'Airtable', icon: SiAirtable },
    { name: 'Mailchimp', icon: SiMailchimp },
    { name: 'Stripe', icon: SiStripe },
    { name: 'Shopify', icon: SiShopify },
    { name: 'WordPress', icon: SiWordpress },
    { name: 'Squarespace', icon: SiSquarespace },
    { name: 'Intercom', icon: SiIntercom },
    { name: 'Zendesk', icon: SiZendesk },
    { name: 'Asana', icon: SiAsana },
    { name: 'Trello', icon: SiTrello },
    { name: 'GitHub', icon: SiGithub },
    { name: 'Dropbox', icon: SiDropbox },
    { name: 'Figma', icon: SiFigma }
  ]

  const stats = [
    { number: 67, suffix: '%', label: 'Calls outside business hours' },
    { number: 1200, suffix: '+', label: 'Average cost per missed lead' },
    { number: 35, suffix: '%', label: 'Reduction in no-shows' }
  ]

  return (
    <div className="bg-white overflow-hidden">
      <SEOMeta
        title="AI Automation Solutions & AI Agents for Business"
        description="CogniDrift offers enterprise AI automation solutions, AI agents for business, and AI digital workforce tools. Automate workflows, calls, SMS, and customer communications with intelligent AI."
        keywords="AI automation solutions, AI agents for business, enterprise AI automation, AI digital workforce, business AI automation platform"
        url="/"
      />
      {/* Hero Section with Siri Wave Background */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-white px-4">
        {/* Clean white background — no gradient blobs for cleaner 3D text contrast */}

        {/* 3D Wave Animation Background */}
        <SiriWaveBackground />

        {/* Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
          {/* Live Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-4 sm:mb-6 bg-slate-50 border border-slate-200 rounded-full shadow-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center w-full max-w-6xl mx-auto px-2"
          >
            <motion.h1
              variants={fadeInUp}
              className="mb-4 sm:mb-6"
            >
              {/* AI Receptionist with 3D Effect */}
              <span className="block mb-3 sm:mb-4 px-2 text-3d-wrapper text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight leading-[1.1]" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', letterSpacing: '-0.02em' }}>
                {/* Depth shadow layer */}
                <span className="text-3d-shadow" aria-hidden="true">AI Receptionist</span>
                {/* Top highlight layer */}
                <span className="text-3d-highlight" aria-hidden="true">AI Receptionist</span>
                {/* Main gradient text on top */}
                <span className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ zIndex: 1 }}>
                  AI Receptionist
                </span>
              </span>
              <span className="block text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-slate-600 leading-relaxed px-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                Never miss{' '}
                <span ref={typedRef} className="font-normal bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent"></span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg lg:text-2xl text-slate-600 max-w-full mx-auto mt-6 sm:mt-8 md:mt-12 pt-4 sm:pt-6 md:pt-8 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-light px-2"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.01em' }}
            >
              24×7 AI voice agents for inbound and outbound calls, SMS, email, web chat, and avatars.
            </motion.p>

            {/* Voice Orb - Try Demo */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center justify-center px-2 mt-4 sm:mt-6"
            >
              {/* Error Message */}
              {callError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm max-w-md"
                >
                  {callError}
                </motion.div>
              )}

              {/* Animated Voice Orb with React Bits Orb Background */}
              <motion.div
                className="relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px]"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* React Bits Orb - fills entire container */}
                <div className="absolute inset-0" style={{ zIndex: 0 }}>
                  <Orb
                    hue={isConnected ? 240 : 0}
                    hoverIntensity={2}
                    rotateOnHover
                    forceHoverState={false}
                    backgroundColor="#000000"
                  />
                </div>

                {/* Voice Button - perfectly centered */}
                <button
                  onClick={isConnected ? endCall : startCall}
                  disabled={isConnecting}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer disabled:cursor-not-allowed focus:outline-none"
                  style={{ zIndex: 10 }}
                >
                  <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center">
                    {/* Inner Gradient Background */}
                    <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isConnected ? 'bg-transparent' : 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600'}`}></div>

                    {/* Animated Inner Glow */}
                    {!isConnected && (
                      <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/40"
                      ></motion.div>
                    )}

                    {/* Icon */}
                    <div className="relative z-10">
                      {isConnecting ? (
                        <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 text-white animate-spin drop-shadow-lg" />
                      ) : isConnected ? (
                        <div className="flex items-center gap-1">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ scaleY: [0.3, 1, 0.3] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                              className="w-2 rounded-full drop-shadow-lg"
                              style={{ 
                                height: i === 2 ? '40px' : i === 1 || i === 3 ? '30px' : '20px',
                                background: 'linear-gradient(to bottom, #f87171, #dc2626, #be123c)'
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Mic className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* Status Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-4 text-sm font-medium transition-colors duration-300 ${isConnected ? 'bg-gradient-to-r from-red-400 via-red-600 to-rose-700 bg-clip-text text-transparent' : isConnecting ? 'text-slate-600' : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent'}`}
              >
                {isConnecting ? 'Connecting...' : isConnected ? 'Tap to End The Call' : 'Talk to Our Voice Agent'}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Try Now Section */}
      <TryNowSection />

      {/* Video Showcase Section */}
      <VideoShowcaseSection />

      {/* Problem Section - COMMENTED OUT
      <section className="relative py-16 sm:py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
          >
            <motion.div
              variants={fadeInUp}
              className="relative inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-red-600 font-bold px-6 py-2 bg-red-50 rounded-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                The Problem
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="section-title hero-display mb-8 leading-[1.05]"
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

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-2xl text-text-secondary leading-relaxed font-light max-w-3xl mx-auto px-2"
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
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
                className="group relative bg-white border-2 border-neutral-border hover:border-primary-300 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <motion.div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 bg-${item.color}-50 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-${item.color}-600`} />

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

                <h3 className="relative text-base sm:text-lg lg:text-xl font-bold text-text-primary mb-2 sm:mb-3 leading-tight group-hover:text-primary-600 transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="relative text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                  {item.desc}
                </p>

                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-primary-500 opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-300"
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
      */}

      {/* How It Works Section - Enhanced */}
      <section className="py-16 sm:py-20 lg:py-28 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
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
          </motion.div>

          {/* Two Column Layout: Text + Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mt-10 sm:mt-16">
            {/* Left: Workflow Steps */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {[
                { icon: Phone, title: 'Visitor Arrives', desc: 'Customer visits your website', color: 'blue', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500' },
                { icon: Bot, title: 'Widget Appears', desc: 'AI chat widget greets instantly', color: 'purple', bgColor: 'bg-purple-500/10', textColor: 'text-purple-500' },
                { icon: Calendar, title: 'Smart Assistance', desc: 'Answers questions, books appointments', color: 'indigo', bgColor: 'bg-indigo-500/10', textColor: 'text-indigo-500' },
                { icon: Bell, title: 'Lead Captured', desc: 'Information saved, ready to convert', color: 'green', bgColor: 'bg-green-500/10', textColor: 'text-green-500' }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start gap-5 group"
                >
                  <div className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${step.bgColor} flex items-center justify-center transition-all`}>
                    <step.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${step.textColor}`} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full border-2 sm:border-4 border-neutral-offWhite flex items-center justify-center shadow-md">
                      <span className="text-xs sm:text-sm font-black text-gray-900">{i + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1 sm:mb-2 group-hover:text-primary-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
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
            <Link to="/products/phone-receptionist">
              <button className="btn-primary animate-glow">
                See How It Works
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Industry Solutions - Enhanced */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
            >
              <Building2 className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Industry Solutions</span>
            </motion.div>
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch"
          >
            {industries.map((industry, i) => (
              <motion.div key={i} variants={fadeInUp} onClick={() => setActiveIndustry(i)} className="h-full">
                <IndustryCard {...industry} isActive={activeIndustry === i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Calls Section */}
      {/* <DemoCalls /> */} {/* Hidden for future use */}

      {/* Trust Elements */}
      {/* <ClientLogos /> */} {/* Hidden for future use */}
      {/* <Testimonials /> */} {/* Hidden for future use */}
      {/* <TrustBadges /> */} {/* Hidden - Enterprise Security section */}



      {/* Features Grid - Unique Bento Style */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-neutral-offWhite overflow-hidden">
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
            className="text-center mb-10 sm:mb-12"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Powerful Features</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="section-title hero-display mb-4"
            >
              Everything  <span className="text-gradient">You Need</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
            >
              A complete suite of AI-powered features designed to transform how your business handles communication
            </motion.p>
          </motion.div>

          {/* Collage Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto] gap-3 sm:gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon

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

              // Collage layout: asymmetric, editorial grid
              // Row 1: [wide 5col] [3col] [4col]
              // Row 2: [3col] [5col tall/row-span-2] [4col]
              // Row 3: [3col] [---continued---] [4col]
              const collageLayouts = [
                'lg:col-span-5',                        // 0: wide left
                'lg:col-span-3',                        // 1: narrow center
                'lg:col-span-4',                        // 2: medium right
                'lg:col-span-3',                        // 3: narrow left
                'lg:col-span-5 lg:row-span-2',          // 4: tall center piece
                'lg:col-span-4',                        // 5: medium right
                'lg:col-span-3',                        // 6: narrow left
                'lg:col-span-4',                        // 7: medium right
              ]

              const colors = colorSchemes[index % colorSchemes.length]
              const layout = collageLayouts[index]
              const isTall = layout.includes('row-span-2')
              const isWide = index === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.5 }}
                  className={`${layout} group`}
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative h-full bg-white rounded-xl sm:rounded-2xl ${isTall ? 'p-5 sm:p-6' : isWide ? 'p-4 sm:p-5 lg:p-6' : 'p-4 sm:p-5'} border-2 ${colors.border} overflow-hidden shadow-md hover:shadow-xl ${colors.glow} transition-all duration-500`}
                  >
                    {/* Background Pattern */}
                    <div className={`absolute inset-0 ${colors.lightBg} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>

                    {/* Decorative Circle */}
                    <motion.div
                      className={`absolute -top-10 -right-10 ${isTall ? 'w-48 h-48' : 'w-32 h-32'} ${colors.bg} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center justify-center h-full">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex ${isTall ? 'w-14 h-14' : 'w-10 h-10 sm:w-12 sm:h-12'} ${colors.lightBg} rounded-xl items-center justify-center mb-3 shadow-md group-hover:shadow-xl transition-shadow`}
                      >
                        <Icon className={`${isTall ? 'w-7 h-7' : 'w-5 h-5 sm:w-6 sm:h-6'} ${colors.icon}`} />
                      </motion.div>

                      <div>
                        {/* Title */}
                        <h3 className={`${isTall ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'} font-bold text-text-primary mb-1.5 leading-tight group-hover:text-primary-600 transition-colors`}>
                          {feature.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-text-secondary ${isTall ? 'text-sm' : 'text-xs sm:text-sm'} leading-relaxed`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute bottom-0 right-0 ${isTall ? 'w-24 h-24' : 'w-16 h-16'} ${colors.bg} opacity-5 rounded-tl-full transition-all duration-500 group-hover:w-32 group-hover:h-32`}></div>
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
            className="text-center mt-8 sm:mt-10"
          >
            <Link to="/products/phone-receptionist">
              <button className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 animate-glow group">
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
      <section className="relative py-10 sm:py-12 lg:py-16 bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Centered */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="section-header mb-6 sm:mb-8"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-transparent text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-3 sm:mb-4 border border-blue-200"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Smart Scheduling</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="section-title hero-display"
            >
              Appointments Book <span className="text-gradient">Themselves</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="section-subtitle max-w-2xl mx-auto"
            >
              AI handles booking automatically - checking availability, confirming times, and sending reminders.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left: Animated Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 pointer-events-none"
            >
              <AnimatedCalendar />
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.div
                variants={fadeInUp}
                className="space-y-2 sm:space-y-3"
              >
                {[
                  { icon: Calendar, text: 'Real-time sync with Google Calendar & Outlook' },
                  { icon: Shield, text: 'Automatic conflict detection and resolution' },
                  { icon: Bell, text: 'Smart reminders reduce no-shows by 35%' },
                  { icon: Globe, text: 'Multi-timezone support for global teams' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100/70 flex items-center justify-center mt-0.5">
                      <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-5 sm:mt-6">
                <Link to="/products/phone-receptionist">
                  <button className="btn-primary text-sm sm:text-base">
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
      <section className="relative py-16 sm:py-20 lg:py-32 bg-neutral-offWhite overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <motion.div
            animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-20 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Centered */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Real-Time Analytics</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="section-title hero-display"
            >
              Monitor <span className="text-gradient">Live</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="section-subtitle"
            >
              Live dashboard showing every call, message, and appointment in real-time.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="space-y-3 sm:space-y-4"
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
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100/70 flex items-center justify-center mt-0.5">
                      <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-6 sm:mt-8">
                <Link to="/products/dashboards">
                  <button className="btn-primary text-sm sm:text-base">
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
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
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
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
            >
              <Zap className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Integrations</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="section-title hero-display"
            >
              Connects With <span className="text-gradient">Everything</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto px-2"
            >
              Seamlessly integrates with your existing tools and workflows
            </motion.p>
          </motion.div>

          {/* Infinite Logo Marquee */}
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Marquee track */}
            <div className="overflow-hidden">
              <motion.div
                className="flex items-center gap-4 sm:gap-6"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 40,
                    ease: 'linear',
                  },
                }}
              >
                {/* Duplicate integrations for seamless loop */}
                {[...integrations, ...integrations].map((integration, i) => {
                  const colors = [
                    { light: 'bg-blue-50', text: 'text-blue-600' },
                    { light: 'bg-orange-50', text: 'text-orange-600' },
                    { light: 'bg-red-50', text: 'text-red-600' },
                    { light: 'bg-emerald-50', text: 'text-emerald-600' },
                    { light: 'bg-orange-50', text: 'text-orange-600' },
                    { light: 'bg-blue-50', text: 'text-blue-600' },
                    { light: 'bg-purple-50', text: 'text-purple-600' },
                    { light: 'bg-red-50', text: 'text-red-600' },
                  ]
                  const color = colors[i % colors.length]
                  const IconComponent = integration.icon

                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="group relative flex-shrink-0"
                    >
                      <div className="relative bg-white border-2 border-gray-200 group-hover:border-primary-300 rounded-xl sm:rounded-2xl w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center transition-all duration-300 overflow-hidden shadow-sm group-hover:shadow-xl">
                        <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative text-center z-10">
                          <motion.div
                            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className={`w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 ${color.light} rounded-lg sm:rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}
                          >
                            <IconComponent className={`w-5 h-5 sm:w-7 sm:h-7 ${color.text}`} />
                          </motion.div>
                          <p className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary-600 transition-colors duration-300">
                            {integration.name}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>

            {/* Floating CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <Link to="/integrations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 sm:gap-3 bg-primary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-glow transition-all duration-300 group text-sm sm:text-base"
                >
                  <span>Explore All Integrations</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </Link>

              {/* Stats below button */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
                className="mt-6 text-sm text-text-muted"
              >
                <span className="font-semibold text-primary-600">100+</span> integrations and counting
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-600 mb-2">{stat.number}{stat.suffix}</div>
                <div className="text-sm sm:text-base text-text-secondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center text-text-muted text-sm mt-12"
          >
            Sources: Forbes, BIA/Kelsey, Harvard Business Review
          </motion.p>
        </div>
      </section>


      {/* CTA Section - Enhanced */}
      <section className="py-12 sm:py-16 lg:py-28 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 text-center relative overflow-hidden border-2 border-primary-100"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6 relative z-10 border border-blue-100"
            >
              <PhoneCall className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Get Started</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="section-title hero-display mb-4 sm:mb-6 relative z-10">
              Ready to Stop <span className="text-gradient">Missing Calls?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 sm:mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed px-2">
              Join businesses that never miss a lead. Book a <span className="font-bold text-primary-600">15-minute demo</span> to see how
              CogniDrift can transform your customer communications.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex justify-center relative z-10">
              <Link to="/contact">
                <button className="btn-primary px-6 sm:px-10 py-3 sm:py-5 text-base sm:text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
                  Book Your Demo
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
