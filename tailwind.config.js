/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F4E5C2',
        darkBrown: '#3A2115',
        deepBrown: '#24140D',
        pirateRed: '#8E2424',
        gold: '#C89B3C',
        oceanBlue: '#173B57',
        deepOcean: '#0B2233',
        offWhite: '#FFF8E8',
      },
      fontFamily: {
        display: ['"Pirata One"', 'serif', 'cursive'],
        pirate: ['"Pirata One"', 'serif', 'cursive'],
        cinzel: ['"Cinzel Decorative"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}

