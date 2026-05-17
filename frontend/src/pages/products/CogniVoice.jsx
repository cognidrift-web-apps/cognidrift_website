import SEOMeta from '../../components/SEOMeta'
import { motion } from 'framer-motion'
import { Phone, Calendar, Clock, CheckCircle2, ArrowRight, MessageSquare, Zap, Shield, Globe, BarChart3, Users, Headphones, Mic } from 'lucide-react'
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

      {/* Deploy Anywhere Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Deploy <span className="text-blue-600">Anywhere</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              One AI receptionist, two ways to connect with customers
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative h-full bg-white rounded-2xl p-6 sm:p-8 border-2 border-blue-200 overflow-hidden shadow-md hover:shadow-xl shadow-blue-500/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-blue-50 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative z-10">
                  {/* Mini Phone Call Mockup */}
                  <div className="mb-5 bg-gray-900 rounded-xl p-3 shadow-inner">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[11px] text-gray-400 font-mono">Live Call</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex gap-2 items-start">
                        <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Phone className="w-2.5 h-2.5 text-blue-400" />
                        </div>
                        <div className="bg-gradient-to-br from-indigo-500/80 to-purple-600/80 rounded-lg px-2.5 py-1.5 max-w-[85%]">
                          <p className="text-[11px] text-white/90 leading-relaxed">Hello! How can I help you today?</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start justify-end">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5 max-w-[85%] border border-white/10">
                          <p className="text-[11px] text-gray-300 leading-relaxed">I need to book an appointment</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Phone className="w-2.5 h-2.5 text-blue-400" />
                        </div>
                        <div className="bg-gradient-to-br from-indigo-500/80 to-purple-600/80 rounded-lg px-2.5 py-1.5 max-w-[85%]">
                          <p className="text-[11px] text-white/90 leading-relaxed">Let me check availability...</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex w-12 h-12 bg-blue-50 rounded-xl items-center justify-center mb-4 shadow-md"
                  >
                    <Phone className="w-6 h-6 text-blue-600" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">Phone Line</h3>
                  <p className="text-text-secondary leading-relaxed mb-4">Your AI receptionist answers inbound calls 24/7. Customers call your business number and speak naturally with the AI.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      Toll-free or local numbers
                    </li>
                    <li className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      Call recording & transcription
                    </li>
                    <li className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      Transfer to live agents
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative h-full bg-white rounded-2xl p-6 sm:p-8 border-2 border-purple-200 overflow-hidden shadow-md hover:shadow-xl shadow-purple-500/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-purple-50 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative z-10">
                  {/* Mini Browser Mockup */}
                  <div className="mb-5 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                    <div className="bg-gray-200 px-3 py-1.5 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 bg-white rounded-md px-2 py-0.5 text-[9px] text-gray-400 font-mono">yourwebsite.com</div>
                    </div>
                    <div className="relative p-3 h-24 bg-gradient-to-br from-gray-50 to-white">
                      <div className="absolute bottom-2 right-2">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                          <Mic className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-10 -left-28 bg-white rounded-xl shadow-lg px-3 py-2 border border-gray-100 w-32">
                          <p className="text-[9px] text-gray-600 leading-relaxed">Listening...</p>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(8)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ height: [3, 8 + Math.random() * 6, 3] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08 }}
                                className="w-1 bg-purple-400 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex w-12 h-12 bg-purple-50 rounded-xl items-center justify-center mb-4 shadow-md"
                  >
                    <Mic className="w-6 h-6 text-purple-600" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">Web Widget</h3>
                  <p className="text-text-secondary leading-relaxed mb-4">Embed a voice-enabled widget on your website. Visitors click to speak with your AI directly in the browser.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      One-line embed code
                    </li>
                    <li className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      Custom branding
                    </li>
                    <li className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      Works on mobile
                    </li>
                  </ul>
                </div>
              </motion.div>
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
