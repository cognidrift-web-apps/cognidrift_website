import SEOMeta from '../components/SEOMeta'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/motionVariants'



const PrivacyPolicy = () => {
  const lastUpdated = 'January 15, 2024'

  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, such as when you create an account, subscribe to our services, or contact us for support. This may include your name, email address, phone number, company name, and payment information.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect certain information when you use our services, including your IP address, device type, browser type, operating system, and usage patterns within our platform.'
        },
        {
          subtitle: 'Call Data',
          text: 'When using our AI voice services, we may collect and process call recordings, transcripts, and metadata to provide and improve our services. All call data is encrypted and handled in accordance with applicable regulations.'
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        {
          subtitle: 'Service Delivery',
          text: 'We use your information to provide, maintain, and improve our AI voice agent services, process transactions, and communicate with you about your account.'
        },
        {
          subtitle: 'Analytics and Improvement',
          text: 'We analyze usage patterns to enhance our services, develop new features, and optimize performance. This includes training and improving our AI models.'
        },
        {
          subtitle: 'Communications',
          text: 'We may send you service-related announcements, promotional materials, and newsletters. You can opt out of marketing communications at any time.'
        }
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmitted to and from our services is encrypted using industry-standard TLS/SSL encryption. Data at rest is encrypted using AES-256 encryption.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls and authentication measures to ensure only authorized personnel can access sensitive data.'
        },
        {
          subtitle: 'Compliance',
          text: 'Our infrastructure is designed to meet HIPAA, SOC 2 Type II, and GDPR compliance requirements. We undergo regular security audits and assessments.'
        }
      ]
    },
    {
      title: 'Your Rights',
      icon: Shield,
      content: [
        {
          subtitle: 'Access and Portability',
          text: 'You have the right to access, export, and receive a copy of your personal data in a portable format.'
        },
        {
          subtitle: 'Correction and Deletion',
          text: 'You can request correction of inaccurate data or deletion of your personal information, subject to legal and contractual obligations.'
        },
        {
          subtitle: 'Opt-Out',
          text: 'You can opt out of certain data processing activities, including marketing communications and non-essential analytics.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <SEOMeta
        title="Privacy Policy - CogniDrift AI Automation Platform"
        description="CogniDrift's privacy policy. Learn how we collect, use, and protect your data on our AI automation platform and AI agents for business."
        url="/privacy"
        noIndex={true}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Shield className="w-8 h-8 text-primary-600" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-text-secondary"
          >
            Last updated: {lastUpdated}
          </motion.p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary-50 rounded-2xl p-8 mb-12"
        >
          <p className="text-text-secondary leading-relaxed">
            At CogniDrift, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our AI voice agent services.
            Please read this policy carefully. By using our services, you consent to the practices
            described in this policy.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-neutral-border rounded-2xl p-8 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">{item.subtitle}</h3>
                      <p className="text-text-secondary leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-primary-600 rounded-2xl p-8 text-center text-white"
        >
          <Mail className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h2>
          <p className="text-primary-100 mb-6">
            If you have any questions or concerns about this Privacy Policy or our data practices,
            please contact our privacy team.
          </p>
          <a
            href="mailto:privacy@cognidrift.com"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            <Mail className="w-5 h-5" />
            privacy@cognidrift.com
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
