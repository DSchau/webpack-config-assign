import assign from 'object-assign';

import assignLoaders from './util/assign-loaders';
import assignModule from './util/assign-module';
import assignPlugins from './util/assign-plugins';
import assignProperty from './util/assign-property';

module.exports = function webpackAssign(baseObj, extendObj) {
  return Object.keys(extendObj || {})
    .reduce((config, propName) => {
      switch (propName) {
        case 'module':
          config.module = assignModule(baseObj.module, extendObj.module);
          break;
        case 'plugins':
          config.plugins = assignPlugins(baseObj.plugins, extendObj.plugins);
          break;
        default:
          config[propName] = assignProperty(baseObj[propName], extendObj[propName]);
          break;
      }
      return config;
    }, assign({}, baseObj));
};

module.exports.assignLoaders = assignLoaders;
module.exports.assignModule = assignModule;
module.exports.assignPlugins = assignPlugins;
