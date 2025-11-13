const path = require('path')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(webpackCommonConf, {
	mode: 'production',
	output: {
		filename: '[name]-[contenthash].bundle.js',
		path: path.join(__dirname, '..', 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: file =>
					// 为了确保 JS 的转译应用到 node_modules 的 Vue 单文件组件
					/node_modules/.test(file) && !/\.vue\.js/.test(file)
			},
			{
				test: /\.[s][ac]ss$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							api: 'modern' // 使用现代 Sass API
						}
					}
				],
				exclude: /node_modules/
			}
		]
	},
	plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()]
})
