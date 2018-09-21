const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    stats: {
      colors: true
    }
  },
  devtool: 'eval-source-map'
})
