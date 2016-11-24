import path from 'path';

const assignPlugins = require(path.resolve('./src/util/assign-plugins'));

it('returns original array if extend undefined', () => {
  const base = [
    'some-plugin'
  ];

  expect(assignPlugins(base, undefined)).toEqual(base);
});

it('returns extend array if base undefined', () => {
  const base = undefined;

  const extend = [
    'some-plugin'
  ];

  expect(assignPlugins(base, extend)).toEqual(extend);
});

it('concats array if extend is an array', () => {
  const base = [
    'some-plugin'
  ];

  const extend = [
    'some-other-plugin'
  ];

  expect(assignPlugins(base, extend)).toEqual(base.concat(extend));
});
