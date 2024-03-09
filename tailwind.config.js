/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js,ejs}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway']
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["nord", "business"],
  },
}
