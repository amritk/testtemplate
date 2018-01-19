const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const resolve = dir => path.resolve(__dirname, '..', dir)

let options = {
    devtool: '#cheap-module-eval-source-map',
    output: {
        path: resolve('../explore/public'),
        publicPath: '/public/',
        filename: '[name].[chunkhash].js'
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json', '.styl'],
        alias: {
            base: resolve('.'),
            src: resolve('src'),
            styles: resolve('src/styles')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.css$/,
                loader: [
                    {
                        loader: 'vue-style-loader', options: { minimize: true || {/* CSSNano Options */ } }
                    },
                    {
                        loader: 'css-loader', options: { minimize: true || {/* CSSNano Options */ } }
                    }
                ]
            },
            {
                test: /\.styl$/,
                loader: [
                    {
                        loader: 'vue-style-loader', options: { minimize: true || {/* CSSNano Options */ } }
                    },
                    {
                        loader: 'css-loader', options: { minimize: true || {/* CSSNano Options */ } }
                    },
                    {
                        loader: 'stylus-loader', options: { minimize: true || {/* CSSNano Options */ } }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: false
    }
}

// Production
if (process.env.NODE_ENV === 'production') {
    options.devtool = 'source-map'
    options.performance.hints = 'warning'
    options.plugins = [
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static'
        // }),
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                mangle: {
                    safari10: true
                },
                output: {
                    safari10: true
                },
                safari10: true
            }
        }),
        new ExtractTextPlugin({
            filename: 'common.[chunkhash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/
        })
    ]
}
else
    options.plugins = [
        // new ExtractTextPlugin({
        //     filename: 'common.[chunkhash].css'
        // }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://localhost:${process.env.PORT || 8080}`]
            }
        })
    ]

module.exports = options
