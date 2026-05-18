import { useRef } from 'react'

export function useFirstMount() {
  const isFirst = useRef(true)
  if (isFirst.current) {
    isFirst.current = false
    return true
  }
  return false
}

export function usePageAnimation() {
  const isFirstMount = useRef(true)
  const skipAnimation = !isFirstMount.current
  isFirstMount.current = false

  return {
    heroInitial: skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    heroAnimate: { opacity: 1, y: 0 },
    iconInitial: skipAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
    iconAnimate: { opacity: 1, scale: 1 },
  }
}
