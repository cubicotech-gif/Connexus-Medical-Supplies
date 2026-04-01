module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00B4D8",
          50: "#E5F7FB",
          100: "#CCEFF7",
          500: "#00B4D8",
          600: "#0090AD",
          700: "#006C82",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
