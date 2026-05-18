import SEOMeta from '../components/SEOMeta'
import { motion } from 'framer-motion'
import { MessageSquare, CheckCircle, XCircle, HelpCircle, Clock, DollarSign, Mail, Phone } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/motionVariants'



const SmsConsent = () => {
  const lastUpdated = 'May 13, 2026'

  const sections = [
    {
      title: 'What Messages You Will Receive',
      icon: MessageSquare,
      content: [
        {
          subtitle: 'Account Information',
          text: 'You may receive SMS messages containing account-related information such as login links, verification codes, appointment confirmations, and service updates.'
        },
        {
          subtitle: 'Appointment Reminders',
          text: 'If requested, we will send you reminders about upcoming appointments, scheduled calls, or meetings booked through our platform.'
        },
        {
          subtitle: 'Service Notifications',
          text: 'Important notifications about your service status, callback confirmations, and support ticket updates may be sent via SMS.'
        }
      ]
    },
    {
      title: 'How to Opt-In',
      icon: CheckCircle,
      content: [
        {
          subtitle: 'Contact Form Submission',
          text: 'When you submit a contact form on our website and provide your phone number, you consent to receive SMS communications related to your inquiry.'
        },
        {
          subtitle: 'Service Registration',
          text: 'By signing up for our services and providing your mobile number, you agree to receive transactional SMS messages necessary for service delivery.'
        },
        {
          subtitle: 'Explicit Request',
          text: 'You may explicitly request SMS updates by contacting our support team or selecting SMS notifications in your account settings.'
        }
      ]
    },
    {
      title: 'How to Opt-Out',
      icon: XCircle,
      content: [
        {
          subtitle: 'Reply STOP',
          text: 'To stop receiving SMS messages from CogniDrift, simply reply STOP to any message you receive. You will receive a confirmation message and will be removed from our SMS list.'
        },
        {
          subtitle: 'Contact Support',
          text: 'You can also opt-out by emailing support@cognidrift.com or calling +1 (844) 584-1083 and requesting to be removed from SMS communications.'
        },
        {
          subtitle: 'Account Settings',
          text: 'If you have an account with us, you can manage your SMS preferences directly in your account notification settings.'
        }
      ]
    },
    {
      title: 'Get Help',
      icon: HelpCircle,
      content: [
        {
          subtitle: 'Reply HELP',
          text: 'For help with SMS notifications, reply HELP to any message you receive from us. You will receive information about how to manage your SMS preferences.'
        },
        {
          subtitle: 'Contact Us',
          text: 'For additional assistance, contact our support team at support@cognidrift.com or call +1 (844) 584-1083 during business hours.'
        }
      ]
    },
    {
      title: 'Message Frequency',
      icon: Clock,
      content: [
        {
          subtitle: 'Transactional Messages',
          text: 'You will only receive SMS messages when necessary for service delivery, such as appointment reminders, verification codes, or callback confirmations.'
        },
        {
          subtitle: 'No Marketing Messages',
          text: 'We do not send promotional or marketing content via SMS. All messages are strictly transactional and service-related.'
        },
        {
          subtitle: 'Frequency Limit',
          text: 'Message frequency varies based on your interaction with our services. Typically, you may receive 1-5 messages per month depending on your usage.'
        }
      ]
    },
    {
      title: 'Rates & Charges',
      icon: DollarSign,
      content: [
        {
          subtitle: 'Standard Rates Apply',
          text: 'Message and data rates may apply depending on your mobile carrier and plan. CogniDrift does not charge for SMS messages, but your carrier may apply standard messaging rates.'
        },
        {
          subtitle: 'Carrier Responsibility',
          text: 'Please check with your mobile carrier for details about your messaging plan and any applicable charges for receiving SMS messages.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <SEOMeta
        title="SMS Consent & Communication Policy - CogniDrift"
        description="Learn about CogniDrift's SMS communication policy, how to opt-in and opt-out of SMS messages, and your rights regarding text message communications."
        url="/sms-consent"
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
            <MessageSquare className="w-8 h-8 text-primary-600" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
          >
            SMS Communication Consent
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
            At CogniDrift, we value your communication preferences. This page explains our SMS communication
            practices, including what types of messages you may receive, how to opt-in or opt-out, and how
            to get help. By providing your phone number and consenting to receive SMS messages, you agree
            to the practices described below.
          </p>
        </motion.div>

        {/* Quick Reference Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 border border-neutral-border rounded-2xl p-6 mb-12"
        >
          <h2 className="text-lg font-bold text-text-primary mb-4">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">To Opt-Out</p>
                <p className="text-sm text-text-secondary">Reply <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">STOP</span> to any message</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">For Help</p>
                <p className="text-sm text-text-secondary">Reply <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">HELP</span> to any message</p>
              </div>
            </div>
          </div>
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
          className="mt-12 bg-primary-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <Mail className="w-10 h-10 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Questions About SMS Communications?</h2>
            <p className="text-primary-100">
              If you have any questions about our SMS communication practices or need assistance
              managing your preferences, please contact us.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@cognidrift.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              <Mail className="w-5 h-5" />
              support@cognidrift.com
            </a>
            <a
              href="tel:+18445841083"
              className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-400 transition-colors"
            >
              <Phone className="w-5 h-5" />
              +1 (844) 584-1083
            </a>
          </div>
        </motion.div>

        {/* Legal Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-text-muted"
        >
          <p>
            By subscribing to SMS notifications, you agree to our{' '}
            <a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SmsConsent
