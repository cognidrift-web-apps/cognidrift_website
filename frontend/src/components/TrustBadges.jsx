import { motion } from 'framer-motion'
import { Shield, Lock, CheckCircle, Award } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/motionVariants'

const badges = [
  {
    icon: Shield,
    title: 'HIPAA Compliant',
    description: 'Healthcare data protection certified',
    color: 'blue'
  },
  {
    icon: Lock,
    title: 'SOC 2 Type II',
    description: 'Enterprise security standards',
    color: 'indigo'
  },
  {
    icon: CheckCircle,
    title: 'GDPR Ready',
    description: 'European data protection compliant',
    color: 'cyan'
  },
  {
    icon: Award,
    title: 'ISO 27001',
    description: 'Information security certified',
    color: 'violet'
  }
]



const TrustBadges = () => {
  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="section-title hero-display"
          >
            Enterprise-Grade <span className="text-gradient">Security & Compliance</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-text-secondary"
          >
            Your data is protected by industry-leading security standards
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon
            const colorClasses = {
              blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'bg-blue-400' },
              indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'bg-indigo-400' },
              cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', ring: 'bg-cyan-400' },
              violet: { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'bg-violet-400' },
            }
            const colors = colorClasses[badge.color]

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group relative flex flex-col items-center text-center p-6 rounded-2xl border-2 border-neutral-border hover:border-primary-300 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Icon with animation */}
                <motion.div
                  className={`relative w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`w-7 h-7 ${colors.text}`} />

                  {/* Pulse ring on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl ${colors.ring} opacity-0 group-hover:opacity-20`}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>

                {/* Title */}
                <h4 className="relative font-semibold text-text-primary mb-1 group-hover:text-primary-600 transition-colors duration-300">{badge.title}</h4>

                {/* Description */}
                <p className="relative text-sm text-text-muted">{badge.description}</p>

                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-16 h-16 bg-primary-500 opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-300"
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustBadges
