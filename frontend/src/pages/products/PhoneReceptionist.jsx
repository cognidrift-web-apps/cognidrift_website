import { motion } from 'framer-motion'
import { Mic, Phone, Calendar, Clock, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

const PhoneReceptionist = () => {
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
    'Answers calls in under 1 second',
    'Customizable greetings and call flows',
    'Transfers to live agents when needed',
    'Records and transcribes every call',
    'Multi-language support out of the box',
    'Integrates with your existing phone system'
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
          <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mic className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            AI <span className="text-primary-600">Phone Receptionist</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Answers calls 24/7, qualifies leads, and books appointments—so your team can focus on what matters most.
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
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-purple-600" />
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
            Why Businesses Love Our <span className="text-gradient">AI Receptionist</span>
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

export default PhoneReceptionist
