import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Phone, 
  Clock, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe,
  Stethoscope,
  Building2,
  HomeIcon,
  Briefcase,
  ArrowRight,
  Check,
  PhoneCall,
  Bot,
  Bell,
  Settings,
  Headphones,
  Users,
  ChevronRight
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

const Services = () => {
  const [activeTab, setActiveTab] = useState(0)

  const services = [
    {
      icon: PhoneCall,
      title: 'AI Voice Agents',
      description: 'Intelligent voice AI that handles inbound and outbound calls with natural conversation abilities.',
      features: ['Natural Language Processing', 'Intent Recognition', 'Context Awareness', 'Multi-turn Conversations'],
      color: 'primary'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Automated appointment booking that syncs with your calendar and reduces no-shows.',
      features: ['Calendar Integration', 'Automated Reminders', 'Rescheduling Handling', 'Timezone Management'],
      color: 'teal'
    },
    {
      icon: MessageSquare,
      title: 'Lead Qualification',
      description: 'Qualify leads 24/7 with intelligent questioning and scoring systems.',
      features: ['Custom Qualification Logic', 'Lead Scoring', 'CRM Integration', 'Real-time Notifications'],
      color: 'purple'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Comprehensive dashboards to track performance, patterns, and opportunities.',
      features: ['Call Analytics', 'Conversion Tracking', 'Customer Insights', 'Custom Reports'],
      color: 'orange'
    },
    {
      icon: Zap,
      title: 'CRM Integration',
      description: 'Seamless connection with your existing tools and workflows.',
      features: ['Salesforce', 'HubSpot', 'Zoho', 'Custom APIs'],
      color: 'primary'
    },
    {
      icon: Headphones,
      title: 'Custom Development',
      description: 'Tailored AI solutions built specifically for your unique business needs.',
      features: ['Custom Workflows', 'Industry-specific Logic', 'White-label Options', 'Dedicated Support'],
      color: 'teal'
    }
  ]

  const industries = [
    {
      icon: Stethoscope,
      title: 'Healthcare',
      description: 'HIPAA-compliant voice AI for medical practices, clinics, and healthcare providers.',
      useCases: [
        'Patient appointment scheduling',
        'Prescription refill requests',
        'Insurance verification calls',
        'Post-visit follow-up calls',
        'Lab result notifications'
      ],
      integrations: ['Epic', 'Cerner', 'Athenahealth', 'DrChrono']
    },
    {
      icon: Briefcase,
      title: 'Insurance',
      description: 'Handle policy inquiries, claims status, and agent routing around the clock.',
      useCases: [
        'Claims status inquiries',
        'Policy information requests',
        'Quote generation calls',
        'Payment processing',
        'Agent appointment booking'
      ],
      integrations: ['Applied Epic', 'Vertafore', 'Salesforce']
    },
    {
      icon: HomeIcon,
      title: 'Real Estate',
      description: 'Qualify leads and schedule property viewings automatically.',
      useCases: [
        'Lead qualification calls',
        'Property showing scheduling',
        'Buyer/seller inquiries',
        'Open house reminders',
        'Agent matching'
      ],
      integrations: ['Follow Up Boss', 'KvCORE', 'Zillow']
    },
    {
      icon: Building2,
      title: 'Professional Services',
      description: 'Custom solutions for law firms, accounting practices, and consultants.',
      useCases: [
        'Client intake calls',
        'Consultation scheduling',
        'Document request handling',
        'Case status updates',
        'Billing inquiries'
      ],
      integrations: ['Clio', 'Practice Panther', 'Calendly']
    }
  ]

  const process = [
    { 
      step: '01', 
      title: 'Discovery', 
      description: 'We analyze your call patterns, customer needs, and business workflows to design the perfect AI solution.' 
    },
    { 
      step: '02', 
      title: 'Configuration', 
      description: 'Custom training and setup of your AI agent with your specific scripts, FAQs, and decision trees.' 
    },
    { 
      step: '03', 
      title: 'Integration', 
      description: 'Seamless connection with your phone system, CRM, calendar, and other business tools.' 
    },
    { 
      step: '04', 
      title: 'Launch & Optimize', 
      description: 'Go live with ongoing monitoring, A/B testing, and continuous improvement.' 
    }
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
              Our Solutions
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              AI That Works<br />While You Sleep
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-primary-100 mb-8"
            >
              Comprehensive voice AI solutions designed to transform how your business 
              handles customer communications.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/contact">
                <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors inline-flex items-center gap-2 animate-glow">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">What We Offer</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Comprehensive AI Solutions
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              Everything you need to automate and enhance your customer communications.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card-feature group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                  service.color === 'primary' ? 'bg-primary-50 text-primary-600 group-hover:bg-primary-100' :
                  service.color === 'teal' ? 'bg-cyan-50 text-accent-cyan group-hover:bg-cyan-100' :
                  service.color === 'purple' ? 'bg-indigo-50 text-accent-indigo group-hover:bg-indigo-100' :
                  'bg-violet-50 text-accent-violet group-hover:bg-violet-100'
                }`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{service.title}</h3>
                <p className="text-text-secondary mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                      <Check className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">Industry Solutions</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Built for Your Industry
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              Specialized AI agents trained for the unique needs of your sector.
            </motion.p>
          </motion.div>
          
          {/* Tabs */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {industries.map((industry, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === index 
                    ? 'bg-primary-600 text-white shadow-button' 
                    : 'bg-white text-text-secondary hover:bg-primary-50 border border-neutral-border'
                }`}
              >
                <industry.icon className="w-5 h-5" />
                {industry.title}
              </button>
            ))}
          </motion.div>
          
          {/* Active Industry Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-neutral-border"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6">
                  {(() => {
                    const Icon = industries[activeTab].icon
                    return <Icon className="w-8 h-8" />
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  {industries[activeTab].title}
                </h3>
                <p className="text-text-secondary mb-6">
                  {industries[activeTab].description}
                </p>
                <Link to="/contact">
                  <button className="btn-primary animate-glow">
                    Learn More
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-4">Use Cases</h4>
                  <ul className="space-y-3">
                    {industries[activeTab].useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-text-secondary">
                        <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-text-primary mb-4">Integrations</h4>
                  <div className="flex flex-wrap gap-2">
                    {industries[activeTab].integrations.map((integration, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 bg-neutral-offWhite rounded-lg text-sm text-text-secondary"
                      >
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="section-header"
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">Our Process</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Simple, Transparent, Effective
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              From discovery to launch in weeks, not months.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
          >
            {process.map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="text-center relative"
              >
                <div className="text-7xl font-bold text-primary-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
                
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 text-primary-200">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto"
            >
              Book a demo to see how CogniDrift can transform your customer communications.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/contact">
                <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors inline-flex items-center gap-2 animate-glow">
                  Book Your Demo
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

export default Services
