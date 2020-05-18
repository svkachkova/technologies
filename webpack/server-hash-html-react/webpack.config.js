const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: { app: "./src/index.js" },
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[chunkhash].js",
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /.(js|jsx)?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					}
				}
			},
			{
				test: [/.css$/],
				use: [
					"style-loader",
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV !== "development",
							reloadAll: true
						}
					},
					"css-loader"
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			template: require("html-webpack-template"),
			hash: true,
			title: "Webpack-tutorial",
			filename: "index.html",
			appMountId: "app-container"
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css"
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		historyApiFallback: true,
		compress: true,
		port: 3000,
		open: "Firefox",
		watchContentBase: true,
	}
};