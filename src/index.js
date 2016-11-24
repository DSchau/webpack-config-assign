import assign from 'object-assign';

import webpackAssign from './assign';

module.exports = function webpackConfigAssign(base, ...extensions) {
  return extensions
    .reduce((config, extension) => {
      let configExtension = extension || {};
      if (typeof configExtension === 'function') {
        configExtension = configExtension(config);
      }
      return webpackAssign(config, configExtension);
    }, assign({}, base));
};
