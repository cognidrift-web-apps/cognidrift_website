import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const IndustryCard = ({ icon: Icon, title, description, features, isActive, iconBgColor, iconTextColor }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`group relative p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 cursor-pointer overflow-hidden transition-all duration-300 h-full flex flex-col ${isActive
        ? 'border-primary-600 bg-primary-50 shadow-xl'
        : 'border-neutral-border bg-white hover:border-primary-300 hover:shadow-xl'
      }`}
  >
    <div className={`absolute inset-0 bg-primary-50 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

    <motion.div
      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 mx-auto transition-shadow ${
        iconBgColor
          ? `${iconBgColor}`
          : isActive
            ? 'bg-primary-600 text-white shadow-lg'
            : 'bg-primary-50 text-primary-600 shadow-sm group-hover:shadow-md'
      }`}
      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${iconTextColor || ''}`} />

      <motion.div
        className="absolute inset-0 rounded-xl sm:rounded-2xl bg-primary-400 opacity-0 group-hover:opacity-20"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>

    <h3 className="relative text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-2 sm:mb-3 text-center group-hover:text-primary-600 transition-colors duration-300" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>

    <p className="relative text-sm sm:text-base text-text-secondary mb-4 sm:mb-5 leading-relaxed text-center">{description}</p>

    <ul className="relative space-y-2 sm:space-y-3 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary font-medium">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>

    <motion.div
      className="absolute top-0 right-0 w-20 h-20 bg-primary-500 opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-300"
    />
  </motion.div>
)

export default IndustryCard
