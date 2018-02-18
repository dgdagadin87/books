var webpack = require('webpack');

/*
 * Default webpack configuration for development
 */

var config = {
    devtool: 'eval-source-map',
    entry:  __dirname + "/resources/js/Application.js",
    output: {
        path: __dirname + "/resources/js/bundle",
        filename: "bundle.js"
    },
    module: {
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.png$/,
                loader: "url-loader?mimetype=image/png"
            },
            {
                test: /\.gif$/,
                loader: "url-loader?mimetype=image/gif"
            }
        ]
    },
    devServer: {
        contentBase: "./resources/html",
        colors: true,
        historyApiFallback: true,
        inline: true
    }
};

/*
 * If bundling for production, optimize output
 */
//if (process.env.NODE_ENV === 'production') {
    config.devtool = false;
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        })
    ];
//};

module.exports = config;
