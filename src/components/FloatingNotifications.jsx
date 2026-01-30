import { motion, AnimatePresence } from 'framer-motion'
import { Phone, CheckCircle, Clock, Calendar, MessageSquare, Bell, TrendingUp, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

const FloatingNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [notificationId, setNotificationId] = useState(0)

  const notificationTypes = [
    {
      icon: Phone,
      title: 'Call Answered',
      message: 'John Smith - Appointment inquiry',
      color: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      avatar: 'JS'
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduled',
      message: 'Sarah Johnson - Tuesday 2:00 PM',
      color: 'from-green-500 to-green-600',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600',
      avatar: 'SJ'
    },
    {
      icon: MessageSquare,
      title: 'Message Received',
      message: 'Mike Davis - Insurance verification',
      color: 'from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
      avatar: 'MD'
    },
    {
      icon: CheckCircle,
      title: 'Reminder Sent',
      message: 'Emma Wilson - Appointment tomorrow',
      color: 'from-teal-500 to-teal-600',
      lightBg: 'bg-teal-50',
      textColor: 'text-teal-600',
      avatar: 'EW'
    },
    {
      icon: TrendingUp,
      title: 'Lead Qualified',
      message: 'Alex Brown - High priority prospect',
      color: 'from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600',
      avatar: 'AB'
    },
    {
      icon: Star,
      title: 'Positive Feedback',
      message: 'Lisa Chen rated service 5 stars',
      color: 'from-yellow-500 to-yellow-600',
      lightBg: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      avatar: 'LC'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
      const newNotification = {
        id: notificationId,
        ...randomNotification,
        timestamp: 'Just now'
      }

      setNotifications(prev => [newNotification, ...prev].slice(0, 3))
      setNotificationId(prev => prev + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [notificationId])

  return (
    <div className="fixed top-24 right-8 z-50 space-y-4 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 400, scale: 0.8 }}
            animate={{ 
              opacity: 1 - (index * 0.15), 
              x: 0, 
              scale: 1 - (index * 0.05),
              y: index * 10
            }}
            exit={{ opacity: 0, x: 400, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="pointer-events-auto"
          >
            <motion.div
              whileHover={{ scale: 1.03, x: -5 }}
              className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden"
            >
              {/* Animated gradient border */}
              <motion.div
                animate={{
                  background: [
                    `linear-gradient(90deg, ${notification.color} 0%, ${notification.color} 100%)`,
                    `linear-gradient(90deg, ${notification.color} 0%, transparent 100%)`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                className="h-1"
              />

              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Avatar/Icon */}
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${notification.color} flex items-center justify-center shadow-lg`}
                  >
                    <notification.icon className="w-6 h-6 text-white" />
                    
                    {/* Pulse effect */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${notification.color}`}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-bold text-gray-900 leading-tight">
                        {notification.title}
                      </p>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex-shrink-0"
                      >
                        <Bell className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 font-medium">
                        {notification.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 4, ease: 'linear' }}
                  className={`h-1 mt-3 rounded-full bg-gradient-to-r ${notification.color} origin-left`}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FloatingNotifications
