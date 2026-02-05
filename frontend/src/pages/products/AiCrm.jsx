import { motion } from 'framer-motion'
import { Database, Users, BarChart3, Zap, CheckCircle2, ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const AiCrm = () => {
  const features = [
    {
      icon: Database,
      title: 'Centralized Contact Hub',
      description: 'Every call, text, and chat interaction is logged automatically—giving you a single source of truth for every lead.'
    },
    {
      icon: Users,
      title: 'Smart Lead Tracking',
      description: 'Track lead status, engagement history, and conversion probability with AI-powered lead scoring.'
    },
    {
      icon: BarChart3,
      title: 'Pipeline Visibility',
      description: 'See your entire sales pipeline at a glance with real-time updates from every channel.'
    },
    {
      icon: FileText,
      title: 'Automated Notes & Tags',
      description: 'AI auto-generates call summaries, tags contacts by intent, and surfaces key insights for your team.'
    }
  ]

  const benefits = [
    'Zero manual data entry required',
    'Syncs with Salesforce, HubSpot, and more',
    'AI-generated call summaries and action items',
    'Custom fields and pipeline stages',
    'Team collaboration with shared notes',
    'Export reports in one click'
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
            <Database className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            <span className="text-primary-600">AI CRM</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Centralizes all interactions and tracks every lead—so nothing falls through the cracks.
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
          <h2 className="section-title hero-display text-3xl md:text-4xl mb-8 text-center">
            Why Teams Choose Our <span className="text-gradient">AI CRM</span>
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

export default AiCrm
