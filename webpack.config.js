const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        library: 'guardMap',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle2.js'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
};