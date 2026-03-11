import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import { initGA } from './hooks/useAnalytics'
import { initAOS } from './utils/animations'

// Initialize Google Analytics
initGA()

// Initialize AOS (Animate On Scroll)
if (typeof window !== 'undefined') {
  initAOS()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
