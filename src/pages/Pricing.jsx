import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Zap, Building2, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: '499',
      period: 'month',
      description: 'Perfect for small businesses and startups',
      features: [
        'Up to 500 calls/month',
        'Basic AI receptionist',
        'Email support',
        'Call analytics',
        'Calendar integration',
        'Standard voice options',
      ],
      notIncluded: [
        'CRM integration',
        'Custom voice training',
        'Priority support',
        'Advanced analytics',
      ],
      popular: false,
      color: 'primary'
    },
    {
      name: 'Professional',
      icon: Building2,
      price: '999',
      period: 'month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 2,000 calls/month',
        'Advanced AI receptionist',
        'Priority support',
        'Advanced analytics',
        'CRM integration',
        'Custom voice training',
        'Multi-language support',
        'API access',
      ],
      notIncluded: [
        'Dedicated account manager',
        'Custom integrations',
      ],
      popular: true,
      color: 'accent-purple'
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      price: 'Custom',
      period: '',
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited calls',
        'Enterprise AI receptionist',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security',
        'SLA guarantee',
        'White-label option',
        'Custom voice training',
        'Priority support 24/7',
      ],
      notIncluded: [],
      popular: false,
      color: 'accent-teal'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-neutral-lightBlue pt-24 pb-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-wider text-primary-600 font-semibold mb-4">
            Pricing Plans
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Choose Your <span className="gradient-text">Perfect Plan</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Transparent pricing that grows with your business. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                  plan.popular ? 'border-accent-purple' : 'border-neutral-border'
                } p-8 hover:shadow-xl transition-shadow duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-purple text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-${plan.color}-100 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${plan.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                  <p className="text-text-secondary text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-text-primary">
                      {plan.price === 'Custom' ? plan.price : `$${plan.price}`}
                    </span>
                    {plan.period && (
                      <span className="text-text-secondary mb-2">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <Link to="/contact">
                  <button className={`w-full ${
                    plan.popular ? 'btn-primary' : 'btn-secondary'
                  } mb-6`}>
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-text-primary mb-3">What's included:</p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent-teal flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.length > 0 && (
                    <>
                      {plan.notIncluded.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 opacity-50">
                          <X className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Can I change plans later?
              </h3>
              <p className="text-text-secondary">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-text-secondary">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Is there a free trial?
              </h3>
              <p className="text-text-secondary">
                Yes! We offer a 14-day free trial with no credit card required.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                What happens if I exceed my call limit?
              </h3>
              <p className="text-text-secondary">
                Additional calls are charged at $0.10 per call, or you can upgrade to a higher tier plan.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Pricing
