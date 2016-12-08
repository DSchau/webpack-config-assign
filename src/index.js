import assign from 'object-assign';

import webpackAssign from './assign';
import getEnvironment from './util/get-environment';

module.exports = function webpackConfigAssign(base, ...extensions) {
  let baseConfig = base;
  if (typeof baseConfig === 'function') {
    const env = getEnvironment();
    baseConfig = baseConfig({
      env,
      environment: env,
    });
  }
  return extensions
    .reduce((config, extension) => {
      let configExtension = extension || {};
      if (typeof configExtension === 'function') {
        configExtension = configExtension(config);
      }
      return webpackAssign(config, configExtension);
    }, assign({}, baseConfig));
};
