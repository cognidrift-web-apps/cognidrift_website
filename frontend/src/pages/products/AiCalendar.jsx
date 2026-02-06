import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle2, ArrowRight, Users, Repeat, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

const AiCalendar = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-powered appointment booking that finds the perfect time slots automatically.'
    },
    {
      icon: Clock,
      title: 'Time Zone Management',
      description: 'Automatically handles multiple time zones for global teams and clients.'
    },
    {
      icon: Users,
      title: 'Team Coordination',
      description: 'Syncs across team members and manages group availability effortlessly.'
    },
    {
      icon: Repeat,
      title: 'Recurring Events',
      description: 'Set up recurring meetings and appointments with intelligent pattern recognition.'
    }
  ]

  const benefits = [
    'Automated appointment confirmations',
    'Smart reminders via SMS and email',
    'Calendar sync with Google, Outlook, iCal',
    'Buffer time between appointments',
    'Cancellation and rescheduling automation',
    'Meeting analytics and insights'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-24 pb-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            AI <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Calendar</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Smart scheduling and appointment management powered by AI—eliminate back-and-forth and optimize your time.
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
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-orange-600" />
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
            Why Choose <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">AI Calendar</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
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
            Ready to Optimize Your Schedule?
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

export default AiCalendar
