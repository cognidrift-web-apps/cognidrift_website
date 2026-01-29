import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertTriangle, Scale, Mail } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const TermsOfService = () => {
  const lastUpdated = 'January 15, 2024'

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing or using CogniDrift's AI voice agent services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Services. These Terms constitute a legally binding agreement between you and CogniDrift, Inc.`
    },
    {
      title: 'Description of Services',
      content: `CogniDrift provides AI-powered voice agent services that handle inbound and outbound calls, schedule appointments, qualify leads, and perform other communication tasks on behalf of businesses. Our Services include access to our platform, AI voice agents, analytics dashboards, and related features as described on our website.`
    },
    {
      title: 'Account Registration',
      content: `To use our Services, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.`
    },
    {
      title: 'Acceptable Use',
      content: `You agree to use our Services only for lawful purposes and in accordance with these Terms. You may not: (a) use the Services for any illegal or unauthorized purpose; (b) interfere with or disrupt the Services or servers; (c) attempt to gain unauthorized access to any systems; (d) use the Services to harass, abuse, or harm others; (e) transmit any malware or harmful code; or (f) violate any applicable laws or regulations.`
    },
    {
      title: 'Payment Terms',
      content: `Paid subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except as expressly stated in these Terms or required by law. We reserve the right to modify pricing with 30 days' notice. Failure to pay may result in suspension or termination of your account.`
    },
    {
      title: 'Intellectual Property',
      content: `All content, features, and functionality of our Services, including but not limited to text, graphics, logos, and software, are owned by CogniDrift and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.`
    },
    {
      title: 'Data and Privacy',
      content: `Your use of the Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. You represent that you have obtained all necessary consents for any personal data processed through our Services and that your use complies with all applicable data protection laws.`
    },
    {
      title: 'Service Level Agreement',
      content: `CogniDrift commits to 99.9% uptime for our core Services, excluding scheduled maintenance and circumstances beyond our reasonable control. In the event of service disruptions exceeding our SLA commitments, eligible customers may receive service credits as described in their subscription agreement.`
    },
    {
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by law, CogniDrift shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly. Our total liability for any claims arising from the Services shall not exceed the amount paid by you in the twelve months preceding the claim.`
    },
    {
      title: 'Termination',
      content: `Either party may terminate these Terms at any time for any reason. Upon termination, your right to use the Services will immediately cease. We may suspend or terminate your access if you violate these Terms or fail to pay applicable fees. Provisions that by their nature should survive termination will survive.`
    },
    {
      title: 'Changes to Terms',
      content: `We may modify these Terms at any time by posting the revised terms on our website. Your continued use of the Services after such changes constitutes acceptance of the modified Terms. We will notify you of material changes via email or through the Services.`
    },
    {
      title: 'Governing Law',
      content: `These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved exclusively in the federal or state courts located in Delaware.`
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
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
              Please read these Terms of Service carefully before using CogniDrift's services.
              By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
              If you disagree with any part of these terms, you may not access our Services.
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
              <p className="text-text-secondary leading-relaxed">{section.content}</p>
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
            If you have any questions about these Terms of Service,
            please contact our legal team.
          </p>
          <a
            href="mailto:legal@cognidrift.com"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            <Mail className="w-5 h-5" />
            legal@cognidrift.com
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfService
