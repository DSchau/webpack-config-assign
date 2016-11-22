import regexEqual from 'is-equal-regex';
import clone from 'lodash.clone';

function indexOfLoaderInBaseConfig(loaderObj, baseLoaders = []) {
  for (let i = 0; i < baseLoaders.length; i++) {
    const loader = baseLoaders[i];
    if (loaderObj.test === loader.test || regexEqual(loaderObj.test, loader.test)) {
      return i;
    }
  }
  return -1;
}

module.exports = function assignLoaders(baseLoaders = [], extendLoaders = []) {
  const loaders = clone(baseLoaders);
  extendLoaders
    .forEach((loader) => {
      const loaderIndex = indexOfLoaderInBaseConfig(loader, baseLoaders);
      if (loaderIndex > -1) {
        loaders[loaderIndex] = loader;
      } else {
        loaders.push(loader);
      }
    });
  return loaders;
};
