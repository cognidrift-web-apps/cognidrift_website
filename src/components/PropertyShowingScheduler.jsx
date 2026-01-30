import { motion } from 'framer-motion'
import { Home, MapPin, Calendar, Phone, TrendingUp, Clock, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

const PropertyShowingScheduler = () => {
  const [properties, setProperties] = useState([
    { id: 1, address: '123 Oak Street', time: '2:00 PM', status: 'upcoming', lead: 'Sarah M.', price: '$450K' },
    { id: 2, address: '456 Pine Ave', time: '3:30 PM', status: 'confirmed', lead: 'John D.', price: '$675K' },
    { id: 3, address: '789 Maple Dr', time: '5:00 PM', status: 'upcoming', lead: 'Emily R.', price: '$525K' }
  ])

  const [stats, setStats] = useState({
    leadsToday: 18,
    showingsScheduled: 12,
    responseTime: '<1 min',
    attendanceRate: 92
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats
      setStats(prev => ({
        leadsToday: prev.leadsToday + Math.floor(Math.random() * 2),
        showingsScheduled: prev.showingsScheduled + (Math.random() > 0.7 ? 1 : 0),
        responseTime: '<1 min',
        attendanceRate: Math.min(100, prev.attendanceRate + (Math.random() > 0.9 ? 1 : 0))
      }))

      // Add new showing
      const newShowing = {
        id: Date.now(),
        address: ['234 Cedar Ln', '567 Birch St', '890 Elm Ct', '123 Willow Way'][Math.floor(Math.random() * 4)],
        time: `${Math.floor(Math.random() * 4) + 2}:${['00', '30'][Math.floor(Math.random() * 2)]} PM`,
        status: Math.random() > 0.5 ? 'confirmed' : 'upcoming',
        lead: ['Mike S.', 'Jennifer L.', 'David K.', 'Amanda P.'][Math.floor(Math.random() * 4)],
        price: `$${Math.floor(Math.random() * 500 + 300)}K`
      }
      setProperties(prev => [newShowing, ...prev].slice(0, 4))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 lg:p-10 border-2 border-blue-200 overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 right-0 w-96 h-96 opacity-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl" />
        </motion.div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 bg-blue-600 px-5 py-2 rounded-full mb-4"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <span className="text-sm font-bold text-white uppercase tracking-wider">Live Bookings</span>
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">Smart Property Showings</h3>
            <p className="text-gray-600 mt-2">AI-powered lead qualification and scheduling</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-5 shadow-lg border-2 border-blue-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-gray-600 uppercase">Leads Today</span>
              </div>
              <motion.div
                key={stats.leadsToday}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black text-blue-600"
              >
                {stats.leadsToday}
              </motion.div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600 font-semibold">+25%</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-gray-600 uppercase">Scheduled</span>
              </div>
              <motion.div
                key={stats.showingsScheduled}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black text-purple-600"
              >
                {stats.showingsScheduled}
              </motion.div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600 font-semibold">+40%</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-5 shadow-lg border-2 border-green-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-gray-600 uppercase">Response</span>
              </div>
              <div className="text-3xl font-black text-green-600">
                {stats.responseTime}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs text-gray-600 font-semibold">Instant</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-5 shadow-lg border-2 border-pink-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-pink-600" />
                <span className="text-xs font-bold text-gray-600 uppercase">Attendance</span>
              </div>
              <motion.div
                key={stats.attendanceRate}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black text-pink-600"
              >
                {stats.attendanceRate}%
              </motion.div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600 font-semibold">+15%</span>
              </div>
            </motion.div>
          </div>

          {/* Property Showings List */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-600" />
                Today's Showings
              </h4>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold"
              >
                Auto-Scheduling
              </motion.div>
            </div>

            <div className="space-y-3">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-100 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{property.address}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-600 font-semibold">{property.lead}</span>
                          <span className="text-xs text-blue-600 font-bold">{property.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{property.time}</p>
                      <motion.div
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold mt-1 ${
                          property.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {property.status === 'confirmed' ? (
                          <>
                            <motion.div
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-1.5 h-1.5 bg-green-500 rounded-full"
                            />
                            Confirmed
                          </>
                        ) : (
                          'Pending'
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 grid grid-cols-3 gap-4 text-center"
          >
            <div className="p-3 bg-white rounded-xl shadow-md border-2 border-gray-100">
              <div className="text-2xl font-black text-blue-600">100%</div>
              <div className="text-xs text-gray-600">Lead Capture</div>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-md border-2 border-gray-100">
              <div className="text-2xl font-black text-purple-600">40%</div>
              <div className="text-xs text-gray-600">More Showings</div>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-md border-2 border-gray-100">
              <div className="text-2xl font-black text-green-600">24/7</div>
              <div className="text-xs text-gray-600">Availability</div>
            </div>
          </motion.div>
        </div>

        {/* Floating Ambient Elements */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl"
        />
      </motion.div>
    </div>
  )
}

export default PropertyShowingScheduler
