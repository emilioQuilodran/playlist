const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./views/**/*pug", './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
