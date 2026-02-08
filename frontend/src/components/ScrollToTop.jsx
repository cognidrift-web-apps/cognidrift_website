import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../hooks/useAnalytics'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there's a hash in the URL, scroll to that element
    if (hash) {
      const elementId = hash.slice(1)
      let attempts = 0
      const maxAttempts = 50 // Try for up to 5 seconds (50 * 100ms)

      // Poll for the element since lazy-loaded content may not be ready immediately
      const scrollToElement = () => {
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(scrollToElement, 100)
        }
      }

      // Start polling after a brief initial delay
      setTimeout(scrollToElement, 100)
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
