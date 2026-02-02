import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, User, Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'

const AnimatedCalendar = () => {
  const [currentDate] = useState(new Date())
  const [appointments, setAppointments] = useState([
    { id: 1, time: '9:00 AM', name: 'John Doe', status: 'confirmed', day: 15 },
    { id: 2, time: '11:30 AM', name: 'Sarah Smith', status: 'confirmed', day: 15 },
    { id: 3, time: '2:00 PM', name: 'Mike Johnson', status: 'pending', day: 18 }
  ])
  const [newAppointment, setNewAppointment] = useState(null)

  const daysInMonth = 30
  const firstDay = 2 // Monday
  const monthName = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()

  const appointmentColors = {
    confirmed: { bg: 'from-green-500 to-emerald-600', light: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
    pending: { bg: 'from-orange-500 to-amber-600', light: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-500' }
  }

  useEffect(() => {
    // Simulate new appointments being booked
    const interval = setInterval(() => {
      const newAppt = {
        id: Date.now(),
        time: `${Math.floor(Math.random() * 4) + 9}:${['00', '30'][Math.floor(Math.random() * 2)]} AM`,
        name: ['Emma Wilson', 'Alex Brown', 'Lisa Chen', 'Tom Davis'][Math.floor(Math.random() * 4)],
        status: 'confirmed',
        day: Math.floor(Math.random() * 15) + 15
      }
      
      setNewAppointment(newAppt)
      
      setTimeout(() => {
        setAppointments(prev => [...prev, newAppt])
        setNewAppointment(null)
      }, 2000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getDayAppointments = (day) => {
    return appointments.filter(apt => apt.day === day)
  }

  return (
    <div className="relative w-full h-full">
      {/* Main Calendar Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border-2 border-gray-100 overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
              'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
              'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                Smart Scheduling
              </h3>
              <p className="text-sm text-gray-500 mt-1 ml-15">Appointments auto-booked by AI</p>
            </div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-xl"
            />
          </div>

          {/* Calendar Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 mb-6 border-2 border-blue-100">
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-blue-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">{monthName} {year}</p>
                <p className="text-sm text-gray-600 mt-1">{appointments.length} appointments scheduled</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: 3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-blue-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center">
                <p className="text-xs font-bold text-gray-500 uppercase">{day}</p>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {/* Empty cells for days before month starts */}
            {[...Array(firstDay)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {/* Actual days */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1
              const dayAppointments = getDayAppointments(day)
              const hasAppointments = dayAppointments.length > 0
              const isToday = day === 15

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  className="relative aspect-square"
                >
                  <div className={`w-full h-full rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    isToday 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-600 text-white shadow-lg' 
                      : hasAppointments
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}>
                    <p className={`text-sm font-bold ${isToday ? 'text-white' : hasAppointments ? 'text-gray-900' : 'text-gray-600'}`}>
                      {day}
                    </p>
                    
                    {/* Appointment indicators */}
                    {hasAppointments && (
                      <div className="flex gap-1 mt-1">
                        {dayAppointments.slice(0, 3).map((apt, idx) => (
                          <motion.div
                            key={apt.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`w-1.5 h-1.5 rounded-full ${appointmentColors[apt.status].dot}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Upcoming Appointments List */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Today's Appointments
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-blue-600 text-sm font-semibold hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add
              </motion.button>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto">
              <AnimatePresence>
                {/* New appointment animation */}
                {newAppointment && (
                  <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        background: [
                          'linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.3) 50%, rgba(34, 197, 94, 0.1) 100%)'
                        ]
                      }}
                      className="absolute inset-0"
                    />
                    <div className="relative flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-green-300 shadow-lg">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          {newAppointment.name}
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full"
                          >
                            New!
                          </motion.span>
                        </p>
                        <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {newAppointment.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {appointments.filter(apt => apt.day === 15).map((apt, idx) => {
                  const colors = appointmentColors[apt.status]
                  return (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-md`}>
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">{apt.name}</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {apt.time}
                        </p>
                      </div>
                      {apt.status === 'confirmed' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"
                        >
                          <Check className="w-5 h-5 text-green-600" />
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-10 blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 blur-2xl"
        />
      </motion.div>
    </div>
  )
}

export default AnimatedCalendar
