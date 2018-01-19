const MFS = require('memory-fs')
const path = require('path')
const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')
const readline = require('readline')

module.exports = function setupDevServer (app, cb) {
    let bundle
    let clientManifest
    let resolve
    const resolved = false
    const readyPromise = new Promise(r => { resolve = r })
    const ready = (...args) => {
        if (!resolved)
            resolve()
        cb(...args)
    }

    // modify client config to work with hot middleware
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
    clientConfig.output.filename = '[name].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    // dev middleware
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true,
            chunks: false
        }
    })
    app.use(devMiddleware)
    clientCompiler.plugin('done', () => {
        const fs = devMiddleware.fileSystem
        const readFile = file => fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
        clientManifest = JSON.parse(readFile('vue-ssr-client-manifest.json'))
        if (bundle)
            ready(bundle, {
                clientManifest
            })
    })

    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler))

    // watch and update server renderer
    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    // Make text blue and bold, so it *pops*
    function colorInfo (msg) {
        return `\u001b[1m\u001b[34m${msg}\u001b[39m\u001b[22m`
    }
    const progressPlugin = new webpack.ProgressPlugin((percent, msg, addInfo) => {
        percent = Math.floor(percent * 100)
        if (percent === 100)
            msg = 'Compilation completed'
        if (addInfo)
            msg = `${msg} (${addInfo})`
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)
        process.stdout.write(colorInfo('progress-update: ') + percent + '%, ' + msg)
    })
    // Show progress when running dev server
    if (!process.env.PASSENGER_BASE_URI)
        serverCompiler.apply(progressPlugin)
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err)
            throw err
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        const readFile = file => mfs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')

        // read bundle generated by vue-ssr-webpack-plugin
        bundle = JSON.parse(readFile('vue-ssr-server-bundle.json'))
        if (clientManifest)
            ready(bundle, {
                clientManifest
            })
    })

    return readyPromise
}
