/* eslint-disable */

const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack');
const imageminGifsicle = require("imagemin-gifsicle"); // losles
const imageminJpegtran = require("imagemin-jpegtran"); // losless
const imageminMozjpeg = require("imagemin-mozjpeg"); // lossy
const imageminOptinpng = require("imagemin-optipng"); // losless
const imageminSvgo = require("imagemin-svgo"); // losless
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [imageminGifsicle(), imageminMozjpeg(), imageminOptinpng(), imageminSvgo()];

const utils = require('./utils-prod');
const utilsErrorDocs = require('./utilsErrorDocs');

const PATHS = { src: path.join(__dirname, '../src') }

module.exports = {

    entry: {
        main: ["./main.js"],
        contactForm: ["./src/js/formvalidate.js"]
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
                    { loader: "sass-loader", options: { sourceMap: true } }
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
                test: /\.(jpg|gif|png|svg|ico)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]",
                            // publicPath: function(url) {
                            //     return url.replace(/images/, '../images')
                            // }
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
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
        new OptimizeCss({

        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/views/index.pug",
            inject: false,
            // favicon: 'src/images/logo.ico'
        }),
        ...utils.pages(),
        ...utilsErrorDocs.Errorpages(),
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
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/assets/**/*',
                to: '[name].[ext]'
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: 'src/php/**/*',
                to: 'php/[name].[ext]'
            }
        ])
    ]
};