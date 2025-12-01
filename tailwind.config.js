/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gh-dark': '#0d1117',
        'gh-gray': '#161b22',
        'gh-border': '#30363d',
        'gh-accent': '#58a6ff',
        'gh-text': '#c9d1d9',
      }
    },
  },
  plugins: [],
}
