import { motion } from 'framer-motion'
import { Bot, MessageSquare, Users, Zap, CheckCircle2, ArrowRight, Globe, BarChart3, Shield, Headphones } from 'lucide-react'
import { Link } from 'react-router-dom'

const WebChatbot = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Real-Time Visitor Engagement',
      description: 'Greet website visitors instantly, answer questions, and guide them toward conversion—all automatically.'
    },
    {
      icon: Users,
      title: 'Lead Capture & Qualification',
      description: 'Collect contact info, qualify leads with smart questions, and route hot prospects to your sales team.'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Communicate with visitors in their preferred language for a seamless global experience.'
    },
    {
      icon: Zap,
      title: 'Instant Handoff to Agents',
      description: 'Seamlessly transfer complex conversations to live agents with full context preserved.'
    }
  ]

  const benefits = [
    { icon: BarChart3, text: 'Increase website conversion rates by up to 40%' },
    { icon: Shield, text: 'Custom branding to match your site design' },
    { icon: Zap, text: 'Smart conversation flows with branching logic' },
    { icon: Users, text: 'Capture leads even outside business hours' },
    { icon: Globe, text: 'Integrates with CRM, email, and Slack' },
    { icon: Headphones, text: 'Full analytics on visitor interactions' }
  ]

  const stats = [
    { value: '40%', label: 'Conversion Increase' },
    { value: '<3s', label: 'Average Response Time' },
    { value: '50+', label: 'Languages Supported' },
    { value: '24/7', label: 'Always Online' }
  ]

  const useCases = [
    {
      title: 'E-Commerce Stores',
      description: 'Help shoppers find products, answer questions, and reduce cart abandonment with instant support.',
      features: ['Product recommendations', 'Order tracking', 'Returns assistance']
    },
    {
      title: 'SaaS Companies',
      description: 'Qualify leads, schedule demos, and provide instant product support right on your website.',
      features: ['Demo scheduling', 'Feature explanations', 'Pricing queries']
    },
    {
      title: 'Service Businesses',
      description: 'Book appointments, answer FAQs, and capture contact information from interested visitors.',
      features: ['Appointment booking', 'Service inquiries', 'Quote requests']
    },
    {
      title: 'Education Platforms',
      description: 'Guide students through courses, answer enrollment questions, and provide learning support.',
      features: ['Course recommendations', 'Enrollment help', 'Student support']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100/70 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8"
            >
              <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
            </motion.div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 sm:mb-6">
              AI <span className="text-blue-600">Web Chatbot</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Capture, qualify, and convert website visitors in real time with an intelligent chatbot that never sleeps.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full sm:w-auto"
                >
                  Schedule a Demo
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/pricing">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-blue-600 bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
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
      <section className="py-16 sm:py-20 lg:py-24">
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
              Everything you need to automate website conversations
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-14 h-14 bg-blue-100/70 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
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
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100"
          >
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Why Teams Choose Our <span className="text-blue-600">Web Chatbot</span>
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                Join thousands of businesses that convert more visitors with CogniDrift
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

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-blue-600">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Convert More Website Visitors?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Join businesses that capture every lead with AI-powered chat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/resources/case-studies">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
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

export default WebChatbot
