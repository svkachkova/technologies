'use strict';

const webpack  = require('webpack');
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development'; 
// trim для удаления лишних пробелов, если платформа Windows

module.exports = {  
    context: __dirname + '/frontend/scripts',  
    entry: {
        scripts: './scripts'
    },  
    output: {
        path: __dirname + '/public_html/assets/js',
        filename: '[name].js',
        library: 'app',
        pathinfo: true
    },  
    resolve: {
        alias: {
            '$': 'jquery',
            'jQuery': 'jquery',
            'jquery': 'jquery',
        },
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    }
};

if (NODE_ENV == 'development') {
    module.exports.devtool = 'eval';
}

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ 
            // minifying scripts
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: false
            }
        })
    );
}
