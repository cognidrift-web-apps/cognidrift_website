import { motion } from 'framer-motion'
import { Building2, Users, Calendar, FileCheck, Clock, TrendingUp, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'

const ClientIntakeFlow = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [clients, setClients] = useState([
    { id: 1, name: 'Johnson & Partners', type: 'Legal Consultation', status: 'intake', time: '10:30 AM' },
    { id: 2, name: 'Tech Solutions Inc', type: 'Tax Planning', status: 'scheduled', time: '2:00 PM' },
    { id: 3, name: 'Global Ventures LLC', type: 'Business Advisory', status: 'documents', time: '4:30 PM' }
  ])

  const steps = [
    { 
      icon: Phone, 
      title: 'Initial Contact', 
      desc: 'Client calls or fills form',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Users, 
      title: 'Screening', 
      desc: 'AI qualifies & routes',
      color: 'from-cyan-500 to-cyan-600'
    },
    { 
      icon: FileCheck, 
      title: 'Documents', 
      desc: 'Request required files',
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: Calendar, 
      title: 'Schedule', 
      desc: 'Book consultation',
      color: 'from-teal-500 to-teal-600'
    }
  ]

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 2500)

    const clientInterval = setInterval(() => {
      const serviceTypes = ['Legal Consultation', 'Financial Advisory', 'Tax Planning', 'Business Strategy', 'Audit Services']
      const companies = ['Acme Corp', 'Vertex Holdings', 'Summit Group', 'Nexus Partners', 'Bright Future LLC']
      const statuses = ['intake', 'scheduled', 'documents']
      
      const newClient = {
        id: Date.now(),
        name: companies[Math.floor(Math.random() * companies.length)],
        type: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        time: `${Math.floor(Math.random() * 6) + 9}:${['00', '30'][Math.floor(Math.random() * 2)]} ${['AM', 'PM'][Math.floor(Math.random() * 2)]}`
      }
      setClients(prev => [newClient, ...prev].slice(0, 4))
    }, 4000)

    return () => {
      clearInterval(stepInterval)
      clearInterval(clientInterval)
    }
  }, [])

  const getStatusConfig = (status) => {
    switch(status) {
      case 'intake':
        return { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700', dotColor: 'bg-yellow-500' }
      case 'scheduled':
        return { label: 'Scheduled', color: 'bg-green-100 text-green-700', dotColor: 'bg-green-500' }
      case 'documents':
        return { label: 'Docs Pending', color: 'bg-blue-100 text-blue-700', dotColor: 'bg-blue-500' }
      default:
        return { label: status, color: 'bg-gray-100 text-gray-700', dotColor: 'bg-gray-500' }
    }
  }

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl shadow-2xl p-8 lg:p-10 border-2 border-slate-200 overflow-hidden"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(30, 58, 138, 0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(30, 58, 138, 0.8) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 bg-blue-100 px-5 py-2 rounded-full mb-4"
            >
              <Building2 className="w-4 h-4 text-blue-700" />
              <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">Professional Services</span>
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">Intelligent Client Intake</h3>
            <p className="text-gray-600 mt-2">Automated screening and scheduling for your practice</p>
          </div>

          {/* Process Pipeline */}
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
                          borderColor: isActive ? '#2563eb' : '#d1d5db'
                        }}
                        className="w-16 h-16 mx-auto rounded-2xl border-4 border-white shadow-lg flex items-center justify-center"
                      >
                        <motion.div
                          animate={{
                            scale: isActive ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
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

                      {/* Active Pulse */}
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

          {/* Active Clients */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-200">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Active Client Intakes
              </h4>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold"
              >
                Live Processing
              </motion.div>
            </div>

            <div className="space-y-3">
              {clients.map((client, index) => {
                const statusConfig = getStatusConfig(client.status)
                return (
                  <motion.div
                    key={client.id}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-4 border-2 border-blue-100 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">{client.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{client.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900 mb-1">{client.time}</p>
                        <motion.div
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${statusConfig.color}`}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`w-1.5 h-1.5 ${statusConfig.dotColor} rounded-full`}
                          />
                          {statusConfig.label}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 grid grid-cols-3 gap-4"
          >
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-slate-100 text-center">
              <div className="text-2xl font-black text-blue-600">60%</div>
              <div className="text-xs text-gray-600 mt-1">Cost Reduction</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-slate-100 text-center">
              <div className="text-2xl font-black text-cyan-600">24/7</div>
              <div className="text-xs text-gray-600 mt-1">Availability</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-slate-100 text-center">
              <div className="text-2xl font-black text-green-600">100%</div>
              <div className="text-xs text-gray-600 mt-1">Lead Capture</div>
            </div>
          </motion.div>
        </div>

        {/* Floating Decoration */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 12, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-2xl"
        />
      </motion.div>
    </div>
  )
}

export default ClientIntakeFlow
