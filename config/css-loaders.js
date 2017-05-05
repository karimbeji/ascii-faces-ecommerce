/**
 * Define the style loader separated to use in development.
 * This loader build css styles in a javascript module.
 * @param  {Boolean} development If the env is development
 * @return {Object}              Loader object for webpack
 */
const getStyleLoader = (development) => (
  {
    loader: 'style-loader',
    options: {
      sourceMap: development
    }
  }
)

/**
 * Define all css loaders.
 * @param  {Boolean}  development       If the env is development
 * @param  {Boolean} includeStyleLoader If has to include style loader
 * @return {Array}                      Array of loaders objects for webpack
 */
const getAllLoaders = (development, includeStyleLoader = true) => {
  const otherLoaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: development
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: development
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: development
      }
    }
  ]

  let ret = []

  if (includeStyleLoader) {
    ret.push(getStyleLoader(development))
  }

  for (let loader in otherLoaders) {
    ret.push(otherLoaders[loader])
  }

  return ret
}

module.exports = { getStyleLoader, getAllLoaders }
