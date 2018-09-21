const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'canvas-latex.js',
    library: 'CanvasLatex',
    libraryTarget: 'umd'
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
  }
}
