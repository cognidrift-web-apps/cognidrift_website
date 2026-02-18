import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown, Phone, Building2, Stethoscope,
  Home as HomeIcon, FileText, BookOpen, HelpCircle, Zap,
  Mic, Bot, Smartphone, Database, Ticket, MessageSquare,
  PhoneCall, Calendar, TrendingUp, Wrench, Headphones
} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [pinnedDropdown, setPinnedDropdown] = useState(null)
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close pinned dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pinnedDropdown && navRef.current && !navRef.current.contains(e.target)) {
        setPinnedDropdown(null)
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [pinnedDropdown])

  // Close pinned dropdown on route change
  useEffect(() => {
    setPinnedDropdown(null)
    setOpenDropdown(null)
  }, [location.pathname])

  const hasDropdown = (link) => link.submenu || link.mega

  // Handle click on mega dropdown label (Product / Industries)
  const handleMegaClick = useCallback((e, linkName) => {
    e.preventDefault()
    if (pinnedDropdown === linkName) {
      // Unpin — close it
      setPinnedDropdown(null)
      setOpenDropdown(null)
    } else {
      // Pin it open
      setPinnedDropdown(linkName)
      setOpenDropdown(linkName)
    }
  }, [pinnedDropdown])

  // Mouse enter: show dropdown (always)
  const handleDropdownEnter = useCallback((link) => {
    if (hasDropdown(link)) {
      setOpenDropdown(link.name)
    }
  }, [])

  // Mouse leave: only hide if NOT pinned
  const handleDropdownLeave = useCallback((link) => {
    if (hasDropdown(link) && pinnedDropdown !== link.name) {
      setOpenDropdown(null)
    }
  }, [pinnedDropdown])

  // Mega dropdown for Product
  const productMega = {
    name: 'Products',
    path: '/products/phone-receptionist',
    mega: true,
    sections: [
      {
        title: 'Inbound Automation',
        items: [
          { name: 'AI Phone Receptionist', description: 'Answers calls 24/7, qualifies leads, books appointments', path: '/products/phone-receptionist', icon: Phone, iconColor: 'bg-blue-100/70 text-blue-600' },
          { name: 'AI Web Chatbot', description: 'Capture, qualify, and convert website visitors in real time', path: '/products/web-chatbot', icon: Bot, iconColor: 'bg-blue-100/70 text-blue-600' },
          { name: 'AI Web Voicebot', description: 'Voice-enabled interactions on your website', path: '/products/web-voicebot', icon: Mic, iconColor: 'bg-blue-100/70 text-blue-600' },
          { name: 'SMS Texting Agent', description: 'Handles two-way SMS conversations with leads', path: '/products/sms-agent', icon: MessageSquare, iconColor: 'bg-blue-100/70 text-blue-600' },
        ]
      },
      {
        title: 'Lead Management',
        items: [
          { name: 'AI CRM', description: 'Centralizes all interactions and tracks every lead', path: '/products/ai-crm', icon: Database, iconColor: 'bg-blue-100/70 text-blue-600' },
          { name: 'Smart Ticketing', description: 'Automatically creates and routes tickets from every channel', path: '/products/smart-ticketing', icon: Ticket, iconColor: 'bg-blue-100/70 text-blue-600' },
          { name: 'AI Calendar', description: 'Smart scheduling and appointment management', path: '/products/ai-calendar', icon: Calendar, iconColor: 'bg-blue-100/70 text-blue-600' },
        ]
      },
      {
        title: 'Outbound Engagement',
        items: [
          { name: 'Automated Calls', description: 'AI-powered outbound calling campaigns', path: '/products/automated-calls', icon: PhoneCall, iconColor: 'bg-blue-100/70 text-blue-600' },
          { name: 'Automated SMS', description: 'Scheduled and triggered SMS campaigns', path: '/products/automated-sms', icon: Smartphone, iconColor: 'bg-blue-100/70 text-blue-600' },
        ]
      },
      {
        title: 'Enterprise Solutions',
        items: [
          { name: 'AI Automation', description: 'Intelligent insights and performance metrics', path: '/products/ai-automation', icon: TrendingUp, iconColor: 'bg-blue-100/70 text-blue-600' },
        ]
      }
    ]
  }

  // Mega dropdown for Industries - 4 main categories
  const industriesMega = {
    name: 'Industries',
    path: '/industries/healthcare',
    mega: true,
    sections: [
      {
        items: [
          { name: 'Healthcare', description: 'Medical practices, dental, therapy, senior care & veterinary clinics', path: '/industries/healthcare', icon: Stethoscope, iconColor: 'bg-blue-100/70 text-blue-600' },
          { name: 'Local Services', description: 'Restaurants, home services, salons, auto repair, fitness & pet care', path: '/industries/local-services', icon: Wrench, iconColor: 'bg-blue-100/70 text-blue-600' },
        ]
      },
      {
        items: [
          { name: 'Professional Services', description: 'Legal, financial, insurance, real estate & consulting firms', path: '/industries/professional-services', icon: Building2, iconColor: 'bg-blue-100/70 text-blue-600' },
          { name: 'Call Centers', description: 'BPO, tech support, customer service & scheduling operations', path: '/industries/call-centers', icon: Headphones, iconColor: 'bg-blue-100/70 text-blue-600' },
        ]
      }
    ]
  }

  const navLinks = [
    productMega,
    industriesMega,
    {
      name: 'Resources',
      path: '/resources',
      mega: true,
      sections: [
        {
          items: [
            { name: 'Case Studies', description: 'Real results from real businesses', path: '/resources/case-studies', icon: BookOpen, iconColor: 'bg-blue-100/70 text-blue-600' },
            { name: 'Blog', description: 'Latest insights, tips & industry news', path: '/resources/blog', icon: FileText, iconColor: 'bg-blue-100/70 text-blue-600' },
            { name: 'Help Center', description: 'FAQs, guides & support resources', path: '/resources/help-center', icon: HelpCircle, iconColor: 'bg-blue-100/70 text-blue-600' },
          ]
        }
      ]
    },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  // Staggered item animation for mega dropdown
  const megaItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' }
    })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(59,130,246,0.08),inset_0_-1px_0_rgba(255,255,255,0.6)] border-b border-white/50'
          : 'bg-white/20 backdrop-blur-xl border-b border-white/30'
      }`}
      style={{
        WebkitBackdropFilter: isScrolled ? 'blur(40px) saturate(180%)' : 'blur(20px) saturate(150%)',
        backdropFilter: isScrolled ? 'blur(40px) saturate(180%)' : 'blur(20px) saturate(150%)',
      }}
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
          <div ref={navRef} className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(link)}
                onMouseLeave={() => handleDropdownLeave(link)}
              >
                {link.mega ? (
                  <button
                    onClick={(e) => handleMegaClick(e, link.name)}
                    className={`relative px-4 py-2 text-base font-medium transition-all duration-300 rounded-lg flex items-center gap-1 group cursor-pointer ${
                      openDropdown === link.name
                        ? 'text-blue-600'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 relative z-10 ${
                      openDropdown === link.name ? 'rotate-180' : ''
                    }`} />

                    {/* Hover Background Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/50 rounded-lg opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                      transition={{ duration: 0.3 }}
                    />

                    {/* Pinned Indicator */}
                    {pinnedDropdown === link.name && (
                      <motion.div
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full"
                        layoutId="pinnedIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 text-base font-medium transition-all duration-300 rounded-lg flex items-center gap-1 group ${
                      isActive(link.path)
                        ? 'text-blue-600'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {hasDropdown(link) && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 relative z-10 ${
                        openDropdown === link.name ? 'rotate-180' : ''
                      }`} />
                    )}

                    {/* Hover Background Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/50 rounded-lg opacity-0 group-hover:opacity-100 backdrop-blur-sm"
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
                          className="absolute inset-0 bg-white/40 rounded-lg backdrop-blur-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </>
                    )}
                  </Link>
                )}

                {/* Mega Dropdown for Product & Industries */}
                <AnimatePresence>
                  {link.mega && openDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: [0.68, -0.05, 0.265, 1.2] }}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 rounded-t-none rounded-b-2xl p-5 overflow-hidden border border-t-0 border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(59,130,246,0.08)] ${
                        link.name === 'Products' ? 'w-[820px]' : link.name === 'Resources' ? 'w-[360px]' : 'w-[580px]'
                      }`}
                    >
                      {/* Glass refraction highlight */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/20 pointer-events-none rounded-b-2xl" />

                      <div className={`relative grid gap-4 ${link.name === 'Resources' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {link.sections.map((section, sIdx) => (
                          <div key={section.title || `section-${sIdx}`}>
                            {section.title && (
                              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
                                {section.title}
                              </p>
                            )}
                            {section.items.map((item, iIdx) => {
                              const Icon = item.icon
                              const globalIdx = sIdx * section.items.length + iIdx
                              return (
                                <motion.div
                                  key={item.name}
                                  custom={globalIdx}
                                  variants={megaItemVariants}
                                  initial="hidden"
                                  animate="visible"
                                >
                                  <Link
                                    to={item.path}
                                    onClick={() => { setPinnedDropdown(null); setOpenDropdown(null) }}
                                    className="flex items-start gap-3 px-3 py-3 rounded-xl text-text-secondary hover:text-blue-600 transition-all duration-200 group relative overflow-hidden"
                                  >
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-blue-50/60 to-purple-50/40 opacity-0 group-hover:opacity-100 rounded-xl"
                                      transition={{ duration: 0.2 }}
                                    />
                                    <motion.div
                                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                                      transition={{ duration: 0.3 }}
                                      className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.iconColor}`}
                                    >
                                      <Icon className="w-5 h-5" />
                                    </motion.div>
                                    <div className="relative z-10 min-w-0">
                                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {item.name}
                                      </p>
                                      <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                </motion.div>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Simple Dropdown Menu - Enhanced with colorful icons */}
                <AnimatePresence>
                  {link.submenu && !link.mega && openDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: [0.68, -0.05, 0.265, 1.2] }}
                      className="absolute top-full left-0 mt-0 w-80 rounded-t-none rounded-b-2xl p-3 overflow-hidden border border-t-0 border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(59,130,246,0.08)]"
                    >
                      {/* Glass refraction highlight */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/20 pointer-events-none rounded-b-2xl" />

                      {link.submenu.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <motion.div
                            key={item.name}
                            custom={index}
                            variants={megaItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link
                              to={item.path}
                              onClick={() => { setPinnedDropdown(null); setOpenDropdown(null) }}
                              className="flex items-start gap-3 px-3 py-3 rounded-xl text-text-secondary hover:text-blue-600 transition-all duration-200 group relative overflow-hidden"
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-50/60 to-purple-50/40 opacity-0 group-hover:opacity-100 rounded-xl"
                                transition={{ duration: 0.2 }}
                              />
                              <motion.div
                                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                                className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.iconColor || 'bg-gray-100 text-gray-600'}`}
                              >
                                <Icon className="w-5 h-5" />
                              </motion.div>
                              <div className="relative z-10 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {item.name}
                                </p>
                                {item.description && (
                                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
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
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-white/40 rounded-lg transition-all duration-300 relative overflow-hidden group"
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
                className="absolute inset-0 bg-white/40 rounded-lg"
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
            className="lg:hidden border-t border-white/40 relative bg-white/40 backdrop-blur-2xl"
            style={{ 
              WebkitBackdropFilter: 'blur(40px) saturate(180%)', 
              backdropFilter: 'blur(40px) saturate(180%)',
              maxHeight: 'calc(100vh - 72px)', // Subtract navbar height
              overflowY: 'auto'
            }}
          >
            {/* Glass refraction highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/20 pointer-events-none" />

            <div className="relative px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Mega dropdown mobile */}
                  {link.mega ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 relative overflow-hidden group ${
                          isActive(link.path)
                            ? 'text-blue-600 bg-white/50'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100"
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
                            className="mt-2 ml-2 space-y-1"
                          >
                            {link.sections.map((section, sIdx) => (
                              <div key={section.title || `mobile-section-${sIdx}`}>
                                {section.title && (
                                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-4 mb-1">
                                    {section.title}
                                  </p>
                                )}
                                {section.items.map((item, subIndex) => {
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
                                        className="flex items-start gap-3 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-blue-600 hover:bg-white/40 transition-all duration-200 group relative overflow-hidden"
                                      >
                                        <div className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.iconColor}`}>
                                          <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="relative z-10">
                                          <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">{item.name}</p>
                                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                                        </div>
                                      </Link>
                                    </motion.div>
                                  )
                                })}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : link.submenu ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 relative overflow-hidden group ${
                          isActive(link.path)
                            ? 'text-blue-600 bg-white/50'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100"
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
                                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-blue-600 hover:bg-white/40 transition-all duration-200 group relative overflow-hidden"
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
                          ? 'text-blue-600 bg-white/50'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100"
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
