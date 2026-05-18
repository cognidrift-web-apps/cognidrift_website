import SEOMeta from '../../components/SEOMeta'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ChevronDown, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import CogniHubPricingCards from '../../components/CogniHubPricingCards'
import {
  managedPlans,
  comparisonRows,
  addOns,
  conciergeSetup,
  billingTerms,
  faqs,
} from '../../data/cognihubPricing'
import { fadeInUp, staggerContainer } from '../../utils/motionVariants'

const CogniHubPricing = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      <SEOMeta
        title="CogniHub Pricing"
        description="Flexible pricing for CogniHub multi-model AI workspace. Choose Managed or Bring Your Own Keys. Plans starting at $29/mo. 14-day free trial, no credit card required."
        keywords="CogniHub pricing, multi-model AI workspace plans, BYOK AI pricing, managed AI pricing"
        url="/products/cognihub/pricing"
      />

      {/* Hero Header */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-indigo rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">CogniHub Pricing</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Simple, transparent{' '}
              <span className="text-gradient">pricing</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-4"
            >
              Two ways to use CogniHub. <span className="font-semibold text-text-primary">Managed</span> — we handle AI infrastructure and bill per action. <span className="font-semibold text-text-primary">BYOK</span> — bring your own API keys and pay providers directly; we charge only the platform fee.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-base text-text-muted max-w-2xl mx-auto"
            >
              Pick the model that fits your team. Upgrade, switch, or cancel anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 sm:pb-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <CogniHubPricingCards />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Compare plans <span className="text-gradient">at a glance</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <div className="min-w-[640px] bg-white rounded-2xl shadow-lg border border-neutral-border overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-5 gap-0 bg-primary-600 text-white font-bold text-sm">
                <div className="p-4"></div>
                {managedPlans.map((plan) => (
                  <div key={plan.name} className="p-4 text-center">
                    {plan.name}
                    {plan.popular && <Star className="w-3.5 h-3.5 inline ml-1" />}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {comparisonRows.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-5 gap-0 border-t border-neutral-border ${
                    index % 2 === 0 ? 'bg-white' : 'bg-neutral-offWhite'
                  }`}
                >
                  <div className="p-4 font-medium text-text-primary text-sm">{row.label}</div>
                  {row.values.map((value, vIndex) => (
                    <div key={vIndex} className="p-4 text-center text-sm text-text-secondary">
                      {value === true ? (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        </div>
                      ) : value === false ? (
                        <span className="text-text-muted">—</span>
                      ) : (
                        <span className="font-medium">{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overage Info */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">
              Run out of actions? <span className="text-gradient">No surprises.</span>
            </h2>
            <div className="text-left bg-neutral-offWhite rounded-2xl p-6 sm:p-8 border border-neutral-border space-y-4 text-text-secondary leading-relaxed">
              <p>
                On Managed plans, Lite models stay available at overage rates so <span className="font-bold text-text-primary">you are never locked out</span>. Standard and Premium models lock until you upgrade or purchase a top-up pack.
              </p>
              <p>
                We alert you at 80%, 90%, and 100% of your actions so there are no surprises. If the math makes sense, we will recommend upgrading. It is usually cheaper than top-ups.
              </p>
              <p>
                On BYOK plans, usage is unlimited — you pay providers directly through your own API keys. No action limits, no overage.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Optional <span className="text-gradient">add-ons</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Genuine upgrades, not missing features. Everything above works perfectly out of the box.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
          >
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-md border border-neutral-border hover:shadow-lg transition-shadow"
              >
                <p className="text-lg font-bold text-text-primary mb-1">{addon.name}</p>
                <p className="text-primary-600 font-bold text-sm mb-3">{addon.price}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{addon.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Concierge Setup */}
      <section className="py-16 sm:py-20 bg-neutral-offWhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 sm:p-10 border-2 border-primary-100 shadow-lg"
          >
            <div className="text-center mb-8">
              <p className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-2">Included Free</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                Concierge Setup
              </h2>
              <p className="text-text-secondary">
                <span className="font-bold text-text-primary">$999 value</span> — waived for founding customers.
              </p>
              <p className="text-sm text-text-secondary mt-2">
                Our team configures your CogniHub workspace for you. No technical skills required. You are live in days, not weeks.
              </p>
            </div>

            <div className="space-y-3">
              {conciergeSetup.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                  <span className="text-text-secondary leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Billing and Terms */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary">
              Billing and <span className="text-gradient">terms</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-neutral-border overflow-hidden"
          >
            {billingTerms.map((term, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-neutral-border first:border-t-0 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-offWhite'
                }`}
              >
                <div className="p-4 sm:p-5 font-bold text-text-primary text-sm">{term.label}</div>
                <div className="p-4 sm:p-5 sm:col-span-2 text-sm text-text-secondary leading-relaxed">{term.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Frequently asked <span className="text-gradient">questions</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <div
                    className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? 'border-primary-500 shadow-xl shadow-primary-500/10'
                        : 'border-neutral-border hover:border-primary-300 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                    >
                      <h3 className={`text-base sm:text-lg font-bold leading-tight transition-colors duration-200 ${
                        isOpen ? 'text-primary-600' : 'text-text-primary'
                      }`}>
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={`flex-shrink-0 ${isOpen ? 'text-primary-600' : 'text-text-muted'}`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5">
                            <div className="h-px bg-gradient-to-r from-primary-200 to-transparent mb-4"></div>
                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden border-2 border-primary-100"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Ready to try <span className="text-gradient">CogniHub</span>?
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto mb-8">
                Start your 14-day free trial. Setup fee waived. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary px-8 py-4 text-lg"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300"
                  >
                    Talk to Sales
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CogniHubPricing
