import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Brain, ChevronDown, Phone, Building2, Stethoscope, Home as HomeIcon, FileText, BookOpen, HelpCircle, Zap } from 'lucide-react'

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
    { name: 'Pricing', path: '/pricing' },
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
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center group-hover:bg-primary-700 transition-colors duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              Cogni<span className="text-primary-600">Drift</span>
            </span>
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
                  className={`relative px-4 py-2 text-base font-medium transition-colors duration-300 rounded-lg flex items-center gap-1 ${
                    isActive(link.path)
                      ? 'text-primary-600'
                      : 'text-text-secondary hover:text-text-primary hover:bg-neutral-offWhite'
                  }`}
                >
                  {link.name}
                  {link.submenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown === link.name ? 'rotate-180' : ''
                    }`} />
                  )}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.submenu && openDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-neutral-border py-2"
                    >
                      {link.submenu.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                          >
                            <Icon className="w-5 h-5" />
                            {item.name}
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
              <button className="btn-primary text-sm px-6 py-3">
                Book a Demo
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-neutral-offWhite rounded-lg transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            className="md:hidden bg-white border-t border-neutral-border"
          >
            <div className="px-4 py-6 space-y-2">
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
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition-colors duration-300 ${
                          isActive(link.path)
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-text-secondary hover:text-text-primary hover:bg-neutral-offWhite'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
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
                            {link.submenu.map((item) => {
                              const Icon = item.icon
                              return (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                                >
                                  <Icon className="w-4 h-4" />
                                  {item.name}
                                </Link>
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
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-300 ${
                        isActive(link.path)
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-text-secondary hover:text-text-primary hover:bg-neutral-offWhite'
                      }`}
                    >
                      {link.name}
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
                  <button className="btn-primary w-full">
                    Book a Demo
                  </button>
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
