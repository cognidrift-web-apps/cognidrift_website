import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ElevenLabsWidget from './components/ElevenLabsWidget'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'

// Solutions Pages
import Healthcare from './pages/solutions/Healthcare'
import RealEstate from './pages/solutions/RealEstate'
import ProfessionalServices from './pages/solutions/ProfessionalServices'
import CallCenter from './pages/solutions/CallCenter'

// Resources Pages
import Blog from './pages/resources/Blog'
import CaseStudies from './pages/resources/CaseStudies'
import HelpCenter from './pages/resources/HelpCenter'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">
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
          </Routes>
        </main>
        <Footer />
        <ElevenLabsWidget />
      </div>
    </Router>
  )
}

export default App
