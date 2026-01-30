import { motion, AnimatePresence } from 'framer-motion'
import { Users, MessageSquare, Clock, CheckCircle, Phone, Mail, Headphones } from 'lucide-react'
import { useState, useEffect } from 'react'

const LiveSupportVisualization = () => {
  const [activeAgents, setActiveAgents] = useState([
    { id: 1, name: 'Sarah', status: 'Available', avatar: 'S', color: 'from-green-500 to-green-600' },
    { id: 2, name: 'Michael', status: 'Available', avatar: 'M', color: 'from-blue-500 to-blue-600' },
    { id: 3, name: 'Emma', status: 'On Call', avatar: 'E', color: 'from-orange-500 to-orange-600' },
    { id: 4, name: 'Alex', status: 'Available', avatar: 'A', color: 'from-purple-500 to-purple-600' }
  ])

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'call', message: 'Sarah answered a call', time: '2 min ago', icon: Phone },
    { id: 2, type: 'email', message: 'Michael responded to email', time: '5 min ago', icon: Mail },
    { id: 3, type: 'resolved', message: 'Emma resolved a ticket', time: '8 min ago', icon: CheckCircle }
  ])

  const [stats, setStats] = useState({
    avgResponseTime: '< 2 min',
    activeChats: 12,
    todayResolved: 47
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate agent status changes
      setActiveAgents(prev => 
        prev.map(agent => ({
          ...agent,
          status: Math.random() > 0.7 ? 'On Call' : 'Available'
        }))
      )

      // Update stats
      setStats(prev => ({
        ...prev,
        activeChats: Math.floor(Math.random() * 5) + 10,
        todayResolved: prev.todayResolved + Math.floor(Math.random() * 2)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
              'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
              'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
              'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Live Support</span>
              </motion.div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Team is Ready</h3>
              <p className="text-gray-600 mt-1">Real humans, ready to help 24/7</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border-2 border-blue-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold text-blue-600 uppercase">Response</span>
              </div>
              <motion.div
                key={stats.avgResponseTime}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-black text-blue-900"
              >
                {stats.avgResponseTime}
              </motion.div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border-2 border-green-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <span className="text-xs font-bold text-green-600 uppercase">Active</span>
              </div>
              <motion.div
                key={stats.activeChats}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-black text-green-900"
              >
                {stats.activeChats}
              </motion.div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 border-2 border-purple-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="text-xs font-bold text-purple-600 uppercase">Today</span>
              </div>
              <motion.div
                key={stats.todayResolved}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-black text-purple-900"
              >
                {stats.todayResolved}
              </motion.div>
            </motion.div>
          </div>

          {/* Support Agents */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Available Support Team
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {activeAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, x: 5 }}
                  className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-md`}>
                      <span className="text-lg font-bold text-white">{agent.avatar}</span>
                      <motion.div
                        animate={{
                          scale: agent.status === 'Available' ? [1, 1.3, 1] : 1,
                          opacity: agent.status === 'Available' ? [1, 0, 1] : 0
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-xl bg-green-400 opacity-30"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">{agent.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <motion.div
                          animate={{
                            scale: agent.status === 'Available' ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className={`w-2 h-2 rounded-full ${
                            agent.status === 'Available' ? 'bg-green-500' : 'bg-orange-500'
                          }`}
                        />
                        <span className={`text-xs font-semibold ${
                          agent.status === 'Available' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {agent.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-purple-600" />
              Recent Activity
            </h4>
            <div className="space-y-3">
              <AnimatePresence>
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.15 }}
                    className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 text-center"
          >
            <p className="text-sm font-bold text-gray-900 mb-2">Need immediate assistance?</p>
            <p className="text-xs text-gray-600 mb-4">Our team is standing by to help you get started</p>
            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-md hover:bg-blue-700 transition-colors"
              >
                Start Chat
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                Call Now
              </motion.button>
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
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-10 blur-2xl"
        />
      </motion.div>
    </div>
  )
}

export default LiveSupportVisualization
