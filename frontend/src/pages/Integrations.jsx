import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  SiSalesforce,
  SiHubspot,
  SiZoho,
  SiGooglecalendar,
  SiMicrosoftoutlook,
  SiSlack,
  SiTwilio,
  SiZapier,
  SiGoogle,
  SiMicrosoftteams,
  SiNotion,
  SiAirtable,
  SiMailchimp,
  SiStripe,
  SiShopify,
  SiWordpress,
  SiSquarespace,
  SiIntercom,
  SiZendesk,
  SiAsana,
  SiTrello,
  SiGithub,
  SiDropbox,
  SiFigma
} from 'react-icons/si'
import { Zap, ArrowRight, Check, ChevronRight } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const categories = [
  {
    title: 'CRM & Sales',
    description: 'Sync leads, contacts, and deal data automatically.',
    integrations: [
      { name: 'Salesforce', icon: SiSalesforce, color: 'blue' },
      { name: 'HubSpot', icon: SiHubspot, color: 'orange' },
      { name: 'Zoho', icon: SiZoho, color: 'red' },
      { name: 'Intercom', icon: SiIntercom, color: 'blue' },
      { name: 'Zendesk', icon: SiZendesk, color: 'emerald' },
    ]
  },
  {
    title: 'Calendar & Scheduling',
    description: 'Automatically book appointments and sync calendars.',
    integrations: [
      { name: 'Google Calendar', icon: SiGooglecalendar, color: 'blue' },
      { name: 'Outlook', icon: SiMicrosoftoutlook, color: 'blue' },
    ]
  },
  {
    title: 'Communication',
    description: 'Connect your phone, messaging, and team chat tools.',
    integrations: [
      { name: 'Slack', icon: SiSlack, color: 'purple' },
      { name: 'Twilio', icon: SiTwilio, color: 'red' },
      { name: 'Microsoft Teams', icon: SiMicrosoftteams, color: 'blue' },
    ]
  },
  {
    title: 'Automation & Workflow',
    description: 'Build powerful automations across your stack.',
    integrations: [
      { name: 'Zapier', icon: SiZapier, color: 'orange' },
      { name: 'Notion', icon: SiNotion, color: 'gray' },
      { name: 'Airtable', icon: SiAirtable, color: 'blue' },
      { name: 'Asana', icon: SiAsana, color: 'orange' },
      { name: 'Trello', icon: SiTrello, color: 'blue' },
    ]
  },
  {
    title: 'Marketing & Email',
    description: 'Capture leads and sync with your marketing campaigns.',
    integrations: [
      { name: 'Mailchimp', icon: SiMailchimp, color: 'yellow' },
      { name: 'Google Ads', icon: SiGoogle, color: 'blue' },
    ]
  },
  {
    title: 'E-Commerce & Payments',
    description: 'Integrate with your online store and payment processing.',
    integrations: [
      { name: 'Stripe', icon: SiStripe, color: 'purple' },
      { name: 'Shopify', icon: SiShopify, color: 'emerald' },
    ]
  },
  {
    title: 'Website & CMS',
    description: 'Embed CogniDrift on any website platform.',
    integrations: [
      { name: 'WordPress', icon: SiWordpress, color: 'blue' },
      { name: 'Squarespace', icon: SiSquarespace, color: 'gray' },
    ]
  },
  {
    title: 'Developer Tools',
    description: 'Extend CogniDrift with APIs and custom integrations.',
    integrations: [
      { name: 'GitHub', icon: SiGithub, color: 'gray' },
      { name: 'Dropbox', icon: SiDropbox, color: 'blue' },
      { name: 'Figma', icon: SiFigma, color: 'purple' },
    ]
  }
]

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'hover:border-blue-300' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'hover:border-orange-300' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'hover:border-red-300' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'hover:border-emerald-300' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'hover:border-purple-300' },
  gray: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'hover:border-gray-300' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'hover:border-yellow-300' },
}

const Integrations = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent-indigo rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
            >
              <Zap className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Integrations</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold hero-display mb-6"
            >
              Connects With <span className="text-gradient">Everything</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8"
            >
              CogniDrift seamlessly integrates with 50+ tools you already use. Automate workflows, sync data, and supercharge your productivity.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>No-code setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Real-time sync</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Enterprise-grade security</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Integration Categories */}
      {categories.map((category, catIndex) => (
        <section
          key={catIndex}
          className={`py-16 sm:py-20 ${catIndex % 2 === 0 ? 'bg-white' : 'bg-neutral-offWhite'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-2xl sm:text-3xl font-bold hero-display mb-2"
              >
                {category.title}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-text-secondary mb-8 sm:mb-10"
              >
                {category.description}
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
              >
                {category.integrations.map((integration, i) => {
                  const color = colorMap[integration.color] || colorMap.blue
                  const IconComponent = integration.icon

                  return (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      whileHover={{ y: -8, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="group"
                    >
                      <div className={`relative bg-white border-2 border-gray-200 ${color.border} rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden shadow-sm group-hover:shadow-xl`}>
                        <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`relative w-12 h-12 sm:w-14 sm:h-14 ${color.bg} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 mb-3`}
                        >
                          <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${color.text}`} />
                        </motion.div>
                        <p className="relative text-sm font-bold text-text-primary group-hover:text-primary-600 transition-colors duration-300">
                          {integration.name}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold hero-display mb-4"
            >
              Don't See Your Tool? <span className="text-gradient">Let's Talk</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-text-secondary text-base sm:text-lg mb-8 max-w-2xl mx-auto"
            >
              We're adding new integrations every week. Contact us to request an integration or explore our API for custom solutions.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-glow transition-all duration-300 text-sm sm:text-base"
                >
                  <span>Request an Integration</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white text-primary-600 border-2 border-primary-200 hover:border-primary-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
                >
                  <span>Explore API Docs</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Integrations
