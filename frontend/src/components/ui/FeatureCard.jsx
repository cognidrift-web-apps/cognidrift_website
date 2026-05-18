import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp } from '../../utils/motionVariants'

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="card-feature group"
    >
      <div className="icon-wrapper">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-2 sm:mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default FeatureCard
