const path = require('path')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')

module.exports = merge(
    webpackCommonConf,
    {
        mode: 'production',
        output: {
            filename: '[name]-[contenthash].bundle.js',
            path: path.join(__dirname, '..', 'dist'),
        },
    }
)