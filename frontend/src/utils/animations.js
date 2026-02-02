import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Initialize AOS with custom settings
export const initAOS = () => {
  if (prefersReducedMotion()) {
    AOS.init({
      disable: true
    })
    return
  }

  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
    delay: 0,
    anchorPlacement: 'top-bottom',
  })
}

// Refresh AOS on route change
export const refreshAOS = () => {
  AOS.refresh()
}

// GSAP Fade In Up Animation
export const fadeInUp = (element, delay = 0) => {
  if (prefersReducedMotion()) return

  gsap.fromTo(element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out'
    }
  )
}

// GSAP Stagger Animation for multiple elements
export const staggerFadeIn = (elements, staggerDelay = 0.1) => {
  if (prefersReducedMotion()) return

  gsap.fromTo(elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: staggerDelay,
      ease: 'power2.out'
    }
  )
}

// GSAP Scale In Animation
export const scaleIn = (element, delay = 0) => {
  if (prefersReducedMotion()) return

  gsap.fromTo(element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay,
      ease: 'back.out(1.7)'
    }
  )
}

// GSAP Parallax Effect
export const createParallax = (element, speed = 0.5) => {
  if (prefersReducedMotion()) return null

  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
}

// GSAP Text Reveal Animation
export const textReveal = (element, delay = 0) => {
  if (prefersReducedMotion()) return

  gsap.fromTo(element,
    {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      opacity: 0
    },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power4.inOut'
    }
  )
}

// GSAP Scroll-triggered reveal
export const scrollReveal = (element, options = {}) => {
  if (prefersReducedMotion()) return null

  const defaultOptions = {
    trigger: element,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  }

  return gsap.fromTo(element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { ...defaultOptions, ...options }
    }
  )
}

// GSAP Counter Animation
export const animateCounter = (element, endValue, duration = 2, suffix = '') => {
  if (prefersReducedMotion()) {
    element.textContent = endValue + suffix
    return
  }

  const counter = { value: 0 }
  gsap.to(counter, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(counter.value) + suffix
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true
    }
  })
}

// Kill all ScrollTrigger instances (for cleanup)
export const killScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

// Magnetic button effect
export const magneticButton = (element) => {
  if (prefersReducedMotion()) return

  const button = element
  const boundingRect = button.getBoundingClientRect()

  const handleMouseMove = (e) => {
    const x = e.clientX - boundingRect.left - boundingRect.width / 2
    const y = e.clientY - boundingRect.top - boundingRect.height / 2

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    })
  }

  button.addEventListener('mousemove', handleMouseMove)
  button.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    button.removeEventListener('mousemove', handleMouseMove)
    button.removeEventListener('mouseleave', handleMouseLeave)
  }
}

export { gsap, ScrollTrigger }
