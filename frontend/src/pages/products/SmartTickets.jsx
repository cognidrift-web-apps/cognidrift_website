import { motion } from 'framer-motion'
import { Ticket, ArrowRight, CheckCircle2, Bell, Tag, BarChart3, GitBranch } from 'lucide-react'
import { Link } from 'react-router-dom'

const SmartTickets = () => {
  const features = [
    {
      icon: Ticket,
      title: 'Auto-Generated Tickets',
      description: 'Every call, text, and chat automatically creates a support ticket—no manual entry required.'
    },
    {
      icon: GitBranch,
      title: 'Intelligent Routing',
      description: 'AI detects intent and priority, then routes tickets to the right team or agent instantly.'
    },
    {
      icon: Tag,
      title: 'Auto-Tagging & Categorization',
      description: 'Tickets are automatically tagged by topic, urgency, and sentiment for faster resolution.'
    },
    {
      icon: Bell,
      title: 'SLA Alerts & Escalations',
      description: 'Get notified before deadlines are missed and escalate unresolved tickets automatically.'
    }
  ]

  const benefits = [
    'Omnichannel ticket creation (phone, SMS, chat)',
    'Priority-based queue management',
    'AI-suggested responses for agents',
    'Custom workflows and automation rules',
    'Full audit trail for every ticket',
    'Integration with Zendesk, Freshdesk, and more'
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
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Ticket className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            <span className="text-primary-600">Smart Tickets</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Automatically creates and routes support tickets from every channel—so issues get resolved faster.
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
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
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
            Why Teams Choose <span className="text-gradient">Smart Tickets</span>
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

export default SmartTickets
