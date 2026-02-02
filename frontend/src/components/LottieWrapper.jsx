import { useMemo } from 'react'
import Lottie from 'lottie-react'

const LottieWrapper = ({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
  style = {},
  onComplete,
  onLoopComplete,
  speed = 1,
  ...props
}) => {
  const defaultStyle = useMemo(() => ({
    width: '100%',
    height: '100%',
    ...style
  }), [style])

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    // Return static first frame when reduced motion is preferred
    return (
      <div className={className} style={defaultStyle}>
        <Lottie
          animationData={animationData}
          loop={false}
          autoplay={false}
          style={defaultStyle}
          {...props}
        />
      </div>
    )
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={defaultStyle}
      onComplete={onComplete}
      onLoopComplete={onLoopComplete}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice'
      }}
      {...props}
    />
  )
}

export default LottieWrapper
