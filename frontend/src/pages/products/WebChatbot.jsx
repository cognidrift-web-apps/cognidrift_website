import { motion } from 'framer-motion'
import { Bot, MessageSquare, Users, Zap, CheckCircle2, ArrowRight, Globe } from 'lucide-react'
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
    'Increase website conversion rates by up to 40%',
    'Custom branding to match your site design',
    'Smart conversation flows with branching logic',
    'Capture leads even outside business hours',
    'Integrates with CRM, email, and Slack',
    'Full analytics on visitor interactions'
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
          <div className="w-20 h-20 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Bot className="w-10 h-10 text-pink-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            AI <span className="text-primary-600">Web Chatbot</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Capture, qualify, and convert website visitors in real time with an intelligent chatbot that never sleeps.
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
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-pink-600" />
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
            Why Teams Choose Our <span className="text-gradient">Web Chatbot</span>
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

export default WebChatbot
