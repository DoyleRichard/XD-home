const path = require('path')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(webpackCommonConf, {
	mode: 'production',
	output: {
		filename: '[name]-[contenthash].bundle.js',
		path: path.join(__dirname, '..', 'dist'),
		clean: true, // Webpack 5 原生清理功能，每次构建前自动清空 output 目录
		chunkFilename: 'js/[name]-[contenthash].chunk.js', // 异步加载的 chunk 文件名
		assetModuleFilename: 'assets/[name]-[hash][ext]' // 资源文件名
	},
	performance: {
		hints: 'warning',
		maxEntrypointSize: 512000, // 入口文件大小限制 (500KB)
		maxAssetSize: 512000, // 单个资源文件大小限制 (500KB)
		assetFilter: function (assetFilename) {
			// 只对 JS 文件进行性能检查
			return /\.js$/.test(assetFilename)
		}
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
	optimization: {
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: 20, // 增加初始请求数量限制
			maxAsyncRequests: 20,
			minSize: 20000, // 最小 chunk 大小 (20KB)
			cacheGroups: {
				// Vue 核心库单独打包
				vue: {
					test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/,
					name: 'vendor-vue',
					priority: 40,
					enforce: true
				},
				// Ant Design Vue 单独打包
				antd: {
					test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
					name: 'vendor-antd',
					priority: 35,
					enforce: true
				},
				// Lodash 单独打包
				lodash: {
					test: /[\\/]node_modules[\\/]lodash[\\/]/,
					name: 'vendor-lodash',
					priority: 30,
					enforce: true
				},
				// 其他 node_modules 依赖
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					priority: 20,
					reuseExistingChunk: true,
					minChunks: 1 // 只要被引用 1 次就打包
				},
				// 公共代码
				common: {
					name: 'common',
					minChunks: 2, // 至少被 2 个 chunk 引用
					priority: 10,
					reuseExistingChunk: true
				}
			}
		},
		// 运行时代码单独打包
		runtimeChunk: {
			name: 'runtime'
		},
		// 压缩优化
		minimize: true,
		usedExports: true, // Tree shaking
		sideEffects: true // 支持 package.json 中的 sideEffects 字段
	},
	plugins: [new MiniCssExtractPlugin({ filename: 'css/[name]-[contenthash].css' })]
})
