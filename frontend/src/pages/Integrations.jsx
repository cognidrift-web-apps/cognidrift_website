
import SEOMeta from '../components/SEOMeta'
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
  SiFigma,
  SiJira,
  SiConfluence,
  SiLinear,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiAmazonaws,
  SiGooglecloud,
  SiMicrosoftazure,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiDatadog,
  SiGrafana,
  SiElasticsearch,
  SiRedis,
  SiPostgresql,
  SiMysql,
  SiMicrosoftexcel,
  SiGooglesheets,
  SiGoogledrive,
  SiMicrosoftonedrive,
  SiBox,
  SiEvernote,
  SiTodoist,
  SiClickup,
  SiMiro,
  SiCanva,
  SiAdobe,
  SiSketch,
  SiInvision,
  SiWebflow,
  SiWix,
  SiGhost,
  SiDrupal,
  SiMagento,
  SiBigcommerce,
  SiWoocommerce,
  SiPaypal,
  SiSquare,
  SiQuickbooks,
  SiXero,
  SiSap,
  SiOracle,
  SiPagerduty,
  SiOpsgenie,
  SiSentry,
  SiNewrelic,
  SiSplunk,
  SiTwitch,
  SiDiscord,
  SiTelegram,
  SiWhatsapp,
  SiMessenger,
  SiLine,
  SiViber,
  SiSkype,
  SiZoom,
  SiGooglemeet,
  SiGotomeeting,
  SiDocusign,
  SiTypeform,
  SiSurveymonkey,
  SiSendinblue,
  SiMixpanel,
  SiHotjar,
  SiGoogleanalytics,
  SiSemrush,
  SiCisco,
  SiCivicrm,
  SiHelpdesk,
  SiCampaignmonitor,
  SiPlausibleanalytics,
  SiMozilla,
} from 'react-icons/si'
import {
  Zap, ArrowRight, Check, ChevronRight,
  Calendar, FileText, BarChart3, Send, Database, Workflow, Receipt
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
}

const categories = [
  {
    title: 'CRM & Sales',
    description: 'Sync leads, contacts, and deal data automatically.',
    integrations: [
      { name: 'Salesforce', icon: SiSalesforce, color: 'blue' },
      { name: 'HubSpot', icon: SiHubspot, color: 'orange' },
      { name: 'Zoho', icon: SiZoho, color: 'red' },
      { name: 'Pipedrive', icon: SiCivicrm, color: 'emerald' },
      { name: 'SAP', icon: SiSap, color: 'blue' },
      { name: 'Oracle', icon: SiOracle, color: 'red' },
      { name: 'Dynamics 365', icon: Workflow, color: 'blue' },
    ]
  },
  {
    title: 'Customer Support',
    description: 'Deliver seamless support with your existing helpdesk tools.',
    integrations: [
      { name: 'Intercom', icon: SiIntercom, color: 'blue' },
      { name: 'Zendesk', icon: SiZendesk, color: 'emerald' },
      { name: 'ServiceNow', icon: SiHelpdesk, color: 'emerald' },
      { name: 'Freshdesk', icon: SiHelpdesk, color: 'blue' },
    ]
  },
  {
    title: 'Calendar & Scheduling',
    description: 'Automatically book appointments and sync calendars.',
    integrations: [
      { name: 'Google Calendar', icon: SiGooglecalendar, color: 'blue' },
      { name: 'Outlook', icon: SiMicrosoftoutlook, color: 'blue' },
      { name: 'Calendly', icon: Calendar, color: 'blue' },
    ]
  },
  {
    title: 'Communication & Messaging',
    description: 'Connect your phone, messaging, and team chat tools.',
    integrations: [
      { name: 'Slack', icon: SiSlack, color: 'purple' },
      { name: 'Twilio', icon: SiTwilio, color: 'red' },
      { name: 'Microsoft Teams', icon: SiMicrosoftteams, color: 'blue' },
      { name: 'Discord', icon: SiDiscord, color: 'purple' },
      { name: 'Telegram', icon: SiTelegram, color: 'blue' },
      { name: 'WhatsApp', icon: SiWhatsapp, color: 'emerald' },
      { name: 'Messenger', icon: SiMessenger, color: 'blue' },
      { name: 'Line', icon: SiLine, color: 'emerald' },
      { name: 'Viber', icon: SiViber, color: 'purple' },
      { name: 'Skype', icon: SiSkype, color: 'blue' },
    ]
  },
  {
    title: 'Video Conferencing',
    description: 'Schedule and manage virtual meetings effortlessly.',
    integrations: [
      { name: 'Zoom', icon: SiZoom, color: 'blue' },
      { name: 'Google Meet', icon: SiGooglemeet, color: 'emerald' },
      { name: 'Webex', icon: SiCisco, color: 'blue' },
      { name: 'GoToMeeting', icon: SiGotomeeting, color: 'orange' },
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
      { name: 'Jira', icon: SiJira, color: 'blue' },
      { name: 'Linear', icon: SiLinear, color: 'purple' },
      { name: 'ClickUp', icon: SiClickup, color: 'purple' },
      { name: 'Monday.com', icon: Workflow, color: 'orange' },
      { name: 'Todoist', icon: SiTodoist, color: 'red' },
    ]
  },
  {
    title: 'Marketing & Email',
    description: 'Capture leads and sync with your marketing campaigns.',
    integrations: [
      { name: 'Mailchimp', icon: SiMailchimp, color: 'yellow' },
      { name: 'Google Ads', icon: SiGoogle, color: 'blue' },
      { name: 'Campaign Monitor', icon: SiCampaignmonitor, color: 'blue' },
      { name: 'Brevo', icon: SiSendinblue, color: 'blue' },
      { name: 'Marketo', icon: Send, color: 'purple' },
    ]
  },
  {
    title: 'Analytics & Tracking',
    description: 'Measure performance and gain actionable insights.',
    integrations: [
      { name: 'Google Analytics', icon: SiGoogleanalytics, color: 'orange' },
      { name: 'Plausible', icon: SiPlausibleanalytics, color: 'blue' },
      { name: 'Mixpanel', icon: SiMixpanel, color: 'purple' },
      { name: 'Amplitude', icon: BarChart3, color: 'blue' },
      { name: 'Hotjar', icon: SiHotjar, color: 'red' },
      { name: 'Semrush', icon: SiSemrush, color: 'orange' },
      { name: 'Moz', icon: SiMozilla, color: 'blue' },
    ]
  },
  {
    title: 'E-Commerce & Payments',
    description: 'Integrate with your online store and payment processing.',
    integrations: [
      { name: 'Stripe', icon: SiStripe, color: 'purple' },
      { name: 'Shopify', icon: SiShopify, color: 'emerald' },
      { name: 'PayPal', icon: SiPaypal, color: 'blue' },
      { name: 'Square', icon: SiSquare, color: 'gray' },
      { name: 'WooCommerce', icon: SiWoocommerce, color: 'purple' },
      { name: 'Magento', icon: SiMagento, color: 'orange' },
      { name: 'BigCommerce', icon: SiBigcommerce, color: 'blue' },
    ]
  },
  {
    title: 'Accounting & Finance',
    description: 'Keep your books in sync with automated data flow.',
    integrations: [
      { name: 'QuickBooks', icon: SiQuickbooks, color: 'emerald' },
      { name: 'FreshBooks', icon: Receipt, color: 'blue' },
      { name: 'Xero', icon: SiXero, color: 'blue' },
    ]
  },
  {
    title: 'Documents & Signing',
    description: 'Automate document workflows and e-signatures.',
    integrations: [
      { name: 'DocuSign', icon: SiDocusign, color: 'blue' },
      { name: 'PandaDoc', icon: FileText, color: 'emerald' },
      { name: 'Typeform', icon: SiTypeform, color: 'purple' },
      { name: 'SurveyMonkey', icon: SiSurveymonkey, color: 'emerald' },
    ]
  },
  {
    title: 'Website & CMS',
    description: 'Embed CogniDrift on any website platform.',
    integrations: [
      { name: 'WordPress', icon: SiWordpress, color: 'blue' },
      { name: 'Squarespace', icon: SiSquarespace, color: 'gray' },
      { name: 'Webflow', icon: SiWebflow, color: 'blue' },
      { name: 'Wix', icon: SiWix, color: 'gray' },
      { name: 'Ghost', icon: SiGhost, color: 'gray' },
      { name: 'Drupal', icon: SiDrupal, color: 'blue' },
    ]
  },
  {
    title: 'Cloud Storage',
    description: 'Access and sync files from your preferred cloud storage.',
    integrations: [
      { name: 'Google Drive', icon: SiGoogledrive, color: 'blue' },
      { name: 'OneDrive', icon: SiMicrosoftonedrive, color: 'blue' },
      { name: 'Dropbox', icon: SiDropbox, color: 'blue' },
      { name: 'Box', icon: SiBox, color: 'blue' },
      { name: 'Evernote', icon: SiEvernote, color: 'emerald' },
    ]
  },
  {
    title: 'Design & Collaboration',
    description: 'Bridge design and development workflows seamlessly.',
    integrations: [
      { name: 'Figma', icon: SiFigma, color: 'purple' },
      { name: 'Miro', icon: SiMiro, color: 'yellow' },
      { name: 'Canva', icon: SiCanva, color: 'blue' },
      { name: 'Adobe', icon: SiAdobe, color: 'red' },
      { name: 'Sketch', icon: SiSketch, color: 'orange' },
      { name: 'InVision', icon: SiInvision, color: 'red' },
      { name: 'Confluence', icon: SiConfluence, color: 'blue' },
    ]
  },
  {
    title: 'Spreadsheets & Data',
    description: 'Sync data to and from your spreadsheets automatically.',
    integrations: [
      { name: 'Google Sheets', icon: SiGooglesheets, color: 'emerald' },
      { name: 'Excel', icon: SiMicrosoftexcel, color: 'emerald' },
    ]
  },
  {
    title: 'DevOps & Infrastructure',
    description: 'Integrate with your CI/CD, monitoring, and cloud platforms.',
    integrations: [
      { name: 'GitHub', icon: SiGithub, color: 'gray' },
      { name: 'AWS', icon: SiAmazonaws, color: 'orange' },
      { name: 'Google Cloud', icon: SiGooglecloud, color: 'blue' },
      { name: 'Azure', icon: SiMicrosoftazure, color: 'blue' },
      { name: 'Vercel', icon: SiVercel, color: 'gray' },
      { name: 'Netlify', icon: SiNetlify, color: 'emerald' },
      { name: 'Heroku', icon: SiHeroku, color: 'purple' },
      { name: 'Docker', icon: SiDocker, color: 'blue' },
      { name: 'Kubernetes', icon: SiKubernetes, color: 'blue' },
      { name: 'Terraform', icon: SiTerraform, color: 'purple' },
    ]
  },
  {
    title: 'Monitoring & Observability',
    description: 'Stay on top of performance and incidents in real-time.',
    integrations: [
      { name: 'Datadog', icon: SiDatadog, color: 'purple' },
      { name: 'Grafana', icon: SiGrafana, color: 'orange' },
      { name: 'Sentry', icon: SiSentry, color: 'purple' },
      { name: 'New Relic', icon: SiNewrelic, color: 'emerald' },
      { name: 'PagerDuty', icon: SiPagerduty, color: 'emerald' },
      { name: 'OpsGenie', icon: SiOpsgenie, color: 'blue' },
      { name: 'Splunk', icon: SiSplunk, color: 'emerald' },
    ]
  },
  {
    title: 'Databases',
    description: 'Connect directly with your database layer.',
    integrations: [
      { name: 'MongoDB', icon: SiMongodb, color: 'emerald' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: 'blue' },
      { name: 'MySQL', icon: SiMysql, color: 'blue' },
      { name: 'Redis', icon: SiRedis, color: 'red' },
      { name: 'Elasticsearch', icon: SiElasticsearch, color: 'yellow' },
      { name: 'Firebase', icon: SiFirebase, color: 'orange' },
      { name: 'Supabase', icon: SiSupabase, color: 'emerald' },
    ]
  },
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
  const totalCount = categories.reduce((sum, cat) => sum + cat.integrations.length, 0)

  return (
    <div className="bg-white overflow-hidden">
      <SEOMeta
        title="Integrations - Connect AI Workflow Automation to Your Tools"
        description="Connect CogniDrift's AI workflow automation and intelligent automation platform with Salesforce, HubSpot, Zapier, Slack, and 100+ business tools."
        keywords="AI workflow automation integrations, intelligent automation platform, AI business intelligence"
        url="/integrations"
      />
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
              CogniDrift seamlessly integrates with {totalCount}+ tools you already use. Automate workflows, sync data, and supercharge your productivity.
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
