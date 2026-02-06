import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Target, Zap, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FaUserMd, FaHome, FaBalanceScale } from 'react-icons/fa'
import { BsGraphUpArrow, BsCheckCircleFill, BsLightningChargeFill } from 'react-icons/bs'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
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
        { metric: '70%', label: 'Reduction in staff workload' },
        { metric: '95%', label: 'Patient satisfaction rate' },
        { metric: '40%', label: 'Decrease in no-shows' },
        { metric: '$180K', label: 'Annual savings' }
      ],
      testimonial: "CogniDrift transformed our front desk operations. Our staff can now focus on patient care instead of answering phones.",
      author: "Dr. Sarah Chen, Medical Director"
    },
    {
      company: 'Prestige Realty Group',
      industry: 'Real Estate',
      icon: FaHome,
      ...blueAccent,
      challenge: 'Missing 60% of inbound leads due to limited availability',
      solution: 'Deployed 24/7 AI agent for lead qualification and showing scheduling',
      results: [
        { metric: '100%', label: 'Lead capture rate' },
        { metric: '85%', label: 'Increase in showings' },
        { metric: '45%', label: 'Conversion improvement' },
        { metric: '$450K', label: 'Additional Q1 revenue' }
      ],
      testimonial: "We went from missing leads to capturing every single one. The ROI was immediate and substantial.",
      author: "Michael Torres, Broker"
    },
    {
      company: 'Thompson & Associates Law',
      industry: 'Legal Services',
      icon: FaBalanceScale,
      ...blueAccent,
      challenge: 'High administrative costs and missed client calls',
      solution: 'Integrated AI receptionist for client intake and consultation scheduling',
      results: [
        { metric: '60%', label: 'Reduction in admin costs' },
        { metric: '0', label: 'Missed client calls' },
        { metric: '50%', label: 'Faster onboarding' },
        { metric: '30%', label: 'More billable hours' }
      ],
      testimonial: "The AI handles client intake better than we ever imagined. It's like having a tireless, perfect receptionist.",
      author: "James Thompson, Managing Partner"
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-offWhite">
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
                        <motion.div variants={fadeInUp} className="mb-8">
                          <h4 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                            <div className={`w-10 h-10 ${study.iconBg} rounded-xl flex items-center justify-center`}>
                              <BsGraphUpArrow className={`w-5 h-5 ${study.iconColor}`} />
                            </div>
                            Key Results
                          </h4>

                          <div className="grid sm:grid-cols-2 gap-4">
                            {study.results.map((result, i) => (
                              <motion.div
                                key={i}
                                variants={scaleIn}
                                whileHover={{ scale: 1.03, y: -3 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="group relative p-5 bg-gradient-to-br from-neutral-offWhite to-white rounded-2xl border-2 border-neutral-border hover:border-primary-200 transition-all duration-300"
                              >
                                <div className="flex items-start gap-4">
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: i * 0.1, type: "spring" }}
                                    viewport={{ once: true }}
                                    className={`w-8 h-8 ${study.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                                  >
                                    <BsCheckCircleFill className={`w-4 h-4 ${study.iconColor}`} />
                                  </motion.div>
                                  <div>
                                    <motion.p
                                      initial={{ opacity: 0, x: -10 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.15 }}
                                      viewport={{ once: true }}
                                      className={`text-3xl font-bold ${study.iconColor} mb-1`}
                                    >
                                      {result.metric}
                                    </motion.p>
                                    <p className="text-sm text-text-secondary font-medium">{result.label}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Testimonial */}
                        <motion.div
                          variants={fadeInUp}
                          className="relative p-6 bg-gradient-to-br from-primary-50 to-white rounded-2xl border-2 border-primary-100"
                        >
                          <Quote className={`w-10 h-10 ${study.iconColor} opacity-20 absolute top-4 right-4`} />
                          <p className="text-text-primary italic mb-4 text-lg leading-relaxed pr-12">
                            "{study.testimonial}"
                          </p>
                          <p className={`text-sm font-bold ${study.iconColor}`}>— {study.author}</p>
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
