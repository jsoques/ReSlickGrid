const { HotModuleReplacementPlugin, ProvidePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// primary config:
const title = 'ReSlickGrid';
const baseUrl = '';
const outDirLocal = path.resolve(__dirname, 'build');
const srcDir = path.resolve(__dirname, 'src');
const baseDir = path.resolve(__dirname, '');

module.exports = ({ production } = {}) => ({
    mode: production ? 'production' : 'development',
    entry: `${srcDir}/index`,
    stats: {
        warnings: false
    },
    target: production ? 'browserslist' : 'web',
    devServer: {
        historyApiFallback: true,
        compress: true,
        liveReload: false,
        port: 3000,
        host: 'localhost',
        // open: true,
    },
    devtool: production ? false : 'eval-cheap-module-source-map',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: [srcDir, 'node_modules'],
        mainFields: ['browser', 'module', 'main'],
        fallback: {
            http: false,
            https: false,
            stream: false,
            util: false,
            zlib: false,
        }
    },
    module: {
        rules: [
            {
                test: /\.bundle\.js$/, use: {
                    loader: 'bundle-loader', options: {
                        name: 'my-chunk', cacheDirectory: true, presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(ts|js)x?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [
                            ["@babel/preset-env",
                                {
                                    "targets": {
                                        "browsers": [">0.03%"]
                                    },
                                    "useBuiltIns": "entry",
                                    "corejs": 3
                                }
                            ],
                            "@babel/preset-typescript",
                            "@babel/preset-react"
                        ]
                    },
                },
            },
            { test: /\.css$/i, use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'] },
            { test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'], issuer: /\.[tj]s$/i },
            { test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'], issuer: /\.(ts|js)x?$/i },
            { test: /\.(sass|scss)$/, use: ['css-loader', 'sass-loader'], issuer: /\.html?$/i },
            { test: /\.html$/i, loader: 'html-loader', options: { esModule: false } },
            { test: /\.ts?$/, use: [{ loader: 'ts-loader', options: { transpileOnly: true } }] }
        ],
    },
    plugins: [
        new ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
        new MiniCssExtractPlugin({ // updated to match the naming conventions for the js files
            filename: '[name].[contenthash].bundle.css',
            chunkFilename: '[name].[contenthash].chunk.css'
        }),
        // Note that the usage of following plugin cleans the webpack output directory before build.
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
});
