import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import ScrollToTop from './components/ScrollToTop'

// Lazy load all pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Pricing = lazy(() => import('./pages/Pricing'))

// Product Pages
const PhoneReceptionist = lazy(() => import('./pages/products/PhoneReceptionist'))
const WebChatbot = lazy(() => import('./pages/products/WebChatbot'))
const WebVoicebot = lazy(() => import('./pages/products/WebVoicebot'))
const SmsAgent = lazy(() => import('./pages/products/SmsAgent'))
const AiCrm = lazy(() => import('./pages/products/AiCrm'))
const SmartTickets = lazy(() => import('./pages/products/SmartTickets'))
const AiCalendar = lazy(() => import('./pages/products/AiCalendar'))
const AutomatedCalls = lazy(() => import('./pages/products/AutomatedCalls'))
const AutomatedSms = lazy(() => import('./pages/products/AutomatedSms'))
const AiAutomation = lazy(() => import('./pages/products/AiAutomation'))
const Dashboards = lazy(() => import('./pages/products/Dashboards'))

// Industries Pages
const Healthcare = lazy(() => import('./pages/solutions/Healthcare'))
const LocalServices = lazy(() => import('./pages/solutions/LocalServices'))
const ProfessionalServices = lazy(() => import('./pages/solutions/ProfessionalServices'))
const CallCenters = lazy(() => import('./pages/solutions/CallCenters'))

// Resources Pages
const Blog = lazy(() => import('./pages/resources/Blog'))
const BlogPost = lazy(() => import('./pages/resources/BlogPost'))
const CaseStudies = lazy(() => import('./pages/resources/CaseStudies'))
const HelpCenter = lazy(() => import('./pages/resources/HelpCenter'))

// Legal Pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))

// FAQ Page
const FAQPage = lazy(() => import('./pages/FAQ'))

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-offWhite">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-primary-400 rounded-full animate-spin animation-delay-200" style={{ animationDirection: 'reverse' }}></div>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Product Routes */}
              <Route path="/products/phone-receptionist" element={<PhoneReceptionist />} />
              <Route path="/products/web-chatbot" element={<WebChatbot />} />
              <Route path="/products/web-voicebot" element={<WebVoicebot />} />
              <Route path="/products/sms-agent" element={<SmsAgent />} />
              <Route path="/products/ai-crm" element={<AiCrm />} />
              <Route path="/products/smart-ticketing" element={<SmartTickets />} />
              <Route path="/products/ai-calendar" element={<AiCalendar />} />
              <Route path="/products/automated-calls" element={<AutomatedCalls />} />
              <Route path="/products/automated-sms" element={<AutomatedSms />} />
              <Route path="/products/ai-automation" element={<AiAutomation />} />
              <Route path="/products/dashboards" element={<Dashboards />} />

              {/* Industries Routes */}
              <Route path="/industries/healthcare" element={<Healthcare />} />
              <Route path="/industries/local-services" element={<LocalServices />} />
              <Route path="/industries/professional-services" element={<ProfessionalServices />} />
              <Route path="/industries/call-centers" element={<CallCenters />} />

              {/* Resources Routes */}
              <Route path="/resources/blog" element={<Blog />} />
              <Route path="/resources/blog/:slug" element={<BlogPost />} />
              <Route path="/resources/case-studies" element={<CaseStudies />} />
              <Route path="/resources/help-center" element={<HelpCenter />} />

              {/* Legal Routes */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />

              {/* FAQ Route */}
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  )
}

export default App
