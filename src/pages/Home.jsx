import { Link } from 'react-router-dom'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack'
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
  Sparkles
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

// Notification Card Component (Virio-style)
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

// Feature Card Component
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
      className="card-feature group"
    >
      <div className="icon-wrapper">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
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

// Industry Card Component
const IndustryCard = ({ icon: Icon, title, description, features, isActive }) => (
  <div className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
    isActive 
      ? 'border-primary-600 bg-primary-50 shadow-lg' 
      : 'border-neutral-border bg-white hover:border-primary-300'
  }`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
      isActive ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600'
    }`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
    <p className="text-text-secondary mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
          <Check className="w-4 h-4 text-accent-amber" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 bg-primary-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-coral/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span 
                variants={fadeInUp}
                className="inline-block text-sm uppercase tracking-wider text-primary-600 font-semibold mb-4"
              >
                AI-Powered Voice Automation
              </motion.span>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-hero lg:text-hero-lg text-text-primary mb-6"
              >
                Never Miss
                <br />
                <span className="text-primary-600">Another Call</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-text-secondary mb-8 max-w-lg"
              >
                AI voice agents that answer calls, qualify leads, and book appointments 24/7. 
                Your customers get instant responses while you focus on what matters.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/contact">
                  <button className="btn-primary animate-glow">
                    Book a Demo
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <button className="btn-secondary animate-glow">
                  <Play className="w-5 h-5" />
                  Watch Video
                </button>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="mt-12 inline-block"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-coral to-primary-600 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500"></div>
                  
                  {/* Main card */}
                  <div className="relative bg-white/90 backdrop-blur-sm border-2 border-primary-200 rounded-2xl p-5 pr-8 shadow-lg">
                    <div className="flex items-center gap-5">
                      {/* Animated dots */}
                      <div className="flex gap-2">
                        {[0, 1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.3, 1],
                              backgroundColor: [
                                'rgb(234, 88, 12)',
                                'rgb(251, 146, 60)',
                                'rgb(234, 88, 12)'
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: 'easeInOut'
                            }}
                            className="w-2 h-2 rounded-full bg-primary-600"
                          />
                        ))}
                      </div>
                      
                      {/* Divider */}
                      <div className="w-px h-10 bg-primary-200"></div>
                      
                      {/* Text content */}
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg"
                          >
                            <Sparkles className="w-5 h-5 text-white" />
                          </motion.div>
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-xl bg-primary-400"
                          />
                        </div>
                        
                        <div>
                          <p className="text-base font-bold text-text-primary flex items-center gap-2">
                            Enterprise-Grade AI
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="inline-block w-2 h-2 rounded-full bg-green-500"
                            />
                          </p>
                          <p className="text-sm text-primary-600 font-medium">Advanced Language Models</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right Content - Video with Agent Info */}
            <div className="relative hidden lg:block h-[600px]">
              {/* Main Video Component with Enhanced Styling */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative w-full h-full max-w-[520px] mx-auto"
              >
                {/* Animated Glow Background */}
                <div className="absolute -inset-3 bg-primary-500/30 rounded-[2.5rem] blur-2xl animate-pulse-slow"></div>
                
                {/* Rotating Border Effect */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-1 bg-primary-400/75 rounded-[2rem]"
                ></motion.div>
                
                {/* Video Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 h-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/hero.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary-400 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent-amber rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent-coral rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary-400 rounded-br-lg"></div>
                  
                  {/* Animated Dots */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-3 right-3 w-3 h-3 bg-accent-amber rounded-full shadow-lg shadow-accent-amber/50"
                  ></motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute bottom-3 left-3 w-3 h-3 bg-accent-coral rounded-full shadow-lg shadow-accent-coral/50"
                  ></motion.div>
                </div>
              </motion.div>
              
              {/* Agent Info Card - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
                className="absolute bottom-12 left-6 z-10"
              >
                {/* Animated Border Wrapper */}
                <div className="relative">
                  {/* Animated Glow Effect */}
                  <div className="absolute -inset-0.5 bg-primary-500/75 rounded-2xl blur-sm animate-pulse-slow"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-neutral-900 backdrop-blur-xl border border-white/10 text-white p-5 rounded-2xl shadow-2xl max-w-[300px]">
                    {/* Header with Avatar Icon */}
                    <div className="flex items-start gap-3 mb-3">
                      <motion.div 
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="relative"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-600/50">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        {/* Pulse Ring */}
                        <div className="absolute inset-0 rounded-xl bg-primary-500/30 animate-ping"></div>
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-bold text-white">
                            Agentic Avatar
                          </h4>
                          <motion.div
                            animate={{ 
                              rotate: 360,
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ 
                              rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                            }}
                          >
                            <Sparkles className="w-4 h-4 text-accent-amber" />
                          </motion.div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-accent-amber animate-pulse shadow-lg shadow-accent-amber/50"></div>
                          <p className="text-[10px] font-semibold tracking-widest text-primary-300 uppercase">
                            Virtual Receptionist
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-xs text-neutral-200 leading-relaxed mb-3">
                      Answer calls, schedule appointments, qualify leads, and handle customer inquiries 24/7 with human-like conversations.
                    </p>
                    
                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-[10px] text-primary-300 font-medium">
                        24/7 Available
                      </span>
                      <span className="px-2 py-1 bg-accent-amber/20 border border-accent-amber/30 rounded-full text-[10px] text-accent-amber font-medium">
                        AI-Powered
                      </span>
                      <span className="px-2 py-1 bg-accent-coral/20 border border-accent-coral/30 rounded-full text-[10px] text-accent-coral font-medium">
                        Multi-lingual
                      </span>
                    </div>
                    
                    {/* Decorative Corner Element */}
                    <div className="absolute top-2 right-2">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-2 h-2 rounded-full bg-accent-amber shadow-lg shadow-accent-amber/50"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Trust Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-neutral-border py-6">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {integrations.slice(0, 5).map((name, i) => (
                <span key={i} className="text-text-muted font-medium text-lg opacity-60 hover:opacity-100 transition-opacity">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-32 bg-white overflow-hidden">
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
            className="text-center max-w-4xl mx-auto mb-20"
          >
            {/* Eyebrow with animated underline */}
            <motion.div 
              variants={fadeInUp}
              className="relative inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-red-600 font-bold px-6 py-2 bg-red-50 rounded-full">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                The Problem
              </span>
            </motion.div>
            
            {/* Main Heading with split animation */}
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]"
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
              { icon: Users, title: 'Staff Burnout', desc: 'Repetitive call handling drains your team', color: 'orange' },
              { icon: Clock, title: 'After-Hours Silence', desc: '67% of calls come outside business hours', color: 'amber' },
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

      {/* How It Works Section */}
      <section className="py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">How It Works</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Meet Your AI Receptionist
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              A simple, powerful process that transforms how you handle calls.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8 relative"
          >
            {/* Connection Line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-primary-400"></div>
            
            {[
              { icon: PhoneCall, title: 'Call Comes In', desc: 'Customer calls your business number' },
              { icon: Bot, title: 'AI Engages', desc: 'Natural conversation and intent detection' },
              { icon: Calendar, title: 'Smart Action', desc: 'Books, routes, or logs automatically' },
              { icon: Bell, title: "You're Notified", desc: 'Real-time summary and recording' }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <WorkflowStep 
                  number={i + 1} 
                  icon={step.icon} 
                  title={step.title} 
                  description={step.desc}
                  isLast={i === 3}
                />
              </motion.div>
            ))}
          </motion.div>
          
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

      {/* Industry Solutions */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">Industry Solutions</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Built for Your Industry
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
      <section className="relative py-32 bg-neutral-offWhite overflow-hidden">
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
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-coral rounded-full blur-3xl"
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
              <span className="text-sm font-bold uppercase tracking-wider">Powerful Features</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6"
            >
              Everything You Need,{' '}
              <span className="relative inline-block">
                <span className="text-primary-600">Nothing You Don't</span>
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
                    stroke="#EA580C"
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
                { bg: 'bg-orange-500', lightBg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200', glow: 'shadow-orange-500/20' },
                { bg: 'bg-blue-500', lightBg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200', glow: 'shadow-blue-500/20' },
                { bg: 'bg-purple-500', lightBg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200', glow: 'shadow-purple-500/20' },
                { bg: 'bg-teal-500', lightBg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-200', glow: 'shadow-teal-500/20' },
                { bg: 'bg-red-500', lightBg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-200', glow: 'shadow-red-500/20' },
                { bg: 'bg-indigo-500', lightBg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-200', glow: 'shadow-indigo-500/20' },
                { bg: 'bg-pink-500', lightBg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-200', glow: 'shadow-pink-500/20' },
                { bg: 'bg-amber-500', lightBg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-200', glow: 'shadow-amber-500/20' }
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
            className="absolute bottom-20 right-0 w-96 h-96 bg-accent-coral rounded-full blur-3xl"
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
              {integrations.map((name, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group relative"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-2 bg-primary-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                  
                  {/* Card */}
                  <div className="relative bg-white border-2 border-neutral-border group-hover:border-primary-300 rounded-2xl p-6 aspect-square flex items-center justify-center shadow-sm group-hover:shadow-xl transition-all duration-300">
                    <div className="text-center">
                      {/* Icon placeholder - using first letter */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-12 h-12 mx-auto mb-2 bg-primary-50 group-hover:bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 font-bold text-xl shadow-sm transition-all"
                      >
                        {name.charAt(0)}
                      </motion.div>
                      <p className="text-xs font-semibold text-text-secondary group-hover:text-primary-600 transition-colors">
                        {name}
                      </p>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </motion.div>
              ))}
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

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-primary-50 rounded-3xl p-12 md:p-16 text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Ready to Stop Missing Calls?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Join businesses that never miss a lead. Book a 15-minute demo to see how 
              CogniDrift can transform your customer communications.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="btn-primary animate-glow">
                  Book Your Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="btn-secondary animate-glow">
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
