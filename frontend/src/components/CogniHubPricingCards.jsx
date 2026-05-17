import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { managedPlans, byokPlans } from '../data/cognihubPricing'

const colorSchemes = {
  blue: {
    bg: 'bg-blue-500',
    light: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    glow: 'shadow-blue-500/20',
  },
  purple: {
    bg: 'bg-purple-500',
    light: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    glow: 'shadow-purple-500/20',
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const CogniHubPricingCards = () => {
  const [pricingTrack, setPricingTrack] = useState('managed')
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  const plans = pricingTrack === 'managed' ? managedPlans : byokPlans

  return (
    <div>
      {/* Managed / BYOK Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-center mb-6"
      >
        <div className="inline-flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setPricingTrack('managed')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              pricingTrack === 'managed'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Managed (AI Included)
          </button>
          <button
            onClick={() => setPricingTrack('byok')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              pricingTrack === 'byok'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            BYOK (Your Keys)
          </button>
        </div>
      </motion.div>

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-4 mb-12"
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
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-lg"
          />
        </motion.button>
        <span className={`text-lg font-semibold transition-colors ${billingPeriod === 'yearly' ? 'text-primary-600' : 'text-text-muted'}`}>
          Annual
        </span>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: billingPeriod === 'yearly' ? 1 : 0 }}
          className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold"
        >
          Save 17%
        </motion.span>
      </motion.div>

      {/* Pricing Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {plans.map((plan) => {
          const colors = colorSchemes[plan.color]
          const price = billingPeriod === 'yearly' ? plan.annualPrice : plan.price

          return (
            <motion.div
              key={`${pricingTrack}-${plan.name}`}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? `border-2 ${colors.border} ${colors.glow} shadow-2xl scale-[1.02]`
                  : 'border-2 border-neutral-border hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className={`${colors.bg} text-white text-center py-2.5 font-bold text-xs uppercase tracking-wider`}>
                  Most Popular
                </div>
              )}

              <div className={`p-6 ${plan.popular ? '' : 'pt-6'}`}>
                <h3 className="text-xl font-bold text-text-primary mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4">{plan.subtitle}</p>

                <div className="mb-4">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-text-primary">${price}</span>
                    <span className="text-text-secondary mb-1">/mo</span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      Billed annually, save ${(plan.price - plan.annualPrice) * 12}/yr
                    </p>
                  )}
                </div>

                <p className="text-sm font-semibold text-primary-600 mb-1">
                  Up to {plan.users} users
                </p>
                <p className="text-sm font-semibold text-primary-600 mb-4">
                  {typeof plan.actions === 'string' ? plan.actions + ' AI usage' : plan.actions + ' AI actions/mo'}
                </p>

                <Link to={plan.ctaLink} className="block mb-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                      plan.popular
                        ? `${colors.bg} text-white hover:shadow-xl`
                        : 'bg-neutral-100 text-text-primary hover:bg-neutral-200'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>

                <div className="h-px bg-neutral-border mb-4"></div>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className={`flex-shrink-0 w-5 h-5 ${colors.light} rounded-full flex items-center justify-center mt-0.5`}>
                        <Check className={`w-3 h-3 ${colors.text}`} />
                      </div>
                      <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-t from-primary-100/40 to-transparent blur-2xl pointer-events-none"></div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default CogniHubPricingCards
