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

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            debug: true,
                            corejs: 3,
                            useBuiltIns: 'usage'
                        }]]
                    }
                }
            }
        ]
    },
    plugins: []
};