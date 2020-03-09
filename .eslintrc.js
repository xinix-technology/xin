module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'standard',
  ],
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-var': ['error'],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'require-await': ['error'],
    'max-len': ['error', { code: 120 }],
    // 'max-lines': ['error', 200],
    // 'max-lines-per-function': ['error', 20],
    // complexity: ['error', 6],
    'max-nested-callbacks': ['error', 2],
    'max-depth': ['error', 3],
    'max-params': ['error', 3],
  },
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
};

