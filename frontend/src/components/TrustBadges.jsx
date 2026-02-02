import { motion } from 'framer-motion'
import { Shield, Lock, CheckCircle, Award } from 'lucide-react'

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
          <motion.h3
            variants={fadeInUp}
            className="text-2xl font-bold text-text-primary mb-2"
          >
            Enterprise-Grade Security & Compliance
          </motion.h3>
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
              blue: 'bg-blue-100 text-blue-600 border-blue-200',
              indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
              cyan: 'bg-cyan-100 text-cyan-600 border-cyan-200',
              violet: 'bg-violet-100 text-violet-600 border-violet-200',
            }

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`flex flex-col items-center text-center p-6 rounded-2xl border-2 bg-white shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${colorClasses[badge.color]}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">{badge.title}</h4>
                <p className="text-sm text-text-muted">{badge.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustBadges
