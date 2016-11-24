import path from 'path';

const getEnvironment = require(path.resolve('./src/util/get-environment'));

beforeEach(() => {
  process.env = {};
});

it('uses NODE_ENV if defined', () => {
  const env = '123';
  process.env.NODE_ENV = env;

  expect(getEnvironment()).toEqual(env);
});

it('uses BABEL_ENV if NODE_ENV is not defined', () => {
  const env = '456';
  process.env.BABEL_ENV = env;

  expect(getEnvironment()).toEqual(env);
});

it('uses development if neither NODE_ENV, nor BABEL_ENV set', () => {
  expect(getEnvironment()).toEqual('development');
});
