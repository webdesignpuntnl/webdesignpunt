/* eslint-disable */

const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {ImageminWebpackPlugin} = require('imagemin-webpack');
const imageminGifsicle = require("imagemin-gifsicle"); // losles
const imageminJpegtran = require("imagemin-jpegtran"); // losless
const imageminMozjpeg = require("imagemin-mozjpeg"); // lossy
const imageminOptinpng = require("imagemin-optipng"); // losless
const imageminSvgo = require("imagemin-svgo"); // losless

const plugins = [imageminGifsicle(), imageminMozjpeg(), imageminOptinpng(), imageminSvgo()];

const utils = require('./utils');

const PATHS = { src: path.join(__dirname, '../src') }

module.exports =  {
    
    entry: {
        main: [ "./main.js" ] 
    },
    mode: "production",   
    output: {
        filename: "js/[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        // publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [ 
                    
                    { loader: MiniCssExtractPlugin.loader, options: { publicPath: "../" } },
                    { loader: "css-loader", options: { url: true, sourceMap: true } },
                    { loader: "postcss-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true} }
                ]
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
                test: /\.pug$/,
                use: [ 
                    { loader: "pug-loader" }
                ]
            },
            {
                test: /\.(jpg|gif|png|svg|ico)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images/"
                        } 
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    devtool: "inline-source-map",
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..')
          }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
        // new OptimizeCss({

        // }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/views/index.pug",
            inject: true,
            favicon: 'src/images/logo.ico'
        }),
        ...utils.pages(),
        new ImageminWebpackPlugin({
            imageminOptions: {
                plugins
            }
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                mangle: true, // Note `mangle.properties` is `false` by default.
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_fnames: false,
              }
        })
    ]
};