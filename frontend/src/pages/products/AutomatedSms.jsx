import { motion } from 'framer-motion'
import { Smartphone, MessageSquare, CheckCircle2, ArrowRight, Send, Clock, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const AutomatedSms = () => {
  const features = [
    {
      icon: Send,
      title: 'Bulk SMS Campaigns',
      description: 'Send personalized messages to thousands of contacts with perfect timing and delivery.'
    },
    {
      icon: Clock,
      title: 'Scheduled Messaging',
      description: 'Plan and automate SMS campaigns based on triggers, dates, and customer behavior.'
    },
    {
      icon: Users,
      title: 'Segmentation',
      description: 'Target specific customer groups with tailored messages for maximum engagement.'
    },
    {
      icon: MessageSquare,
      title: 'Two-Way Conversations',
      description: 'Enable automated responses and conversations that feel personal and timely.'
    }
  ]

  const benefits = [
    '98% open rate within minutes',
    'Personalization at scale',
    'Compliance with TCPA and GDPR',
    'Link tracking and analytics',
    'Automated follow-ups',
    'Integration with CRM and marketing tools'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 pt-24 pb-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Automated SMS</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Scheduled and triggered SMS campaigns that reach customers at the perfect moment—automatically.
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
                <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-teal-600" />
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
          <h2 className="section-title hero-display mb-8 text-center">
            Why Choose <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Automated SMS</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-text-secondary">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Automate Your SMS Marketing?
          </h3>
          <Link to="/contact">
            <button className="btn-primary">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default AutomatedSms
