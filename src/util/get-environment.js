module.exports = function() {
  return process.env.NODE_ENV || process.env.BABEL_ENV || 'development';
};
