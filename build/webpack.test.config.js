'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')
const webpackConfig = merge(baseWebpackConfig, {
    // use inline sourcemap for karma-sourcemap-loader
    devtool: '#inline-source-map',
    resolveLoader: {
        alias: {
            // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
            // see discussion at https://github.com/vuejs/vue-loader/issues/724
            'scss-loader': 'sass-loader'
        }
    }
})
// Overwrite plugins
webpackConfig.plugins = [
    new webpack.DefinePlugin({
        'process.env': '\'testing\''
    })
]

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
