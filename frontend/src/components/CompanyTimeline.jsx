import { motion } from 'framer-motion'
import { Lightbulb, Rocket, Users, Award, Sparkles } from 'lucide-react'
import { useState } from 'react'

const CompanyTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const milestones = [
    {
      year: '2023',
      icon: Lightbulb,
      title: 'The Idea',
      description: 'Founded with a vision to make AI accessible to every business'
    },
    {
      year: '2024',
      icon: Rocket,
      title: 'Launch',
      description: 'First AI receptionist deployed, handling 1,000+ calls'
    },
    {
      year: '2025',
      icon: Users,
      title: 'Growth',
      description: 'Expanded to serve 100+ businesses across industries'
    },
    {
      year: '2026',
      icon: Award,
      title: 'Recognition',
      description: 'Industry leader in AI-powered business communication'
    },
    {
      year: 'Future',
      icon: Sparkles,
      title: 'Innovation',
      description: 'Building the next generation of AI assistants'
    }
  ]

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100 overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
              'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(249, 115, 22, 0.05) 100%)',
              'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        />

        <div className="relative z-10">
          {/* Header - Removed for compactness, info is in About page header */}

          {/* Timeline */}
          <div className="space-y-4">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isActive = index === activeIndex
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  onHoverStart={() => setActiveIndex(index)}
                  className="relative"
                >
                  <div className="flex items-start gap-4 group">
                    {/* Timeline Line & Dot */}
                    <div className="relative flex flex-col items-center">
                      {/* Dot */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.2 : 1,
                          backgroundColor: isActive ? '#6366f1' : '#e5e7eb'
                        }}
                        className="relative w-5 h-5 rounded-full border-4 border-white shadow-lg z-10"
                      >
                        {isActive && (
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-indigo-500 rounded-full"
                          />
                        )}
                      </motion.div>
                      
                      {/* Vertical Line */}
                      {index < milestones.length - 1 && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                          className="w-0.5 bg-gradient-to-b from-gray-300 to-gray-200 absolute top-5"
                          style={{ height: 'calc(100% + 24px)' }}
                        />
                      )}
                    </div>

                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.01, x: 3 }}
                      className={`flex-1 rounded-xl p-4 border transition-all duration-300 ${
                        isActive 
                          ? 'border-blue-200 bg-blue-50/50 shadow-md' 
                          : 'border-gray-200 bg-white hover:border-blue-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <motion.div
                          animate={{
                            scale: isActive ? 1.05 : 1
                          }}
                          transition={{ duration: 0.4 }}
                          className={`w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 ${
                            isActive ? 'shadow-md' : ''
                          }`}
                        >
                          <Icon className="w-6 h-6 text-blue-600" />
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className={`text-xs font-bold uppercase tracking-wider ${
                              isActive ? 'text-blue-600' : 'text-gray-500'
                            }`}>
                              {milestone.year}
                            </span>
                          </div>
                          <h4 className={`text-lg font-bold mb-1.5 transition-colors ${
                            isActive ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {milestone.title}
                          </h4>
                          <p className={`text-sm leading-relaxed ${
                            isActive ? 'text-blue-700' : 'text-gray-600'
                          }`}>
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar - Removed for compactness */}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-2xl"
        />
      </motion.div>
    </div>
  )
}

export default CompanyTimeline
