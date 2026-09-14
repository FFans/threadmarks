const path = require('path');
module.exports = require('@flarum/jest-config')({
  moduleNameMapper: { '^flarum/(.*)$': '<rootDir>/../vendor/flarum/core/js/src/$1' },
  modulePaths: [path.resolve(__dirname, 'node_modules')],
  setupFilesAfterEnv: ['<rootDir>/tests/support/setup.ts'],
  transform: { '^.+\\.[tj]sx?$': ['babel-jest', require('flarum-webpack-config/babel.config.js')] },
});
