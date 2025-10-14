module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'Lato', 'sans-serif'],
      },
      colors: {
        emerald: {
          400: '#34d399',
          600: '#059669',
          700: '#047857',
        },
      },
    },
  },
  plugins: [],
}; 