/**
 * PostCSS config for production env
 */

const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const cssmqpacker = require('css-mqpacker')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    autoprefixer({
      browsers: 'last 2 versions'
    }),
    pxtorem(),
    cssmqpacker,
    cssnano({
      discardComments: {
        removeAll: true
      }
    })
  ]
}
