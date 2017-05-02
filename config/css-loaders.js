const getStyleLoader = (development) => (
  {
    loader: 'style-loader',
    options: {
      sourceMap: development
    }
  }
)

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
