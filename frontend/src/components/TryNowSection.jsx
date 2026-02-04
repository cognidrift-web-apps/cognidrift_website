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
      transition: { staggerChildren: 0.15 }
    }
  }

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/20 rounded-full blur-3xl"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full mb-6"
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">Try It Live</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="hero-display text-4xl sm:text-5xl md:text-6xl text-white mb-6"
            >
              <span className="block mb-2">Pull Out</span>
              <span className="block text-primary-200">Your Phone!</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-primary-100 mb-8 leading-relaxed"
            >
              Experience our AI receptionist <span className="font-bold text-white">right now</span>.
              Call or text the number below to see how natural and helpful your AI assistant can be.
            </motion.p>

            {/* Contact Methods */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 mb-8"
            >
              {/* Phone Number */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="group flex items-center gap-4 bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-white/40 rounded-2xl p-5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-7 h-7 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-primary-200 font-medium mb-1">Call Now</p>
                  <p className="text-2xl font-bold text-white tracking-wide">
                    +1 (844) 584-1083
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                />
              </motion.div>

              {/* Text Message */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="group flex items-center gap-4 bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-white/40 rounded-2xl p-5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-7 h-7 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-primary-200 font-medium mb-1">Text Message</p>
                  <p className="text-2xl font-bold text-white tracking-wide">
                    +1 (844) 584-1083
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                />
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-primary-600 px-8 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-5 h-5" />
                  Get This For Your Business
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 border-2 border-white text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Chat Widget Demo
              </motion.button>
            </motion.div>

            {/* Trust Indicator */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center gap-3 text-primary-100"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/20 border-2 border-primary-600 flex items-center justify-center text-white font-bold text-sm"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm">
                <span className="font-bold text-white">1,000+</span> businesses trust our AI
              </p>
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative max-w-md mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-white/30 rounded-[3rem] blur-3xl scale-105"></div>

              {/* Phone Frame */}
              <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-4 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>

                {/* Screen */}
                <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19] shadow-inner">
                  {/* Call Interface */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white p-8 flex flex-col items-center justify-center">
                    {/* Profile Picture */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative mb-8"
                    >
                      <div className="w-32 h-32 bg-primary-600 rounded-full flex items-center justify-center shadow-2xl">
                        <Phone className="w-16 h-16 text-white" />
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
                          className="absolute inset-0 border-4 border-primary-500 rounded-full"
                        />
                      ))}
                    </motion.div>

                    {/* Caller Info */}
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      CogniDrift AI
                    </h3>
                    <p className="text-lg text-text-secondary mb-1">
                      AI Receptionist
                    </p>
                    <p className="text-sm text-primary-600 font-medium mb-8">
                      Incoming call...
                    </p>

                    {/* Call Actions */}
                    <div className="flex items-center gap-6">
                      {/* Decline */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Phone className="w-8 h-8 text-white rotate-135" />
                      </motion.button>

                      {/* Accept */}
                      <motion.button
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 10px 30px rgba(34, 197, 94, 0.3)',
                            '0 15px 40px rgba(34, 197, 94, 0.5)',
                            '0 10px 30px rgba(34, 197, 94, 0.3)'
                          ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <Phone className="w-10 h-10 text-white" />
                      </motion.button>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                      <span className="text-xs font-semibold text-text-primary">
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
                className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-2xl max-w-[200px] hidden xl:block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Response Time</p>
                    <p className="text-lg font-bold text-text-primary">0.3s</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -right-8 bottom-1/4 bg-white rounded-2xl p-4 shadow-2xl max-w-[200px] hidden xl:block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Availability</p>
                    <p className="text-lg font-bold text-text-primary">24/7</p>
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
