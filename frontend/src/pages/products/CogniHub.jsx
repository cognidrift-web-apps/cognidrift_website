import SEOMeta from '../../components/SEOMeta'
import { motion } from 'framer-motion'
import { Sparkles, Bot, Database, Code, Users, Zap, CheckCircle2, ArrowRight, Globe, BarChart3, Shield, Headphones } from 'lucide-react'
import { Link } from 'react-router-dom'
import CogniHubPricingCards from '../../components/CogniHubPricingCards'
import { usePageAnimation } from '../../utils/useFirstMount'

const CogniHub = () => {
  const { heroInitial, heroAnimate, iconInitial, iconAnimate } = usePageAnimation()

  const features = [
    {
      icon: Sparkles,
      title: 'Multi-Model Access',
      description: 'Access GPT-4o, Claude, Gemini, Mistral, and more. Switch models mid-conversation for the right AI on every task.'
    },
    {
      icon: Bot,
      title: 'AI Agents',
      description: 'Create agents that execute multi-step tasks with tools, API actions, and custom logic. Share across your organization.'
    },
    {
      icon: Database,
      title: 'Knowledge Base',
      description: 'Upload your docs, product info, and FAQs. AI answers grounded in your business data with RAG technology.'
    },
    {
      icon: Code,
      title: 'Code Interpreter',
      description: 'Run code, generate charts, and create interactive artifacts directly in chat. Full development environment built in.'
    }
  ]

  const benefits = [
    { icon: BarChart3, text: 'One bill replaces 3+ AI subscriptions' },
    { icon: Shield, text: 'Enterprise auth: SSO, OAuth, LDAP, 2FA' },
    { icon: Zap, text: 'Bring your own API keys for full control' },
    { icon: Users, text: 'Team workspaces with shared agents' },
    { icon: Globe, text: '30+ language support out of the box' },
    { icon: Headphones, text: 'Priority support with onboarding' }
  ]

  const stats = [
    { value: '10+', label: 'AI Models' },
    { value: '<1s', label: 'Response Time' },
    { value: '30+', label: 'Languages' },
    { value: '99.9%', label: 'Uptime' }
  ]

  const useCases = [
    {
      title: 'Small Teams',
      description: 'Stop paying for ChatGPT AND Claude AND Gemini separately. One platform, all models, one bill.',
      features: ['Multi-model access', 'Shared workspace', 'Simple billing']
    },
    {
      title: 'SaaS Companies',
      description: 'Build custom AI agents for support, onboarding, and internal workflows.',
      features: ['Agent builder', 'Knowledge bases', 'API integrations']
    },
    {
      title: 'Agencies',
      description: 'Give every client project the right AI model. Manage teams and usage from one dashboard.',
      features: ['Team management', 'Usage analytics', 'Client separation']
    },
    {
      title: 'Education',
      description: 'Access frontier models for research, teaching, and content creation at team-friendly pricing.',
      features: ['All model tiers', 'Code interpreter', 'Content studio']
    }
  ]

  return (
    <div className="min-h-screen">
      <SEOMeta
        title="CogniHub - Multi-Model AI Workspace for Teams"
        description="Access GPT, Claude, Gemini, Mistral and more in one workspace. AI agents, knowledge bases, code interpreter, and team management. Managed or BYOK."
        keywords="multi-model AI, AI workspace, GPT Claude Gemini, AI agents, knowledge base, team AI platform"
        url="/products/cognihub"
      />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
              <motion.div
                initial={iconInitial}
                animate={iconAnimate}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100/70 rounded-xl flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
                <span className="text-purple-600">CogniHub</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Every AI model. One workspace. Your whole team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-neutral-offWhite border-y border-gray-100">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-text-secondary font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Powerful <span className="text-purple-600">Features</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Everything your team needs in one AI workspace
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const colorSchemes = [
                { lightBg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200', glow: 'shadow-blue-500/20', bg: 'bg-blue-500' },
                { lightBg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200', glow: 'shadow-purple-500/20', bg: 'bg-purple-500' },
                { lightBg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-200', glow: 'shadow-cyan-500/20', bg: 'bg-cyan-500' },
                { lightBg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-200', glow: 'shadow-teal-500/20', bg: 'bg-teal-500' },
              ]
              const colors = colorSchemes[index % colorSchemes.length]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative h-full bg-white rounded-2xl p-6 sm:p-8 border-2 ${colors.border} overflow-hidden shadow-md hover:shadow-xl ${colors.glow} transition-all duration-500`}
                  >
                    <div className={`absolute inset-0 ${colors.lightBg} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                    <motion.div className={`absolute -top-10 -right-10 w-32 h-32 ${colors.bg} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex w-12 h-12 ${colors.lightBg} rounded-xl items-center justify-center mb-4 shadow-md group-hover:shadow-xl transition-shadow`}
                      >
                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                    </div>

                    <div className={`absolute bottom-0 right-0 w-16 h-16 ${colors.bg} opacity-5 rounded-tl-full transition-all duration-500 group-hover:w-24 group-hover:h-24`} />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Built for <span className="text-purple-600">Your Team</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              One AI platform for every team and workflow
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3">{useCase.title}</h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100"
          >
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Why Teams Choose <span className="text-purple-600">CogniHub</span>
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                One platform replaces multiple AI subscriptions
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-purple-50/50 hover:bg-purple-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-purple-100/70 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-text-primary font-medium">{benefit.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Simple, transparent <span className="text-purple-600">pricing</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Choose Managed for simplicity or BYOK for full control. Upgrade or cancel anytime.
            </p>
          </motion.div>

          <CogniHubPricingCards />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/products/cognihub/pricing"
              className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
            >
              Compare all plans in detail
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-primary-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 text-center relative overflow-hidden border-2 border-purple-100"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6 relative z-10 border border-purple-100">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Get Started</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6 relative z-10">
              Ready to <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">Unify Your Team's AI?</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 relative z-10">
              Stop paying for multiple AI subscriptions. One platform, every model, your whole team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto btn-primary px-8 py-4 text-lg"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/resources/case-studies">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-300"
                >
                  View Case Studies
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CogniHub
