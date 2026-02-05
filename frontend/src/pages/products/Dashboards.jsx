import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, PieChart, Download, CheckCircle2, ArrowRight, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboards = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Metrics',
      description: 'Monitor call volume, response times, conversion rates, and more with live-updating dashboards.'
    },
    {
      icon: PieChart,
      title: 'Custom Reports',
      description: 'Build tailored reports by channel, team, time period, or any dimension that matters to your business.'
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Spot patterns in customer inquiries, peak hours, and seasonal trends to optimize operations.'
    },
    {
      icon: Download,
      title: 'One-Click Exports',
      description: 'Export charts, tables, and raw data in PDF, CSV, or Excel format for stakeholder reporting.'
    }
  ]

  const benefits = [
    'Pre-built templates for common KPIs',
    'Role-based access control for teams',
    'Scheduled email reports on autopilot',
    'AI-generated insights and recommendations',
    'Compare performance across time periods',
    'Embed dashboards in your existing tools'
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
            <BarChart3 className="w-10 h-10 text-sky-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            <span className="text-primary-600">Dashboards</span> & Reporting
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Custom dashboards with performance metrics and insights to keep your team informed and your business growing.
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
            Why Teams Choose Our <span className="text-gradient">Dashboards</span>
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

export default Dashboards
