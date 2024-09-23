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
        'title': '#1b3764',
        'card-body': '#f4f8ff',
        'primary-hover': '#6c9df3'
      }
    },
  },
  plugins: [],
  important: true
}
