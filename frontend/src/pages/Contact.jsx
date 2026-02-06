import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCalApi } from '@calcom/embed-react'
import LiveSupportVisualization from '../components/LiveSupportVisualization'
import GlobalAvailabilityMap from '../components/GlobalAvailabilityMap'
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
  AlertCircle,
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
    message: ''
  })

  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi()
      cal('ui', {
        styles: { branding: { brandColor: '#2563eb' } },
        hideEventTypeDetails: false,
        layout: 'month_view'
      })
    })()
  }, [])

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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || "Thank you! We'll be in touch within 24 hours."
        })
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setStatus({
        type: 'error',
        message: 'Network error. Please try again or email us directly at contact@cognidrift.com'
      })
    } finally {
      setIsSubmitting(false)
    }
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
      details: '+1 (844) 584-1083',
      subtitle: 'Mon-Fri, 9am-6pm EST',
      link: 'tel:+18445841083'
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

  // Initialize Cal.com inline embed - shows all event types
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "cognidrift-booking" })
      cal("inline", {
        elementOrSelector: "#cal-booking-widget",
        calLink: "cognidrift-llc-alefpr", // Shows all event type options
        layout: "month_view",
        config: {
          theme: "light"
        }
      })
    })()
  }, [])

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-neutral-offWhite overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-cyan/10 rounded-full blur-3xl"></div>
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
              className="section-eyebrow"
            >
              Get Started
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="section-title hero-display !mb-4"
            >
              Let's Transform Your<br /><span className="text-gradient">Customer Communications</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="section-subtitle !mb-0"
            >
              Book a demo to see how CogniDrift can help your business <span className="font-bold text-text-primary">never miss another call</span>.
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
                <h2 className="section-title hero-display mb-2">Book Your <span className="text-gradient">Demo</span></h2>
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
                    {status.type === 'success' ? (
                      <Check className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
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

            {/* Cal.com Booking Widget */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {/* Header */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Schedule Your Demo
                </h3>
                <p className="text-text-secondary">
                  Pick a time that works best for you
                </p>
              </motion.div>

              {/* Cal.com Embed */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-border"
                style={{ minHeight: '630px' }}
              >
                <div 
                  id="cal-booking-widget"
                  style={{ width: '100%', height: '100%', minHeight: '630px' }}
                />
              </motion.div>

              {/* Contact Info Cards - Compact */}
              <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-3 pt-4">
                <div className="flex items-center gap-3 p-4 bg-neutral-offWhite rounded-xl">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Email Us</p>
                    <a href="mailto:contact@cognidrift.com" className="text-sm text-primary-600 hover:underline">
                      contact@cognidrift.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-neutral-offWhite rounded-xl">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Call Us</p>
                    <a href="tel:+18445841083" className="text-sm text-primary-600 hover:underline">
                      +1 (844) 584-1083
                    </a>
                  </div>
                </div>
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
    </div>
  )
}

export default Contact
