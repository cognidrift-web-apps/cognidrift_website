import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../hooks/useAnalytics'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there's a hash in the URL, scroll to that element
    if (hash) {
      // Small delay to ensure the DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Scroll to top on route change (no hash)
      window.scrollTo(0, 0)
    }

    // Track page view for analytics
    const pageTitle = document.title || 'CogniDrift'
    trackPageView(pathname, pageTitle)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
