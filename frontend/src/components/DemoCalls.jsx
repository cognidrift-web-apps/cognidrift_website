import { motion } from 'framer-motion'
import { Play, Phone, MessageSquare, Calendar } from 'lucide-react'
import { useState } from 'react'

const DemoCalls = () => {
  const [activeDemo, setActiveDemo] = useState(0)

  const demoScenarios = [
    {
      name: 'Sarah Mitchell',
      role: 'Calling to book an appointment',
      avatar: 'SM',
      duration: '2:34',
      description: 'Customer wants to schedule a consultation for next week',
      outcome: 'Appointment booked',
      color: 'blue',
      icon: Calendar
    },
    {
      name: 'James Rodriguez',
      role: 'Inquiry about services',
      avatar: 'JR',
      duration: '1:47',
      description: 'Potential client asking about pricing and packages',
      outcome: 'Info sent via SMS',
      color: 'purple',
      icon: MessageSquare
    },
    {
      name: 'Emily Chen',
      role: 'Needs to reschedule appointment',
      avatar: 'EC',
      duration: '1:23',
      description: 'Existing customer wants to change appointment time',
      outcome: 'Rescheduled successfully',
      color: 'cyan',
      icon: Calendar
    },
    {
      name: 'Michael Thompson',
      role: 'Question about warranty',
      avatar: 'MT',
      duration: '2:15',
      description: 'Customer has questions about product warranty coverage',
      outcome: 'Question answered',
      color: 'teal',
      icon: Phone
    }
  ]

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

  const colorSchemes = {
    blue: {
      bg: 'bg-blue-500',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      glow: 'shadow-blue-500/30'
    },
    purple: {
      bg: 'bg-purple-500',
      light: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      glow: 'shadow-purple-500/30'
    },
    cyan: {
      bg: 'bg-cyan-500',
      light: 'bg-cyan-50',
      text: 'text-cyan-600',
      border: 'border-cyan-200',
      glow: 'shadow-cyan-500/30'
    },
    teal: {
      bg: 'bg-teal-500',
      light: 'bg-teal-50',
      text: 'text-teal-600',
      border: 'border-teal-200',
      glow: 'shadow-teal-500/30'
    }
  }

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-indigo rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Play className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Live Demos</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-primary mb-6 leading-[1.1]"
            style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em' }}
          >
            <span className="block">How Your AI Receptionist</span>
            <span className="relative inline-block">
              <span className="text-primary-600">Converts Callers</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 300 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <motion.path
                  d="M0,6 Q75,0 150,6 T300,6"
                  stroke="#2563EB"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Every call answered. Every lead captured. Appointments booked automatically.{' '}
            <span className="font-semibold text-primary-600">You will never lose business to voicemail again.</span>
          </motion.p>
        </motion.div>

        {/* Demo Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {demoScenarios.map((demo, index) => {
            const colors = colorSchemes[demo.color]
            const Icon = demo.icon
            const isActive = activeDemo === index

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setActiveDemo(index)}
                className={`group relative cursor-pointer transition-all duration-300 ${
                  isActive ? 'z-10' : ''
                }`}
              >
                {/* Card */}
                <div className={`relative bg-white rounded-3xl p-6 border-2 ${
                  isActive ? `${colors.border} shadow-2xl ${colors.glow}` : 'border-neutral-border shadow-lg hover:shadow-xl'
                } overflow-hidden transition-all duration-300`}>
                  
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 ${colors.light} opacity-0 ${
                    isActive ? 'opacity-40' : 'group-hover:opacity-20'
                  } transition-opacity duration-300`}></div>

                  {/* Decorative Circle */}
                  <motion.div
                    className={`absolute -top-10 -right-10 w-40 h-40 ${colors.bg} opacity-10 rounded-full blur-2xl ${
                      isActive ? 'scale-150' : 'group-hover:scale-125'
                    } transition-transform duration-700`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 ${colors.light} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                        isActive ? colors.bg + ' text-white' : colors.text
                      } font-bold text-lg transition-all duration-300`}>
                        {demo.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-text-primary truncate">
                          {demo.name}
                        </h3>
                        <p className={`text-sm ${colors.text} font-medium truncate`}>
                          {demo.role}
                        </p>
                      </div>
                    </div>

                    {/* Play Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative w-full aspect-video ${colors.light} rounded-2xl flex items-center justify-center mb-4 overflow-hidden group/play cursor-pointer transition-all duration-300 ${
                        isActive ? colors.bg : 'hover:' + colors.bg
                      }`}
                    >
                      {/* Video placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                      
                      {/* Play button */}
                      <motion.div
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`relative z-10 w-16 h-16 ${
                          isActive ? 'bg-white' : colors.bg + ' group-hover/play:bg-white'
                        } rounded-full flex items-center justify-center shadow-xl transition-all duration-300`}
                      >
                        <Play className={`w-7 h-7 ${
                          isActive ? colors.text : 'text-white ' + 'group-hover/play:' + colors.text
                        } ml-1 transition-colors duration-300`} />
                      </motion.div>

                      {/* Duration badge */}
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                        {demo.duration}
                      </div>

                      {/* Hover overlay */}
                      <motion.div
                        className={`absolute inset-0 ${colors.bg} opacity-0 ${
                          isActive ? 'opacity-20' : 'group-hover/play:opacity-40'
                        } transition-opacity duration-300`}
                      />
                    </motion.div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                      {demo.description}
                    </p>

                    {/* Outcome Badge */}
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex items-center gap-2 ${colors.light} ${colors.text} px-3 py-1.5 rounded-full`}>
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-bold">{demo.outcome}</span>
                      </div>
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-1 ${colors.bg} rounded-b-3xl`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-primary-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-glow transition-all duration-300"
          >
            <Play className="w-5 h-5" />
            <span>Listen to More Examples</span>
          </motion.button>

          <p className="mt-6 text-sm text-text-muted">
            Real conversations. Real results. <span className="font-semibold text-primary-600">No voicemail required.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default DemoCalls
