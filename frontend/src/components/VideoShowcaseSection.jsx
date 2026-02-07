import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Phone, MessageSquare, Calendar, BarChart3, Users, Zap,
  Bot, Mic, Shield, Clock, Globe, Sparkles, Play, Pause,
  PhoneCall, Bell, CheckCircle, TrendingUp, Headphones
} from 'lucide-react'
import { BsFillTelephoneFill, BsRobot, BsChatDotsFill, BsGraphUpArrow } from 'react-icons/bs'
import { HiSparkles, HiLightningBolt } from 'react-icons/hi'
import { RiCustomerService2Fill, RiVoiceprintFill } from 'react-icons/ri'
import { IoAnalytics, IoShieldCheckmark } from 'react-icons/io5'

const VideoShowcaseSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Floating feature items with colorful transparent icons
  const floatingFeatures = [
    { icon: BsFillTelephoneFill, label: "24/7 Calls", color: "from-cyan-400 to-blue-500", position: "top-[15%] left-[5%]", delay: 0 },
    { icon: BsRobot, label: "AI Powered", color: "from-purple-400 to-pink-500", position: "top-[10%] right-[8%]", delay: 0.2 },
    { icon: BsChatDotsFill, label: "Smart Chat", color: "from-green-400 to-emerald-500", position: "bottom-[25%] left-[3%]", delay: 0.4 },
    { icon: BsGraphUpArrow, label: "Analytics", color: "from-orange-400 to-red-500", position: "bottom-[20%] right-[5%]", delay: 0.6 },
    { icon: RiCustomerService2Fill, label: "Support", color: "from-indigo-400 to-violet-500", position: "top-[40%] left-[2%]", delay: 0.8 },
    { icon: IoShieldCheckmark, label: "Secure", color: "from-teal-400 to-cyan-500", position: "top-[35%] right-[3%]", delay: 1 },
  ]

  // Stats with liquid glass effect
  const stats = [
    { value: "99.9%", label: "Uptime", icon: Zap },
    { value: "500+", label: "Businesses", icon: Users },
    { value: "<3s", label: "Response", icon: Clock },
    { value: "50+", label: "Languages", icon: Globe }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white"
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-gradient-to-br from-cyan-200/40 to-blue-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/30 to-violet-100/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg shadow-purple-500/10"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5 text-purple-500" />
            </motion.div>
            <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              See It In Action
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Experience the{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Future
              </span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <motion.path
                  d="M0,4 Q50,0 100,4 T200,4"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
            {' '}of Business
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch how our AI receptionist handles real conversations, schedules appointments,
            and never misses a beat — 24 hours a day, 7 days a week.
          </p>
        </motion.div>

        {/* Main Video Container with Floating Elements */}
        <div className="relative max-w-5xl mx-auto">
          {/* Floating Feature Cards - Colorful Transparent Icons */}
          {floatingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ delay: feature.delay + 0.5, duration: 0.5, type: "spring" }}
              className={`absolute ${feature.position} z-20 hidden lg:block`}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="group cursor-pointer"
              >
                {/* Liquid Glass Card */}
                <div className="relative backdrop-blur-xl bg-white/40 border border-white/50 rounded-2xl p-4 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-110">
                  {/* Glass shine effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none" />

                  {/* Icon with gradient background */}
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-2 shadow-lg`}>
                    <div className="w-full h-full rounded-[10px] bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <feature.icon className={`w-6 h-6 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: 'transparent', background: `linear-gradient(135deg, var(--tw-gradient-stops))`, WebkitBackgroundClip: 'text', backgroundClip: 'text' }} />
                      {/* Fallback colored icon */}
                      <feature.icon className={`w-6 h-6 absolute`} style={{
                        background: `linear-gradient(135deg, ${feature.color.includes('cyan') ? '#22d3ee, #3b82f6' :
                          feature.color.includes('purple') ? '#a855f7, #ec4899' :
                          feature.color.includes('green') ? '#4ade80, #10b981' :
                          feature.color.includes('orange') ? '#fb923c, #ef4444' :
                          feature.color.includes('indigo') ? '#818cf8, #8b5cf6' :
                          '#2dd4bf, #22d3ee'})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }} />
                    </div>
                    {/* Pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-30`}
                    />
                  </div>

                  <span className="relative text-xs font-bold text-gray-700">{feature.label}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Video Container with Liquid Glass Frame */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-[2rem] blur-2xl" />

            {/* Liquid Glass Frame */}
            <div className="relative backdrop-blur-2xl bg-white/30 border-2 border-white/50 rounded-3xl p-3 shadow-2xl shadow-purple-500/10">
              {/* Inner glass shine */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none" />

              {/* Video wrapper */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-inner">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/hero.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Play/Pause Button */}
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-6 right-6 z-10"
                >
                  <div className="relative backdrop-blur-xl bg-white/20 border border-white/30 rounded-full p-4 shadow-lg hover:bg-white/30 transition-all duration-300">
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    )}
                  </div>
                </motion.button>

                {/* Live indicator */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-full px-4 py-2 flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-red-500 rounded-full"
                    />
                    <span className="text-white text-sm font-semibold">Live Demo</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-20 h-20 border-2 border-dashed border-purple-200 rounded-full hidden lg:block"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -left-10 w-16 h-16 border-2 border-dashed border-cyan-200 rounded-full hidden lg:block"
          />
        </div>

        {/* Stats Row with Liquid Glass Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative"
            >
              {/* Liquid Glass Card */}
              <div className="relative backdrop-blur-xl bg-white/50 border border-white/60 rounded-2xl p-6 text-center shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden">
                {/* Glass shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none rounded-2xl" />

                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative inline-flex mb-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-purple-600" />
                  </div>
                </motion.div>

                {/* Value */}
                <div className="relative text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="relative text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Custom CSS for glass effects */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  )
}

export default VideoShowcaseSection
