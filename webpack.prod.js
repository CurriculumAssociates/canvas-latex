const merge = require('webpack-merge')
const UglifyJS = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|\.spec\.js)/,
        use: [
          {
            loader: 'webpack-strip-block'
          }
        ]
      }
    ]
  },
  plugins: [
    new UglifyJS()
  ]
})
