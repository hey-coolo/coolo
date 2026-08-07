/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Big Shoulders Display"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        // Enforcing the 96px hero and 16px body with 1.2 heading ratio
        'hero': ['96px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'body': ['16px', { lineHeight: '1.5' }],
        'h1': ['72px', { lineHeight: '1.2' }],
        'h2': ['48px', { lineHeight: '1.2' }],
        'h3': ['32px', { lineHeight: '1.2' }],
      },
      spacing: {
        // Semantic spacing based on Design DNA
        'card': '80px',      // 80px inside cards
        'gutter': '96px',    // 96px gutters
        'section': '160px',  // 160px between sections
        // Standard Tailwind mapping for these specific values if preferred via utility
        '20': '80px',
        '24': '96px',
        '40': '160px',
      },
      maxWidth: {
        'container': '1440px',
      },
      transitionDuration: {
        '400': '400ms', // 0.4s ease-out requirement
      },
      transitionTimingFunction: {
        'out-smooth': 'cubic-bezier(0.25, 1, 0.5, 1)', // Refined ease-out for premium feel
      },
      scale: {
        '105': '1.05', // Scale 1.05 requirement
      },
      colors: {
        // Baseline COOLO brand colors (to be expanded based on specific visual identity)
        background: '#0a0a0a',
        foreground: '#f4f4f0',
        surface: '#1a1a1a',
      }
    },
  },
  plugins: [],
}