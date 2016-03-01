module.exports = {
    entry: {
        // home: './pages/scripts/home.js',
        scores: './pages/scripts/scores.js'
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
    }
}
