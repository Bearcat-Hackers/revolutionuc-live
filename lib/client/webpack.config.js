'use strict';

const path = require('path');
const webpack = require('webpack');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        path.join(__dirname, 'main.js')
    ],
    output: {
        path: path.join(__dirname, '../../public/javascripts/'),
        filename: '[name].min.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new UnminifiedWebpackPlugin()
    ]
};
