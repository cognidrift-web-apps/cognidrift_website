import SEOMeta from '../../components/SEOMeta'
import { motion } from 'framer-motion'
import { Phone, Calendar, Clock, CheckCircle2, ArrowRight, MessageSquare, Zap, Shield, Globe, BarChart3, Users, Headphones, Mic, Bot } from 'lucide-react'
import { Link } from 'react-router-dom'
import CogniVoicePricingCards from '../../components/CogniVoicePricingCards'
import { usePageAnimation } from '../../utils/useFirstMount'
import TryNowSection from '../../components/TryNowSection'

const CogniVoice = () => {
  const { heroInitial, heroAnimate, iconInitial, iconAnimate } = usePageAnimation()

  const features = [
    {
      icon: Phone,
      title: 'Inbound Call Handling',
      description: 'Answer every call instantly with a natural-sounding AI that greets, qualifies, and routes callers automatically.'
    },
    {
      icon: Calendar,
      title: 'Appointment Booking',
      description: 'Let callers book, reschedule, or cancel appointments in real time without human intervention.'
    },
    {
      icon: MessageSquare,
      title: 'Lead Qualification',
      description: 'Ask the right questions, capture caller intent, and score leads before they ever reach your team.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Never miss a call again—your AI receptionist works nights, weekends, and holidays.'
    }
  ]

  const benefits = [
    { icon: Zap, text: 'Answers calls in under 1 second' },
    { icon: Users, text: 'Customizable greetings and call flows' },
    { icon: Headphones, text: 'Transfers to live agents when needed' },
    { icon: BarChart3, text: 'Records and transcribes every call' },
    { icon: Globe, text: 'Multi-language support out of the box' },
    { icon: Shield, text: 'Integrates with your existing phone system' }
  ]

  const stats = [
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '<1s', label: 'Average Response Time' },
    { value: '50+', label: 'Languages Supported' },
    { value: '24/7', label: 'Always Available' }
  ]

  const useCases = [
    {
      title: 'Healthcare Practices',
      description: 'Handle patient scheduling, prescription refills, and appointment reminders with HIPAA-compliant AI.',
      features: ['Patient intake', 'Insurance verification', 'Appointment scheduling']
    },
    {
      title: 'Professional Services',
      description: 'Qualify leads, schedule consultations, and route calls to the right team members.',
      features: ['Lead qualification', 'Consultation booking', 'Call routing']
    },
    {
      title: 'Real Estate Agencies',
      description: 'Capture property inquiries, schedule showings, and never miss a potential buyer.',
      features: ['Property inquiries', 'Showing scheduling', 'Lead capture']
    },
    {
      title: 'Home Services',
      description: 'Book service appointments, provide quotes, and handle emergency calls.',
      features: ['Service booking', 'Quote requests', 'Emergency routing']
    }
  ]

  return (
    <div className="min-h-screen">
      <SEOMeta
        title="CogniVoice - 24/7 AI Voice Agent for Business Calls"
        description="Never miss a call with CogniDrift's AI phone receptionist. An AI voice agent for business that handles calls, books appointments, and automates customer communications 24/7."
        keywords="AI phone receptionist, AI voice agent for business, AI agents for business, conversational AI platform"
        url="/products/cognivoice"
      />
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Title with Icon */}
            <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
              <motion.div
                initial={iconInitial}
                animate={iconAnimate}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/70 rounded-xl flex items-center justify-center"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
                <span className="text-blue-600">CogniVoice</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Your AI voice agent. Phone calls. Web widget. Always on.
            </p>

            {/* TryNowSection - Wider + Faded */}
            <div
              className="mt-6 sm:mt-8 max-w-2xl mx-auto opacity-90"
              style={{
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            >
              <TryNowSection compact />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-neutral-offWhite border-y border-gray-100">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-text-secondary font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Powerful <span className="text-blue-600">Features</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              AI voice capabilities for phone and web
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const colorSchemes = [
                { lightBg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200', glow: 'shadow-blue-500/20', bg: 'bg-blue-500' },
                { lightBg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200', glow: 'shadow-purple-500/20', bg: 'bg-purple-500' },
                { lightBg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-200', glow: 'shadow-cyan-500/20', bg: 'bg-cyan-500' },
                { lightBg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-200', glow: 'shadow-teal-500/20', bg: 'bg-teal-500' },
              ]
              const colors = colorSchemes[index % colorSchemes.length]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative h-full bg-white rounded-2xl p-6 sm:p-8 border-2 ${colors.border} overflow-hidden shadow-md hover:shadow-xl ${colors.glow} transition-all duration-500`}
                  >
                    <div className={`absolute inset-0 ${colors.lightBg} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                    <motion.div className={`absolute -top-10 -right-10 w-32 h-32 ${colors.bg} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex w-12 h-12 ${colors.lightBg} rounded-xl items-center justify-center mb-4 shadow-md group-hover:shadow-xl transition-shadow`}
                      >
                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                    </div>

                    <div className={`absolute bottom-0 right-0 w-16 h-16 ${colors.bg} opacity-5 rounded-tl-full transition-all duration-500 group-hover:w-24 group-hover:h-24`} />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Phone Line Section — visual left, text right */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Phone Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-[230px] sm:w-[260px] bg-white rounded-[2rem] p-[3px] shadow-xl shadow-blue-200/40 border border-blue-100/30">
                  <div className="rounded-[1.85rem] overflow-hidden">
                    {/* Call Screen — top half */}
                    <div className="bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 px-4 pt-5 pb-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-2 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-[13px] text-white font-semibold">Sarah Mitchell</p>
                      <p className="text-[10px] text-white/60 font-mono mt-0.5">(555) 234-5678</p>
                      <p className="text-[11px] text-white/80 font-mono mt-1.5">02:14</p>
                      <div className="flex items-center justify-center gap-1.5 mt-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                        <span className="text-[9px] text-green-200 font-medium">AI Connected</span>
                      </div>
                    </div>
                    {/* Live Transcript — bottom half */}
                    <div className="bg-white">
                      <div className="px-3 py-1.5 border-b border-gray-100 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                        <span className="text-[9px] text-blue-600 font-semibold uppercase tracking-wider">Live Transcript</span>
                      </div>
                      <div className="px-3 py-2.5 space-y-2.5">
                        {/* AI message — right aligned */}
                        <div className="flex items-start gap-2 flex-row-reverse">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="w-3 h-3 text-blue-600" />
                          </div>
                          <p className="text-[10px] text-gray-700 leading-relaxed text-right flex-1">Good morning! How can I help you today?</p>
                        </div>
                        {/* Caller message — left aligned */}
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Users className="w-3 h-3 text-gray-500" />
                          </div>
                          <p className="text-[10px] text-gray-700 leading-relaxed flex-1">I need to see Dr. Chen</p>
                        </div>
                        {/* AI message — right aligned */}
                        <div className="flex items-start gap-2 flex-row-reverse">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="w-3 h-3 text-blue-600" />
                          </div>
                          <p className="text-[10px] text-gray-700 leading-relaxed text-right flex-1">Dr. Chen has an opening tomorrow at 2 PM. Want me to book it?</p>
                        </div>
                        {/* Caller message — left aligned */}
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Users className="w-3 h-3 text-gray-500" />
                          </div>
                          <p className="text-[10px] text-gray-700 leading-relaxed flex-1">Yes, please</p>
                        </div>
                        {/* Booked */}
                        <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2.5 py-1.5 border border-green-200">
                          <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <p className="text-[9px] text-green-700 font-medium">Booked — SMS sent</p>
                        </div>
                      </div>
                    </div>
                    {/* Waveform */}
                    <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-center justify-center gap-[3px] h-[28px]">
                      {[...Array(28)].map((_, i) => {
                        const center = 14
                        const dist = Math.abs(i - center) / center
                        const maxH = 20 - dist * 14
                        return (
                          <motion.div
                            key={i}
                            animate={{ height: [2, maxH, 2] }}
                            transition={{ duration: 0.6 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.04, ease: 'easeInOut' }}
                            className="w-[2.5px] bg-gradient-to-t from-blue-500 to-blue-300 rounded-full"
                          />
                        )
                      })}
                    </div>
                    {/* Call Controls */}
                    <div className="bg-gray-50 border-t border-gray-100 px-4 py-2.5 flex items-center justify-around">
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                          <Mic className="w-3 h-3 text-gray-500" />
                        </div>
                        <span className="text-[7px] text-gray-400">Mute</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                          <Headphones className="w-3 h-3 text-gray-500" />
                        </div>
                        <span className="text-[7px] text-gray-400">Speaker</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                          <Phone className="w-3 h-3 text-white rotate-[135deg]" />
                        </div>
                        <span className="text-[7px] text-gray-400">End</span>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.08, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-4 rounded-[2.5rem] bg-blue-400/25 blur-2xl -z-10"
                />
              </div>
            </motion.div>

            {/* Right — Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-5"
              >
                <Phone className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Phone Line</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4"
              >
                Your AI Receptionist, <span className="text-blue-600">24/7</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8"
              >
                Your AI answers every inbound call with a natural voice. It greets callers, books appointments, and routes conversations — so your team focuses on what matters.
              </motion.p>
              <ul className="space-y-4">
                {[
                  'Call recording & full transcription',
                  'Smart transfer to live agents',
                  '50+ languages supported',
                  'Calendar integration & auto-booking',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Web Widget Section — text left, visual right */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text Content */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-5"
              >
                <Mic className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Web Widget</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4"
              >
                Voice AI on <span className="text-blue-600">Your Website</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8"
              >
                Add a voice-enabled widget to any page. Visitors click to speak with your AI directly in the browser — no downloads, no phone calls needed.
              </motion.p>
              <ul className="space-y-4">
                {[
                  'One-line embed code',
                  'Custom branding & voice',
                  'Works on all devices',
                  'Real-time voice transcription',
                  'Multilingual support',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right — Browser with Voice Widget */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center order-1 lg:order-2"
            >
              <div className="relative w-[280px] sm:w-[320px]">
                <div className="bg-white rounded-xl overflow-hidden shadow-xl shadow-blue-200/40 border border-blue-100/30">
                  {/* Browser Chrome */}
                  <div className="bg-gray-50 px-3 py-2 flex items-center gap-2 border-b border-gray-100">
                    <div className="flex gap-1.5">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#ff5f57]" />
                      <div className="w-[8px] h-[8px] rounded-full bg-[#febc2e]" />
                      <div className="w-[8px] h-[8px] rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 bg-white rounded px-2 py-0.5 text-[9px] text-gray-400 font-mono border border-gray-100">yourbusiness.com</div>
                  </div>
                  {/* Page with widget */}
                  <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/20 p-3">
                    {/* Fake page content */}
                    <div className="space-y-1.5 mb-3">
                      <div className="h-2.5 w-20 bg-gray-200/50 rounded" />
                      <div className="h-2 w-28 bg-gray-100/60 rounded" />
                      <div className="h-2 w-16 bg-gray-100/40 rounded" />
                    </div>
                    {/* Voice Widget Popup — the conversation */}
                    <div className="bg-white rounded-xl shadow-lg border border-blue-100/50 overflow-hidden">
                      {/* Widget header */}
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mic className="w-3 h-3 text-white/80" />
                          <span className="text-[10px] text-white font-semibold">Voice Assistant</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                          <span className="text-[9px] text-white/70">Live</span>
                        </div>
                      </div>
                      {/* Chat transcript with icons */}
                      <div className="px-2.5 py-2.5 space-y-2">
                        {/* AI message — right aligned */}
                        <div className="flex items-start gap-1.5 flex-row-reverse">
                          <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="w-2.5 h-2.5 text-blue-600" />
                          </div>
                          <p className="text-[9px] text-gray-700 leading-relaxed text-right flex-1">Hi! I'm the voice assistant for Acme Clinic. How can I help?</p>
                        </div>
                        {/* Visitor message — left aligned */}
                        <div className="flex items-start gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Users className="w-2.5 h-2.5 text-gray-500" />
                          </div>
                          <p className="text-[9px] text-gray-700 leading-relaxed flex-1">Do you have any openings this week?</p>
                        </div>
                        {/* AI message — right aligned */}
                        <div className="flex items-start gap-1.5 flex-row-reverse">
                          <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="w-2.5 h-2.5 text-blue-600" />
                          </div>
                          <p className="text-[9px] text-gray-700 leading-relaxed text-right flex-1">Yes! Wednesday at 10 AM or Friday at 3 PM. Which works better?</p>
                        </div>
                        {/* Visitor message — left aligned */}
                        <div className="flex items-start gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Users className="w-2.5 h-2.5 text-gray-500" />
                          </div>
                          <p className="text-[9px] text-gray-700 leading-relaxed flex-1">Wednesday please</p>
                        </div>
                        {/* Booked */}
                        <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2.5 py-1.5 border border-green-200">
                          <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <p className="text-[9px] text-green-700 font-medium">Booked for Wed 10 AM — confirmed</p>
                        </div>
                      </div>
                      {/* Waveform bar */}
                      <div className="border-t border-gray-100 px-3 py-2 flex items-center justify-center gap-[2.5px] h-[24px]">
                        {[...Array(24)].map((_, i) => {
                          const center = 12
                          const dist = Math.abs(i - center) / center
                          const maxH = 16 - dist * 11
                          return (
                            <motion.div
                              key={i}
                              animate={{ height: [2, maxH, 2] }}
                              transition={{ duration: 0.6 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.04, ease: 'easeInOut' }}
                              className="w-[2.5px] bg-gradient-to-t from-blue-500 to-blue-300 rounded-full"
                            />
                          )
                        })}
                      </div>
                    </div>
                    {/* FAB button */}
                    <div className="flex justify-end mt-2">
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-400/30"
                      >
                        <Mic className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.05, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-4 rounded-2xl bg-blue-400/20 blur-2xl -z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Built for <span className="text-blue-600">Your Industry</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Tailored solutions for businesses of all types
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3">{useCase.title}</h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100"
          >
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Why Teams Choose <span className="text-blue-600">CogniVoice</span>
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                Join thousands of businesses that trust CogniDrift
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100/70 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-text-primary font-medium">{benefit.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              CogniVoice <span className="text-blue-600">Pricing</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Simple, transparent pricing. No hidden fees. Every plan includes a dedicated phone number, AI call handling, appointment booking, and more.
            </p>
          </motion.div>

          <CogniVoicePricingCards />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/products/cognivoice/pricing"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Compare all plans in detail
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 text-center relative overflow-hidden border-2 border-primary-100"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6 relative z-10 border border-blue-100">
              <Phone className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Get Started</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6 relative z-10">
              Ready to <span className="bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">Never Miss a Call Again?</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 relative z-10">
              Join businesses that capture every lead with AI-powered phone reception.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto btn-primary px-8 py-4 text-lg"
                >
                  Get Started Today
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

export default CogniVoice
