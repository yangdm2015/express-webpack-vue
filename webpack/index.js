//这里引入了html-webpack-plugin模块来构建动态的html页面
var htmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderConfig = require('./vue-loader.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('../config');
const utils = require('./utils');

module.exports = {
    //js入口文件我们默认以多入口为例子，其他用法可以关注我的文章后续会发出来
    entry: {
        main: './src/js/main.js',
    },
    //打包输出的js文件位置［name］会按照模块的名称自动生成两个js文件
    output: {
        filename: 'javascripts/[name]-bundle.js',
        // filename: 'main-bundle.js',
        //这里没有使用 path模块来构建目录的路径有需要的可以单独修改
        // path: '../public',
        path: config.build.assetsRoot,
        //publicPath非常重要它可以放置页面的依赖关系在生成之后出现路径问题
        publicPath: 'http://localhost:3000'
    },
    //webpack把vuejs的名称指向修改出问题需要它来修改
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    mode: 'development', // 设置mode
    //loader加载器
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: vueLoaderConfig
            },
            { //css加载器
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js/,
                loader: 'babel-loader'
            },
            { //html加载器（html－webpack－plugin默认以ejs加载页面防止报错我们需要html加载器）
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    //html页面扩展
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            //这个是生成的html文件名，我们把它直接放在views中覆盖原有的欢迎页面
            filename: '../views/index.html',
            //这个是根据哪个页面模版来打包文件
            template: './src/tpl/index.html',
            //chunks代表当前页面需要引入上述哪个依赖文件，我们直接将两个都引入
            chunks: ['main']
        }),

    ]
}