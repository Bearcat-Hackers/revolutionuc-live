'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProduction ? null : 'source-map',
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
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../stylesheets/[name].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: isProduction,
            compress: {
                warnings: false
            }
        })
    ]
};
