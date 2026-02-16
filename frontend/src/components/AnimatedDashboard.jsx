import { motion } from 'framer-motion'
import { TrendingUp, Phone, Clock, Users, CheckCircle, Activity } from 'lucide-react'
import { useEffect, useState } from 'react'
import GlowCard from './ui/GlowCard'

const AnimatedDashboard = () => {
  const [callCount, setCallCount] = useState(847)
  const [activeUsers, setActiveUsers] = useState(23)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCallCount(prev => prev + Math.floor(Math.random() * 3))
      setActiveUsers(prev => Math.min(prev + Math.floor(Math.random() * 2), 30))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Main Dashboard Container with Glow */}
      <GlowCard glowColor="purple" glowSize="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-white p-4 lg:p-5 overflow-hidden"
        >
        {/* Animated Background Gradient */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
              'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
              'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-0.5">Live Analytics</h3>
              <p className="text-xs text-gray-500">Real-time performance metrics</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full"
            >
              <Activity className="w-4 h-4" />
              <span className="text-sm font-bold">Live</span>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Calls Handled */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border-2 border-blue-100"
            >
              <div className="flex items-center justify-between mb-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
              </div>
              <motion.div
                key={callCount}
                initial={{ scale: 1.2, color: '#3b82f6' }}
                animate={{ scale: 1, color: '#1e40af' }}
                className="text-2xl lg:text-3xl font-black text-blue-900 mb-0.5"
              >
                {callCount}
              </motion.div>
              <p className="text-[10px] text-blue-600 font-semibold">Calls Handled</p>
            </motion.div>

            {/* Active Now */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border-2 border-purple-100"
            >
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              </div>
              <motion.div
                key={activeUsers}
                initial={{ scale: 1.2, color: '#a855f7' }}
                animate={{ scale: 1, color: '#7e22ce' }}
                className="text-2xl lg:text-3xl font-black text-purple-900 mb-0.5"
              >
                {activeUsers}
              </motion.div>
              <p className="text-[10px] text-purple-600 font-semibold">Active Now</p>
            </motion.div>
          </div>

          {/* Chart Visualization */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border-2 border-gray-100 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-700">Call Volume Today</p>
              <span className="text-[10px] text-green-600 font-semibold">+24%</span>
            </div>

            {/* Animated Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-20">
              {[65, 45, 80, 55, 90, 70, 95].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: 'easeOut' }}
                  className="flex-1 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg relative group cursor-pointer"
                  whileHover={{ scale: 1.05, backgroundColor: '#4f46e5' }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: -8 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                  >
                    {Math.floor(height * 1.2)} calls
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-700 mb-2">Recent Activity</p>
            {[
              { icon: CheckCircle, color: 'green', text: 'Appointment scheduled', time: '2m ago' },
              { icon: Phone, color: 'blue', text: 'Call transferred to Dr. Smith', time: '5m ago' },
              { icon: Clock, color: 'orange', text: 'Reminder sent to patient', time: '8m ago' }
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.2 }}
                className="flex items-center gap-2.5 bg-white rounded-lg p-2.5 border border-gray-200"
              >
                <div className={`w-8 h-8 rounded-lg bg-${activity.color}-50 flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-4 h-4 text-${activity.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">{activity.text}</p>
                  <p className="text-[10px] text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
      </GlowCard>
    </div>
  )
}

export default AnimatedDashboard
