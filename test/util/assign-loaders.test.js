import path from 'path';

const assignLoaders = require(path.resolve('./src/util/assign-loaders'));

it('returns base loaders if 0 extend loaders', () => {
  const base = [
    {
      test: /\.js$/,
      loaders: ['babel']
    }
  ];

  expect(assignLoaders(base)).toEqual(base);
});

it('returns extend loaders if 0 base loaders', () => {
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

  expect(assignLoaders([], extend)).toEqual(extend);
});

it('extends base loaders if n loaders (that do not match)', () => {
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

  expect(assignLoaders(base, extend)).toEqual(base.concat(extend));
});

it('replaces base loader if extend loaders test matches', () => {
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

  expect(assignLoaders(base, extend)).toEqual(extend);
});

it('replaces multiple loaders if multiple match', () => {
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

  expect(assignLoaders(base, extend)).toEqual(extend);
});

it('keeps existing loaders in place, and extends matching loaders', () => {
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

  expect(assignLoaders(base, extend)).toEqual([
    base[0],
    extend[0]
  ])
});
