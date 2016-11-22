const path = require('path');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    'webpack-config-assign': [
      './src/index'
    ],
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist/')
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        include: [path.join(__dirname, 'src')],
        use: [
          'react-hot-loader/webpack',
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    'html-webpack-plugin',
    'no-errors-plugin'
  ]
};
