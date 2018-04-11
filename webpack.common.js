const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.jsx'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/react', '@babel/preset-env', '@babel/preset-stage-3']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body',
            title: 'BookMeMobi'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};