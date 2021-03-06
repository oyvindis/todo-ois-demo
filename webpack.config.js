var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

var yeticss = require('yeticss');
var autoPrefixer = require('autoprefixer');

module.exports = {
    devtool: 'eval',

    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        mainPath
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    resolve: {       
        extensions: [
            '',
            '.js',
            '.jsx',
            '.json'
        ]
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
                test: /\.less$/,
                loader: 'style!css!less'
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
            },           
        ]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
    stylus: {
        use: [yeticss()]
    },
    postcss: [autoPrefixer()]
};
