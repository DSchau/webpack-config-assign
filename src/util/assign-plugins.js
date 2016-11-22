module.exports = function assignPlugins(basePlugins = [], extendPlugins = []) {
  return basePlugins.concat(extendPlugins);
};
