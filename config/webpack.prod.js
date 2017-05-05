/**
 * webpack config for production env
 */

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
        use: ExtractTextPlugin.extract({
          use: cssLoaders.getAllLoaders(false, false),
          fallback: cssLoaders.getStyleLoader()
        })
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new ExtractTextPlugin('css/styles.css')
  ],
  stats: 'none'
}

module.exports = config
