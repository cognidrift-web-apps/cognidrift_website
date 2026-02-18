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
              Building the Future of<br /><span ref={typedRef} className="text-gradient"></span>
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
            className="bg-primary-600 rounded-3xl p-12 md:p-16 text-center"
          >
            <motion.h2 variants={fadeInUp} className="section-title hero-display !text-white mb-6">
              Ready to <span className="text-primary-200">Learn More?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Schedule a conversation with our team to see how CogniDrift can help your business.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/contact">
                <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors inline-flex items-center gap-2 animate-glow">
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
