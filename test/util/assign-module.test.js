import test from 'ava';
import assign from 'object-assign';
import path from 'path';

const assignModule = require(path.resolve('./src/util/assign-module'));

test('it returns non-loader/rules config as-is', t => {
  const baseConfig = {
    noParse: /jquery/
  };

  t.deepEqual(assignModule(baseConfig), baseConfig);
});

test('it returns a new (cloned) object', t => {
  const base = {};

  t.not(assignModule(base), base);
});

test('it extends non-loader/rules config if extension', t => {
  const baseConfig = {
    noParse: /jquery/
  };

  const extendConfig = {
    noParse: /jquery|react/i
  };

  t.deepEqual(assignModule(baseConfig, extendConfig), extendConfig);
});

test('it includes non-loader config when loaders present', t => {
  const baseConfig = {
    noParse: /jquery/
  };

  const extendConfig = {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ]
  };

  t.deepEqual(assignModule(baseConfig, extendConfig), assign(baseConfig, extendConfig));
});

test('it returns loaders property if not extended', t => {
  const baseConfig = {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ]
  };

  t.deepEqual(assignModule(baseConfig), baseConfig);
});

test('it extends loaders property if not extended', t => {
  const baseConfig = {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot/webpack', 'babel']
      }
    ]
  };

  const extendConfig = {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ]
  };

  t.deepEqual(assignModule(baseConfig, extendConfig), extendConfig);
});

test('it returns rules property if not extended', t => {
  const baseConfig = {
    rules: [
      {
        test: /\.js$/,
        use: ['babel']
      }
    ]
  };

  t.deepEqual(assignModule(baseConfig), baseConfig);
});

test('it extends rules property if not extended', t => {
  const baseConfig = {
    rules: [
      {
        test: /\.js$/,
        use: ['react-hot/webpack', 'babel']
      }
    ]
  };

  const extendConfig = {
    rules: [
      {
        test: /\.js$/,
        use: ['babel']
      }
    ]
  };

  t.deepEqual(assignModule(baseConfig, extendConfig), extendConfig);
});

test('it throws error if module.rules and module.loaders are used in separate configs', t => {
  const baseConfig = {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot/webpack', 'babel']
      }
    ]
  };

  const extendConfig = {
    rules: [
      {
        test: /\.js$/,
        use: ['babel']
      }
    ]
  };

  t.throws(() => {
    assignModule(baseConfig, extendConfig);
  }, Error);
});
