'use strict';

module.exports = function babelConfig(api) {
  api.cache(process.env.NODE_ENV !== 'production');

  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      ['@babel/preset-env', {
        modules: false,
      }],
    ],
    plugins: [
      'babel-plugin-styled-components',
    ],
  };
};
