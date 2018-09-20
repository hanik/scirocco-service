module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['error', { code: 1000 }],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
