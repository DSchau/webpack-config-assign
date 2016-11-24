import path from 'path';

import webpackConfigAssign from '../src/';

it('it returns empty config if 0 arguments', () => {
  expect(webpackConfigAssign()).toEqual({});
});

it('it returns clone of object', () => {
  const webpackConfig = {};

  expect(webpackConfigAssign(webpackConfig)).not.toBe(webpackConfig);
});

it('if first argument is falsy, it uses empty object', () => {
  const extendConfig = {
    entry: [
      './index'
    ]
  };

  expect(webpackConfigAssign(null, extendConfig)).toEqual(extendConfig);
});

it('if extend configs are falsy, ignores them', () => {
  const webpackConfig = {
    entry: [
      './index'
    ]
  };

  expect(webpackConfigAssign(webpackConfig, null, false, undefined)).toEqual(webpackConfig);
});

it('if extension object is a function, calls with current config', () => {
  const webpackConfig = {
    entry: [
      './index'
    ]
  };

  const extensionConfigFn = (config) => {
    return {
      entry: [
        './vendor'
      ].concat(config.entry)
    };
  };

  expect(webpackConfigAssign(webpackConfig, extensionConfigFn)).toEqual({
    entry: [
      './vendor',
      './index'
    ]
  })
});

it('it returns original config if only one argument', () => {
  const webpackConfig = {
    entry: {}
  };
  expect(webpackConfigAssign(webpackConfig)).toEqual(webpackConfig);
});

it('it returns merged config if multiple arguments', () => {
  const basePath = path.join(__dirname, '__e2e__');

  const configs = [
    require(path.join(basePath, 'base')),
    require(path.join(basePath, 'extend')),
    require(path.join(basePath, 'extend-two')),
    require(path.join(basePath, 'expected'))
  ];

  const [ base, extend, extendTwo, expected ] = configs;

  expect(webpackConfigAssign(base, extend, extendTwo)).toEqual(expected);
});
