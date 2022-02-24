const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  },
  devServer: {
    static: path.resolve(__dirname, './dist'),
    port: 3000,
    open: true,
  },
}
