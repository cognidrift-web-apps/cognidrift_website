import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../hooks/useAnalytics'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)

    // Track page view for analytics
    const pageTitle = document.title || 'CogniDrift'
    trackPageView(pathname, pageTitle)
  }, [pathname])

  return null
}

export default ScrollToTop
