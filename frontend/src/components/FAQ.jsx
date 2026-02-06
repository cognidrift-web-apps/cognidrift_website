import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'What is CogniDrift?',
      answer: 'CogniDrift is an AI-powered voice receptionist platform that handles calls, schedules appointments, qualifies leads, and answers customer inquiries 24/7. Our AI agents use advanced natural language processing to have human-like conversations with your customers, providing instant responses while you focus on growing your business.'
    },
    {
      question: 'Is setting up and integrating easy?',
      answer: 'Yes! It takes less than 5 minutes to set up. Simply tell our AI about your business, configure your preferences, and start forwarding calls. We integrate seamlessly with popular tools like Calendly, Google Calendar, Salesforce, HubSpot, and many more. Our team provides white-glove onboarding support to ensure smooth integration.'
    },
    {
      question: 'Do you offer solutions for call centers?',
      answer: 'Absolutely! We provide enterprise solutions for call centers with various forwarding options to help clear your queue. Our AI can act as the first point of contact for inbound calls, handling routine inquiries, qualifying leads, and only escalating complex issues to human agents. We also integrate with your CRM tools for seamless lead generation and tracking.'
    },
    {
      question: 'Can I try it before committing?',
      answer: 'Yes! We offer a free trial so you can test your AI receptionist with real calls. You can also book a free consultation with our customer success team to see the platform in action and learn how it can be customized for your specific business needs.'
    },
    {
      question: 'Do you have an enterprise plan?',
      answer: 'Yes, we work with large enterprises and offer custom solutions. Our enterprise plans include unlimited integrations, volume-based discounts, unlimited seats, SAML/SSO support, dedicated Slack support, outbound calling capabilities, increased data retention, and custom API integrations. Book a call with our sales team to discuss your specific needs.'
    },
    {
      question: 'What is an AI receptionist?',
      answer: 'An AI receptionist is a virtual assistant powered by artificial intelligence that answers phone calls, greets customers, schedules appointments, and handles inquiries just like a human receptionist would. It provides businesses with a cost-effective, reliable solution that works 24/7, never takes breaks, and can handle multiple calls simultaneously. Our AI receptionists are trained on your specific business information to provide accurate, personalized responses.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Security is our top priority. We use enterprise-grade encryption for all data transmission and storage. Our platform is HIPAA-compliant for healthcare providers and follows SOC 2 Type II standards. All call recordings and customer data are stored securely and can be accessed only by authorized users. We never share your data with third parties.'
    },
    {
      question: 'What languages does the AI support?',
      answer: 'Our AI receptionist supports over 30 languages including English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, and many more. The AI can automatically detect the caller\'s language and respond accordingly, making it perfect for businesses serving diverse customer bases.'
    },
    {
      question: 'How does pricing work?',
      answer: 'We offer flexible pricing plans based on call volume and features needed. Our Starter plan begins at $99/month with 200 included minutes, perfect for small businesses. Growth and Enterprise plans offer more minutes, advanced features, and integrations. All plans include unlimited seats, 24/7 support, and free onboarding. Contact our sales team for custom enterprise pricing.'
    },
    {
      question: 'Can the AI handle complex questions?',
      answer: 'Yes! Our AI is trained on your specific business information, products, services, and processes. It can handle complex, multi-step conversations and provide accurate answers. If it encounters a question it can\'t answer, it will ask you once, remember the answer forever, and use that knowledge in future conversations. The AI gets smarter with every interaction.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  return (
    <section className="relative py-24 lg:py-32 bg-neutral-offWhite overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-indigo rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">FAQs</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="section-title hero-display"
          >
            AI Receptionist <span className="text-gradient">FAQs</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-text-secondary leading-relaxed"
          >
            Everything you need to know about our AI voice receptionist
          </motion.p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <motion.div
                  initial={false}
                  className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'border-primary-500 shadow-xl shadow-primary-500/10'
                      : 'border-neutral-border hover:border-primary-300 shadow-md hover:shadow-lg'
                  }`}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 lg:px-8 py-6 flex items-start gap-4 text-left transition-colors duration-200"
                  >
                    {/* Number Badge */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isOpen
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-primary-50 text-primary-600 group-hover:bg-primary-100'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Question Text */}
                    <div className="flex-1">
                      <h3 className={`text-lg lg:text-xl font-bold leading-tight transition-colors duration-200 ${
                        isOpen ? 'text-primary-600' : 'text-text-primary group-hover:text-primary-600'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    {/* Chevron Icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={`flex-shrink-0 transition-colors duration-200 ${
                        isOpen ? 'text-primary-600' : 'text-text-muted group-hover:text-primary-600'
                      }`}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </button>

                  {/* Answer Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 lg:px-8 pb-6 pl-[4.5rem] lg:pl-[5rem]">
                          <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            {/* Divider Line */}
                            <div className="h-px bg-gradient-to-r from-primary-200 to-transparent mb-4"></div>
                            
                            {/* Answer Text */}
                            <p className="text-base text-text-secondary leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-text-secondary mb-6">
            Still have questions?{' '}
            <span className="font-semibold text-primary-600">We're here to help.</span>
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-glow transition-all duration-300"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Contact Support</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
