import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Users, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const CaseStudies = () => {
  const studies = [
    {
      company: 'HealthFirst Medical',
      industry: 'Healthcare',
      icon: '🏥',
      challenge: 'Struggling with high call volumes and staff burnout',
      solution: 'Implemented AI receptionist for appointment scheduling and patient inquiries',
      results: [
        '70% reduction in staff workload',
        '95% patient satisfaction rate',
        '40% decrease in no-show appointments',
        '$180K annual savings'
      ],
      color: 'primary'
    },
    {
      company: 'Prestige Realty Group',
      industry: 'Real Estate',
      icon: '🏡',
      challenge: 'Missing 60% of inbound leads due to limited availability',
      solution: 'Deployed 24/7 AI agent for lead qualification and showing scheduling',
      results: [
        '100% lead capture rate',
        '85% increase in scheduled showings',
        '45% improvement in conversion rate',
        '$450K additional revenue in Q1'
      ],
      color: 'accent-coral'
    },
    {
      company: 'Thompson & Associates Law',
      industry: 'Legal Services',
      icon: '⚖️',
      challenge: 'High administrative costs and missed client calls',
      solution: 'Integrated AI receptionist for client intake and consultation scheduling',
      results: [
        '60% reduction in admin costs',
        'Zero missed client calls',
        '50% faster client onboarding',
        '30% increase in billable hours'
      ],
      color: 'accent-amber'
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
            Success Stories
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Real Results from <span className="text-primary-600">Real Businesses</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            See how businesses across industries are transforming their operations with AI voice agents.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-12 mb-16">
          {studies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-8 p-8 md:p-12">
                {/* Company Info */}
                <div className="md:col-span-1">
                  <div className="text-6xl mb-4">{study.icon}</div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{study.company}</h3>
                  <p className="text-text-secondary mb-6">{study.industry}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-1 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-accent-coral" />
                        Challenge
                      </h4>
                      <p className="text-sm text-text-secondary">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-1 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary-600" />
                        Solution
                      </h4>
                      <p className="text-sm text-text-secondary">{study.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="md:col-span-2">
                  <h4 className="text-xl font-bold text-text-primary mb-6">Key Results</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {study.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-accent-coral flex-shrink-0 mt-0.5" />
                        <p className="text-text-primary font-medium">{result}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact">
                    <button className="btn-primary animate-glow mt-8">
                      Get Similar Results
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-primary-600 rounded-2xl shadow-lg p-8 md:p-12 text-center text-white"
        >
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join hundreds of businesses already benefiting from AI voice automation.
          </p>
          <Link to="/contact">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center gap-2 animate-glow">
              Schedule a Demo
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default CaseStudies
