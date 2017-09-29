const webpack = require('webpack');
const path = require('path');

module.exports = {
    // 가장 처음 읽을 스크립트파일
    // 여기서부터 import 되어있는 다른 스크립트를 불러온다.
    entry: [
        './src/index.js',
        './src/style.css'
    ],

    // 파일을 합치고 ./public/bundle.js 에 저장한다.
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },


    resolve: {
      //        root: path.resolve('./src')
          modules: [
              path.resolve('./src'),
              "node_modules"
          ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    // ES6 문법과 JSX 문법을 사용한다
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
    }
};
