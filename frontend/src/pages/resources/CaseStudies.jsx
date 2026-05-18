import SEOMeta from '../../components/SEOMeta'
import { motion } from 'framer-motion'
import { ArrowRight, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FaUserMd, FaHome, FaBalanceScale } from 'react-icons/fa'
import { BsGraphUpArrow, BsLightningChargeFill } from 'react-icons/bs'
import { useEffect, useState, useRef } from 'react'
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/motionVariants'

// Animated circular progress component
const CircularProgress = ({ value, maxValue = 100, label, suffix = '%', color = 'primary', delay = 0 }) => {
  const [progress, setProgress] = useState(0)
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''))
  const percentage = (numericValue / maxValue) * 100
  const circumference = 2 * Math.PI * 45

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      const duration = 1500
      const steps = 60
      const increment = percentage / steps
      const valueIncrement = numericValue / steps
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        setProgress(Math.min(increment * currentStep, percentage))
        setDisplayValue(Math.min(Math.round(valueIncrement * currentStep), numericValue))

        if (currentStep >= steps) clearInterval(interval)
      }, duration / steps)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, percentage, numericValue, delay])

  const colorClasses = {
    primary: { stroke: '#2563EB', bg: 'rgba(37, 99, 235, 0.1)', text: 'text-primary-600' },
    emerald: { stroke: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', text: 'text-emerald-600' },
    violet: { stroke: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', text: 'text-violet-600' },
    amber: { stroke: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', text: 'text-amber-600' }
  }

  const colors = colorClasses[color] || colorClasses.primary

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={colors.bg}
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={colors.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            style={{
              filter: `drop-shadow(0 0 6px ${colors.stroke}40)`
            }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${colors.text}`}>
            {suffix === '$' ? '$' : ''}{displayValue}{suffix !== '$' ? suffix : 'K'}
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm text-text-secondary font-medium text-center max-w-[120px]">{label}</p>
    </div>
  )
}

// Animated bar chart component
const AnimatedBar = ({ value, label, color = 'primary', delay = 0, maxValue = 100 }) => {
  const [width, setWidth] = useState(0)
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''))
  const percentage = Math.min((numericValue / maxValue) * 100, 100)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      const duration = 1200
      const steps = 50
      const widthIncrement = percentage / steps
      const valueIncrement = numericValue / steps
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        setWidth(Math.min(widthIncrement * currentStep, percentage))
        setDisplayValue(Math.min(Math.round(valueIncrement * currentStep), numericValue))

        if (currentStep >= steps) clearInterval(interval)
      }, duration / steps)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, percentage, numericValue, delay])

  const colorClasses = {
    primary: { gradient: 'from-blue-500 to-primary-600', bg: 'bg-primary-100', text: 'text-primary-600' },
    emerald: { gradient: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-100', text: 'text-emerald-600' },
    violet: { gradient: 'from-violet-400 to-violet-600', bg: 'bg-violet-100', text: 'text-violet-600' },
    amber: { gradient: 'from-amber-400 to-amber-600', bg: 'bg-amber-100', text: 'text-amber-600' }
  }

  const colors = colorClasses[color] || colorClasses.primary

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text-secondary">{label}</span>
        <span className={`text-lg font-bold ${colors.text}`}>{value}</span>
      </div>
      <div className={`h-3 ${colors.bg} rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full relative`}
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  )
}




const CaseStudies = () => {
  // Primary blue color scheme (matching text-gradient)
  const blueAccent = {
    iconBg: 'bg-primary-600/10',
    iconColor: 'text-primary-600',
    accentColor: 'primary',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-primary-600'
  }

  const studies = [
    {
      company: 'HealthFirst Medical',
      industry: 'Healthcare',
      icon: FaUserMd,
      ...blueAccent,
      challenge: 'Struggling with high call volumes and staff burnout',
      solution: 'Implemented AI receptionist for appointment scheduling and patient inquiries',
      results: [
        { metric: '70', suffix: '%', label: 'Reduction in staff workload', type: 'circle', color: 'primary' },
        { metric: '95', suffix: '%', label: 'Patient satisfaction rate', type: 'circle', color: 'emerald' },
        { metric: '40', suffix: '%', label: 'Decrease in no-shows', type: 'circle', color: 'violet' },
        { metric: '180', suffix: '$', label: 'Annual savings (K)', type: 'circle', color: 'amber', maxValue: 200 }
      ]
    },
    {
      company: 'Prestige Realty Group',
      industry: 'Real Estate',
      icon: FaHome,
      ...blueAccent,
      challenge: 'Missing 60% of inbound leads due to limited availability',
      solution: 'Deployed 24/7 AI agent for lead qualification and showing scheduling',
      results: [
        { metric: '100', suffix: '%', label: 'Lead capture rate', type: 'bar', color: 'primary' },
        { metric: '85', suffix: '%', label: 'Increase in showings', type: 'bar', color: 'emerald' },
        { metric: '45', suffix: '%', label: 'Conversion improvement', type: 'bar', color: 'violet' },
        { metric: '450', suffix: '$', label: 'Additional Q1 revenue (K)', type: 'bar', color: 'amber', maxValue: 500 }
      ]
    },
    {
      company: 'Thompson & Associates Law',
      industry: 'Legal Services',
      icon: FaBalanceScale,
      ...blueAccent,
      challenge: 'High administrative costs and missed client calls',
      solution: 'Integrated AI receptionist for client intake and consultation scheduling',
      results: [
        { metric: '60', suffix: '%', label: 'Reduction in admin costs', type: 'circle', color: 'primary' },
        { metric: '0', suffix: '', label: 'Missed client calls', type: 'circle', color: 'emerald', maxValue: 1, displayAs: '0' },
        { metric: '50', suffix: '%', label: 'Faster onboarding', type: 'circle', color: 'violet' },
        { metric: '30', suffix: '%', label: 'More billable hours', type: 'circle', color: 'amber' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-offWhite">
      <SEOMeta
        title="Case Studies - AI Automation Success Stories"
        description="Read how businesses use CogniDrift's AI automation solutions, AI agents, and AI digital workforce to improve productivity and reduce costs. Real results, real businesses."
        keywords="AI automation case studies, how companies use AI assistants, how AI automation improves productivity, AI agents for business"
        url="/resources/case-studies"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
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
              Success Stories
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="section-title hero-display !mb-4"
            >
              Real Results from <span className="text-gradient">Real Businesses</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="section-subtitle !mb-0"
            >
              See how businesses across industries are <span className="font-bold text-text-primary">transforming their operations</span> with AI voice agents.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {studies.map((study, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
                className="relative"
              >
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-neutral-border hover:border-primary-200 hover:shadow-2xl transition-all duration-500"
                >
                  {/* Top accent bar */}
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-primary-700"></div>

                  <div className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                      {/* Company Info */}
                      <div className="lg:col-span-4">
                        <motion.div
                          variants={scaleIn}
                          className={`w-20 h-20 ${study.iconBg} rounded-2xl flex items-center justify-center mb-6`}
                        >
                          <study.icon className={`w-10 h-10 ${study.iconColor}`} />
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                          <span className={`inline-block px-3 py-1 ${study.iconBg} ${study.iconColor} text-sm font-semibold rounded-full mb-3`}>
                            {study.industry}
                          </span>
                          <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">{study.company}</h3>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-4">
                          <div className="p-4 bg-neutral-offWhite rounded-xl">
                            <h4 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                              <div className="w-6 h-6 bg-primary-600/10 rounded-lg flex items-center justify-center">
                                <Target className="w-3.5 h-3.5 text-primary-600" />
                              </div>
                              Challenge
                            </h4>
                            <p className="text-sm text-text-secondary leading-relaxed">{study.challenge}</p>
                          </div>
                          <div className="p-4 bg-neutral-offWhite rounded-xl">
                            <h4 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                              <div className="w-6 h-6 bg-primary-600/10 rounded-lg flex items-center justify-center">
                                <Zap className="w-3.5 h-3.5 text-primary-600" />
                              </div>
                              Solution
                            </h4>
                            <p className="text-sm text-text-secondary leading-relaxed">{study.solution}</p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Results */}
                      <div className="lg:col-span-8">
                        <motion.div variants={fadeInUp}>
                          <h4 className="text-xl font-bold text-text-primary mb-8 flex items-center gap-3">
                            <div className={`w-10 h-10 ${study.iconBg} rounded-xl flex items-center justify-center`}>
                              <BsGraphUpArrow className={`w-5 h-5 ${study.iconColor}`} />
                            </div>
                            Key Results
                          </h4>

                          {/* Determine display type based on first result */}
                          {study.results[0].type === 'circle' ? (
                            /* Circular Progress Display */
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-neutral-border p-8">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {study.results.map((result, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <CircularProgress
                                      value={result.displayAs || result.metric}
                                      maxValue={result.maxValue || 100}
                                      label={result.label}
                                      suffix={result.suffix}
                                      color={result.color}
                                      delay={i * 150}
                                    />
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            /* Bar Chart Display */
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-neutral-border p-8">
                              <div className="space-y-6">
                                {study.results.map((result, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <AnimatedBar
                                      value={`${result.suffix === '$' ? '$' : ''}${result.metric}${result.suffix !== '$' ? result.suffix : 'K'}`}
                                      label={result.label}
                                      color={result.color}
                                      delay={i * 150}
                                      maxValue={result.maxValue || 100}
                                    />
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl shadow-2xl p-10 md:p-16 text-center overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <motion.div
              variants={scaleIn}
              className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <BsLightningChargeFill className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Ready to Transform <span className="text-primary-200">Your Business?</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="relative z-10 text-lg text-primary-100 mb-8 max-w-2xl mx-auto"
            >
              Join hundreds of businesses already benefiting from AI voice automation. See results like these in your own company.
            </motion.p>

            <motion.div variants={fadeInUp} className="relative z-10">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors inline-flex items-center gap-3 shadow-xl"
                >
                  Schedule Your Demo
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

export default CaseStudies
