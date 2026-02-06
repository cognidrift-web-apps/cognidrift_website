import { motion } from 'framer-motion'
import { Phone, Smartphone, MessageSquare, Mic, PhoneCall, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const TryNowSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  return (
    <section className="py-14 lg:py-20 bg-neutral-offWhite">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="section-eyebrow">Try It Live</motion.span>
            <motion.h2 variants={fadeInUp} className="section-title hero-display !mb-3">
              Pull Out <span className="text-gradient">Your Phone!</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle !mb-0">
              Experience our AI receptionist <span className="font-bold text-text-primary">right now</span>.
              Call or text the number below.
            </motion.p>

            {/* Contact Methods */}
            <motion.div
              variants={fadeInUp}
              className="space-y-3 mb-6 mt-6"
            >
              {/* Phone Number */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="group flex items-center gap-3 bg-white border-2 border-neutral-border hover:border-primary-300 rounded-xl p-3.5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex-shrink-0 w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <p className="text-xs text-text-secondary font-medium">Call Now</p>
                  <p className="text-lg font-bold text-text-primary tracking-wide group-hover:text-primary-600 transition-colors">
                    +1 (844) 584-1083
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                />
              </motion.div>

              {/* Text Message */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="group flex items-center gap-3 bg-white border-2 border-neutral-border hover:border-primary-300 rounded-xl p-3.5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex-shrink-0 w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <p className="text-xs text-text-secondary font-medium">Text Message</p>
                  <p className="text-lg font-bold text-text-primary tracking-wide group-hover:text-primary-600 transition-colors">
                    +1 (844) 584-1083
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="relative w-2.5 h-2.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                />
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link to="/contact" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-primary px-6 py-3.5 text-base shadow-xl flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Get This For Your Business
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 border-2 border-primary-600 text-primary-600 px-6 py-3.5 rounded-xl font-bold text-base hover:bg-primary-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mic className="w-4 h-4" />
                Chat Widget Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="relative w-[280px]">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary-200/40 rounded-[2.5rem] blur-3xl scale-110"></div>

              {/* Phone Frame */}
              <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-[2.5rem] p-3 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>

                {/* Screen */}
                <div className="relative bg-white rounded-[2rem] overflow-hidden aspect-[9/18] shadow-inner">
                  {/* Call Interface */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white p-6 flex flex-col items-center justify-center">
                    {/* Profile Picture */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 3, -3, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative mb-5"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-2xl">
                        <Phone className="w-12 h-12 text-white" />
                      </div>
                      {/* Pulse rings */}
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 2.5],
                            opacity: [0.5, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeOut"
                          }}
                          className="absolute inset-0 border-3 border-primary-500 rounded-full"
                        />
                      ))}
                    </motion.div>

                    {/* Caller Info */}
                    <h3 className="text-lg font-bold text-text-primary mb-1">
                      CogniDrift AI
                    </h3>
                    <p className="text-sm text-text-secondary mb-0.5">
                      AI Receptionist
                    </p>
                    <p className="text-xs text-primary-600 font-medium mb-6">
                      Incoming call...
                    </p>

                    {/* Call Actions */}
                    <div className="flex items-center gap-5">
                      {/* Decline */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Phone className="w-6 h-6 text-white rotate-135" />
                      </motion.button>

                      {/* Accept */}
                      <motion.button
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 8px 24px rgba(34, 197, 94, 0.3)',
                            '0 12px 32px rgba(34, 197, 94, 0.5)',
                            '0 8px 24px rgba(34, 197, 94, 0.3)'
                          ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <Phone className="w-8 h-8 text-white" />
                      </motion.button>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                      <span className="text-[10px] font-semibold text-text-primary">
                        AI Ready to Answer
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -left-16 top-1/4 bg-white rounded-xl p-3 shadow-xl border border-neutral-border hidden xl:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted">Response</p>
                    <p className="text-sm font-bold text-text-primary">0.3s</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -right-16 bottom-1/4 bg-white rounded-xl p-3 shadow-xl border border-neutral-border hidden xl:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted">Availability</p>
                    <p className="text-sm font-bold text-text-primary">24/7</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TryNowSection
