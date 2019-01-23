/* eslint-disable */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const utils = require('./utils');
const utilsErrorDocs = require('./utilsErrorDocs');

module.exports = {
    entry: {
        main: [ "./main.js" ],
        // contactForm: ["./src/js/formvalidate.js"]
    },
    mode: "development",    
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        // publicPath: "/"
    },
    devServer : {
        contentBase: "dist",
        overlay: true,
        host: "0.0.0.0",
        port: '8080',
        disableHostCheck: true,
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "eslint-loader"
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
                test: /\.s?[ac]ss$/,
                use: [ 
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { url: true, sourceMap: true} },
                    { loader: "sass-loader", options: { sourceMap: true} }
                ]
            },
            {
                test: /\.pug$/,
                use: [ 
                    { loader: "pug-loader" }
                ]
            },
            {
                test: /\.(jpg|gif|png|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: './images/',
                            publicPath: '../images/'
                        } 
                    }
                ]
            }
        ]
    },
    devtool: "inline-source-map",
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..')
          }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/views/index.pug",
            inject: true,
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets/**/*',
              to: '[name].[ext]'
             }
         ]),
         new CopyWebpackPlugin([
            { from: 'src/php/**/*',
              to: '[name].[ext]'
             }
         ]),
        ...utils.pages(),
        ...utilsErrorDocs.Errorpages(),
    ]
};