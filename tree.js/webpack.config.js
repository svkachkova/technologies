const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [    
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "build"),
        historyApiFallback: true,
        compress: true,
        port: 3000,
        open: "Firefox",
        watchContentBase: true,
    }
};
