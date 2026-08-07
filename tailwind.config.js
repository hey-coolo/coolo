/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Big Shoulders Display"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        hero: ['96px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        body: ['16px', { lineHeight: '1.2' }],
        h1: ['72px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h2: ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h3: ['32px', { lineHeight: '1.2' }],
      },
      spacing: {
        card: '80px',
        gutter: '96px',
        section: '160px',
      },
      maxWidth: {
        container: '1440px',
      },
      transitionDuration: {
        400: '400ms',
      },
      transitionTimingFunction: {
        'out-smooth': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      },
      scale: {
        105: '1.05',
      },
      colors: {
        background: '#0a0a0a',
        foreground: '#f4f4f0',
        surface: '#1a1a1a',
      }
    },
  },
  plugins: [],
}