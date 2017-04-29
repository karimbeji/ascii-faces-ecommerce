const LiveReloadPlugin = require('webpack-livereload-plugin')
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
    new LiveReloadPlugin({
      appendScriptTag: true,
      quiet: true
    })
  ]
}

module.exports = config
