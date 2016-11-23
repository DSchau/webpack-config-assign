# webpack-config-assign

[![Build status](https://travis-ci.org/DSchau/webpack-config-assign.svg)](https://travis-ci.org/DSchau/webpack-config-assign)
[![Coverage Status](https://coveralls.io/repos/github/DSchau/webpack-config-assign/badge.svg?branch=master)](https://coveralls.io/github/DSchau/webpack-config-assign?branch=master)
[![NPM Version](https://img.shields.io/npm/v/webpack-config-assign.svg)](https://www.npmjs.com/package/webpack-config-assign)

A utility to "smartly" merge/assign a series of webpack configs, typically a "base" config then merged with one to many environment configs (e.g. development, test, production, etc.)

## Install

```
npm install webpack-config-assign --save-dev
```

or

```
yarn add webpack-config-assign --dev
```

## Usage

### `webpackConfigAssign(baseConfig, ...extendConfigs)`

The utility assumes that the first argument passed in is the "base," and any subsequent configs are smartly merged with this base config.

```javascript
const webpackConfigAssign = require('webpack-config-assign');

const baseConfig = require('./webpack.config.base');
const devConfig = process.env.NODE_ENV === 'development' ? require('./webpack.config.development') : {};

module.exports = webpackConfigAssign(baseConfig, devConfig);
```

### Usage with Webpack 2

This utility also works with webpack 2, and in particular, works particularly well with webpack 2's ability to pass in environment from the CLI.

Additionally, this utility works seamlessly with `module.loaders` (webpack 1) or `module.rules` (webpack 2), and interops with both (although it's recommended to choose one style, if possible)

given: `webpack --env.development=true`

```javascript
const webpackConfigAssign = require('webpack-config-assign');

module.exports = function(env) {
  const baseConfig = require('./webpack.config.base');
  const developmentConfig = env.development ? require('./webpack.config.development') : {};

  return webpackConfigAssign(baseConfig, developmentConfig);
};
```