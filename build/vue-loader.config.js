module.exports = {
    extractCSS: false,
    preserveWhitespace: false,
    postcss: [
        require('autoprefixer')({
            browsers: ['last 3 versions']
        })
    ]
}
