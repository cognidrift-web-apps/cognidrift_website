import { motion } from 'framer-motion'
import { Home, Phone, Calendar, Users, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PropertyShowingScheduler from '../../components/PropertyShowingScheduler'

const RealEstate = () => {
  const features = [
    {
      icon: Phone,
      title: 'Lead Qualification',
      description: 'Automatically qualify and route leads based on property preferences and budget'
    },
    {
      icon: Calendar,
      title: 'Property Showings',
      description: 'Schedule property viewings and send automated reminders to clients'
    },
    {
      icon: Users,
      title: 'Agent Matching',
      description: 'Connect clients with the right agent based on location and specialization'
    },
    {
      icon: Clock,
      title: 'Instant Response',
      description: 'Respond to inquiries instantly, capturing leads before they go elsewhere'
    }
  ]

  const benefits = [
    'Capture 100% of inbound leads',
    'Reduce response time to under 1 minute',
    'Increase showing attendance by 40%',
    'Free up agents to focus on closings',
    'Multi-language support',
    'CRM integration'
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
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Home className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            AI Solutions for <span className="text-primary-600">Real Estate</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Never miss a lead again. Our AI receptionists qualify prospects and schedule showings 24/7.
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
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Animated Property Showing Scheduler */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <PropertyShowingScheduler />
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <h2 className="section-title hero-display mb-8 text-center">
            Why Real Estate Professionals <span className="text-gradient">Choose Us</span>
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

export default RealEstate
