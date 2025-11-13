const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

const env = process.env.NODE_ENV
console.log('%c***运行环境：', 'color: red', env)

module.exports = {
	// Use filesystem cache to speed up repeated builds
	cache: {
		type: 'filesystem',
		buildDependencies: {
			config: [__filename]
		}
	},
	entry: path.join(__dirname, '..', 'src', 'main.ts'),
	resolve: {
		extensions: ['.ts', '.js', '.tsx', '.json'],
		alias: {
			'@': path.join(__dirname, '..', 'src')
		},
		// 优化模块解析，优先使用 ES 模块
		mainFields: ['module', 'main'],
		// 减少模块解析时的搜索路径
		modules: [path.resolve(__dirname, '..', 'node_modules')]
	},
	module: {
		rules: [
			{
				test: /\.ts[x]?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: { appendTsSuffixTo: [/\.vue$/] }
			},
			{
				test: /\.vue$/i,
				use: 'vue-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: 'index.html' }),
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		})
	]
}
