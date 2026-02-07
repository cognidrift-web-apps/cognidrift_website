import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  UtensilsCrossed, Wrench, Scissors, Car, Dumbbell, PawPrint,
  Phone, Calendar, Clock, Star, CheckCircle2, ArrowRight,
  Users, TrendingUp, MessageSquare, MapPin, CreditCard,
  Zap, Target, Award, ThumbsUp, Home, Sparkles
} from 'lucide-react'

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

// Animated Chart Bar
const AnimatedBar = ({ height, color, delay, label }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative h-32 w-8 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: `${height}%` } : { height: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`absolute bottom-0 w-full rounded-full ${color}`}
        />
      </div>
      <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
  )
}

// Floating Badge Component
const FloatingBadge = ({ text, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className={`absolute ${color} px-3 py-1.5 rounded-full text-xs font-bold shadow-lg`}
  >
    {text}
  </motion.div>
)

// Section Card Component with Chart
const SectionCard = ({
  icon: Icon,
  title,
  description,
  features,
  stats,
  chartData,
  color,
  bgGradient,
  iconBg,
  index,
  reversed
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100`}
    >
      <div className={`grid lg:grid-cols-2 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content Side */}
        <div className={`p-8 lg:p-10 ${bgGradient} ${reversed ? 'lg:order-2' : ''}`}>
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg`}
            >
              <Icon className={`w-7 h-7 ${color}`} />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-6 h-6 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <CheckCircle2 className={`w-4 h-4 ${color}`} />
                </div>
                <span className="text-gray-700 text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="flex gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className={`text-2xl font-bold ${color}`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Side */}
        <div className={`p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center ${reversed ? 'lg:order-1' : ''}`}>
          <div className="relative w-full max-w-xs">
            {/* Animated Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              {/* Main Circle */}
              <div className={`w-48 h-48 mx-auto rounded-full ${bgGradient} flex items-center justify-center shadow-2xl relative`}>
                <Icon className={`w-20 h-20 ${color}`} />

                {/* Orbiting Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  {chartData.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className={`absolute w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shadow-lg`}
                      style={{
                        top: `${50 + 45 * Math.sin((idx * 2 * Math.PI) / chartData.length)}%`,
                        left: `${50 + 45 * Math.cos((idx * 2 * Math.PI) / chartData.length)}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Pulse Rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: ring * 0.3
                  }}
                  className={`absolute inset-0 rounded-full border-2 ${color.replace('text-', 'border-')}`}
                  style={{ margin: `${ring * -15}px` }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const LocalServices = () => {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Local Services Sections Data
  const sections = [
    {
      icon: UtensilsCrossed,
      title: "Restaurants & Hospitality",
      description: "Reservations, orders, and guest inquiries handled 24/7.",
      color: "text-orange-600",
      iconBg: "bg-orange-100",
      bgGradient: "bg-gradient-to-br from-orange-50 via-white to-amber-50",
      stats: [
        { value: 45, suffix: "%", label: "More Reservations" },
        { value: 60, suffix: "%", label: "Faster Response" },
        { value: 35, suffix: "%", label: "Revenue Growth" }
      ],
      features: [
        "Table reservation management",
        "Takeout & delivery order handling",
        "Menu & hours inquiries",
        "Special event bookings",
        "Guest feedback collection"
      ],
      chartData: [
        { icon: Phone, color: "bg-orange-500" },
        { icon: Calendar, color: "bg-amber-500" },
        { icon: Star, color: "bg-yellow-500" }
      ]
    },
    {
      icon: Wrench,
      title: "Home Services",
      description: "HVAC, plumbing, electrical, and more - never miss a service call.",
      color: "text-slate-600",
      iconBg: "bg-slate-100",
      bgGradient: "bg-gradient-to-br from-slate-50 via-white to-gray-50",
      stats: [
        { value: 70, suffix: "%", label: "Calls Captured" },
        { value: 50, suffix: "%", label: "More Bookings" },
        { value: 24, suffix: "/7", label: "Emergency Line" }
      ],
      features: [
        "Emergency service dispatch",
        "Service appointment scheduling",
        "Quote request handling",
        "Technician routing & updates",
        "Follow-up & review requests"
      ],
      chartData: [
        { icon: Home, color: "bg-slate-500" },
        { icon: Clock, color: "bg-gray-500" },
        { icon: Zap, color: "bg-yellow-500" }
      ]
    },
    {
      icon: Scissors,
      title: "Salons & Spas",
      description: "Booking, confirmations, and client care automation.",
      color: "text-fuchsia-600",
      iconBg: "bg-fuchsia-100",
      bgGradient: "bg-gradient-to-br from-fuchsia-50 via-white to-pink-50",
      stats: [
        { value: 40, suffix: "%", label: "Less No-Shows" },
        { value: 55, suffix: "%", label: "More Bookings" },
        { value: 90, suffix: "%", label: "Client Retention" }
      ],
      features: [
        "Appointment booking & confirmations",
        "Service & pricing information",
        "Stylist/therapist selection",
        "Product recommendations",
        "Loyalty program management"
      ],
      chartData: [
        { icon: Sparkles, color: "bg-fuchsia-500" },
        { icon: Calendar, color: "bg-pink-500" },
        { icon: Star, color: "bg-purple-500" }
      ]
    },
    {
      icon: Car,
      title: "Auto Repair & Dealerships",
      description: "Service scheduling, lead capture, and customer updates.",
      color: "text-blue-600",
      iconBg: "bg-blue-100",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-sky-50",
      stats: [
        { value: 65, suffix: "%", label: "Lead Capture" },
        { value: 45, suffix: "%", label: "Service Bookings" },
        { value: 30, suffix: "%", label: "Revenue Increase" }
      ],
      features: [
        "Service appointment scheduling",
        "Vehicle status updates",
        "Test drive bookings",
        "Parts & pricing inquiries",
        "Recall notification handling"
      ],
      chartData: [
        { icon: Car, color: "bg-blue-500" },
        { icon: Wrench, color: "bg-sky-500" },
        { icon: CreditCard, color: "bg-indigo-500" }
      ]
    },
    {
      icon: Dumbbell,
      title: "Fitness Centers & Gyms",
      description: "Membership inquiries, class booking, and member support.",
      color: "text-green-600",
      iconBg: "bg-green-100",
      bgGradient: "bg-gradient-to-br from-green-50 via-white to-emerald-50",
      stats: [
        { value: 50, suffix: "%", label: "More Sign-ups" },
        { value: 35, suffix: "%", label: "Better Retention" },
        { value: 80, suffix: "%", label: "Inquiry Handled" }
      ],
      features: [
        "Membership inquiry handling",
        "Class & session booking",
        "Personal training scheduling",
        "Facility hours & information",
        "Billing & account support"
      ],
      chartData: [
        { icon: Dumbbell, color: "bg-green-500" },
        { icon: Users, color: "bg-emerald-500" },
        { icon: Calendar, color: "bg-teal-500" }
      ]
    },
    {
      icon: PawPrint,
      title: "Pet Services & Grooming",
      description: "Grooming appointments, daycare, and pet parent communication.",
      color: "text-yellow-600",
      iconBg: "bg-yellow-100",
      bgGradient: "bg-gradient-to-br from-yellow-50 via-white to-amber-50",
      stats: [
        { value: 60, suffix: "%", label: "More Appointments" },
        { value: 45, suffix: "%", label: "Client Loyalty" },
        { value: 95, suffix: "%", label: "Satisfaction" }
      ],
      features: [
        "Grooming appointment scheduling",
        "Daycare & boarding bookings",
        "Pet pickup reminders",
        "Service pricing & packages",
        "Special care instructions"
      ],
      chartData: [
        { icon: PawPrint, color: "bg-yellow-500" },
        { icon: Star, color: "bg-amber-500" },
        { icon: Heart, color: "bg-orange-500" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-white pt-24 pb-20">
      {/* Hero Section */}
      <div ref={heroRef} className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6"
          >
            Never Miss a Customer Call
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Local Services</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            From restaurants to pet groomers, capture every lead and booking. AI-powered call handling
            that works 24/7 so you can focus on what you do best.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-4 text-lg bg-gradient-to-r from-amber-600 to-orange-600"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-lg font-semibold text-amber-600 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors"
            >
              See How It Works
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { icon: MapPin, value: 10, suffix: "K+", label: "Local Businesses", color: "text-orange-600" },
            { icon: Phone, value: 5, suffix: "M+", label: "Calls Handled", color: "text-amber-600" },
            { icon: TrendingUp, value: 45, suffix: "%", label: "More Bookings", color: "text-green-600" },
            { icon: ThumbsUp, value: 97, suffix: "%", label: "Satisfaction", color: "text-blue-600" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className={`text-3xl font-bold ${stat.color}`}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Cards */}
        <div className="space-y-8 mb-20">
          {sections.map((section, index) => (
            <SectionCard key={index} {...section} index={index} reversed={index % 2 === 1} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-10 lg:p-16 text-center"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="absolute w-32 h-32 rounded-2xl bg-white/10"
                style={{
                  left: `${i * 18}%`,
                  top: `${(i % 3) * 30}%`
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Grow Your Local Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of local businesses using AI to capture more leads and bookings. Start your free trial today.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Add Heart icon that was used
const Heart = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
)

export default LocalServices
