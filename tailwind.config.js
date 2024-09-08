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
        primary: '#3b82f6', 
        'primary-dark': '#2563eb', 
        secondary: '#06b6d4', 
        'secondary-dark': '#0891b2', 
      }
    },
  },
  plugins: [],
}