import path from 'path';

import webpackConfigAssign from '../src/';

it('returns empty config if 0 arguments', () => {
  expect(webpackConfigAssign()).toEqual({});
});

it('returns clone of object', () => {
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

it('if first argument is function, calls with environment object', () => {
  const webpackConfig = (env) => {
    return {
      env
    };
  };

  const config = webpackConfigAssign(webpackConfig);

  expect(config.env).toBeDefined();
  expect(config.env.environment).toBeDefined();
  expect(config.env.env).toBeDefined();
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

it('if extension object(s) are functions, calls with rolling merged config', () => {
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
    }
  };

  const extensionConfigOtherFn = (config) => {
    return {
      entry: [
        './polyfills'
      ].concat(config.entry)
    };
  };

  expect(webpackConfigAssign(webpackConfig, extensionConfigFn, extensionConfigOtherFn)).toEqual({
    entry: [
      './polyfills',
      './vendor',
      './index'
    ]
  });
});

it('returns original config if only one argument', () => {
  const webpackConfig = {
    entry: {}
  };
  expect(webpackConfigAssign(webpackConfig)).toEqual(webpackConfig);
});

it('returns merged config if multiple arguments', () => {
  const configs = [
    'base',
    'extend',
    'extend-two',
    'expected'
  ].map((fixturePath) => require(path.join(__dirname, 'fixtures', fixturePath)));

  const [ base, extend, extendTwo, expected ] = configs;

  expect(webpackConfigAssign(base, extend, extendTwo)).toEqual(expected);
});
