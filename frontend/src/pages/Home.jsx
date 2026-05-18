import SEOMeta from '../components/SEOMeta'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState, lazy, Suspense } from 'react'
import Typed from 'typed.js'
import FloatingNotifications from '../components/FloatingNotifications'
import SiriWaveBackground from '../components/SiriWaveBackground'
import Orb from '../components/ui/Orb'
import IndustryCard from '../components/ui/IndustryCard'
import ProductShowcase from '../components/ProductShowcase'
import { fadeInUp, staggerContainer } from '../utils/motionVariants'
import { SiOpenai, SiMeta } from 'react-icons/si'
import { ClaudeIcon, GeminiIcon } from '../components/ui/AIProviderIcons'
import { features, industries, integrations, stats } from '../data/homePageData'

const TryNowSection = lazy(() => import('../components/TryNowSection'))
const AnimatedDashboard = lazy(() => import('../components/AnimatedDashboard'))
const MultiChannelShowcase = lazy(() => import('../components/MultiChannelShowcase'))
const AnimatedCalendar = lazy(() => import('../components/AnimatedCalendar'))
const CogniHubShowcase = lazy(() => import('../components/CogniHubShowcase'))
const VideoShowcaseSection = lazy(() => import('../components/VideoShowcaseSection'))
import useRetellWebCall from '../hooks/useRetellWebCall'
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
  ArrowRight,
  Check,
  PhoneCall,
  Bot,
  Bell,
  ChevronRight,
  Mic,
  Sparkles,
  TrendingUp,
  Loader2
} from 'lucide-react'

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
                <span className="text-3d-shadow" aria-hidden="true">Your 24/7 AI Workforce</span>
                {/* Top highlight layer */}
                <span className="text-3d-highlight" aria-hidden="true">Your 24/7 AI Workforce</span>
                {/* Main gradient text on top */}
                <span className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ zIndex: 1 }}>
                  Your 24/7 AI Workforce
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
              A unified AI front-office. One platform to automate every call, chat, and lead.
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

      {/* Try Now Section — CogniVoice */}
      <Suspense fallback={null}>
        <TryNowSection />
      </Suspense>

      {/* CogniChat Section */}
      <ProductShowcase
        badge={{ icon: Zap, label: 'AI Chatbot', brandName: 'Chat' }}
        title="Your AI"
        titleHighlight="ChatBot"
        subtitle="A simple, powerful process that transforms how you answer queries."
        demoSide="left"
        demoComponent={<MultiChannelShowcase />}
        bg="bg-white"
        features={[
          { icon: Bot, title: 'Instant AI Responses', desc: 'Answer customer questions 24/7 with human-like accuracy' },
          { icon: Calendar, title: 'Smart Booking', desc: 'Automatically schedule appointments from chat conversations' },
          { icon: MessageSquare, title: 'Multi-Channel', desc: 'Deploy on website, WhatsApp, Facebook Messenger, and more' },
          { icon: Bell, title: 'Lead Capture', desc: 'Collect contact info and qualify leads automatically' },
        ]}
        ctaText="Explore CogniChat"
        ctaLink="/products/cognichat"
      />

      {/* CogniHub Section */}
      <ProductShowcase
        badge={{ icon: Sparkles, label: 'AI Workspace', brandName: 'Hub' }}
        title="Every AI Model."
        titleHighlight="One Workspace."
        subtitle="One workspace for every AI model. Build custom agents, share with your team, and unify your AI costs."
        demoSide="right"
        demoComponent={<CogniHubShowcase />}
        bg="bg-neutral-offWhite"
        features={[
          {
            icon: Sparkles, title: 'Multi-Model Access', desc: 'GPT, Claude, Gemini, Mistral, and more in one workspace',
            extra: (
              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                <div className="w-7 h-7 rounded-full bg-[#10a37f] flex items-center justify-center" title="GPT"><SiOpenai className="w-3.5 h-3.5 text-white" /></div>
                <div className="w-7 h-7 rounded-full bg-[#D97757] flex items-center justify-center" title="Claude"><ClaudeIcon className="w-3.5 h-3.5 text-white" /></div>
                <div className="w-7 h-7 rounded-full bg-[#4285f4] flex items-center justify-center" title="Gemini"><GeminiIcon className="w-3.5 h-3.5 text-white" /></div>
                <div className="w-7 h-7 rounded-full bg-[#f97316] flex items-center justify-center" title="Mistral"><span className="text-[10px] font-black text-white">M</span></div>
                <div className="w-7 h-7 rounded-full bg-[#0668E1] flex items-center justify-center" title="Llama"><SiMeta className="w-3.5 h-3.5 text-white" /></div>
                <div className="w-7 h-7 rounded-full bg-[#7c3aed] flex items-center justify-center" title="DeepSeek"><span className="text-[9px] font-black text-white">DS</span></div>
              </div>
            )
          },
          { icon: Bot, title: 'Custom AI Agents', desc: "Build agents tailored to your team's specific workflows" },
          { icon: Zap, title: 'Tool Integrations', desc: 'Connect with Salesforce, HubSpot, Slack, and 100+ tools' },
          { icon: BarChart3, title: 'Rich Output', desc: 'Charts, tables, files, and code — not just plain text' },
        ]}
        ctaText="Explore CogniHub"
        ctaLink="/products/cognihub"
      />

      {/* Video Showcase Section — CogniAvatar */}
      <Suspense fallback={null}>
        <VideoShowcaseSection />
      </Suspense>

      {/* Monitor Live Section */}
      <ProductShowcase
        badge={{ icon: BarChart3, label: 'Real-Time Analytics' }}
        title="Monitor"
        titleHighlight="Live"
        subtitle="Live dashboard showing every call, message, and appointment in real-time."
        demoSide="right"
        demoComponent={<AnimatedDashboard />}
        bg="bg-neutral-offWhite"
        backgroundDecor={
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <motion.div animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute bottom-20 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
          </div>
        }
        features={[
          { icon: TrendingUp, title: 'Real-Time Metrics', desc: 'Track call volume, response times, and conversion rates' },
          { icon: Users, title: 'Conversation Monitoring', desc: 'Monitor active conversations and customer sentiment' },
          { icon: Clock, title: 'Peak Hour Analysis', desc: 'Identify peak hours and optimize staffing' },
          { icon: Check, title: 'Detailed Reports', desc: 'Export detailed reports for your team' },
        ]}
        ctaText="Explore Analytics"
        ctaLink="/products/dashboards"
      />

      {/* Smart Scheduling Section */}
      <ProductShowcase
        badge={{ icon: Calendar, label: 'Smart Scheduling' }}
        title="Appointments Book"
        titleHighlight="Themselves"
        subtitle="AI handles booking automatically - checking availability, confirming times, and sending reminders."
        demoSide="left"
        demoComponent={<AnimatedCalendar />}
        bg="bg-white"
        features={[
          { icon: Calendar, title: 'Calendar Sync', desc: 'Real-time sync with Google Calendar and Outlook' },
          { icon: Shield, title: 'Conflict Detection', desc: 'Automatic conflict detection and resolution' },
          { icon: Bell, title: 'Smart Reminders', desc: 'Reduce no-shows by 35% with automated reminders' },
          { icon: Globe, title: 'Multi-Timezone', desc: 'Support for global teams across all time zones' },
        ]}
        ctaText="Learn About Scheduling"
        ctaLink="/products/ai-calendar"
      />

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
            <Link to="/products/cognichat">
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

      {/* Industry Solutions - Enhanced */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
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
            viewport={{ once: true, amount: 0.3 }}
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

      {/* Integrations */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-neutral-offWhite overflow-hidden">
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
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-neutral-offWhite to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-neutral-offWhite to-transparent z-10 pointer-events-none" />

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
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
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
      <section className="py-12 sm:py-16 lg:py-28 bg-neutral-offWhite">
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
