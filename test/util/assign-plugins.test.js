import test from 'ava';
import path from 'path';

const assignPlugins = require(path.resolve('./src/util/assign-plugins'));

test('it returns original array if extend undefined', t => {
  const base = [
    'some-plugin'
  ];

  t.deepEqual(assignPlugins(base, undefined), base);
});

test('returns extend array if base undefined', t => {
  const base = undefined;

  const extend = [
    'some-plugin'
  ];

  t.deepEqual(assignPlugins(base, extend), extend);
});

test('it concats array if extend is an array', t => {
  const base = [
    'some-plugin'
  ];

  const extend = [
    'some-other-plugin'
  ];

  t.deepEqual(assignPlugins(base, extend), base.concat(extend));
});
