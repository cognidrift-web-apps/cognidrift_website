import { motion } from 'framer-motion'
import { Calendar, User, Clock, CheckCircle, Phone, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

const PatientAppointmentFlow = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [appointments, setAppointments] = useState([])

  const steps = [
    { 
      icon: Phone, 
      title: 'Patient Calls', 
      desc: 'AI answers instantly',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Calendar, 
      title: 'Checks Availability', 
      desc: 'Real-time calendar sync',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: User, 
      title: 'Verifies Insurance', 
      desc: 'Automated verification',
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: CheckCircle, 
      title: 'Confirms Booking', 
      desc: 'Sends confirmation',
      color: 'from-teal-500 to-teal-600'
    }
  ]

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 2500)

    const appointmentInterval = setInterval(() => {
      const newAppointment = {
        id: Date.now(),
        patient: ['John Smith', 'Mary Johnson', 'Robert Davis', 'Sarah Wilson'][Math.floor(Math.random() * 4)],
        type: ['Check-up', 'Follow-up', 'Consultation', 'Lab Results'][Math.floor(Math.random() * 4)],
        time: `${Math.floor(Math.random() * 4) + 9}:${['00', '30'][Math.floor(Math.random() * 2)]} ${['AM', 'PM'][Math.floor(Math.random() * 2)]}`
      }
      setAppointments(prev => [newAppointment, ...prev].slice(0, 3))
    }, 4000)

    return () => {
      clearInterval(stepInterval)
      clearInterval(appointmentInterval)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border-2 border-blue-100 overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
              'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(34, 197, 94, 0.05) 100%)',
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
              className="inline-flex items-center gap-2 bg-blue-50 px-5 py-2 rounded-full mb-4"
            >
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">HIPAA Compliant</span>
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">Automated Patient Scheduling</h3>
            <p className="text-gray-600 mt-2">Watch AI handle the entire booking process</p>
          </div>

          {/* Process Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between gap-2 mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isPassed = index < currentStep

                return (
                  <div key={index} className="flex-1 relative">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1
                      }}
                      className="relative"
                    >
                      {/* Step Circle */}
                      <motion.div
                        animate={{
                          backgroundColor: isActive || isPassed ? '#3b82f6' : '#e5e7eb',
                          borderColor: isActive ? '#3b82f6' : '#d1d5db'
                        }}
                        className="w-16 h-16 mx-auto rounded-2xl border-4 border-white shadow-lg flex items-center justify-center"
                      >
                        <motion.div
                          animate={{
                            rotate: isActive ? [0, 360] : 0
                          }}
                          transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: 'linear' }}
                        >
                          <Icon className={`w-7 h-7 ${isActive || isPassed ? 'text-white' : 'text-gray-400'}`} />
                        </motion.div>
                      </motion.div>

                      {/* Label */}
                      <div className="mt-3 text-center">
                        <p className={`text-xs font-bold ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
                      </div>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-400 rounded-2xl"
                        />
                      )}
                    </motion.div>

                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isPassed ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-1 bg-gradient-to-r ${step.color} origin-left`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Recently Scheduled
              </h4>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold"
              >
                Live
              </motion.div>
            </div>

            <div className="space-y-3">
              {appointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  Waiting for appointments...
                </div>
              ) : (
                appointments.map((apt) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-xl p-4 shadow-md border-2 border-green-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{apt.patient}</p>
                          <p className="text-xs text-gray-600">{apt.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-blue-600">{apt.time}</p>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold mt-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Confirmed
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 grid grid-cols-3 gap-4 text-center"
          >
            <div>
              <div className="text-2xl font-black text-blue-600">35%</div>
              <div className="text-xs text-gray-600">No-show Reduction</div>
            </div>
            <div>
              <div className="text-2xl font-black text-purple-600">24/7</div>
              <div className="text-xs text-gray-600">Availability</div>
            </div>
            <div>
              <div className="text-2xl font-black text-green-600">100%</div>
              <div className="text-xs text-gray-600">HIPAA Compliant</div>
            </div>
          </motion.div>
        </div>

        {/* Floating Medical Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-2xl"
        />
      </motion.div>
    </div>
  )
}

export default PatientAppointmentFlow
