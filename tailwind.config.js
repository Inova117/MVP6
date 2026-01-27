/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sage Green Primary Palette
        sage: {
          50: '#f5f7f4',
          100: '#e8ebe5',
          200: '#d1d7cb',
          300: '#b3bda8',
          400: '#96a387',
          500: '#7B896F', // Primary sage green
          600: '#667358',
          700: '#525c47',
          800: '#434b3b',
          900: '#383f32',
        },
        // Warm Accent Colors
        warm: {
          peach: '#F4A261',
          cream: '#FDFCFA',
          sand: '#E8E6E3',
        },
        // Semantic Colors (Soft & Approachable)
        success: {
          light: '#D4EDDA',
          DEFAULT: '#6EBF8B',
          dark: '#4A9D6A',
        },
        warning: {
          light: '#FFF3CD',
          DEFAULT: '#F4C542',
          dark: '#D4A017',
        },
        danger: {
          light: '#F8D7DA',
          DEFAULT: '#E07A7A',
          dark: '#C85A5A',
        },
        // CSS variables for theming
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          light: 'hsl(var(--primary-light))',
          dark: 'hsl(var(--primary-dark))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Crimson Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.75' }],
        'lg': ['1.125rem', { lineHeight: '1.75' }],
        'xl': ['1.25rem', { lineHeight: '1.75' }],
        '2xl': ['1.5rem', { lineHeight: '1.6' }],
        '3xl': ['1.875rem', { lineHeight: '1.5' }],
        '4xl': ['2.25rem', { lineHeight: '1.4' }],
        '5xl': ['3rem', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'soft-xl': '0 16px 48px rgba(0, 0, 0, 0.1)',
        'sage': '0 4px 16px rgba(123, 137, 111, 0.15)',
        'sage-lg': '0 8px 24px rgba(123, 137, 111, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms ease-in',
        'slide-up': 'slideUp 350ms ease-out',
        'scale-in': 'scaleIn 150ms ease-out',
        'gentle-bounce': 'gentleBounce 500ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
