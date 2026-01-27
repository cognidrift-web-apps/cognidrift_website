import { motion } from 'framer-motion'
import { Stethoscope, Phone, Calendar, Shield, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Healthcare = () => {
  const features = [
    {
      icon: Phone,
      title: 'Patient Call Management',
      description: 'Handle appointment scheduling, prescription refills, and general inquiries 24/7'
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduling',
      description: 'Automatically book, reschedule, and send reminders for patient appointments'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliance',
      description: 'Enterprise-grade security ensuring full HIPAA compliance for patient data'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Never miss urgent patient calls, even outside business hours'
    }
  ]

  const benefits = [
    'Reduce staff workload by up to 70%',
    'Improve patient satisfaction scores',
    'Decrease no-show rates by 35%',
    'HIPAA-compliant infrastructure',
    'Multi-language support',
    'Integration with EMR systems'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-neutral-lightBlue pt-24 pb-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Stethoscope className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            AI Solutions for <span className="gradient-text">Healthcare</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            HIPAA-compliant AI receptionists designed specifically for medical practices, clinics, and healthcare facilities.
          </p>
          <Link to="/contact">
            <button className="btn-primary">
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

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Why Healthcare Providers Choose Us
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent-teal flex-shrink-0 mt-1" />
                <p className="text-text-secondary">{benefit}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Healthcare
