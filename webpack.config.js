'use strict';

const path = require('node:path');
const { merge } = require('webpack-merge');
const Html = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const Brotli = require('brotli-webpack-plugin');

const srcPath = path.join(__dirname, 'src');

const base = {
  context: srcPath,
  entry: [
    'bootstrap/dist/css/bootstrap.css',
    './index.tsx',
  ],
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.wasm'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtract.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g)$/,
        type: 'asset/resources',
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new Html({
      template: path.join(srcPath, 'template.html'),
      inject: 'head',
    }),
    new MiniCssExtract(),
  ],
};

const environments = {
  development: {
    mode: 'development',
    devServer: {
      compress: false,
      historyApiFallback: true,
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:3000',
        },
      ],
    },
  },

  production: {
    mode: 'production',
    output: {
      path: path.resolve('./dist'),
      filename: 'easy-gpt.[contenthash].js',
    },
    plugins: [
      new Brotli(),
    ],
  },
};

module.exports = function webpackConfig() {
  return merge(base, environments[process.env.NODE_ENV] || environments.production);
};
