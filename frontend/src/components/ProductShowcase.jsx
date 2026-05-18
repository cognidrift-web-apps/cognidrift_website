import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Suspense } from 'react'
import { fadeInUp, staggerContainer } from '../utils/motionVariants'

const ProductShowcase = ({
  badge,
  title,
  titleHighlight,
  subtitle,
  features,
  demoComponent: DemoComponent,
  demoSide = 'right',
  bg = 'bg-white',
  ctaText,
  ctaLink,
  extraContent,
  backgroundDecor,
}) => {
  const demoLeft = demoSide === 'left'

  return (
    <section className={`py-16 sm:py-20 lg:py-28 ${bg} relative overflow-hidden`}>
      {backgroundDecor}

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="section-header"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
          >
            <badge.icon className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
              {badge.label}{badge.brandName && <>: Cogni<span className="text-fuchsia-500">{badge.brandName}</span></>}
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-title hero-display">
            {title} <span className="text-gradient">{titleHighlight}</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle max-w-2xl mx-auto">
            {subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mt-10 sm:mt-16">
          {/* Demo Column */}
          <motion.div
            initial={{ opacity: 0, x: demoLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`relative ${demoLeft ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}
          >
            <Suspense fallback={null}>{DemoComponent}</Suspense>
          </motion.div>

          {/* Feature Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className={demoLeft ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}
          >
            <div className="space-y-5">
              {features.map((item, i) => {
                const Icon = item.icon
                const fromX = i % 2 === 0 ? -20 : 20
                return (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: fromX, y: 10 },
                      visible: {
                        opacity: 1, x: 0, y: 0,
                        transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 }
                      }
                    }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100/70 flex items-center justify-center mt-0.5">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-text-primary mb-1">{item.title}</h4>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.desc}</p>
                      {item.extra}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {extraContent}

            {ctaText && (
              <motion.div variants={fadeInUp} className="mt-8">
                <Link to={ctaLink}>
                  <button className="btn-primary animate-glow">
                    {ctaText}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
