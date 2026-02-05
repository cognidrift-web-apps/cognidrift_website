import { motion } from 'framer-motion'
import { Smartphone, MessageSquare, Clock, Bell, CheckCircle2, ArrowRight, Send } from 'lucide-react'
import { Link } from 'react-router-dom'

const SmsAgent = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Two-Way SMS Conversations',
      description: 'Engage leads and customers through natural, back-and-forth text message conversations powered by AI.'
    },
    {
      icon: Bell,
      title: 'Automated Follow-Ups',
      description: 'Send timely follow-up texts to leads who haven\'t responded, keeping your pipeline warm automatically.'
    },
    {
      icon: Clock,
      title: 'Instant Response Time',
      description: 'Reply to incoming texts in seconds—day or night—so prospects never wait for answers.'
    },
    {
      icon: Send,
      title: 'Broadcast Campaigns',
      description: 'Send personalized bulk messages for promotions, reminders, or updates to segmented contact lists.'
    }
  ]

  const benefits = [
    '98% open rate on text messages',
    'Personalized responses using AI context',
    'Opt-in/opt-out compliance built in',
    'Integrates with your CRM and phone system',
    'Appointment reminders reduce no-shows',
    'Full conversation history and analytics'
  ]

  return (
    <div className="min-h-screen bg-primary-50 pt-24 pb-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-10 h-10 text-sky-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            <span className="text-primary-600">SMS Texting</span> Agent
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Handle two-way SMS conversations with leads and customers using AI that texts like a real person.
          </p>
          <Link to="/contact">
            <button className="btn-primary animate-glow">
              Schedule a Demo
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <h2 className="section-title hero-display text-3xl md:text-4xl mb-8 text-center">
            Why Businesses Love Our <span className="text-gradient">SMS Agent</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent-cyan flex-shrink-0 mt-1" />
                <p className="text-text-secondary">{benefit}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SmsAgent
