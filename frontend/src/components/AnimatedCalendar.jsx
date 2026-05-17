import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, User, Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import GlowCard from './ui/GlowCard'

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
        setAppointments(prev => [...prev.slice(-8), newAppt])
        setNewAppointment(null)
      }, 2000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getDayAppointments = (day) => {
    return appointments.filter(apt => apt.day === day)
  }

  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      {/* Main Calendar Container with Glow */}
      <GlowCard glowColor="blue" glowSize="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-white p-3 lg:p-4 overflow-hidden"
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
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                Smart Scheduling
              </h3>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2.5 mb-3 border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center text-gray-400">
                <ChevronLeft className="w-3.5 h-3.5" />
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-gray-900">{monthName} {year}</p>
                <p className="text-[10px] text-gray-500">{appointments.length} appointments</p>
              </div>

              <div className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center text-gray-400">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <div key={idx} className="text-center">
                <p className="text-[10px] font-bold text-gray-400">{day}</p>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-3">
            {/* Empty cells for days before month starts */}
            {[...Array(firstDay)].map((_, i) => (
              <div key={`empty-${i}`} className="h-8" />
            ))}

            {/* Actual days */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1
              const dayAppointments = getDayAppointments(day)
              const hasAppointments = dayAppointments.length > 0
              const isToday = day === 15

              return (
                <div key={day} className="relative h-8">
                  <div className={`w-full h-full rounded-md flex flex-col items-center justify-center transition-all duration-300 ${
                    isToday
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md'
                      : hasAppointments
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-50'
                  }`}>
                    <p className={`text-xs font-semibold ${isToday ? 'text-white' : hasAppointments ? 'text-gray-900' : 'text-gray-500'}`}>
                      {day}
                    </p>

                    {/* Appointment indicators */}
                    {hasAppointments && !isToday && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayAppointments.slice(0, 2).map((apt, idx) => (
                          <div
                            key={apt.id}
                            className={`w-1 h-1 rounded-full ${appointmentColors[apt.status].dot}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Upcoming Appointments List */}
          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-600 flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3 h-3 text-blue-600" />
              Today's Appointments
            </p>

            <div className="space-y-1.5 max-h-24 overflow-y-auto">
              <AnimatePresence>
                {/* New appointment animation */}
                {newAppointment && (
                  <motion.div
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-2 bg-green-50 rounded-md p-1.5 border border-green-200"
                  >
                    <Plus className="w-4 h-4 text-green-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                        {newAppointment.name}
                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">New!</span>
                      </p>
                      <p className="text-[10px] text-gray-500">{newAppointment.time}</p>
                    </div>
                  </motion.div>
                )}

                {appointments.filter(apt => apt.day === 15).map((apt, idx) => {
                  const colors = appointmentColors[apt.status]
                  return (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2 bg-white rounded-md p-1.5 border border-gray-200"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900">{apt.name}</p>
                        <p className="text-[10px] text-gray-500">{apt.time}</p>
                      </div>
                      {apt.status === 'confirmed' && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </motion.div>
      </GlowCard>
    </div>
  )
}

export default AnimatedCalendar
