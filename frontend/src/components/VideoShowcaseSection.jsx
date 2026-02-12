import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone, Calendar, Users, Zap, Clock, Globe, Sparkles,
  CheckCircle, ArrowRight, Bell, MessageSquare, TrendingUp
} from 'lucide-react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { BsFillCalendarCheckFill, BsChatDotsFill } from 'react-icons/bs'
import { IoTrendingUpSharp } from 'react-icons/io5'
import GlowCard from './ui/GlowCard'

const VideoShowcaseSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Floating notifications around the video
  const notifications = [
    {
      icon: BsFillTelephoneFill,
      title: "New call answered",
      subtitle: "Sarah from ABC Corp",
      iconColor: "text-green-500",
      position: "top-[10%] -left-4 lg:-left-8",
      delay: 0
    },
    {
      icon: BsFillCalendarCheckFill,
      title: "Appointment booked",
      subtitle: "Tomorrow at 2:00 PM",
      iconColor: "text-blue-500",
      position: "top-[35%] -right-4 lg:-right-10",
      delay: 0.3
    },
    {
      icon: BsChatDotsFill,
      title: "Lead captured",
      subtitle: "John D. requested demo",
      iconColor: "text-purple-500",
      position: "bottom-[30%] -left-4 lg:-left-12",
      delay: 0.6
    },
    {
      icon: IoTrendingUpSharp,
      title: "Conversion +24%",
      subtitle: "This week's performance",
      iconColor: "text-orange-500",
      position: "bottom-[10%] -right-4 lg:-right-6",
      delay: 0.9
    }
  ]

  const features = [
    { icon: Clock, text: "24/7 availability, never miss a call" },
    { icon: Globe, text: "50+ languages supported" },
    { icon: Users, text: "Handle unlimited concurrent calls" },
    { icon: Zap, text: "Instant response, zero wait time" }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden bg-neutral-offWhite"
    >
      {/* Background Elements - Using CSS animations for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] bg-cyan-100/50 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-3xl animate-float-slower" />
      </div>

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
          className="section-header"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
              AI Avatar
            </span>
          </div>

          {/* Title */}
          <h2 className="section-title hero-display">
            AI Receptionist, <span className="text-gradient">24/7</span>
          </h2>

          {/* Description */}
          <p className="section-subtitle">
            Watch our AI handle real conversations, schedule appointments, capture leads,
            and never miss a call — even at 3 AM. It's like having your best employee
            work around the clock, without the overtime.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side - Video with Floating Notifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-1"
          >
            {/* Floating Notifications */}
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ delay: notification.delay + 0.5, duration: 0.5, type: "spring" }}
                className={`absolute ${notification.position} z-20 hidden md:block`}
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Liquid Glass Notification Card */}
                  <div className="relative backdrop-blur-2xl bg-white/20 border border-white/40 rounded-2xl p-3 pr-5 shadow-2xl shadow-black/10 min-w-[180px]" style={{ backdropFilter: 'blur(20px) saturate(180%)' }}>
                    {/* Glass shimmer effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 opacity-10 rounded-2xl" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                    
                    {/* Glow edge effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-50" />

                    <div className="relative flex items-center gap-3">
                      {/* Transparent Colorful Icon */}
                      <div className="w-10 h-10 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg flex-shrink-0 border border-white/20">
                        <notification.icon className={`w-5 h-5 ${notification.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{notification.title}</p>
                        <p className="text-xs text-gray-600 truncate">{notification.subtitle}</p>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Video Container with Glow Effect */}
            <div className="relative">
              <GlowCard glowColor="cyan-purple" glowSize="md">
                {/* Video wrapper */}
                <div className="bg-gray-900 aspect-video shadow-inner will-change-transform">
                  <img
                    src="/hero.gif"
                    alt="Hero Animation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </GlowCard>

              {/* Decorative dots - Using CSS animation */}
              <div className="absolute -bottom-6 -left-6 w-12 h-12 hidden lg:block animate-spin-slow">
                <div className="w-full h-full border-2 border-dashed border-cyan-300 rounded-full" />
              </div>
              <div className="absolute -top-6 -right-6 w-10 h-10 hidden lg:block animate-spin-slower">
                <div className="w-full h-full border-2 border-dashed border-purple-300 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-2"
          >
            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-50 to-purple-50 border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full sm:w-auto"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/products/phone-receptionist">
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VideoShowcaseSection
