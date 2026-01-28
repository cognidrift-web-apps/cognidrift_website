import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Lightbulb, 
  Users, 
  Rocket, 
  Heart,
  Target,
  Zap,
  Shield,
  Award,
  ArrowRight,
  Check
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

// Counter hook
const useCounter = (end, duration = 2000, inView) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!inView) return
    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, inView])
  
  return count
}

const StatItem = ({ number, suffix, label }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useCounter(number, 2000, isInView)
  
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-white mb-2">{count}{suffix}</div>
      <div className="text-lg text-primary-100">{label}</div>
    </div>
  )
}

const About = () => {
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

  const stats = [
    { number: 24, suffix: '/7', label: 'AI Availability' },
    { number: 99, suffix: '.9%', label: 'Uptime Guarantee' },
    { number: 50, suffix: '+', label: 'Integrations' },
    { number: 10, suffix: 'k+', label: 'Calls Handled' }
  ]

  const techStack = [
    'Advanced Language Models',
    'Real-time Voice Processing',
    'Enterprise Security',
    'Cloud Infrastructure'
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary-600 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-coral/20 rounded-full blur-3xl"></div>
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
              About Us
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Building the Future of<br />Business Communication
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-primary-100"
            >
              We're on a mission to help businesses never miss an opportunity by automating 
              customer communications with intelligent AI.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="section-eyebrow">Our Mission</motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                AI That Works
                <span className="text-primary-600"> For You</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-text-secondary mb-6">
                At CogniDrift, we believe every business deserves access to enterprise-grade 
                AI technology. We're building voice AI solutions that are powerful enough for 
                corporations but accessible to small businesses.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-text-secondary mb-8">
                Our team combines deep expertise in AI, natural language processing, and 
                business operations to create solutions that don't just answer calls—they 
                understand your customers and help grow your business.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-4">
                {techStack.map((tech, i) => (
                  <motion.li key={i} variants={fadeInUp} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-accent-coral/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-accent-coral" />
                    </div>
                    <span className="text-text-primary font-medium">{tech}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-primary-50 rounded-3xl p-12 text-center">
                <div className="w-24 h-24 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  "Technology should empower, not complicate."
                </h3>
                <p className="text-text-secondary">
                  That's why we focus on solutions that integrate seamlessly into your 
                  existing workflows and deliver measurable results from day one.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">Our Values</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              What Drives Us
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

      {/* Stats Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <StatItem {...stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">Our Technology</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Built With the Best
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              Enterprise-grade infrastructure and cutting-edge AI power every conversation.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Zap,
                title: 'Advanced AI Models',
                description: 'Powered by state-of-the-art language models for natural, context-aware conversations.'
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'HIPAA-ready infrastructure with end-to-end encryption and compliance certifications.'
              },
              {
                icon: Award,
                title: '99.9% Uptime',
                description: 'Reliable, scalable cloud infrastructure ensures your AI is always available.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card text-center group"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-100 transition-colors">
                  <item.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
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
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Learn More?
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
