const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    output: {
        filename: '[name]-[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: './dist',
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.json']
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
                exclude: file => (
                    // 为了确保 JS 的转译应用到 node_modules 的 Vue 单文件组件
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.ts[x]?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test: /\.vue$/i,
                use: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ],
}