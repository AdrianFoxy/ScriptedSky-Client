/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-color': 'var(--accent-color)',
        'hover-accent-color': 'var(--hover-accent-color)'
      }
    },
  },
  plugins: [],
}
