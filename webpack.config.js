'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  devtool: "source-map",

  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },

  module: {},
  plugins: []
};