const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // 将 `.ts` 添加为一个可解析的扩展名。
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
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
                test: /\.ts[x]$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test: /\.vue$/i,
                use: 'vue-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name]-[contenthash].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ],
}