const webpack = require('webpack')
const path = require('path')

const config = {
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js'
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
    })
  ],
  stats: 'none'
}

module.exports = config
