const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'canvas-latex.js',
    library: 'CanvasLatex',
    libraryTarget: 'umd'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'demo')
    },
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules\//
        ],
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  plugins: [
  ]
}
