/**
 * webpack config for development env
 */

const LiveReloadPlugin = require('webpack-livereload-plugin')
const path = require('path')
const cssLoaders = require('./css-loaders')

const config = {
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'js/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: cssLoaders.getAllLoaders(true)
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin({
      appendScriptTag: true,
      quiet: true
    })
  ]
}

module.exports = config
