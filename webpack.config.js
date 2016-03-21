module.exports = {
    entry: {
        app: './pages/scripts/app.js'
    },
    output: {
        path: './public/scripts',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    watch: true
}
