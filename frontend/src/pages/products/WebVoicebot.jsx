import { motion } from 'framer-motion'
import { Mic, Video, Volume2, MessageCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const WebVoicebot = () => {
  const features = [
    {
      icon: Volume2,
      title: 'Voice Interactions',
      description: 'Enable natural voice conversations directly on your website with advanced speech recognition.'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Responses',
      description: 'Instant voice responses that feel natural and human-like for better user engagement.'
    },
    {
      icon: Video,
      title: 'Visual Feedback',
      description: 'Dynamic visual indicators showing voice activity and conversation flow.'
    },
    {
      icon: Sparkles,
      title: 'Smart Context',
      description: 'Understands user intent and maintains context throughout the conversation.'
    }
  ]

  const benefits = [
    'Hands-free website navigation',
    'Multi-language voice support',
    'Seamless text-to-speech conversion',
    'Voice authentication capabilities',
    'Real-time transcription',
    'Mobile and desktop compatible'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 pt-24 pb-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mic className="w-10 h-10 text-cyan-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            AI <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Web Voicebot</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Voice-enabled interactions on your website—making digital experiences more natural and accessible.
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
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-cyan-600" />
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
            Why Choose Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Web Voicebot</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
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
            Ready to Add Voice to Your Website?
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

export default WebVoicebot
