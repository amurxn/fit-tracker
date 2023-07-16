/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: '#DB3C38',
        white: '#FFF',
        black: '#141414',
        darkGray: '#242424',
        lightGray: '#7B7B7B'
      },
    },
  },
  plugins: [],
}
