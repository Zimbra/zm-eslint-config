'use strict';

module.exports = {
    extends: ['plugin:testcafe/recommended'],
    plugins: ['testcafe'],
    env: {
      browser: true,
      mocha: true,
      node: true
    },
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        modules: true
      }
    },
    rules: {
      'brace-style': ['error', '1tbs'],
      eqeqeq: ['error', 'smart'],
      'no-shadow': 'error',
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true
        }
      ],
      'prettier/prettier': 'off',
      'prefer-const': 'off',
      'require-atomic-updates': 'off',
      'guard-for-in': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'lines-around-comment': 'off',
      'no-unexpected-multiline': 'off',
      'no-spaced-func': 'off',
      'new-cap': 'off',
      semi: ['error', 'always']
    }
  };
