import assign from 'object-assign';

import webpackAssign from '../src/assign';

it('returns empty object if no extensions', () => {
  expect(webpackAssign()).toEqual({});
});

it('returns base config if nothing to extend', () => {
  const webpackConfig = {
    entry: {
      name: './src/index'
    }
  };

  expect(webpackAssign(webpackConfig)).toEqual(webpackConfig);
});

it('extends non-special properties with one extension', () => {
  const webpackConfig = {
    entry: {
      name: './src/index'
    }
  };

  const extendConfig = {
    entry: {
      vendor: './src/vendor'
    }
  };

  expect(webpackAssign(webpackConfig, extendConfig)).toEqual({
    entry: assign(webpackConfig.entry, extendConfig.entry)
  });
});

it('replaces non-special properties with one extension', () => {
  const webpackConfig = {
    entry: {
      name: './src/index'
    }
  };

  const extendConfig = {
    entry: {
      name: './src/other-index'
    }
  };

  expect(webpackAssign(webpackConfig, extendConfig)).toEqual(extendConfig);
});

it('handles array entry by using last array', () => {
  const webpackConfig = {
    entry: [
      'react-hot/webpack',
      './index'
    ]
  };

  const extendConfig = {
    entry: [
      './index'
    ]
  };

  expect(webpackAssign(webpackConfig, extendConfig)).toEqual(extendConfig);
});

it('replaces dev-tool', () => {
  const webpackConfig = {
    devtool: 'cheap-eval-source-map'
  };

  const extendConfig = {
    devtool: 'source-map'
  };

  expect(webpackAssign(webpackConfig, extendConfig)).toEqual(extendConfig);
});

it('merges webpack-dev-server property', () => {
  const webpackConfig = {
    webpackDevServer: {
      noInfo: true,
      port: 9000
    }
  };

  const extendConfig = {
    webpackDevServer: {
      quiet: true
    }
  };

  expect(webpackAssign(webpackConfig, extendConfig)).toEqual({
    webpackDevServer: assign(webpackConfig.webpackDevServer, extendConfig.webpackDevServer)
  });
});

it('concats plugins', () => {
  const webpackConfig = {
    plugins: [
      'html-webpack-plugin'
    ]
  };

  const extendConfig = {
    plugins: [
      'extract-text-webpack-plugin'
    ]
  };

  expect(webpackAssign(webpackConfig, extendConfig)).toEqual({
    plugins: webpackConfig.plugins.concat(extendConfig.plugins)
  });
});

it('extends module.loaders', () => {
  const webpackConfig = {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        }
      ]
    }
  };

  const extendConfig = {
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel']
        }
      ]
    }
  };

  expect(webpackAssign(webpackConfig, extendConfig)).toEqual({
    module: {
      loaders: webpackConfig.module.loaders.concat(extendConfig.module.loaders)
    }
  });
});

it('replaces module.loaders, if test matches', () => {
  const webpackConfig = {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        }
      ]
    }
  };

  const extendConfig = {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['extract-text', 'style', 'css']
        }
      ]
    }
  };

  expect(webpackAssign(webpackConfig, extendConfig)).toEqual(extendConfig);
});

it('extends module.rules', () => {
  const webpackConfig = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style', 'css']
        }
      ]
    }
  };

  const extendConfig = {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel']
        }
      ]
    }
  };

  expect(webpackAssign(webpackConfig, extendConfig)).toEqual({
    module: {
      rules: webpackConfig.module.rules.concat(extendConfig.module.rules)
    }
  });
});

it('replaces module.rules, if test matches', () => {
  const webpackConfig = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style', 'css']
        }
      ]
    }
  };

  const extendConfig = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['extract-text', 'style', 'css']
        }
      ]
    }
  };

  expect(webpackAssign(webpackConfig, extendConfig)).toEqual(extendConfig);
});
