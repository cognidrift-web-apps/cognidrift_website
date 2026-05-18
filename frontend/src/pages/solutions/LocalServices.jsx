import SEOMeta from '../../components/SEOMeta'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  UtensilsCrossed, Wrench, Scissors, Car, Dumbbell, PawPrint,
  Phone, Calendar, Clock, Star, CheckCircle2, ArrowRight,
  Users, TrendingUp, MessageSquare, MapPin, CreditCard,
  Zap, Target, Award, ThumbsUp, Home, Sparkles, Heart
} from 'lucide-react'
import AnimatedCounter from '../../components/ui/AnimatedCounter'
import SectionCard from '../../components/ui/SectionCard'

// Orbit Visual — generates the rotating icon circle used in each LocalServices card
const OrbitVisual = ({ MainIcon, orbitIcons, color, bgGradient }) => (
  <div className="relative">
    {/* Main Circle */}
    <div className={`w-48 h-48 mx-auto rounded-full ${bgGradient} flex items-center justify-center shadow-2xl relative`}>
      <MainIcon className={`w-20 h-20 ${color}`} />

      {/* Orbiting Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {orbitIcons.map((item, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              top: `${50 + 45 * Math.sin((idx * 2 * Math.PI) / orbitIcons.length)}%`,
              left: `${50 + 45 * Math.cos((idx * 2 * Math.PI) / orbitIcons.length)}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md border border-blue-100 bg-blue-50/80"
            >
              <item.icon className="w-5 h-5 text-blue-600" />
            </motion.div>
          </div>
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
  </div>
)

const LocalServices = () => {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Local Services Sections Data
  const sections = [
    {
      icon: UtensilsCrossed,
      title: "Restaurants & Hospitality",
      description: "Reservations, orders, and guest inquiries handled 24/7.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      variant: "split",
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
      visual: (
        <OrbitVisual
          MainIcon={UtensilsCrossed}
          orbitIcons={[
            { icon: Phone, color: "bg-blue-500" },
            { icon: Calendar, color: "bg-blue-400" },
            { icon: Star, color: "bg-primary-500" }
          ]}
          color="text-blue-600"
          bgGradient="bg-gradient-to-br from-blue-50 via-white to-primary-50"
        />
      )
    },
    {
      icon: Wrench,
      title: "Home Services",
      description: "HVAC, plumbing, electrical, and more - never miss a service call.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      variant: "split",
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
      visual: (
        <OrbitVisual
          MainIcon={Wrench}
          orbitIcons={[
            { icon: Home, color: "bg-blue-500" },
            { icon: Clock, color: "bg-blue-400" },
            { icon: Zap, color: "bg-primary-500" }
          ]}
          color="text-blue-600"
          bgGradient="bg-gradient-to-br from-blue-50 via-white to-primary-50"
        />
      )
    },
    {
      icon: Scissors,
      title: "Salons & Spas",
      description: "Booking, confirmations, and client care automation.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      variant: "split",
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
      visual: (
        <OrbitVisual
          MainIcon={Scissors}
          orbitIcons={[
            { icon: Sparkles, color: "bg-blue-500" },
            { icon: Calendar, color: "bg-blue-400" },
            { icon: Star, color: "bg-primary-500" }
          ]}
          color="text-blue-600"
          bgGradient="bg-gradient-to-br from-blue-50 via-white to-primary-50"
        />
      )
    },
    {
      icon: Car,
      title: "Auto Repair & Dealerships",
      description: "Service scheduling, lead capture, and customer updates.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      variant: "split",
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
      visual: (
        <OrbitVisual
          MainIcon={Car}
          orbitIcons={[
            { icon: Car, color: "bg-blue-500" },
            { icon: Wrench, color: "bg-blue-400" },
            { icon: CreditCard, color: "bg-primary-500" }
          ]}
          color="text-blue-600"
          bgGradient="bg-gradient-to-br from-blue-50 via-white to-primary-50"
        />
      )
    },
    {
      icon: Dumbbell,
      title: "Fitness Centers & Gyms",
      description: "Membership inquiries, class booking, and member support.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      variant: "split",
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
      visual: (
        <OrbitVisual
          MainIcon={Dumbbell}
          orbitIcons={[
            { icon: Dumbbell, color: "bg-blue-500" },
            { icon: Users, color: "bg-blue-400" },
            { icon: Calendar, color: "bg-primary-500" }
          ]}
          color="text-blue-600"
          bgGradient="bg-gradient-to-br from-blue-50 via-white to-primary-50"
        />
      )
    },
    {
      icon: PawPrint,
      title: "Pet Services & Grooming",
      description: "Grooming appointments, daycare, and pet parent communication.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      variant: "split",
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
      visual: (
        <OrbitVisual
          MainIcon={PawPrint}
          orbitIcons={[
            { icon: PawPrint, color: "bg-blue-500" },
            { icon: Star, color: "bg-blue-400" },
            { icon: Heart, color: "bg-primary-500" }
          ]}
          color="text-blue-600"
          bgGradient="bg-gradient-to-br from-blue-50 via-white to-primary-50"
        />
      )
    }
  ]

  return (
    <div className="min-h-screen">
      <SEOMeta
        title="AI Automation for Local Services - AI Agents for Small Business"
        description="CogniDrift's AI automation for local service businesses. AI agents handle bookings, calls, and customer communications for restaurants, salons, and more."
        keywords="AI automation for local services, AI agents for small business, AI workflow automation, business AI automation platform"
        url="/industries/local-services"
      />
      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pb-20 bg-white">
        <div ref={heroRef} className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 border border-blue-200"
          >
            Never Miss a Customer Call
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI for <span className="text-blue-600">Local Services</span>
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
                className="btn-primary px-8 py-4 text-lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </Link>
            <Link to="/resources/case-studies">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                See How It Works
              </motion.button>
            </Link>
          </div>
        </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: MapPin, value: 10, suffix: "K+", label: "Local Businesses", color: "text-blue-600" },
            { icon: Phone, value: 5, suffix: "M+", label: "Calls Handled", color: "text-blue-600" },
            { icon: TrendingUp, value: 45, suffix: "%", label: "More Bookings", color: "text-blue-600" },
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
        </div>
      </section>

      {/* Section Cards */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <SectionCard key={index} {...section} index={index} reversed={index % 2 === 1} />
          ))}
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 text-center relative overflow-hidden border-2 border-primary-100"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6 relative z-10 border border-blue-100">
            <Wrench className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Get Started</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6 relative z-10">
            Ready to <span className="bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">Grow Your Local Business?</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 relative z-10">
            Join thousands of local businesses using AI to capture more leads and bookings. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto btn-primary px-8 py-4 text-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/resources/case-studies">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300"
              >
                View Case Studies
              </motion.button>
            </Link>
          </div>
        </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LocalServices
