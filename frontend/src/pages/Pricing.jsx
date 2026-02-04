import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Zap, Building2, Rocket, Sparkles, Phone, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly') // 'monthly' or 'yearly'

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      subtitle: 'For new solopreneurs with 1-10 calls / day',
      monthlyPrice: 99,
      yearlyPrice: 79, // 20% discount
      description: 'Everything you need to create a custom AI receptionist that answers questions, schedules appointments, and more.',
      features: [
        'Setup in Minutes',
        'Dedicated Account Rep & Support',
        '100+ premium voices',
        '200 Included Minutes / Month',
      ],
      notIncluded: [
        '6000+ Integrations',
        'Unlimited Workflows',
        'Advanced Analytics & Reporting'
      ],
      popular: false,
      cta: 'Start Free Trial',
      color: 'blue'
    },
    {
      name: 'Growth',
      icon: Building2,
      subtitle: 'For small teams of 1-5 with 10-25 calls / day',
      monthlyPrice: 149,
      yearlyPrice: 119, // 20% discount
      description: 'Experience more advanced features, unlimited workflows, API integrations, and detailed data analytics and insights.',
      features: [
        'Everything on Starter',
        'Setup in Minutes',
        '100+ premium voices',
        '6 of Each Workflow',
        'Advanced Analytics & Reporting',
        'Up to two free onboardings',
      ],
      notIncluded: [
        'Unlimited Retained Calls & Customers',
        '6,000+ Integrations',
        'Volume Based Discounts',
        'Unlimited Onboardings & Dedicated Account Representative'
      ],
      popular: true,
      cta: 'Start Free Trial',
      color: 'purple'
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      subtitle: 'For teams of 5+ people with 25+ calls / day',
      monthlyPrice: null, // Custom pricing
      yearlyPrice: null,
      description: 'Unlimited integrations, volume discounts, unlimited seats, and unlimited data retention. All enterprise plans include white-glove onboarding, a dedicated account representative, and strategic guidance on your AI roadmap.',
      features: [
        'Volume Based Discounts',
        'Custom Deals for Minutes Included',
        'Unlimited Seats',
        'SAML/SCIM/EMM/SSO',
        'Dedicated Slack Support',
        'Outbound Calling Capabilities',
        'Increased Data Retention',
        'Custom Integrations & APIs',
        'Unlimited Retained Calls & Customers'
      ],
      notIncluded: [],
      popular: false,
      cta: 'Book a Demo',
      color: 'cyan'
    }
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const colorSchemes = {
    blue: {
      bg: 'bg-blue-500',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      glow: 'shadow-blue-500/20'
    },
    purple: {
      bg: 'bg-purple-500',
      light: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      glow: 'shadow-purple-500/20'
    },
    cyan: {
      bg: 'bg-cyan-500',
      light: 'bg-cyan-50',
      text: 'text-cyan-600',
      border: 'border-cyan-200',
      glow: 'shadow-cyan-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-indigo rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Pricing Plans</span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            AI Receptionist{' '}
            <span className="relative inline-block">
              <span className="text-gradient">Pricing Plans</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 300 12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              >
                <motion.path
                  d="M0,6 Q75,0 150,6 T300,6"
                  stroke="#2563EB"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
            <br />
            <span className="block mt-2">for all Business Sizes</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            A full service, 24/7 AI phone receptionist with pricing built for businesses of all sizes.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4 mt-10"
          >
            <span className={`text-lg font-semibold transition-colors ${billingPeriod === 'monthly' ? 'text-primary-600' : 'text-text-muted'}`}>
              Monthly
            </span>
            <motion.button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                billingPeriod === 'yearly' ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: billingPeriod === 'yearly' ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-lg"
              />
            </motion.button>
            <span className={`text-lg font-semibold transition-colors ${billingPeriod === 'yearly' ? 'text-primary-600' : 'text-text-muted'}`}>
              Yearly
            </span>
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: billingPeriod === 'yearly' ? 1 : 0, rotate: 0 }}
              className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold"
            >
              <Sparkles className="w-4 h-4" />
              Save 20%
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const colors = colorSchemes[plan.color]
            const price = billingPeriod === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice

            return (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? `border-2 ${colors.border} ${colors.glow} shadow-2xl scale-105 lg:scale-110`
                    : 'border-2 border-neutral-border hover:shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`absolute top-0 left-0 right-0 ${colors.bg} text-white text-center py-3 font-bold text-sm uppercase tracking-wider`}
                  >
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Most Popular
                  </motion.div>
                )}

                {/* Card Content */}
                <div className={`p-8 ${plan.popular ? 'pt-20' : 'pt-8'}`}>
                  {/* Icon */}
                  <div className={`inline-flex w-16 h-16 ${colors.light} rounded-2xl items-center justify-center mb-6 shadow-md`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>

                  {/* Plan Name & Subtitle */}
                  <h3 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm font-semibold text-text-secondary mb-6">
                    {plan.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    {price ? (
                      <>
                        <div className="flex items-end gap-2 mb-2">
                          <span className="text-5xl font-bold text-text-primary">${price}</span>
                          <span className="text-text-secondary mb-2">/ mon</span>
                        </div>
                        {billingPeriod === 'yearly' && (
                          <p className="text-sm text-green-600 font-semibold">
                            Billed annually • Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-4xl font-bold text-text-primary mb-2">Custom Pricing</div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link to={plan.cta === 'Book a Demo' ? '/contact' : '/contact'} className="block mb-8">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? `${colors.bg} text-white hover:shadow-xl ${colors.glow}`
                          : 'bg-neutral-100 text-text-primary hover:bg-neutral-200'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>

                  {/* Divider */}
                  <div className="h-px bg-neutral-border mb-6"></div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-text-primary uppercase tracking-wide">
                      {plan.name} Plan:
                    </p>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 ${colors.light} rounded-full flex items-center justify-center mt-0.5`}>
                          <Check className={`w-3 h-3 ${colors.text}`} />
                        </div>
                        <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.length > 0 && (
                      <>
                        {plan.notIncluded.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3 opacity-40">
                            <div className="flex-shrink-0 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                              <X className="w-3 h-3 text-gray-400" />
                            </div>
                            <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* Background Decoration */}
                <div className={`absolute bottom-0 right-0 w-32 h-32 ${colors.bg} opacity-5 rounded-tl-full`}></div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm text-text-muted mb-6">
            Trusted by <span className="font-bold text-primary-600">1,000+</span> businesses worldwide
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['Healthcare', 'Real Estate', 'Insurance', 'Legal', 'E-commerce'].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="px-6 py-3 bg-white border border-neutral-border rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-semibold text-text-secondary">{industry}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <h2 className="section-title hero-display text-3xl md:text-4xl mb-8 text-center">
            Frequently Asked <span className="text-gradient">Questions</span>
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
