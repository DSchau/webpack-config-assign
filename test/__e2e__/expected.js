const path = require('path');

module.exports = {
  devtool: 'source-map',
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
    chunkFilename: '[chunkhash].[id].chunk.js',
    filename: '[name].[hash].js',
    path: path.join(__dirname, './dist/')
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        include: [path.join(__dirname, 'src')],
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'extract-text-plugin',
          'css-loader?modules&sourceMap&importLoaders=1',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    'html-webpack-plugin',
    'no-errors-plugin',
    'loader-options-plugin'
  ]
};
