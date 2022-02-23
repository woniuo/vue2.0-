const path = require('path')

module.exports = {
    // 模式, 开发
    mode: 'development',
    // 入口文件
    entry: './src/index.js',
    // 出口文件
    output: {
        filename: 'bundle.js'
    },
    // 配置一下webpack-dev-server
    devServer: {
        // 静态文件跟目录
        contentBase: path.join(__dirname, "www"),
        // 不压缩
        compress: false,
        // 端口号
        port: 8080,
        // 虚拟打包的路径, bundle.js 文件没有真正的生成
        publicPath: "/xuni/"
    }
}