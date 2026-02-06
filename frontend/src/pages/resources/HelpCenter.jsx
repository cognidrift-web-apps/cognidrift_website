import { motion } from 'framer-motion'
import { HelpCircle, Search, BookOpen, MessageCircle, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      articles: [
        'How to set up your AI receptionist',
        'Understanding your dashboard',
        'First call configuration',
        'Voice customization guide'
      ]
    },
    {
      icon: Phone,
      title: 'Call Management',
      articles: [
        'Setting up call routing rules',
        'Configuring voicemail',
        'Call recording and transcription',
        'Managing call schedules'
      ]
    },
    {
      icon: MessageCircle,
      title: 'Integration',
      articles: [
        'Connecting your CRM',
        'Calendar integration',
        'API documentation',
        'Webhook configuration'
      ]
    },
    {
      icon: HelpCircle,
      title: 'Troubleshooting',
      articles: [
        'Common setup issues',
        'Audio quality problems',
        'Integration errors',
        'Billing questions'
      ]
    }
  ]

  const faqs = [
    {
      question: 'How quickly can I get started?',
      answer: 'Most businesses are up and running within 24 hours. Our team provides white-glove onboarding support.'
    },
    {
      question: 'Can I customize the AI voice?',
      answer: 'Yes! You can choose from multiple voice options and train the AI to match your brand tone and style.'
    },
    {
      question: 'What languages are supported?',
      answer: 'We support over 30 languages including English, Spanish, French, German, Mandarin, and more.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption and are fully compliant with HIPAA, GDPR, and SOC 2 standards.'
    }
  ]

  return (
    <div className="min-h-screen bg-primary-50 pt-24 pb-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-wider text-primary-600 font-semibold mb-4">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            How Can We <span className="text-primary-600">Help You?</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Find answers to your questions and learn how to get the most out of CogniDrift.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-border focus:border-primary-600 focus:outline-none text-text-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.articles.map((article, i) => (
                    <li key={i}>
                      <Link to="#" className="text-sm text-text-secondary hover:text-primary-600 transition-colors">
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
        >
          <h2 className="section-title hero-display mb-8 text-center">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-neutral-border pb-6 last:border-0">
                <h3 className="text-lg font-semibold text-text-primary mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-text-secondary ml-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-primary-600 rounded-2xl shadow-lg p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg mb-8 opacity-90">
            Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center gap-2 animate-glow">
                <MessageCircle className="w-5 h-5" />
                Live Chat
              </button>
            </Link>
            <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2 animate-glow">
              <Mail className="w-5 h-5" />
              Email Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HelpCenter
