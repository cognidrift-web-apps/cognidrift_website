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
    <div className="avatar bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-600 font-semibold">
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
          <Check className="w-4 h-4 text-accent-teal" />
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
      <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-primary-50 via-white to-neutral-lightBlue overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl"></div>
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
                <span className="gradient-text">Another Call</span>
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
                  <button className="btn-primary">
                    Book a Demo
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <button className="btn-secondary">
                  <Play className="w-5 h-5" />
                  Watch Video
                </button>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="mt-12 flex items-center gap-8"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-white flex items-center justify-center text-primary-600 text-xs font-semibold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Built with enterprise-grade AI</p>
                  <p className="text-sm text-text-muted">Powered by advanced language models</p>
                </div>
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
                <div className="absolute -inset-3 bg-gradient-to-r from-primary-500 via-accent-purple to-accent-teal rounded-[2.5rem] opacity-30 blur-2xl animate-pulse-slow"></div>
                
                {/* Rotating Border Effect */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-accent-purple to-accent-teal rounded-[2rem] opacity-75"
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
                  
                  {/* Video Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none"></div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary-400 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent-teal rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent-purple rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary-400 rounded-br-lg"></div>
                  
                  {/* Animated Dots */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-3 right-3 w-3 h-3 bg-accent-teal rounded-full shadow-lg shadow-accent-teal/50"
                  ></motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute bottom-3 left-3 w-3 h-3 bg-accent-purple rounded-full shadow-lg shadow-accent-purple/50"
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
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-accent-purple to-accent-teal rounded-2xl opacity-75 blur-sm animate-pulse-slow"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 backdrop-blur-xl border border-white/10 text-white p-5 rounded-2xl shadow-2xl max-w-[300px]">
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
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 via-accent-purple to-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        {/* Pulse Ring */}
                        <div className="absolute inset-0 rounded-xl bg-primary-500/30 animate-ping"></div>
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-bold bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
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
                            <Sparkles className="w-4 h-4 text-accent-teal" />
                          </motion.div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-accent-teal animate-pulse shadow-lg shadow-accent-teal/50"></div>
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
                      <span className="px-2 py-1 bg-accent-teal/20 border border-accent-teal/30 rounded-full text-[10px] text-accent-teal font-medium">
                        AI-Powered
                      </span>
                      <span className="px-2 py-1 bg-accent-purple/20 border border-accent-purple/30 rounded-full text-[10px] text-accent-purple font-medium">
                        Multi-lingual
                      </span>
                    </div>
                    
                    {/* Decorative Corner Element */}
                    <div className="absolute top-2 right-2">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-2 h-2 rounded-full bg-accent-teal shadow-lg shadow-accent-teal/50"
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
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">The Problem</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Your Team Shouldn't Be<br />Stuck on the Phone
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              Every missed call is a missed opportunity. Every hour on the phone is an hour away from your core business.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Phone, title: 'Missed Calls = Lost Revenue', desc: 'Up to $1,200 lost per unanswered lead call' },
              { icon: Users, title: 'Staff Burnout', desc: 'Repetitive call handling drains your team' },
              { icon: Clock, title: 'After-Hours Silence', desc: '67% of calls come outside business hours' },
              { icon: Calendar, title: 'Manual Scheduling', desc: 'Hours wasted on booking and reminders' }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="card text-center">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
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
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200"></div>
            
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
              <button className="btn-primary">
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
      <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-700">
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
                <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
                  <Mic className="w-5 h-5" />
                  Talk to Our AI
                </button>
                <Link to="/contact">
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors">
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

      {/* Features Grid - Scroll Stack */}
      <section className="relative py-24 bg-gradient-to-b from-white via-neutral-offWhite to-white">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative">
          <ScrollStack
            itemDistance={200}
            itemScale={0.02}
            itemStackDistance={60}
            stackPosition="15%"
            baseScale={0.95}
            rotationAmount={0}
            blurAmount={0}
            useWindowScroll={true}
          >
            {/* Header Card */}
            <ScrollStackItem itemClassName="!h-auto !min-h-[18rem] !shadow-2xl">
              <div className="w-full h-full relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-purple text-white overflow-hidden rounded-3xl">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%']
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '50px 50px'
                    }}
                  />
                </div>
                
                <div className="relative flex flex-col justify-center h-full p-8 md:p-12">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block text-xs md:text-sm uppercase tracking-wider font-semibold mb-3 text-primary-100"
                  >
                    Features
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  >
                    Everything You Need
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-lg text-primary-100 max-w-2xl"
                  >
                    Comprehensive features designed to handle any call scenario your business faces.
                  </motion.p>
                </div>
              </div>
            </ScrollStackItem>

            {features.map((feature, index) => {
              const Icon = feature.icon
              const colors = [
                { bg: 'from-blue-500 to-indigo-600', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', border: 'border-blue-200', glow: 'bg-blue-400', accent: 'bg-blue-50' },
                { bg: 'from-purple-500 to-pink-600', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', border: 'border-purple-200', glow: 'bg-purple-400', accent: 'bg-purple-50' },
                { bg: 'from-teal-500 to-cyan-600', iconBg: 'bg-teal-100', iconColor: 'text-teal-600', border: 'border-teal-200', glow: 'bg-teal-400', accent: 'bg-teal-50' },
                { bg: 'from-green-500 to-emerald-600', iconBg: 'bg-green-100', iconColor: 'text-green-600', border: 'border-green-200', glow: 'bg-green-400', accent: 'bg-green-50' },
                { bg: 'from-orange-500 to-red-600', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', border: 'border-orange-200', glow: 'bg-orange-400', accent: 'bg-orange-50' },
                { bg: 'from-indigo-500 to-purple-600', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', border: 'border-indigo-200', glow: 'bg-indigo-400', accent: 'bg-indigo-50' },
                { bg: 'from-pink-500 to-rose-600', iconBg: 'bg-pink-100', iconColor: 'text-pink-600', border: 'border-pink-200', glow: 'bg-pink-400', accent: 'bg-pink-50' },
                { bg: 'from-cyan-500 to-blue-600', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600', border: 'border-cyan-200', glow: 'bg-cyan-400', accent: 'bg-cyan-50' },
              ]
              const color = colors[index % colors.length]
              
              return (
                <ScrollStackItem key={index} itemClassName="!h-auto !min-h-[14rem] !shadow-2xl">
                  <div className={`w-full h-full relative bg-white border-2 ${color.border} overflow-hidden group hover:shadow-3xl transition-all duration-500 rounded-3xl`}>
                    {/* Gradient Accent Background */}
                    <div className={`absolute top-0 right-0 w-1/3 h-full ${color.accent} opacity-50`}></div>
                    
                    {/* Gradient on Hover */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    {/* Floating Sparkle */}
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                      }}
                      className="absolute top-4 right-4 md:top-6 md:right-6 z-10"
                    >
                      <Sparkles className={`w-6 h-6 md:w-8 md:h-8 ${color.iconColor} opacity-30`} />
                    </motion.div>
                    
                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 h-full p-6 md:p-8">
                      {/* Icon */}
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="relative flex-shrink-0"
                      >
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${color.iconBg} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-500`}>
                          <Icon className={`w-10 h-10 md:w-12 md:h-12 ${color.iconColor}`} />
                        </div>
                        
                        {/* Pulse Ring */}
                        <motion.div
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className={`absolute inset-0 rounded-2xl ${color.glow} opacity-20`}
                        />
                      </motion.div>
                      
                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-primary mb-2 md:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary-600 group-hover:to-accent-purple transition-all duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-text-secondary text-sm md:text-base lg:text-lg leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Animated Border Bottom */}
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color.bg}`}
                    />
                  </div>
                </ScrollStackItem>
              )
            })}
          </ScrollStack>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">Integrations</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Works With Your Stack
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              Seamlessly connects with the tools you already use.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {integrations.map((name, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="px-6 py-4 bg-white rounded-xl shadow-card border border-neutral-border text-text-secondary font-medium hover:text-primary-600 hover:border-primary-200 transition-all cursor-pointer"
              >
                {name}
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
            <button className="btn-ghost">
              See All Integrations
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gradient-to-r from-primary-700 to-primary-600">
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
            className="bg-gradient-to-br from-primary-50 to-neutral-lightBlue rounded-3xl p-12 md:p-16 text-center"
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
                <button className="btn-primary">
                  Book Your Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="btn-secondary">
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
