import assign from 'object-assign';
import path from 'path';

const assignModule = require(path.resolve('./src/util/assign-module'));

it('it returns non-loader/rules config as-is', () => {
  const baseConfig = {
    noParse: /jquery/
  };

  expect(assignModule(baseConfig)).toEqual(baseConfig);
});

it('it returns a new (cloned) object', () => {
  const base = {};

  expect(assignModule(base)).not.toBe(base);
});

it('it extends non-loader/rules config if extension', () => {
  const baseConfig = {
    noParse: /jquery/
  };

  const extendConfig = {
    noParse: /jquery|react/i
  };

  expect(assignModule(baseConfig, extendConfig)).toEqual(extendConfig);
});

it('it includes non-loader config when loaders present', () => {
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

  expect(assignModule(baseConfig, extendConfig)).toEqual(assign(baseConfig, extendConfig));
});

it('it returns loaders property if not extended', () => {
  const baseConfig = {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ]
  };

  expect(assignModule(baseConfig)).toEqual(baseConfig);
});

it('it extends loaders property if not extended', () => {
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

  expect(assignModule(baseConfig, extendConfig)).toEqual(extendConfig);
});

it('it returns rules property if not extended', () => {
  const baseConfig = {
    rules: [
      {
        test: /\.js$/,
        use: ['babel']
      }
    ]
  };

  expect(assignModule(baseConfig)).toEqual(baseConfig);
});

it('it extends rules property if not extended', () => {
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

  expect(assignModule(baseConfig, extendConfig)).toEqual(extendConfig);
});

it('it throws error if module.rules and module.loaders are used in separate configs', () => {
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

  expect(() => {
    assignModule(baseConfig, extendConfig);
  }).toThrowError(Error);
});
