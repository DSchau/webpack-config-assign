import test from 'ava';
import assign from 'object-assign';
import regexEqual from 'is-equal-regex';
import path from 'path';

const assignProperty = require(path.resolve('./src/util/assign-property'));

test('it returns string if extend prop is string', t => {
  t.is(assignProperty({}, 'str'), 'str');
});

test('it returns RegExp if extend prop is RegExp', t => {
  const expr = /abc/;
  const prop = assignProperty({}, expr);
  t.true(regexEqual(prop, expr));
});

test('it returns array if an array', t => {
  const extend = [
    'react-hot-loader'
  ];

  t.deepEqual(assignProperty(['red'], extend), extend);
});

test('it returns a cloned array if an array', t => {
  const extend = [
    'react-hot-loader'
  ];

  t.not(assignProperty(null, extend), extend);
});

test('it extends an object, if extend prop is object', t => {
  const base = {
    app: './src/index'
  };

  const extend = {
    vendor: './src/vendor'
  };

  t.deepEqual(assignProperty(base, extend), assign(base, extend));
});
