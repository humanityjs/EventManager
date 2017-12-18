const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, '/client/index.jsx'),
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js?x)$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        include: path.join(__dirname, 'client'),
        exclude: /(node_modules|server|.vscode)/,
      },
      {
        test: /\.(css)$/,
        loaders: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};
