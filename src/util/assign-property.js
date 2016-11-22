import assign from 'object-assign';
import clone from 'lodash.clone';

module.exports = function assignProperty(baseProperty = {}, extendProperty = {}) {
  if (typeof extendProperty === 'string' || extendProperty instanceof RegExp) {
    return extendProperty;
  } else if (Array.isArray(extendProperty)) {
    return clone(extendProperty);
  }
  return assign({}, baseProperty, extendProperty);
};
