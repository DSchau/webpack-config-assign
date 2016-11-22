import test from 'ava';
import assign from 'object-assign';

import webpackAssign from '../src/assign';

test('it returns empty object if no extensions', t => {
  t.deepEqual(webpackAssign(), {});
});

test('it returns base config if nothing to extend', t => {
  const webpackConfig = {
    entry: {
      name: './src/index'
    }
  };

  t.deepEqual(webpackAssign(webpackConfig), webpackConfig);
});

test('it extends non-special properties with one extension', t => {
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

  t.deepEqual(webpackAssign(webpackConfig, extendConfig), {
    entry: assign(webpackConfig.entry, extendConfig.entry)
  });
});

test('it replaces non-special properties with one extension', t => {
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

  t.deepEqual(webpackAssign(webpackConfig, extendConfig), extendConfig);
});

test('it handles array entry by using last array', t => {
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

  t.deepEqual(webpackAssign(webpackConfig, extendConfig), extendConfig);
});

test('replaces dev-tool', t => {
  const webpackConfig = {
    devtool: 'cheap-eval-source-map'
  };

  const extendConfig = {
    devtool: 'source-map'
  };

  t.deepEqual(webpackAssign(webpackConfig, extendConfig), extendConfig);
});

test('it merges webpack-dev-server property', t => {
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

  t.deepEqual(webpackAssign(webpackConfig, extendConfig), {
    webpackDevServer: assign(webpackConfig.webpackDevServer, extendConfig.webpackDevServer)
  });
});

test('it concats plugins', t => {
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

  t.deepEqual(webpackAssign(webpackConfig, extendConfig), {
    plugins: webpackConfig.plugins.concat(extendConfig.plugins)
  });
});

test('it extends module.loaders', t => {
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

  t.deepEqual(webpackAssign(webpackConfig, extendConfig), {
    module: {
      loaders: webpackConfig.module.loaders.concat(extendConfig.module.loaders)
    }
  });
});

test('it replaces module.loaders, if test matches', t => {
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

  t.deepEqual(webpackAssign(webpackConfig, extendConfig), extendConfig);
});

test('it extends module.rules', t => {
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

  t.deepEqual(webpackAssign(webpackConfig, extendConfig), {
    module: {
      rules: webpackConfig.module.rules.concat(extendConfig.module.rules)
    }
  });
});

test('it replaces module.rules, if test matches', t => {
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

  t.deepEqual(webpackAssign(webpackConfig, extendConfig), extendConfig);
});
