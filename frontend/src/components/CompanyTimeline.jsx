import { motion } from 'framer-motion'
import { Lightbulb, Rocket, Users, Award, Sparkles, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const CompanyTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const milestones = [
    {
      year: '2023',
      icon: Lightbulb,
      title: 'The Idea',
      description: 'Founded with a vision to make AI accessible to every business',
      color: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      year: '2024',
      icon: Rocket,
      title: 'Launch',
      description: 'First AI receptionist deployed, handling 1,000+ calls',
      color: 'from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      year: '2025',
      icon: Users,
      title: 'Growth',
      description: 'Expanded to serve 100+ businesses across industries',
      color: 'from-green-500 to-green-600',
      lightBg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      year: '2026',
      icon: Award,
      title: 'Recognition',
      description: 'Industry leader in AI-powered business communication',
      color: 'from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      year: 'Future',
      icon: Sparkles,
      title: 'Innovation',
      description: 'Building the next generation of AI assistants',
      color: 'from-indigo-500 to-indigo-600',
      lightBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    }
  ]

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border-2 border-gray-100 overflow-hidden"
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
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-5 py-2 rounded-full mb-4"
            >
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Our Journey</span>
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">Company Timeline</h3>
            <p className="text-gray-600 mt-2">From idea to industry leader</p>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
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
                  <div className="flex items-start gap-6 group cursor-pointer">
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
                      whileHover={{ scale: 1.02, x: 5 }}
                      className={`flex-1 rounded-2xl p-6 border-2 transition-all duration-300 ${
                        isActive 
                          ? 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg' 
                          : 'border-gray-200 bg-white hover:border-indigo-100'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <motion.div
                          animate={{
                            rotate: isActive ? [0, 360] : 0,
                            scale: isActive ? 1.1 : 1
                          }}
                          transition={{ duration: 0.6 }}
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-md flex-shrink-0`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-black uppercase tracking-wider ${
                              isActive ? 'text-indigo-600' : 'text-gray-500'
                            }`}>
                              {milestone.year}
                            </span>
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-bold"
                              >
                                Active
                              </motion.div>
                            )}
                          </div>
                          <h4 className={`text-xl font-bold mb-2 transition-colors ${
                            isActive ? 'text-indigo-900' : 'text-gray-900'
                          }`}>
                            {milestone.title}
                          </h4>
                          <p className={`text-sm leading-relaxed ${
                            isActive ? 'text-indigo-700' : 'text-gray-600'
                          }`}>
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {isActive && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className={`h-1 mt-4 rounded-full bg-gradient-to-r ${milestone.color}`}
                        />
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Summary Stats at Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-10 pt-8 border-t-2 border-gray-100"
          >
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-indigo-600 mb-1">3+</div>
                <div className="text-sm text-gray-600 font-medium">Years</div>
              </div>
              <div>
                <div className="text-3xl font-black text-purple-600 mb-1">100+</div>
                <div className="text-sm text-gray-600 font-medium">Clients</div>
              </div>
              <div>
                <div className="text-3xl font-black text-orange-600 mb-1">10k+</div>
                <div className="text-sm text-gray-600 font-medium">Calls</div>
              </div>
            </div>
          </motion.div>
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
