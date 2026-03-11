import { motion } from 'framer-motion'
import { Globe, MapPin, Clock, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

const GlobalAvailabilityMap = () => {
  const [activePulses, setActivePulses] = useState([])

  const locations = [
    { name: 'New York', x: '25%', y: '35%', timezone: 'EST', color: 'from-blue-500 to-blue-600' },
    { name: 'London', x: '48%', y: '30%', timezone: 'GMT', color: 'from-green-500 to-green-600' },
    { name: 'Tokyo', x: '85%', y: '40%', timezone: 'JST', color: 'from-purple-500 to-purple-600' },
    { name: 'Sydney', x: '88%', y: '75%', timezone: 'AEST', color: 'from-orange-500 to-orange-600' },
    { name: 'San Francisco', x: '15%', y: '42%', timezone: 'PST', color: 'from-pink-500 to-pink-600' },
    { name: 'Dubai', x: '62%', y: '45%', timezone: 'GST', color: 'from-yellow-500 to-yellow-600' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)]
      setActivePulses(prev => [...prev, { ...randomLocation, id: Date.now() }])
      
      setTimeout(() => {
        setActivePulses(prev => prev.slice(1))
      }, 3000)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-3xl shadow-2xl p-8 lg:p-10 border-2 border-blue-800 overflow-hidden"
        style={{ minHeight: '500px' }}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Animated gradient waves */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-4 border border-white/20"
            >
              <Globe className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-bold text-blue-200 uppercase tracking-wider">Global Coverage</span>
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7 Worldwide Support</h3>
            <p className="text-blue-200">Your AI receptionist works across all time zones</p>
          </div>

          {/* Map Container */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/10 p-8" style={{ height: '350px' }}>
            {/* World Map Representation */}
            <div className="relative w-full h-full">
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {locations.map((loc, i) => 
                  locations.slice(i + 1).map((target, j) => (
                    <motion.line
                      key={`${i}-${j}`}
                      x1={loc.x}
                      y1={loc.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="rgba(59, 130, 246, 0.2)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ duration: 2, delay: i * 0.2 }}
                    />
                  ))
                )}
              </svg>

              {/* Location Markers */}
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.15, type: 'spring' }}
                  className="absolute"
                  style={{ left: location.x, top: location.y, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Pulse effect */}
                  <motion.div
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className={`absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-br ${location.color} opacity-30 -translate-x-1/2 -translate-y-1/2`}
                    style={{ left: '50%', top: '50%' }}
                  />

                  {/* Location pin */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="relative z-10"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${location.color} flex items-center justify-center shadow-lg border-4 border-white/20 cursor-pointer`}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Location label */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute top-12 left-1/2 -translate-x-1/2 bg-white rounded-lg px-3 py-2 shadow-xl whitespace-nowrap"
                    >
                      <p className="text-xs font-bold text-gray-900">{location.name}</p>
                      <p className="text-xs text-gray-600">{location.timezone}</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Active Pulse Animations */}
              {activePulses.map((pulse) => (
                <motion.div
                  key={pulse.id}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  className={`absolute w-12 h-12 rounded-full bg-gradient-to-br ${pulse.color}`}
                  style={{ 
                    left: pulse.x, 
                    top: pulse.y,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 mx-auto mb-2"
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Globe className="w-10 h-10 text-blue-300" />
                </motion.div>
              </motion.div>
              <p className="text-2xl font-black text-white">6</p>
              <p className="text-xs text-blue-200 font-medium uppercase tracking-wide">Continents</p>
            </div>

            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 mx-auto mb-2"
              >
                <Clock className="w-10 h-10 text-green-300" />
              </motion.div>
              <p className="text-2xl font-black text-white">24/7</p>
              <p className="text-xs text-blue-200 font-medium uppercase tracking-wide">Always On</p>
            </div>

            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-10 h-10 mx-auto mb-2"
              >
                <Zap className="w-10 h-10 text-yellow-300" />
              </motion.div>
              <p className="text-2xl font-black text-white">&lt;100ms</p>
              <p className="text-xs text-blue-200 font-medium uppercase tracking-wide">Response</p>
            </div>
          </motion.div>

          {/* Bottom Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-blue-200">
              ✨ Powered by cloud infrastructure spanning <span className="font-bold text-white">multiple regions</span>
            </p>
          </motion.div>
        </div>

        {/* Corner decoration */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl"
        />
      </motion.div>
    </div>
  )
}

export default GlobalAvailabilityMap
