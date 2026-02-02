import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

// Hook for basic scroll-triggered fade in animation
export const useScrollFadeIn = (options = {}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !elementRef.current) return

    const element = elementRef.current
    const defaultOptions = {
      start: 'top 80%',
      duration: 0.8,
      y: 50,
      ...options
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(element,
        { opacity: 0, y: defaultOptions.y },
        {
          opacity: 1,
          y: 0,
          duration: defaultOptions.duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: defaultOptions.start,
            toggleActions: 'play none none none'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [options])

  return elementRef
}

// Hook for staggered children animation
export const useStaggerAnimation = (options = {}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return

    const container = containerRef.current
    const children = container.children
    const defaultOptions = {
      stagger: 0.1,
      duration: 0.6,
      y: 30,
      childSelector: null,
      ...options
    }

    const targets = defaultOptions.childSelector
      ? container.querySelectorAll(defaultOptions.childSelector)
      : children

    const ctx = gsap.context(() => {
      gsap.fromTo(targets,
        { opacity: 0, y: defaultOptions.y },
        {
          opacity: 1,
          y: 0,
          duration: defaultOptions.duration,
          stagger: defaultOptions.stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [options])

  return containerRef
}

// Hook for parallax effect
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !elementRef.current) return

    const element = elementRef.current

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })

    return () => ctx.revert()
  }, [speed])

  return elementRef
}

// Hook for scale animation on scroll
export const useScrollScale = (options = {}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !elementRef.current) return

    const element = elementRef.current
    const defaultOptions = {
      start: 'top 85%',
      duration: 0.8,
      scale: 0.9,
      ...options
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(element,
        { opacity: 0, scale: defaultOptions.scale },
        {
          opacity: 1,
          scale: 1,
          duration: defaultOptions.duration,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: element,
            start: defaultOptions.start,
            toggleActions: 'play none none none'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [options])

  return elementRef
}

// Hook for horizontal slide animation
export const useSlideIn = (direction = 'left', options = {}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !elementRef.current) return

    const element = elementRef.current
    const defaultOptions = {
      start: 'top 80%',
      duration: 0.8,
      distance: 100,
      ...options
    }

    const xValue = direction === 'left' ? -defaultOptions.distance : defaultOptions.distance

    const ctx = gsap.context(() => {
      gsap.fromTo(element,
        { opacity: 0, x: xValue },
        {
          opacity: 1,
          x: 0,
          duration: defaultOptions.duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: defaultOptions.start,
            toggleActions: 'play none none none'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [direction, options])

  return elementRef
}

// Hook for text reveal animation
export const useTextReveal = (options = {}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !elementRef.current) return

    const element = elementRef.current
    const defaultOptions = {
      start: 'top 80%',
      duration: 1,
      ...options
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(element,
        {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          opacity: 0
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          duration: defaultOptions.duration,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: element,
            start: defaultOptions.start,
            toggleActions: 'play none none none'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [options])

  return elementRef
}

// Hook for pinned scroll section
export const usePinnedScroll = (options = {}) => {
  const triggerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !triggerRef.current || !contentRef.current) return

    const defaultOptions = {
      start: 'top top',
      end: '+=100%',
      ...options
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: defaultOptions.start,
        end: defaultOptions.end,
        pin: contentRef.current,
        pinSpacing: true
      })
    })

    return () => ctx.revert()
  }, [options])

  return { triggerRef, contentRef }
}

export default {
  useScrollFadeIn,
  useStaggerAnimation,
  useParallax,
  useScrollScale,
  useSlideIn,
  useTextReveal,
  usePinnedScroll
}
