import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Brain, ChevronDown, Phone, Building2, Stethoscope, Home as HomeIcon, FileText, BookOpen, HelpCircle, Zap, Sparkles } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Solutions',
      path: '/services',
      submenu: [
        { name: 'Healthcare', path: '/solutions/healthcare', icon: Stethoscope },
        { name: 'Real Estate', path: '/solutions/real-estate', icon: HomeIcon },
        { name: 'Professional Services', path: '/solutions/professional-services', icon: Building2 },
        { name: 'Call Center', path: '/solutions/call-center', icon: Phone },
      ]
    },
    // { name: 'Pricing', path: '/pricing' }, // Hidden but route still accessible
    {
      name: 'Resources',
      path: '/resources',
      submenu: [
        { name: 'Blog', path: '/resources/blog', icon: FileText },
        { name: 'Case Studies', path: '/resources/case-studies', icon: BookOpen },
        { name: 'Help Center', path: '/resources/help-center', icon: HelpCircle },
      ]
    },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-lg ${
        isScrolled ? 'shadow-nav' : 'shadow-sm'
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img 
                src="/cognidrift_logo.png" 
                alt="CogniDrift Logo" 
                className="h-12 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.submenu && setOpenDropdown(link.name)}
                onMouseLeave={() => link.submenu && setOpenDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`relative px-4 py-2 text-base font-medium transition-all duration-300 rounded-lg flex items-center gap-1 group ${
                    isActive(link.path)
                      ? 'text-blue-600'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {link.submenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 relative z-10 ${
                      openDropdown === link.name ? 'rotate-180' : ''
                    }`} />
                  )}

                  {/* Hover Background Effect */}
                  <motion.div
                    className="absolute inset-0 bg-blue-50/80 rounded-lg opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  {/* Active Indicator */}
                  {isActive(link.path) && (
                    <>
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-blue-50 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.submenu && openDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-border/50 py-2 overflow-hidden"
                    >
                      {/* Background */}
                      <div className="absolute inset-0 bg-blue-50/20 pointer-events-none" />

                      {link.submenu.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="relative flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:text-blue-600 transition-colors duration-200 group"
                          >
                            <motion.div
                              className="absolute inset-0 bg-blue-100/50 opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.2 }}
                            />
                            <motion.div
                              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                              className="relative z-10"
                            >
                              <Icon className="w-5 h-5" />
                            </motion.div>
                            <span className="relative z-10">{item.name}</span>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contact">
              <motion.button
                className="relative btn-primary text-sm px-6 py-3 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Book a Demo
                </span>
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-blue-50 rounded-lg transition-all duration-300 relative overflow-hidden group"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
            {/* Pulse on open */}
            {isOpen && (
              <motion.div
                className="absolute inset-0 bg-blue-100 rounded-lg"
                animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-neutral-border relative overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-blue-50/30 pointer-events-none" />

            <div className="relative px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.submenu ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 relative overflow-hidden group ${
                          isActive(link.path)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 relative z-10 ${
                          openDropdown === link.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 ml-4 space-y-1"
                          >
                            {link.submenu.map((item, subIndex) => {
                              const Icon = item.icon
                              return (
                                <motion.div
                                  key={item.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.05 }}
                                >
                                  <Link
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group relative overflow-hidden"
                                  >
                                    <motion.div
                                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                      transition={{ duration: 0.3 }}
                                      className="relative z-10"
                                    >
                                      <Icon className="w-4 h-4" />
                                    </motion.div>
                                    <span className="relative z-10">{item.name}</span>
                                  </Link>
                                </motion.div>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 relative overflow-hidden group ${
                        isActive(link.path)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-4"
              >
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <motion.button
                    className="btn-primary w-full relative overflow-hidden group"
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Book a Demo
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
