/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'secondary': '#01001a',
        'primary': '#0160ff',
        'white': '#ffffff',
        'title': '#1b3764'
      }
    },
  },
  plugins: [],
  important: true
}
