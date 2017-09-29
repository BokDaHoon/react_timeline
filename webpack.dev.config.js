var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: [
        'react-hot-loader/patch',
        './src/index.js',
        'webpack-dev-server/client?http://0.0.0.0:3001',
        'webpack/hot/only-dev-server',
        './src/style.css'
    ],

    output: {
        path: '/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "*": "http://localhost:3000"
        },
        stats: {
          // Config for minimal console.log mess.
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        }
    },


    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ["react-hot-loader/babel"]
                }
            },
            {
                test: /\.css$/,
//                loader: 'style!css-loader'
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    }


};
