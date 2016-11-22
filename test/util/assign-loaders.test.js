import test from 'ava';
import path from 'path';

const assignLoaders = require(path.resolve('./src/util/assign-loaders'));

test('it returns base loaders if 0 extend loaders', t => {
  const base = [
    {
      test: /\.js$/,
      loaders: ['babel']
    }
  ];

  t.deepEqual(assignLoaders(base), base);
});

test('it returns extend loaders if 0 base loaders', t => {
  const extend = [
    {
      test: /\.css$/,
      loaders: ['css']
    },
    {
      test: /\.js$/,
      loaders: ['babel']
    }
  ];

  t.deepEqual(assignLoaders([], extend), extend);
});

test('it extends base loaders if n loaders (that do not match)', t => {
  const base = [
    {
      test: /\.js$/,
      loaders: ['babel']
    }
  ];

  const extend = [
    {
      test: /\.css$/,
      loaders: ['style', 'css']
    }
  ];

  t.deepEqual(assignLoaders(base, extend), base.concat(extend));
});

test('it replaces base loader if extend loaders test matches', t => {
  const base = [
    {
      test: /\.css$/,
      loaders: ['style', 'css']
    }
  ];

  const extend = [
    {
      test: /\.css$/,
      loaders: ['extract', 'style', 'css']
    }
  ];

  t.deepEqual(assignLoaders(base, extend), extend);
});

test('it replaces multiple loaders if multiple match', t => {
  const base = [
    {
      test: /\.css$/,
      loaders: ['css']
    },
    {
      test: /\.js$/,
      loaders: ['react-hot/webpack', 'babel']
    }
  ];

  const extend = [
    {
      test: /\.css$/,
      loaders: ['style', 'css']
    },
    {
      test: /\.js$/,
      loaders: ['babel']
    }
  ];

  t.deepEqual(assignLoaders(base, extend), extend);
});

test('it keeps existing loaders in place, and extends matching loaders', t => {
  const base = [
    {
      test: /\.js$/,
      loaders: ['babel']
    },
    {
      test: /\.css$/,
      loaders: ['style', 'css']
    }
  ];

  const extend = [
    {
      test: /\.css$/,
      loaders: ['extract', 'style', 'css']
    }
  ];

  t.deepEqual(assignLoaders(base, extend), [
    base[0],
    extend[0]
  ])
});
