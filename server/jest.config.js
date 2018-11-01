module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
  ],
  // To avoid errors when importing non JavaScript assets.
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/tests/**/*.spec.js',
  ],
  transformIgnorePatterns: [
    '/helpers/file.js',
    '/node_modules/.*',
  ],
};
