/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Blue Palette (Electric Blue)
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // Main primary
          600: '#2563EB',  // Primary dark
          700: '#1D4ED8',  // Dark/hover
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Accent Colors
        accent: {
          cyan: '#06B6D4',
          indigo: '#6366F1',
          violet: '#8B5CF6',
        },
        // Neutrals
        neutral: {
          white: '#FFFFFF',
          offWhite: '#F8FAFC',
          lightBlue: '#EFF6FF',
          border: '#E2E8F0',
        },
        // Text Colors
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['3.75rem', { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.02em' }],
        'hero-lg': ['5rem', { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.02em' }],
        'hero-xl': ['6rem', { lineHeight: '1', fontWeight: '900', letterSpacing: '-0.03em' }],
        'section': ['3.5rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }],
        'section-lg': ['4rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'card-title': ['1.5rem', { lineHeight: '1.25', fontWeight: '700' }],
        'body-lg': ['1.25rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-xl': ['1.375rem', { lineHeight: '1.7', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'content': '1280px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 40px rgba(59, 130, 246, 0.15)',
        'button': '0 4px 14px rgba(59, 130, 246, 0.3)',
        'button-hover': '0 6px 20px rgba(59, 130, 246, 0.5)',
        'nav': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'notification': '0 10px 40px rgba(59, 130, 246, 0.12)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-cta': 'pulseCta 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(59, 130, 246, 0.8), 0 0 50px rgba(59, 130, 246, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseCta: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)' },
          '50%': { transform: 'scale(1.02)', boxShadow: '0 0 0 15px rgba(59, 130, 246, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
        'subtle-glow': 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
