const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry:{
        main:'./src/js/index.js'/*,
        vendors:['react','react-dom','react-router-dom']*/
    },
    output:{
        path:path.resolve(__dirname,'dist/build'),//'./dist'报错,需绝对路径
        filename:'[name].[chunkhash:8].bundle.js'//[name]-[chunkhash].bundle.js
    },
    devtool:'cheap-source-map',
    devServer:{
        contentBase:'./dist/build',
        inline:true,
        historyApiFallback:true,
        port:5000
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['es2015','react']
                    }
                },
                exclude:/node_modules/
            },
            {
                test:/\.scss$/,
                use:extractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                }),
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
   //         template:'./src/html/index.tmpl.html',
            template:'./dist/index.tmpl.html',
            filename:'index.html',
        //    chunks:['main']
        }),
    //    new webpack.optimize.CommonsChunkPlugin('vendors'),
        new webpack.DllReferencePlugin({
            context:__dirname,
            manifest:require('./manifest.json')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new extractTextPlugin({filename:'style-[chunkhash:8].css'}),
        new cleanWebpackPlugin(['./dist/build'])
    ]
};
