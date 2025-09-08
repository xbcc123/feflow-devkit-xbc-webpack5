const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const projectRoot = process.cwd();

/**
 * Rspack 配置
 * 文档: https://www.rspack.dev/zh/config/
 */
module.exports = {
	context: path.join(projectRoot, "./"),
	entry: path.join(projectRoot, "./src/index.js"),
	output: {
		path: path.join(projectRoot, "dist"),
		filename: "static/js/[name].[contenthash].bundle.js",
		chunkFilename: "static/js/[name].[contenthash].bundle.js",
		publicPath: "/",
		clean: true,
	},
	cache: true,
	externals: {},
	resolve: {
		extensions: [".ts", ".js", ".jsx", ".tsx", ".json", ".vue"],
		alias: {
			vue$: "vue/dist/vue.esm.js",
			app: path.join(projectRoot, "./src/app.js"),
			"@": path.join(projectRoot, "./src"),
		},
		mainFiles: ["index"],
		modules: [
			path.resolve(__dirname, "../../../node_modules"),
			path.join(projectRoot, "node_modules"),
		],
	},
	module: {
		rules: [
			// 这里可根据需要添加 loader 配置
			{
				test: /\.vue$/,
				use: [
					{
						loader: require.resolve("vue-loader")
					}
				]
			},
			{
					test: /\.vue$/,
					use: [
					{
						loader: 'vue-loader',
						options: {
						experimentalInlineMatchResource: true,
						},
					},
					],
				},
			{
				test: /\.js$/,
				exclude: [
					path.join(projectRoot, "node_modules"),
					path.resolve(__dirname, "../../node_modules"),
				],
				use: [
					{
						loader: "thread-loader",
					},
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "ecmascript",
									jsx: true,
								},
								transform: {
									react: {
										runtime: "automatic",
									},
								},
							},
						},
					},
				],
			},
			{
				test: /\.(j|t)sx?$/,
				use: [
					{
						loader: "thread-loader",
					},
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "ecmascript",
									jsx: true,
								},
								transform: {
									react: {
										runtime: "automatic",
									},
								},
							},
						},
					},
				],
				exclude: [
					path.join(projectRoot, "node_modules"),
					path.resolve(__dirname, "../../node_modules"),
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				type: "asset/inline",
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				type: "asset/inline",
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				type: "asset/inline",
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.join(projectRoot, "./static"),
				to: "static",
				ignore: [".*"],
			},
		]),
		new ProgressBarPlugin(),
	],
};
