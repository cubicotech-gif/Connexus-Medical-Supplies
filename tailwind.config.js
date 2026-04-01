module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00AFF0',
          50: '#E0F7FF',
          100: '#B3ECFF',
          200: '#80DFFF',
          300: '#4DD2FF',
          400: '#26C8FF',
          500: '#00AFF0',
          600: '#0098D6',
          700: '#007AB3',
          800: '#005C8A',
          900: '#003D5C',
        },
        navy: {
          DEFAULT: '#1E3A5F',
          50: '#E8EDF3',
          100: '#C5D1E0',
          200: '#9FB3CA',
          300: '#7995B4',
          400: '#5C7EA3',
          500: '#3F6792',
          600: '#1E3A5F',
          700: '#182F4D',
          800: '#12243B',
          900: '#0C1929',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
