// Nexara Tailwind theme — mirrors the Figma variable collections + nexara-tokens.css
// Usage: const nexara = require('./design/tokens/tailwind.theme'); module.exports = { theme: { extend: nexara } }

module.exports = {
  colors: {
    nx: {
      // primitives
      teal: { 700: '#0E7C7B', 900: '#0B5C5A' },
      mint: { 50: '#E6F4F3', 500: '#3FBFB6' },
      charcoal: { 900: '#1F2933' },
      slate: { 500: '#5B6B79' },
      gray: { 100: '#F2F5F7', 200: '#E2E8ED', 300: '#CBD5DC' },
      // semantic
      bg: { DEFAULT: '#FFFFFF', subtle: '#F2F5F7', brand: '#0E7C7B', 'brand-subtle': '#E6F4F3' },
      text: { primary: '#1F2933', secondary: '#5B6B79', 'on-brand': '#FFFFFF', brand: '#0E7C7B' },
      border: { DEFAULT: '#E2E8ED', strong: '#CBD5DC' },
      action: { primary: '#0E7C7B', 'primary-hover': '#0B5C5A' },
      accent: { mint: '#3FBFB6' },
      // status
      success: '#1E9E6A', warning: '#E0A100', danger: '#D64545', info: '#2D7FF0',
    },
  },
  spacing: {
    'nx-1': '4px', 'nx-2': '8px', 'nx-3': '12px', 'nx-4': '16px',
    'nx-6': '24px', 'nx-8': '32px', 'nx-12': '48px', 'nx-16': '64px',
  },
  borderRadius: { 'nx-sm': '8px', 'nx-md': '12px', 'nx-pill': '999px' },
  boxShadow: { 'nx-card': '0 2px 8px rgba(15, 41, 46, 0.08)' },
  fontFamily: { nx: ['Inter', 'system-ui', '-apple-system', 'sans-serif'] },
  fontSize: {
    'nx-display-xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
    'nx-heading-l':  ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
    'nx-heading-m':  ['24px', { lineHeight: '32px', letterSpacing: '-0.005em', fontWeight: '600' }],
    'nx-heading-s':  ['18px', { lineHeight: '26px', fontWeight: '600' }],
    'nx-body-l':     ['16px', { lineHeight: '24px', fontWeight: '400' }],
    'nx-body-m':     ['14px', { lineHeight: '22px', fontWeight: '400' }],
    'nx-label-m':    ['14px', { lineHeight: '20px', fontWeight: '500' }],
    'nx-caption':    ['12px', { lineHeight: '16px', letterSpacing: '0.005em', fontWeight: '500' }],
    'nx-overline':   ['11px', { lineHeight: '16px', letterSpacing: '0.06em', fontWeight: '600' }],
  },
};
