import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RetellChatWidget from './components/RetellChatWidget'
import ScrollToTop from './components/ScrollToTop'

// Lazy load all pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Pricing = lazy(() => import('./pages/Pricing'))

// Solutions Pages
const Healthcare = lazy(() => import('./pages/solutions/Healthcare'))
const RealEstate = lazy(() => import('./pages/solutions/RealEstate'))
const ProfessionalServices = lazy(() => import('./pages/solutions/ProfessionalServices'))
const CallCenter = lazy(() => import('./pages/solutions/CallCenter'))

// Resources Pages
const Blog = lazy(() => import('./pages/resources/Blog'))
const CaseStudies = lazy(() => import('./pages/resources/CaseStudies'))
const HelpCenter = lazy(() => import('./pages/resources/HelpCenter'))

// Legal Pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))

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
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Solutions Routes */}
              <Route path="/solutions/healthcare" element={<Healthcare />} />
              <Route path="/solutions/real-estate" element={<RealEstate />} />
              <Route path="/solutions/professional-services" element={<ProfessionalServices />} />
              <Route path="/solutions/call-center" element={<CallCenter />} />

              {/* Resources Routes */}
              <Route path="/resources/blog" element={<Blog />} />
              <Route path="/resources/case-studies" element={<CaseStudies />} />
              <Route path="/resources/help-center" element={<HelpCenter />} />

              {/* Legal Routes */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <RetellChatWidget />
      </div>
    </Router>
  )
}

export default App
