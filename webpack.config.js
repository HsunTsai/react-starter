const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const package = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 基本config (正式及開發環境共用config)
const baseConfig = isProd => {
	const contextRoot = isProd ? '/xxxweb/' : '/'; // 上server後會有path (xxxweb or yyyweb ... ) 看server怎麼定
	const domain = isProd ? '/xxx' : '/xxx'; // 依照後端的path決定 通常正是及開發環境是相同的
	return {
		output: { publicPath: contextRoot },
		resolve: { extensions: ['.js', '.jsx', '.json'] }, // 免寫後綴名字
		plugins: [
			new HtmlWebpackPlugin({
				title: 'React Web Title',
				favicon: 'src/favicon.ico',
				template: 'src/index.html', // to import index.html file inside index.js
			}),
			new webpack.DefinePlugin({
				'process.env': {
					VERSION: JSON.stringify(package.version + package.build),
					CONTEXT_ROOT: JSON.stringify(contextRoot),
					DOMAIN: JSON.stringify(domain),
				},
			}),
		],
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/, // .js and .jsx files
					exclude: /node_modules/, // excluding the node_modules folder
					use: ['babel-loader', 'eslint-loader'],
				},
				// styles files
				{ test: /\.(sa|sc|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
				// to import images and fonts
				{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader', options: { limit: false } },
			],
		},
	};
};

module.exports = param => {
	const { WEBPACK_BUILD } = param || {};
	const isProd = !!WEBPACK_BUILD; // build指令時，WEBPACK_BUILD 會是 true，反之則是 undefined

	if (isProd) {
		// 正式環境
		return merge(baseConfig(isProd), {
			output: {
				path: path.join(__dirname, '/dist'), // the bundle output path
				// filename: 'bundle.js', // the name of the bundle
				filename: 'js/[name].[chunkhash].bundle.js',
				chunkFilename: 'js/[name]-[id].[chunkhash].bundle.js',
			},
			plugins: [
				new CleanWebpackPlugin(['dist/*'], { root: path.join(__dirname, '/') }),
				new CopyWebpackPlugin({
					patterns: [
						{ from: 'src/images', to: 'images' },
						{ from: 'src/data', to: 'data' },
						{ from: 'src/locales', to: 'locales' },
						{ from: 'web.config', to: 'web.config' },
					],
				}),
			],
		});
	} else {
		// 開發環境
		return merge(baseConfig(isProd), {
			devServer: {
				port: 9999,
				static: './src',
				historyApiFallback: true,
			},
		});
	}
};
