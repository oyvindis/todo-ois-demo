var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

module.exports = {
    devtool: 'source-map',

    entry: mainPath,

    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /(\.js$)|(\.jsx$)/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.json$/,
                loaders: ['json']
            },
            {
                test: /\.(otf|eot|svg|ttf|woff)/,
                loader: 'url-loader?limit=10000'
            }
        ]
    }
};