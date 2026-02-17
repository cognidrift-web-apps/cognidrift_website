import { motion } from 'framer-motion'

/**
 * GlowCard - Reusable component with animated glow effect and liquid glass styling
 *
 * @param {React.ReactNode} children - Content to render inside the card
 * @param {string} className - Additional classes for the outer container
 * @param {string} glowColor - Gradient color scheme: 'cyan-purple' (default), 'blue', 'purple', 'green', 'orange'
 * @param {string} glowSize - Glow intensity: 'sm', 'md' (default), 'lg'
 * @param {boolean} showCornerAccents - Show corner border accents (default: true)
 * @param {boolean} animate - Enable glow animation (default: true)
 * @param {string} borderRadius - Border radius: 'xl', '2xl', '3xl' (default)
 * @param {string} padding - Inner padding: 'sm', 'md' (default), 'lg'
 */
const GlowCard = ({
  children,
  className = '',
  glowColor = 'cyan-purple',
  glowSize = 'md',
  showCornerAccents = true,
  animate = true,
  borderRadius = '3xl',
  padding = 'md'
}) => {
  // Glow color schemes
  const glowColors = {
    'cyan-purple': {
      outer: 'from-cyan-500/30 via-blue-500/30 to-purple-500/30',
      inner: 'from-cyan-400 via-blue-500 to-purple-500',
      accentStart: 'border-cyan-400/50',
      accentEnd: 'border-purple-400/50'
    },
    'blue': {
      outer: 'from-blue-500/30 via-blue-400/30 to-blue-600/30',
      inner: 'from-blue-400 via-blue-500 to-blue-600',
      accentStart: 'border-blue-400/50',
      accentEnd: 'border-blue-500/50'
    },
    'purple': {
      outer: 'from-purple-500/30 via-violet-500/30 to-indigo-500/30',
      inner: 'from-purple-400 via-violet-500 to-indigo-500',
      accentStart: 'border-purple-400/50',
      accentEnd: 'border-indigo-400/50'
    },
    'green': {
      outer: 'from-emerald-500/30 via-green-500/30 to-teal-500/30',
      inner: 'from-emerald-400 via-green-500 to-teal-500',
      accentStart: 'border-emerald-400/50',
      accentEnd: 'border-teal-400/50'
    },
    'orange': {
      outer: 'from-orange-500/30 via-amber-500/30 to-yellow-500/30',
      inner: 'from-orange-400 via-amber-500 to-yellow-500',
      accentStart: 'border-orange-400/50',
      accentEnd: 'border-yellow-400/50'
    },
    'red-purple': {
      outer: 'from-red-600/30 via-rose-500/30 to-purple-600/30',
      inner: 'from-red-500 via-rose-500 to-purple-600',
      accentStart: 'border-red-500/50',
      accentEnd: 'border-purple-500/50'
    }
  }

  // Glow size configurations
  const glowSizes = {
    sm: { outer: '-inset-2', inner: '-inset-0.5', blur: 'blur-lg' },
    md: { outer: '-inset-3', inner: '-inset-1', blur: 'blur-xl' },
    lg: { outer: '-inset-4', inner: '-inset-2', blur: 'blur-2xl' }
  }

  // Border radius options
  const radiusMap = {
    'xl': { outer: 'rounded-xl', inner: 'rounded-lg', accent: 'rounded-tl-xl rounded-br-xl' },
    '2xl': { outer: 'rounded-2xl', inner: 'rounded-xl', accent: 'rounded-tl-2xl rounded-br-2xl' },
    '3xl': { outer: 'rounded-3xl', inner: 'rounded-2xl', accent: 'rounded-tl-3xl rounded-br-3xl' }
  }

  // Padding options
  const paddingMap = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  }

  const colors = glowColors[glowColor] || glowColors['cyan-purple']
  const sizes = glowSizes[glowSize] || glowSizes['md']
  const radius = radiusMap[borderRadius] || radiusMap['3xl']
  const pad = paddingMap[padding] || paddingMap['md']

  return (
    <div className={`relative ${className}`}>
      {/* Outer Glow Effect */}
      <div
        className={`absolute ${sizes.outer} bg-gradient-to-r ${colors.outer} ${radius.outer} ${sizes.blur} ${animate ? 'animate-pulse-glow' : ''}`}
      />

      {/* Secondary Glow */}
      <div
        className={`absolute ${sizes.inner} bg-gradient-to-r ${colors.inner} ${radius.outer} opacity-20 blur-md`}
      />

      {/* Liquid Glass Frame */}
      <div className={`relative backdrop-blur-xl bg-white/40 border-2 border-white/60 ${radius.outer} ${pad} shadow-2xl`}>
        {/* Inner glass shine */}
        <div className={`absolute inset-0 ${radius.outer} bg-gradient-to-br from-white/50 via-transparent to-white/20 pointer-events-none`} />

        {/* Content */}
        <div className={`relative ${radius.inner} overflow-hidden`}>
          {children}
        </div>

        {/* Corner accents */}
        {showCornerAccents && (
          <>
            <div className={`absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-l-2 border-t-2 ${colors.accentStart} ${radius.accent.split(' ')[0]} pointer-events-none`} />
            <div className={`absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 border-r-2 border-b-2 ${colors.accentEnd} ${radius.accent.split(' ')[1]} pointer-events-none`} />
          </>
        )}
      </div>
    </div>
  )
}

export default GlowCard
