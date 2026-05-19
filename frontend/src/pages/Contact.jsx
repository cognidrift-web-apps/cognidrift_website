import SEOMeta from '../components/SEOMeta'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCalApi } from '@calcom/embed-react'
import {
  Mail,
  Phone,
  Send,
  Clock,
  Calendar,
  Check,
  AlertCircle,
  ChevronDown,
  Stethoscope,
  Briefcase,
  Home as HomeIcon,
  Building2,
  MessageSquare
} from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/motionVariants'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cognidrift-send-and-receive-sms-production.up.railway.app'

const industries = [
  { value: '', label: 'Select your industry', icon: null },
  { value: 'healthcare', label: 'Healthcare', icon: Stethoscope },
  { value: 'insurance', label: 'Insurance', icon: Briefcase },
  { value: 'real-estate', label: 'Real Estate', icon: HomeIcon },
  { value: 'professional-services', label: 'Professional Services', icon: Building2 },
  { value: 'other', label: 'Other', icon: MessageSquare }
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    message: ''
  })

  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'cognidrift-booking' })
      cal('inline', {
        elementOrSelector: '#cal-booking-widget',
        calLink: 'cognidrift',
        layout: 'month_view',
        config: { theme: 'light' }
      })
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
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || "Thank you! We'll be in touch within 24 hours."
        })
        setFormData({ name: '', email: '', phone: '', company: '', industry: '', message: '' })
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

  const inputClass = 'w-full px-4 py-3 bg-neutral-offWhite border border-neutral-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'

  return (
    <div className="bg-white min-h-screen">
      <SEOMeta
        title="Contact Us - Get Started with AI Automation"
        description="Contact CogniDrift to learn how our AI products can automate calls, chats, and workflows for your business. Book a demo today."
        keywords="AI automation, AI voice agent, AI chatbot, book AI demo, contact CogniDrift"
        url="/contact"
      />

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
            <motion.span variants={fadeInUp} className="section-eyebrow">
              Get Started
            </motion.span>
            <motion.h1 variants={fadeInUp} className="section-title hero-display !mb-4">
              Let's Build Your<br />
              <span className="text-gradient">AI-Powered Business</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="section-subtitle !mb-0">
              See how CogniDrift automates calls, chats, and workflows so your team can focus on what matters.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
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
                <h2 className="section-title hero-display !text-3xl sm:!text-4xl mb-2">
                  Get in <span className="text-gradient">Touch</span>
                </h2>
                <p className="text-text-secondary mb-8">
                  Fill out the form and we will get back to you within 24 hours.
                </p>
              </motion.div>

              <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
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
                      className={inputClass}
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
                      className={inputClass}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+1 (555) 123-4567"
                    />
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
                      className={inputClass}
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-text-primary mb-2">
                    Industry
                  </label>
                  <div className="relative">
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      {industries.map((ind) => (
                        <option key={ind.value} value={ind.value}>
                          {ind.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your business and what you are looking to automate."
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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
              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Or Book a Demo
                </h3>
                <p className="text-text-secondary">
                  Pick a time that works for you
                </p>
              </motion.div>

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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Strip */}
      <section className="py-16 sm:py-20 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            <motion.a
              href="mailto:contact@cognidrift.com"
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">Email Us</p>
                <p className="text-sm text-primary-600">contact@cognidrift.com</p>
                <p className="text-xs text-text-muted mt-0.5">We respond within 24 hours</p>
              </div>
            </motion.a>

            <motion.a
              href="tel:+18445841083"
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">Company</p>
                <p className="text-sm text-primary-600">+1 (844) 584-1083</p>
                <p className="text-xs text-text-muted mt-0.5">Mon to Fri, 9am to 6pm EST</p>
              </div>
            </motion.a>

            <motion.a
              href="tel:+15754181944"
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-accent-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-accent-cyan" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">Direct Line</p>
                <p className="text-sm text-primary-600">+1 (575) 418-1944</p>
                <p className="text-xs text-text-muted mt-0.5">Call or text anytime</p>
              </div>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mt-8 p-4 bg-white rounded-xl border border-neutral-border max-w-md mx-auto"
          >
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Average Response Time</p>
              <p className="text-xs text-text-secondary">Under 2 hours during business hours</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
