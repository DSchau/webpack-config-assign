module.exports = {
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[chunkhash].[id].chunk.js'
  },
  module: {
    rules: [
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
    'loader-options-plugin'
  ]
};
