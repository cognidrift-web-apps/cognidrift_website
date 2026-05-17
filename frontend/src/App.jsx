import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'

// Lazy load all pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Pricing = lazy(() => import('./pages/Pricing'))

// Product Pages
const CogniVoice = lazy(() => import('./pages/products/CogniVoice'))
const CogniVoicePricing = lazy(() => import('./pages/products/CogniVoicePricing'))
const CogniChat = lazy(() => import('./pages/products/CogniChat'))
const CogniChatPricing = lazy(() => import('./pages/products/CogniChatPricing'))
const SmsAgent = lazy(() => import('./pages/products/SmsAgent'))
const AiCrm = lazy(() => import('./pages/products/AiCrm'))
const SmartTickets = lazy(() => import('./pages/products/SmartTickets'))
const AiCalendar = lazy(() => import('./pages/products/AiCalendar'))
const CogniReachCalls = lazy(() => import('./pages/products/CogniReachCalls'))
const CogniReachSms = lazy(() => import('./pages/products/CogniReachSms'))
const CogniFlow = lazy(() => import('./pages/products/CogniFlow'))
const Dashboards = lazy(() => import('./pages/products/Dashboards'))
const CogniHub = lazy(() => import('./pages/products/CogniHub'))
const CogniHubPricing = lazy(() => import('./pages/products/CogniHubPricing'))

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
const SmsConsent = lazy(() => import('./pages/SmsConsent'))

// FAQ Page
const FAQPage = lazy(() => import('./pages/FAQ'))

// Integrations Page
const Integrations = lazy(() => import('./pages/Integrations'))

// Error Page
const NotFound = lazy(() => import('./pages/NotFound'))


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Product Routes */}
              <Route path="/products/cognivoice" element={<CogniVoice />} />
              <Route path="/products/cognivoice/pricing" element={<CogniVoicePricing />} />
              <Route path="/products/cognichat" element={<CogniChat />} />
              <Route path="/products/cognichat/pricing" element={<CogniChatPricing />} />
              <Route path="/products/sms-agent" element={<SmsAgent />} />
              <Route path="/products/ai-crm" element={<AiCrm />} />
              <Route path="/products/smart-ticketing" element={<SmartTickets />} />
              <Route path="/products/ai-calendar" element={<AiCalendar />} />
              <Route path="/products/cognireach-calls" element={<CogniReachCalls />} />
              <Route path="/products/cognireach-sms" element={<CogniReachSms />} />
              <Route path="/products/cogniflow" element={<CogniFlow />} />
              <Route path="/products/dashboards" element={<Dashboards />} />
              <Route path="/products/cognihub" element={<CogniHub />} />
              <Route path="/products/cognihub/pricing" element={<CogniHubPricing />} />

              {/* Legacy route redirects */}
              <Route path="/products/phone-receptionist" element={<Navigate to="/products/cognivoice" replace />} />
              <Route path="/products/phone-receptionist/pricing" element={<Navigate to="/products/cognivoice/pricing" replace />} />
              <Route path="/products/web-chatbot" element={<Navigate to="/products/cognichat" replace />} />
              <Route path="/products/web-chatbot/pricing" element={<Navigate to="/products/cognichat/pricing" replace />} />
              <Route path="/products/web-voicebot" element={<Navigate to="/products/cognivoice" replace />} />
              <Route path="/products/automated-calls" element={<Navigate to="/products/cognireach-calls" replace />} />
              <Route path="/products/automated-sms" element={<Navigate to="/products/cognireach-sms" replace />} />
              <Route path="/products/ai-automation" element={<Navigate to="/products/cogniflow" replace />} />
              <Route path="/products/multi-model-chat" element={<Navigate to="/products/cognihub" replace />} />

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
              <Route path="/sms-consent" element={<SmsConsent />} />

              {/* FAQ Route */}
              <Route path="/faq" element={<FAQPage />} />

              {/* Integrations Route */}
              <Route path="/integrations" element={<Integrations />} />

              {/* 404 Catch-all */}
              <Route path="*" element={<NotFound />} />
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
