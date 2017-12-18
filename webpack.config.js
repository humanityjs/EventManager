const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/index.jsx'),
  output: {
    path: path.join(__dirname, 'dist/app/'),
    publicPath: '/app/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(jsx)$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared'),
        ],
        query: {
          presets: ['react', 'env'],
        },
      },
      {
        test: /\.(css)$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
};
