const { resolve } = require('path');

const root = resolve(__dirname);
module.exports = {
  rootDir: root,
  displayName: 'root-tests',
  testRegex: '.*\\.spec\\.ts$',
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/@core/$1',
    '@infra/(.*)': '<rootDir>/src/@infra/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};
