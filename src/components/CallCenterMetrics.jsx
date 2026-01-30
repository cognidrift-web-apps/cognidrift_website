import { motion, AnimatePresence } from 'framer-motion'
import { Phone, TrendingUp, Users, Clock, CheckCircle, BarChart3, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

const CallCenterMetrics = () => {
  const [metrics, setMetrics] = useState({
    callsHandled: 1247,
    activeCalls: 18,
    avgWaitTime: '0s',
    satisfaction: 98
  })

  const [recentCalls, setRecentCalls] = useState([
    { id: 1, caller: 'Customer #1234', status: 'completed', duration: '2:34', agent: 'AI Agent 1' },
    { id: 2, caller: 'Customer #1235', status: 'active', duration: '0:45', agent: 'AI Agent 2' },
    { id: 3, caller: 'Customer #1236', status: 'completed', duration: '1:52', agent: 'AI Agent 3' }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        callsHandled: prev.callsHandled + Math.floor(Math.random() * 3),
        activeCalls: Math.max(10, Math.min(25, prev.activeCalls + (Math.random() > 0.5 ? 1 : -1))),
        avgWaitTime: '0s',
        satisfaction: Math.min(100, prev.satisfaction + (Math.random() > 0.8 ? 1 : 0))
      }))

      // Add new call
      const newCall = {
        id: Date.now(),
        caller: `Customer #${1234 + Math.floor(Math.random() * 1000)}`,
        status: Math.random() > 0.3 ? 'completed' : 'active',
        duration: `${Math.floor(Math.random() * 3)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        agent: `AI Agent ${Math.floor(Math.random() * 10) + 1}`
      }
      setRecentCalls(prev => [newCall, ...prev].slice(0, 4))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 rounded-3xl shadow-2xl p-8 lg:p-10 border-2 border-blue-800 overflow-hidden"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-sm font-bold text-green-300 uppercase tracking-wider">Real-Time</span>
              </motion.div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white">Call Center Dashboard</h3>
              <p className="text-blue-200 mt-1">Live performance metrics</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-blue-300" />
                <span className="text-xs font-bold text-blue-300 uppercase">Calls Handled</span>
              </div>
              <motion.div
                key={metrics.callsHandled}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black text-white"
              >
                {metrics.callsHandled}
              </motion.div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400 font-semibold">+12% today</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-cyan-300" />
                <span className="text-xs font-bold text-cyan-300 uppercase">Active Calls</span>
              </div>
              <motion.div
                key={metrics.activeCalls}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black text-white"
              >
                {metrics.activeCalls}
              </motion.div>
              <div className="flex items-center gap-1 mt-1">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                />
                <span className="text-xs text-cyan-300 font-semibold">Live now</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-green-300" />
                <span className="text-xs font-bold text-green-300 uppercase">Avg Wait</span>
              </div>
              <div className="text-3xl font-black text-white">
                {metrics.avgWaitTime}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Zap className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400 font-semibold">Instant</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-5 h-5 text-yellow-300" />
                <span className="text-xs font-bold text-yellow-300 uppercase">Satisfaction</span>
              </div>
              <motion.div
                key={metrics.satisfaction}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black text-white"
              >
                {metrics.satisfaction}%
              </motion.div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-yellow-400 font-semibold">Excellent</span>
              </div>
            </motion.div>
          </div>

          {/* Live Call Feed */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-4 h-4 text-yellow-400" />
              </motion.div>
              Recent Call Activity
            </h4>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {recentCalls.map((call, index) => (
                  <motion.div
                    key={call.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          call.status === 'active' 
                            ? 'bg-gradient-to-br from-green-500 to-green-600' 
                            : 'bg-gradient-to-br from-blue-500 to-blue-600'
                        }`}>
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{call.caller}</p>
                          <p className="text-xs text-blue-200">{call.agent}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{call.duration}</p>
                        <motion.div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                            call.status === 'active'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}
                        >
                          {call.status === 'active' && (
                            <motion.div
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-1.5 h-1.5 bg-green-400 rounded-full"
                            />
                          )}
                          {call.status === 'active' ? 'In Progress' : 'Completed'}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 grid grid-cols-3 gap-4 text-center"
          >
            <div className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl font-black text-white">80%</div>
              <div className="text-xs text-blue-200">Cost Reduction</div>
            </div>
            <div className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl font-black text-white">10x</div>
              <div className="text-xs text-blue-200">Call Capacity</div>
            </div>
            <div className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl font-black text-white">0s</div>
              <div className="text-xs text-blue-200">Wait Time</div>
            </div>
          </motion.div>
        </div>

        {/* Ambient animations */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"
        />
      </motion.div>
    </div>
  )
}

export default CallCenterMetrics
