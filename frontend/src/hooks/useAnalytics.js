import ReactGA from 'react-ga4'

// Initialize Google Analytics
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  })
}

// Track page views
export const trackPageView = (path, title) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title
  })
}

// Track custom events
export const trackEvent = (category, action, label, value) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  })
}

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  trackEvent('Button', 'click', `${buttonName} - ${location}`)
}

// Track form submissions
export const trackFormSubmit = (formName, success = true) => {
  trackEvent('Form', success ? 'submit_success' : 'submit_error', formName)
}

// Track CTA clicks
export const trackCTAClick = (ctaName, destination) => {
  trackEvent('CTA', 'click', `${ctaName} -> ${destination}`)
}

// Track video plays
export const trackVideoPlay = (videoName) => {
  trackEvent('Video', 'play', videoName)
}

// Track demo requests
export const trackDemoRequest = (source) => {
  trackEvent('Conversion', 'demo_request', source)
}

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  trackEvent('Engagement', 'scroll_depth', `${percentage}%`)
}

// Track time on page
export const trackTimeOnPage = (seconds, pageName) => {
  trackEvent('Engagement', 'time_on_page', pageName, seconds)
}

// Custom hook for analytics
export const useAnalytics = () => {
  return {
    trackPageView,
    trackEvent,
    trackButtonClick,
    trackFormSubmit,
    trackCTAClick,
    trackVideoPlay,
    trackDemoRequest,
    trackScrollDepth,
    trackTimeOnPage
  }
}

export default useAnalytics
