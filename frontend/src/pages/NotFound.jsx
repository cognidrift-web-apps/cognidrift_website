import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search, Phone, MessageSquare, HelpCircle, Sparkles } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/motionVariants'



const quickLinks = [
  { icon: Home, label: 'Home', path: '/', description: 'Back to homepage' },
  { icon: Phone, label: 'AI Receptionist', path: '/products/phone-receptionist', description: 'Explore our flagship product' },
  { icon: MessageSquare, label: 'Contact Us', path: '/contact', description: 'Get in touch with our team' },
  { icon: HelpCircle, label: 'Help Center', path: '/resources/help-center', description: 'Find answers to your questions' },
]

const NotFound = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50/30">
      {/* Floating background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-primary-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-violet-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-300/10 rounded-full blur-3xl"
        />
      </div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-6 sm:mb-8">
            <Search className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Page Not Found</span>
          </motion.div>

          {/* 404 Number */}
          <motion.div
            variants={fadeInUp}
            className="relative mb-4 sm:mb-6"
          >
            <motion.h1
              className="text-[8rem] sm:text-[10rem] lg:text-[12rem] font-black leading-none hero-display select-none"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 40%, #6366F1 70%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              404
            </motion.h1>

            {/* Floating sparkle decorations */}
            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 right-1/4 sm:right-1/3"
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400/60" />
            </motion.div>
            <motion.div
              animate={{ y: [6, -6, 6], rotate: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-8 left-1/4 sm:left-1/3"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400/50" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-3 sm:mb-4 hero-display"
          >
            Oops! This page doesn't <span className="text-gradient">exist</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto mb-10 sm:mb-12"
          >
            The page you're looking for may have been moved, deleted, or never existed. Let's get you back on track.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-16"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-7 py-3.5 rounded-xl font-semibold shadow-button hover:shadow-glow transition-shadow duration-300 text-sm sm:text-base"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                Go to Homepage
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2.5 bg-white text-text-primary border-2 border-neutral-border hover:border-primary-300 px-7 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-card-hover transition-all duration-300 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Go Back
            </motion.button>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-5 sm:mb-6">
              Popular Pages
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.path}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="group relative bg-white border-2 border-neutral-border hover:border-primary-300 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3"
                    >
                      <link.icon className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <h3 className="relative text-sm font-bold text-text-primary group-hover:text-primary-600 transition-colors">
                      {link.label}
                    </h3>
                    <p className="relative text-xs text-text-secondary mt-1">{link.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default NotFound
