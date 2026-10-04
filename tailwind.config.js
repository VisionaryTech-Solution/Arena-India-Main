/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#060B1F', 900: '#0A1128', 800: '#101A3A', 700: '#1A2650', 600: '#2A3868' },
        accent: { DEFAULT: '#FF7A1A', soft: '#FFB27A', deep: '#E55F00' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '78rem' },
    },
  },
  plugins: [],
}
