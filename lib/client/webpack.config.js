'use strict';

const path = require('path');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: production ? null : 'source-map',
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
    plugins: production ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ] : []
};
