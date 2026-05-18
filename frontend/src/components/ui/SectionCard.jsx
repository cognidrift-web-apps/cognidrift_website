import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

/**
 * SectionCard — shared section card component used across solution pages.
 *
 * Variants:
 *   "stacked"  — single-column card with gradient background (Healthcare)
 *   "split"    — two-column card with visual side (LocalServices, CallCenters)
 *   "wide"     — 5-column split (3 content + 2 visual) (ProfessionalServices)
 *
 * Props:
 *   icon          — Lucide icon component
 *   title         — card heading
 *   description   — card subheading
 *   features      — string[] of feature bullet points
 *   stats         — { value, suffix, label, prefix? }[]
 *   color         — text color class (e.g. "text-blue-600")
 *   bgGradient    — gradient class for the content area
 *   iconBg        — icon background class
 *   index         — card index, used for stagger delay
 *   variant       — "stacked" | "split" | "wide" (default "stacked")
 *   visual        — JSX element for the visual side (split/wide variants)
 *   reversed      — boolean, flip content/visual order (split variant)
 *   accentColor   — top accent bar gradient class (optional)
 *   pulseIcon     — show pulse overlay on icon (default false)
 *   cols          — grid column split, unused for stacked (default "lg:grid-cols-2")
 */
const SectionCard = ({
  icon: Icon,
  title,
  description,
  features,
  stats,
  color,
  bgGradient,
  iconBg,
  index,
  variant = 'stacked',
  visual,
  reversed = false,
  accentColor,
  pulseIcon = false,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // --- Stacked variant (Healthcare) ---
  if (variant === 'stacked') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={`relative rounded-3xl overflow-hidden ${bgGradient} p-8 lg:p-10`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/20 translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-5 mb-6">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg`}
              >
                <Icon className={`w-8 h-8 ${color}`} />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute -top-1 -right-1 w-4 h-4 ${iconBg} rounded-full`}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm"
                >
                  <div className={`text-2xl font-bold ${color}`}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Features List */}
          <div className="space-y-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3"
              >
                <CheckCircle2 className={`w-5 h-5 ${color} flex-shrink-0`} />
                <span className="text-gray-700 text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  // --- Split variant (LocalServices, CallCenters) ---
  if (variant === 'split') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * (accentColor ? 0.15 : 0.1) }}
        className="relative rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100"
      >
        {/* Optional Top Accent Bar (CallCenters) */}
        {accentColor && <div className={`h-1.5 ${accentColor}`} />}

        <div className={`grid lg:grid-cols-2 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content Side */}
          <div className={`p-8 lg:p-10 ${bgGradient} ${reversed ? 'lg:order-2' : ''}`}>
            {/* Header */}
            <div className={`flex items-start gap-4 ${accentColor ? 'mb-8' : 'mb-6'}`}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className={`${accentColor ? 'w-16 h-16' : 'w-14 h-14'} ${iconBg} rounded-2xl flex items-center justify-center shadow-lg relative`}
              >
                <Icon className={`${accentColor ? 'w-8 h-8' : 'w-7 h-7'} ${color}`} />
                {/* Pulse overlay (CallCenters) */}
                {pulseIcon && (
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 ${iconBg} rounded-2xl`}
                  />
                )}
              </motion.div>
              <div>
                <h3 className={`text-2xl font-bold text-gray-900 ${accentColor ? 'mb-2' : 'mb-1'}`}>{title}</h3>
                <p className={`text-gray-600 ${accentColor ? '' : 'text-sm'}`}>{description}</p>
              </div>
            </div>

            {/* Stats Grid — above features for CallCenters variant, below for LocalServices */}
            {accentColor && stats && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-gray-100"
                  >
                    <div className={`text-2xl font-bold ${color}`}>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Features List */}
            <div className={`space-y-3 ${!accentColor ? 'mb-6' : ''}`}>
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: (accentColor ? 0.4 : 0.3) + idx * 0.1 }}
                  className={`flex items-center gap-3 ${accentColor ? 'bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3' : ''}`}
                >
                  {!accentColor ? (
                    <div className={`w-6 h-6 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
                      <CheckCircle2 className={`w-4 h-4 ${color}`} />
                    </div>
                  ) : (
                    <CheckCircle2 className={`w-5 h-5 ${color} flex-shrink-0`} />
                  )}
                  <span className="text-gray-700 text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats Row — below features for LocalServices */}
            {!accentColor && stats && (
              <div className="flex gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`text-2xl font-bold ${color}`}>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visual Side */}
          <div className={`p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center ${reversed ? 'lg:order-1' : ''}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={accentColor ? 'w-full max-w-sm' : 'relative w-full max-w-xs'}
            >
              {visual}
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }

  // --- Wide variant (ProfessionalServices) — 5-col split (3+2) ---
  if (variant === 'wide') {
    const isReversed = reversed

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100"
      >
        <div className={`grid lg:grid-cols-5 ${isReversed ? 'direction-rtl' : ''}`}>
          {/* Content Side - 3 columns */}
          <div className={`lg:col-span-3 p-8 lg:p-10 ${bgGradient} ${isReversed ? 'lg:order-2' : ''}`}>
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg relative`}
              >
                <Icon className={`w-8 h-8 ${color}`} />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${iconBg} shadow`}
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>

            {/* Features Grid — 2-column layout */}
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 20 : -20 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm"
                >
                  <CheckCircle2 className={`w-5 h-5 ${color} flex-shrink-0`} />
                  <span className="text-gray-700 text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="bg-white rounded-xl px-5 py-4 shadow-sm text-center"
                >
                  <div className={`text-2xl font-bold ${color}`}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual Side - 2 columns */}
          <div className={`lg:col-span-2 p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center ${isReversed ? 'lg:order-1' : ''}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              {visual}
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }

  return null
}

export default SectionCard
