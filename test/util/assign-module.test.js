import assign from 'object-assign';
import path from 'path';

const assignModule = require(path.resolve('./src/util/assign-module'));

it('returns non-loader/rules config as-is', () => {
  const baseConfig = {
    noParse: /jquery/
  };

  expect(assignModule(baseConfig)).toEqual(baseConfig);
});

it('returns a new (cloned) object', () => {
  const base = {};

  expect(assignModule(base)).not.toBe(base);
});

it('extends non-loader/rules config if extension', () => {
  const baseConfig = {
    noParse: /jquery/
  };

  const extendConfig = {
    noParse: /jquery|react/i
  };

  expect(assignModule(baseConfig, extendConfig)).toEqual(extendConfig);
});

it('includes non-loader config when loaders present', () => {
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

it('returns loaders property if not extended', () => {
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

it('extends loaders property if not extended', () => {
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

it('returns rules property if not extended', () => {
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

it('extends rules property if not extended', () => {
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

it('throws error if module.rules and module.loaders are used in separate configs', () => {
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
