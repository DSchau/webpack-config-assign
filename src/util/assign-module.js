import assign from 'object-assign';

import assignLoaders from './assign-loaders';
import assignProperty from './assign-property';

module.exports = function assignModule(baseModule = {}, extendModule = {}) {
  if (baseModule.loaders && extendModule.rules || baseModule.rules && extendModule.loaders) {
    throw new Error('module.loaders or module.rules is supported, but cannot be used in conjunction');
  }
  return Object.keys(extendModule || {})
    .reduce((module, propName) => {
      if (propName === 'loaders' || propName === 'rules') {
        module[propName] = assignLoaders(baseModule.rules || baseModule.loaders, extendModule.rules || extendModule.loaders);
      } else {
        module[propName] = assignProperty(baseModule[propName] || {}, extendModule[propName]);
      }
      return module;
    }, assign({}, baseModule));
};
