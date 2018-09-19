module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  // To avoid errors when importing non JavaScript assets.
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // beautifier
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|ts|tsx)|**/__tests__/*.(js|ts|tsx)',
  ],
  transformIgnorePatterns: [
    '/node_modules/.*',
  ],
};
