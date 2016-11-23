import test from 'ava';
import path from 'path';

import webpackConfigAssign from '../src/';

test('it returns empty config if 0 arguments', t => {
  t.deepEqual(webpackConfigAssign(), {});
});

test('it returns clone of object', t => {
  const webpackConfig = {};

  t.not(webpackConfigAssign(webpackConfig), webpackConfig);
});

test('if first argument is falsy, it uses empty object', t => {
  const extendConfig = {
    entry: [
      './index'
    ]
  };

  t.deepEqual(webpackConfigAssign(null, extendConfig), extendConfig);
});

test('if extend configs are falsy, ignores them', t => {
  const webpackConfig = {
    entry: [
      './index'
    ]
  };

  t.deepEqual(webpackConfigAssign(webpackConfig, null, false, undefined), webpackConfig);
});

test('if extension object is a function, calls with current config', t => {
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

  t.deepEqual(webpackConfigAssign(webpackConfig, extensionConfigFn), {
    entry: [
      './vendor',
      './index'
    ]
  })
});

test('it returns original config if only one argument', t => {
  const webpackConfig = {
    entry: {}
  };
  t.deepEqual(webpackConfigAssign(webpackConfig), webpackConfig);
});

test('it returns merged config if multiple arguments', t => {
  const basePath = path.join(__dirname, '__e2e__');

  const configs = [
    require(path.join(basePath, 'base')),
    require(path.join(basePath, 'extend')),
    require(path.join(basePath, 'extend-two')),
    require(path.join(basePath, 'expected'))
  ];

  const [ base, extend, extendTwo, expected ] = configs;

  t.deepEqual(webpackConfigAssign(base, extend, extendTwo), expected);
});
