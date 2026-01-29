import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  MessageSquare,
  Calendar,
  ArrowRight,
  Check,
  Building2,
  Stethoscope,
  Home as HomeIcon,
  Briefcase
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    message: ''
  })

  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    // Simulate API call
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: 'Thank you! We\'ll be in touch within 24 hours.'
      })
      setFormData({ name: '', email: '', company: '', industry: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  const industries = [
    { value: 'healthcare', label: 'Healthcare', icon: Stethoscope },
    { value: 'insurance', label: 'Insurance', icon: Briefcase },
    { value: 'real-estate', label: 'Real Estate', icon: HomeIcon },
    { value: 'professional-services', label: 'Professional Services', icon: Building2 },
    { value: 'other', label: 'Other', icon: MessageSquare }
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'contact@cognidrift.com',
      subtitle: 'We respond within 24 hours',
      link: 'mailto:contact@cognidrift.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      subtitle: 'Mon-Fri, 9am-6pm EST',
      link: 'tel:+15551234567'
    },
    {
      icon: Calendar,
      title: 'Book a Demo',
      details: 'Schedule a 15-min call',
      subtitle: 'See our AI in action',
      link: '#'
    }
  ]

  const benefits = [
    'No commitment required',
    '15-minute demo call',
    'See AI handle real calls',
    'Custom pricing discussion'
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary-600 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-cyan/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block text-sm uppercase tracking-wider text-primary-200 font-semibold mb-4"
            >
              Get Started
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Let's Transform Your<br />Customer Communications
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-primary-100"
            >
              Book a demo to see how CogniDrift can help your business never miss another call.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold text-text-primary mb-2">Book Your Demo</h2>
                <p className="text-text-secondary mb-8">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </motion.div>
              
              <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-offWhite border border-neutral-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-offWhite border border-neutral-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-offWhite border border-neutral-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-text-primary mb-2">
                    Industry *
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-offWhite border border-neutral-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                    Tell us about your needs
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-neutral-offWhite border border-neutral-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all resize-none"
                    placeholder="What challenges are you looking to solve with AI voice automation?"
                  ></textarea>
                </div>

                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      status.type === 'success'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    <Check className="w-5 h-5 flex-shrink-0" />
                    {status.message}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed animate-glow"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Request Demo'}
                </button>
              </motion.form>
            </motion.div>

            {/* Contact Info & Benefits */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <motion.div variants={fadeInUp} className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="card flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{info.title}</h3>
                      <p className="text-primary-600 font-medium">{info.details}</p>
                      <p className="text-sm text-text-muted">{info.subtitle}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-text-muted ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </motion.div>

              {/* What to Expect */}
              <motion.div variants={fadeInUp} className="bg-primary-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-text-primary mb-6">
                  What to Expect
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-text-primary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Response Time */}
              <motion.div variants={fadeInUp} className="flex items-center gap-4 p-6 bg-neutral-offWhite rounded-2xl">
                <div className="w-12 h-12 bg-accent-cyan/10 rounded-xl flex items-center justify-center text-accent-cyan">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Average Response Time</p>
                  <p className="text-text-secondary">We typically respond within 2 hours during business hours</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-text-primary mb-4"
            >
              Prefer to Try First?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
            >
              Click the chat widget in the corner to have a conversation with our AI right now.
            </motion.p>
            <motion.button 
              variants={fadeInUp}
              className="btn-primary animate-glow"
            >
              <MessageSquare className="w-5 h-5" />
              Talk to Our AI
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
