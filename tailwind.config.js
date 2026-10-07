/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          600: '#CC0000',
          700: '#AA0000',
          500: '#EE1111',
        },
        charcoal: { DEFAULT: '#1A1A1A', light: '#2A2A2A', dark: '#111111', darker: '#111111' },
        offwhite: '#F5F5F5',
        // keep navy for any legacy references
        navy: { 950: '#060B1F', 900: '#0A1128', 800: '#101A3A', 700: '#1A2650', 600: '#2A3868' },
        accent: { DEFAULT: '#CC0000', soft: '#FF4444', deep: '#990000' },
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
