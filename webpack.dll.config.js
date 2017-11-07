const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry:{
        'lib':['react','react-dom','react-router-dom']
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].[chunkhash:8].js',
        library:'[name]'
    },
    plugins:[
        new webpack.DllPlugin({
            path:'manifest.json',
            name:'[name]',
            context:__dirname
        }),
        new htmlWebpackPlugin({
            template:'./src/html/index.tmpl.base.html',
            filename:'index.tmpl.html',
        })
    ]
}