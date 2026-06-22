import type { Config } from 'tailwindcss';

/**
 * Nexara design tokens — 1:1 with design/tokens (Figma variables ↔ CSS vars ↔ Tailwind).
 * Namespaced under `nx-*` so Tailwind's default palette is never clobbered.
 * Color carries meaning, never decoration: teal = chrome/actions, status = clinical signal.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '24px', lg: '40px' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        nx: {
          white: '#FFFFFF',
          teal: { 700: '#0E7C7B', 900: '#0B5C5A' },
          mint: { 50: '#E6F4F3', 500: '#3FBFB6' },
          charcoal: { 900: '#1F2933' },
          slate: { 500: '#5B6B79' },
          gray: { 100: '#F2F5F7', 200: '#E2E8ED', 300: '#CBD5DC' },
          success: '#1E9E6A',
          warning: '#E0A100',
          danger: '#D64545',
          info: '#2D7FF0',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        overline: ['11px', { lineHeight: '16px', letterSpacing: '0.06em', fontWeight: '600' }],
        caption: ['12px', { lineHeight: '16px', letterSpacing: '0.005em', fontWeight: '500' }],
        'label-m': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'body-m': ['14px', { lineHeight: '22px' }],
        'body-l': ['16px', { lineHeight: '24px' }],
        'heading-s': ['18px', { lineHeight: '26px', letterSpacing: '-0.005em', fontWeight: '600' }],
        'heading-m': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-l': ['32px', { lineHeight: '40px', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        // fluid hero
        'display-2xl': ['clamp(2rem, 1.1rem + 4.2vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
      },
      spacing: {
        'nx-1': '4px', 'nx-2': '8px', 'nx-3': '12px', 'nx-4': '16px',
        'nx-6': '24px', 'nx-8': '32px', 'nx-12': '48px', 'nx-16': '64px',
        'nx-24': '96px', 'nx-32': '128px',
      },
      borderRadius: { card: '8px', modal: '12px', pill: '999px' },
      boxShadow: {
        // restrained: this is the MAX elevation allowed by the brand
        card: '0 2px 8px rgba(15, 41, 46, 0.08)',
        'card-hover': '0 8px 24px rgba(15, 41, 46, 0.10)',
      },
      maxWidth: { prose: '68ch' },
      transitionTimingFunction: {
        // calm, no-bounce easing
        nx: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
