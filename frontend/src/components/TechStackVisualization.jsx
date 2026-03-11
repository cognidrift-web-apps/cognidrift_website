import { motion } from 'framer-motion'
import { Brain, Shield, Zap, Cloud, Lock, BarChart3, Code, Cpu } from 'lucide-react'
import { useState } from 'react'

const TechStackVisualization = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const techStack = [
    {
      category: 'AI & ML',
      icon: Brain,
      technologies: ['GPT-4', 'Neural Networks', 'NLP', 'Speech Recognition'],
      color: 'from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      position: { top: '20%', left: '15%' }
    },
    {
      category: 'Security',
      icon: Shield,
      technologies: ['AES-256', 'HIPAA Compliant', 'SOC 2', 'End-to-End Encryption'],
      color: 'from-green-500 to-green-600',
      lightBg: 'bg-green-50',
      position: { top: '20%', right: '15%' }
    },
    {
      category: 'Infrastructure',
      icon: Cloud,
      technologies: ['AWS', 'Kubernetes', 'Docker', 'CDN'],
      color: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      position: { bottom: '25%', left: '15%' }
    },
    {
      category: 'Performance',
      icon: Zap,
      technologies: ['Redis Cache', 'Load Balancing', '99.9% Uptime', 'Auto-scaling'],
      color: 'from-yellow-500 to-yellow-600',
      lightBg: 'bg-yellow-50',
      position: { bottom: '25%', right: '15%' }
    }
  ]

  const centerFeatures = [
    { icon: Lock, label: 'Secure' },
    { icon: BarChart3, label: 'Scalable' },
    { icon: Code, label: 'Modern' },
    { icon: Cpu, label: 'Fast' }
  ]

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-8 lg:p-10 border-2 border-gray-100 overflow-hidden"
        style={{ minHeight: '600px' }}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-2 rounded-full mb-4"
            >
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Technology</span>
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Tech Stack</h3>
            <p className="text-gray-600 mt-2">Enterprise-grade technology powering every interaction</p>
          </div>

          {/* Center Core */}
          <div className="relative" style={{ height: '400px' }}>
            {/* Central Hub */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl"
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="text-center"
                  >
                    <Brain className="w-10 h-10 text-indigo-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-gray-900">CogniDrift</div>
                    <div className="text-xs text-gray-500">Core AI</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Orbiting Features */}
              {centerFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: [0, 360],
                    x: Math.cos((i * Math.PI * 2) / 4) * 80,
                    y: Math.sin((i * Math.PI * 2) / 4) * 80
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    x: { duration: 0 },
                    y: { duration: 0 }
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 rounded-full bg-white shadow-lg border-2 border-indigo-200 flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                  >
                    <feature.icon className="w-5 h-5 text-indigo-600" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tech Stack Nodes */}
            {techStack.map((tech, index) => {
              const Icon = tech.icon
              const isHovered = hoveredIndex === index

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                  className="absolute"
                  style={tech.position}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Connection Line to Center */}
                  <motion.svg
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{ width: '400px', height: '400px', marginLeft: '-200px', marginTop: '-200px' }}
                  >
                    <motion.line
                      x1="50%"
                      y1="50%"
                      x2="200"
                      y2="200"
                      stroke={isHovered ? '#6366f1' : '#e5e7eb'}
                      strokeWidth={isHovered ? '3' : '2'}
                      strokeDasharray="5,5"
                      animate={{
                        strokeDashoffset: [0, -10]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  </motion.svg>

                  {/* Tech Card */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`relative bg-white rounded-2xl p-5 shadow-xl border-2 transition-all duration-300 ${
                      isHovered ? 'border-indigo-300 shadow-2xl' : 'border-gray-200'
                    }`}
                    style={{ width: '200px' }}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-3 shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Category */}
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{tech.category}</h4>

                    {/* Technologies */}
                    <div className="space-y-2">
                      {tech.technologies.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + index * 0.15 + i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                          <span className="text-xs text-gray-600 font-medium">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Hover Glow */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`absolute -inset-1 bg-gradient-to-br ${tech.color} opacity-20 rounded-2xl blur-xl -z-10`}
                      />
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-16 grid grid-cols-4 gap-6 text-center"
          >
            {[
              { value: '99.9%', label: 'Uptime' },
              { value: '<100ms', label: 'Latency' },
              { value: '256-bit', label: 'Encryption' },
              { value: 'SOC 2', label: 'Certified' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-black text-indigo-600 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Ambient Animations */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2
            }}
            className="absolute w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default TechStackVisualization
