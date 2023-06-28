const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const contextRoot = '/';

module.exports = (env = 'development') => ({
	output: {
		publicPath: contextRoot,
		path: path.join(__dirname, '/dist'), // the bundle output path
		filename: 'bundle.js', // the name of the bundle
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'], // 免寫後綴名字
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'React Web Title',
			favicon: 'src/favicon.ico',
			template: 'src/index.html', // to import index.html file inside index.js
		}),
		new webpack.DefinePlugin({
			'process.env': {
				// NODE_ENV:JSON.stringify(env),
				VERSION: JSON.stringify(package.version + package.build),
				CONTEXT_ROOT: JSON.stringify(contextRoot),
				// DOMAIN: JSON.stringify(domain),
			},
		}),
	],
	devServer: {
		port: 9999,
		static: './src',
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, // .js and .jsx files
				exclude: /node_modules/, // excluding the node_modules folder
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(sa|sc|c)ss$/, // styles files
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
				loader: 'url-loader',
				options: { limit: false },
			},
		],
	},
});
