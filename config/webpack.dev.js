const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')

module.exports = merge(
    webpackCommonConf,
    {
        mode: 'development',
        devServer: {
            port: 6324,
        },
        module: {
            rules: [
                {
                    test: /\.[s][ac]ss$/i,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader", options: { sourceMap: true } },
                        { loader: "postcss-loader", options: { sourceMap: true } },
                        { loader: "sass-loader", options: { sourceMap: true } },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        /**
                         * You can also speed up babel-loader by
                         * as much as 2x by using the cacheDirectory option.
                         * This will cache transformations to the filesystem.
                         *
                         * 官方建议打开，可以缓存转义文件，提高2倍编译速度
                         */
                        cacheDirectory: true
                    },
                    exclude: file => (
                        // 为了确保 JS 的转译应用到 node_modules 的 Vue 单文件组件
                        /node_modules/.test(file) && !/\.vue\.js/.test(file)
                    )
                },
            ]
        }
    }
)