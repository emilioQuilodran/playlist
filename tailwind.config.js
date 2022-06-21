const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./views/**/*pug", './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      margin: {
        '-10': '-0.5rem',
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
