import SEOMeta from '../components/SEOMeta'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Typed from 'typed.js'
import CompanyTimeline from '../components/CompanyTimeline'
import {
  Lightbulb,
  Users,
  Heart,
  Target,
  ArrowRight,
  Building2,
  Clock,
  Gem
} from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/motionVariants'



const About = () => {
  const typedRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Business', 'Communication', 'Customer Experience', 'Intelligence', 'Workflow'],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    })

    return () => typed.destroy()
  }, [])

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay ahead with cutting-edge AI and voice technology, constantly evolving our solutions.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your success is our priority. We build solutions that genuinely solve your problems.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We deliver high-quality, reliable solutions that exceed expectations every time.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Transparent pricing, honest communication, and ethical AI practices guide everything we do.'
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      <SEOMeta
        title="About Us - AI Consulting Services & AI Automation Company"
        description="CogniDrift is a leading AI consulting services company building intelligent automation platforms and AI digital workforce solutions for modern enterprises."
        keywords="AI consulting services, AI automation company, intelligent automation platform"
        url="/about"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
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
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
            >
              <Building2 className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">About Us</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="section-title hero-display !mb-4"
            >
              Building the Future of<br /><span ref={typedRef} className="text-gradient font-normal"></span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="section-subtitle !mb-0"
            >
              We're on a mission to help businesses <span className="font-bold text-text-primary">never miss an opportunity</span> by automating
              customer communications with intelligent AI.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Company Timeline Section */}
      <section className="py-16 bg-neutral-offWhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6">
              <Clock className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Our Story</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="section-title hero-display">
              From Vision to <span className="text-gradient">Reality</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              See how we've grown from a simple idea to an industry-leading AI platform
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CompanyTimeline />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6">
              <Gem className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Our Values</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="section-title hero-display">
              What <span className="text-gradient">Drives Us</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              The principles that guide everything we build and every relationship we form.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card text-center group"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-100 transition-colors">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 text-center relative overflow-hidden border-2 border-primary-100"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6 relative z-10 border border-blue-100">
              <Building2 className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Get Started</span>
            </div>

            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6 relative z-10">
              Ready to <span className="bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">Learn More?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 relative z-10">
              Schedule a conversation with our team to see how CogniDrift can help your business.
            </motion.p>
            <motion.div variants={fadeInUp} className="relative z-10">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary px-8 py-4 text-lg"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
