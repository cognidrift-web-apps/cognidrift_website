import SEOMeta from '../components/SEOMeta'
import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertTriangle, Scale, Mail, Phone } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/motionVariants'



const TermsOfService = () => {
  const lastUpdated = 'November 1, 2024'

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By using our website ("Site"), you confirm that you have reviewed, understood, and agreed to abide by these Terms. If you are accessing the Site on behalf of a business or organization, you represent and warrant that you have the proper authority to bind that entity to these Terms.`
    },
    {
      title: 'Services Provided',
      content: `CogniDrift offers AI-powered receptionist and communication solutions, including intelligent voice agents for inbound and outbound calls, automated appointment scheduling, lead qualification, and customer engagement tools for businesses. The precise scope of services will be detailed in individual agreements between CogniDrift and its clients.`
    },
    {
      title: 'Eligibility',
      content: `You must be at least 18 years of age to access and use our Site and Services. By using the Site, you confirm that you satisfy this age requirement.`
    },
    {
      title: 'Use of the Site',
      content: `You agree to use the Site solely for lawful purposes and in compliance with these Terms. You shall not: use the Site for any fraudulent or unlawful activities; attempt to obtain unauthorized access to any portion of the Site or its underlying systems; upload or distribute malicious software, viruses, or harmful content; or engage in any conduct that disrupts, damages, or interferes with the proper operation of the Site.`
    },
    {
      title: 'Intellectual Property',
      content: `All content, materials, and intellectual property displayed on the Site — including but not limited to text, graphics, logos, icons, and software — are the property of CogniDrift, Inc. or its licensors and are protected under applicable copyright, trademark, and intellectual property laws. We grant you a limited, non-exclusive, non-transferable license to access and use the Site for personal or internal business purposes. This license does not permit you to reproduce, distribute, modify, or create derivative works from our content without obtaining our prior written consent.`
    },
    {
      title: 'Third-Party Links',
      content: `Our Site may include links to external websites or third-party services. CogniDrift does not control and is not responsible for the content, policies, or practices of any third-party sites. Navigating to any third-party link is done entirely at your own risk, and we encourage you to review the terms and privacy policies of any external sites you visit.`
    },
    {
      title: 'Disclaimers',
      content: `The Site and all associated Services are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. To the fullest extent allowed by law, CogniDrift disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We make no guarantees that the Site will operate without errors, remain secure, or be available without interruption at all times.`
    },
    {
      title: 'Limitation of Liability',
      content: `To the fullest extent permitted by applicable law, CogniDrift, Inc. shall not be held liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Site or Services. Our aggregate liability for any claims related to your use of the Site or Services shall not exceed the total amount you have paid to us, if any, during the six (6) months immediately preceding the date the claim arose.`
    },
    {
      title: 'Indemnification',
      content: `You agree to indemnify, defend, and hold harmless CogniDrift, Inc., its affiliates, directors, officers, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, or expenses — including reasonable attorneys' fees — that arise out of or relate to your use of the Site, your breach of these Terms, or your infringement of any third-party rights.`
    },
    {
      title: 'Termination',
      content: `We reserve the right to suspend or terminate your access to the Site or Services at our sole discretion, without prior notice, for any conduct that we determine violates these Terms or is harmful to other users, to CogniDrift, or to any third parties.`
    },
    {
      title: 'Governing Law',
      content: `These Terms shall be governed by and interpreted in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles. Any legal action or proceeding arising under or related to these Terms shall be brought exclusively in the federal or state courts located in Delaware.`
    },
    {
      title: 'SMS Messaging Terms',
      content: `By submitting your information and opting in through any form on our Site, you consent to receive SMS and text messages from CogniDrift, Inc. These messages may include appointment confirmations, service notifications, updates, and promotional content where applicable. Message frequency may vary based on your interactions with us, and standard message and data rates may apply depending on your carrier. You may opt out of SMS messages at any time by replying STOP to any message you receive. A confirmation text will be sent to verify your unsubscription. For assistance, reply HELP or contact us directly at +1 (844) 584-1083 or contact@cognidrift.com. We do not sell or rent your mobile number to third parties. Your number may only be shared with service providers necessary to facilitate SMS delivery, such as our CRM or messaging platform vendors.`
    },
    {
      title: 'Changes to Terms',
      content: `CogniDrift reserves the right to update or revise these Terms at any time. Any changes will take effect immediately upon being posted to the Site. Your continued use of the Site following the publication of updated Terms constitutes your acceptance of the revised Terms.`
    },
    {
      title: 'Contact Information',
      content: null
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <SEOMeta
        title="Terms of Service - CogniDrift AI Automation Platform"
        description="CogniDrift's terms of service and usage agreement for our AI automation platform and AI agents for business."
        url="/terms"
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
            <Scale className="w-8 h-8 text-primary-600" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
          >
            Terms of Service
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
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
            <p className="text-text-secondary leading-relaxed">
              Welcome to CogniDrift ("Company," "we," "us," or "our"). These Terms and Conditions ("Terms") govern your access to and use of our website, services, and any related content or materials provided by CogniDrift, Inc. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.
            </p>
          </div>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-neutral-border rounded-2xl p-8 mb-12"
        >
          <h2 className="text-xl font-bold text-text-primary mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#section-${index}`}
                className="flex items-center gap-2 text-text-secondary hover:text-primary-600 transition-colors py-1"
              >
                <CheckCircle className="w-4 h-4 text-primary-600" />
                <span className="text-sm">{section.title}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              id={`section-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-neutral-border rounded-2xl p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold text-sm">
                  {index + 1}
                </span>
                <h2 className="text-xl font-bold text-text-primary">{section.title}</h2>
              </div>
              {section.content ? (
                <p className="text-text-secondary leading-relaxed">{section.content}</p>
              ) : (
                <div className="text-text-secondary leading-relaxed space-y-2">
                  <p>If you have any questions or concerns regarding these Terms, please reach out to us at:</p>
                  <div className="mt-4 space-y-1">
                    <p className="font-semibold text-text-primary">CogniDrift, Inc.</p>
                    <p>Email: <a href="mailto:legal@cognidrift.com" className="text-primary-600 hover:underline">legal@cognidrift.com</a></p>
                    <p>Phone: <a href="tel:+18445841083" className="text-primary-600 hover:underline">+1 (844) 584-1083</a></p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-primary-600 rounded-2xl p-8 text-center text-white"
        >
          <Mail className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
          <p className="text-primary-100 mb-6">
            If you have any questions or concerns about these Terms and Conditions,
            our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:legal@cognidrift.com"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              <Mail className="w-5 h-5" />
              legal@cognidrift.com
            </a>
            <a
              href="tel:+18445841083"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
            >
              <Phone className="w-5 h-5" />
              +1 (844) 584-1083
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfService
