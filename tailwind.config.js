// tailwind.config.js
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00d8ff',
        'primary-dark': '#00a8cc',
        secondary: '#ff4081',
        'secondary-dark': '#cc3366',
      }
    },
  },
  plugins: [],
}