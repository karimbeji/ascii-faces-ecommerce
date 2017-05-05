/**
 * PostCSS config for development env
 */

const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  plugins: [
    autoprefixer({
      browsers: 'last 2 versions'
    }),
    pxtorem()
  ]
}
