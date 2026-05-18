import SEOMeta from '../../components/SEOMeta'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Stethoscope, Heart, Brain, Activity, Pill, PawPrint,
  Phone, Calendar, Clock, Shield, CheckCircle2, ArrowRight,
  Users, TrendingUp, Star, MessageSquare, Bell, FileText,
  Zap, Target, Award, HeartPulse
} from 'lucide-react'
import AnimatedCounter from '../../components/ui/AnimatedCounter'
import SectionCard from '../../components/ui/SectionCard'

const Healthcare = () => {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Healthcare Sections Data
  const sections = [
    {
      icon: Stethoscope,
      title: "Medical & Dental Practices",
      description: "Streamline patient scheduling, reminders, and triage for medical and dental offices.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 85, suffix: "%", label: "Call Answered" },
        { value: 40, suffix: "%", label: "Less No-Shows" },
        { value: 24, suffix: "/7", label: "Availability" }
      ],
      features: [
        "Automated appointment scheduling & confirmations",
        "Prescription refill request handling",
        "Insurance verification assistance",
        "New patient intake automation",
        "Emergency call triage & routing"
      ]
    },
    {
      icon: Heart,
      title: "Senior Living & Memory Care",
      description: "Compassionate communication solutions for families and caregivers.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 98, suffix: "%", label: "Family Satisfaction" },
        { value: 60, suffix: "%", label: "Faster Response" },
        { value: 100, suffix: "%", label: "HIPAA Compliant" }
      ],
      features: [
        "Family check-in call management",
        "Care update notifications",
        "Visit scheduling coordination",
        "Emergency alert routing",
        "Multi-language family support"
      ]
    },
    {
      icon: Brain,
      title: "Mental Health & Therapy",
      description: "Sensitive and confidential intake and appointment management.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 92, suffix: "%", label: "Patient Privacy" },
        { value: 35, suffix: "%", label: "More Bookings" },
        { value: 50, suffix: "%", label: "Admin Reduced" }
      ],
      features: [
        "Confidential intake processing",
        "Therapy session scheduling",
        "Crisis call detection & escalation",
        "Insurance & billing inquiries",
        "Telehealth appointment setup"
      ]
    },
    {
      icon: Activity,
      title: "Physical Therapy & Rehab",
      description: "Treatment scheduling, progress tracking, and patient follow-ups.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 45, suffix: "%", label: "More Sessions" },
        { value: 30, suffix: "%", label: "Better Retention" },
        { value: 70, suffix: "%", label: "Time Saved" }
      ],
      features: [
        "Treatment session scheduling",
        "Exercise reminder calls",
        "Progress check-in automation",
        "Insurance pre-authorization",
        "Referral coordination"
      ]
    },
    {
      icon: Pill,
      title: "Urgent Care & Medical Spas",
      description: "Walk-in management, wait times, and consultation scheduling.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 65, suffix: "%", label: "Shorter Wait" },
        { value: 80, suffix: "%", label: "Pre-registered" },
        { value: 55, suffix: "%", label: "More Bookings" }
      ],
      features: [
        "Real-time wait time updates",
        "Pre-registration automation",
        "Treatment consultation booking",
        "Follow-up appointment scheduling",
        "Membership & package inquiries"
      ]
    },
    {
      icon: PawPrint,
      title: "Veterinary Clinics",
      description: "Pet care appointments, reminders, and owner communication.",
      color: "text-blue-600",
      iconBg: "bg-blue-100/70",
      bgGradient: "bg-gradient-to-br from-blue-50 via-white to-primary-50",
      stats: [
        { value: 90, suffix: "%", label: "Owner Satisfaction" },
        { value: 40, suffix: "%", label: "More Appointments" },
        { value: 25, suffix: "%", label: "Revenue Growth" }
      ],
      features: [
        "Pet appointment scheduling",
        "Vaccination & checkup reminders",
        "Prescription refill requests",
        "Emergency triage routing",
        "Boarding & grooming bookings"
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <SEOMeta
        title="AI Automation for Healthcare - Medical AI Agents & Workflows"
        description="CogniDrift's AI automation solutions for healthcare automate patient scheduling, call handling, and communications. AI agents built for medical practices and hospitals."
        keywords="AI automation for healthcare, medical AI agents, AI workflow automation, AI agents for business"
        url="/industries/healthcare"
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
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 border border-blue-200"
          >
            HIPAA Compliant AI Solutions
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI for <span className="text-blue-600">Healthcare</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Transform patient experience with HIPAA-compliant AI receptionists. From medical practices to veterinary clinics,
            automate calls, scheduling, and patient communication.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-4 text-lg"
              >
                Schedule a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </Link>
            <Link to="/resources/case-studies">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                View Case Studies
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
            { icon: Users, value: 500, suffix: "+", label: "Healthcare Clients", color: "text-blue-600" },
            { icon: Phone, value: 2, suffix: "M+", label: "Calls Handled", color: "text-blue-600" },
            { icon: Star, value: 98, suffix: "%", label: "HIPAA Compliance", color: "text-blue-600" },
            { icon: Clock, value: 24, suffix: "/7", label: "Availability", color: "text-blue-600" }
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
        <div className="grid lg:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <SectionCard key={index} {...section} index={index} />
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
            <Stethoscope className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Get Started</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6 relative z-10">
            Ready to <span className="bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">Transform Your Healthcare Practice?</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 relative z-10">
            Join 500+ healthcare providers using CogniDrift to automate patient communication while maintaining HIPAA compliance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto btn-primary px-8 py-4 text-lg"
              >
                Get Started Today
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

export default Healthcare
