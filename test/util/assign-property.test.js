import assign from 'object-assign';
import regexEqual from 'is-equal-regex';
import path from 'path';

const assignProperty = require(path.resolve('./src/util/assign-property'));

it('returns string if extend prop is string', () => {
  expect(assignProperty({}, 'str')).toBe('str');
});

it('returns RegExp if extend prop is RegExp', () => {
  const expr = /abc/;
  const prop = assignProperty({}, expr);
  expect(regexEqual(prop, expr)).toBe(true);
});

it('returns array if an array', () => {
  const extend = [
    'react-hot-loader'
  ];

  expect(assignProperty(['red'], extend)).toEqual(extend);
});

it('returns a cloned array if an array', () => {
  const extend = [
    'react-hot-loader'
  ];

  expect(assignProperty(null, extend)).not.toBe(extend);
});

it('extends an object, if extend prop is object', () => {
  const base = {
    app: './src/index'
  };

  const extend = {
    vendor: './src/vendor'
  };

  expect(assignProperty(base, extend)).toEqual(assign(base, extend));
});
