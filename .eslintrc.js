'use strict';

module.exports = {
  root: true,
  overrides: [
    {
      files: [
        '**/*.ts',
        '**/*.tsx',
      ],
      extends: [
        'airbnb',
        'airbnb-typescript',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      env: {
        browser: false,
        node: true,
      },
      rules: {
        'no-console': 0,
        'react/jsx-props-no-spreading': 0,
        'react/require-default-props': 0,
      },
    },
    {
      files: ['./src/**'],
      env: {
        browser: true,
        node: false,
      },
    },
    {
      files: ['**/*.js'],
      extends: [
        'airbnb',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: [2, 'global'],
      },
    },
    {
      files: [
        '**/__tests__/**',
        '**/__mocks__/**',
      ],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
    },
  ],
};
