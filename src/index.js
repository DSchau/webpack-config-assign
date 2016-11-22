import assign from 'object-assign';

import webpackAssign from './assign';

module.exports = function webpackConfigAssign(base, ...extensions) {
  if (!base) {
    return {};
  }

  return extensions
    .reduce((config, extension) => {
      return webpackAssign(config || {}, extension || {});
    }, assign({}, base));
};
