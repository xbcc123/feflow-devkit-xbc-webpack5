import { rspack } from "@rspack/core";
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const projectRoot = process.cwd();

module.exports = {
	context: projectRoot,
	entry: path.join(projectRoot, "src/index.tsx"), // 主入口，可改成 index.js
	output: {
		path: path.resolve(projectRoot, "dist"),
		filename: "static/js/[name].[contenthash].js",
		chunkFilename: "static/js/[name].[contenthash].js",
		publicPath: "/",
		clean: true,
	},
	cache: true,
	experiments: {
		cache: true,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".json"],
		alias: {
			"@": path.resolve(projectRoot, "src"),
			vue$: "vue/dist/vue.esm.js",
		},
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: path.resolve(__dirname, "../../node_modules/vue-loader"),
			},
			// {
			// 	test: /\.[jt]sx?$/,
			// 	exclude: /node_modules/,
			// 	use: {
			// 		loader: path.resolve(__dirname, '../../node_modules/babel-loader/lib/index.js'),
			// 		options: {
			//       		cacheDirectory: true,       // 开启缓存（会在 node_modules/.cache/babel-loader/ 里存放缓存文件）
			// 			cacheCompression: false,    // 禁用缓存压缩，加快读写
			// 			presets: [
			// 				[path.resolve(__dirname, '../../node_modules/@babel/preset-env'), { targets: "defaults" }],
			// 				[path.resolve(__dirname, '../../node_modules/@babel/preset-typescript'), { allowDeclareFields: true }]
			// 			],
			// 			plugins: [
			// 				[path.resolve(__dirname, '../../node_modules/@babel/plugin-proposal-decorators'), { legacy: true }],
			// 				path.resolve(__dirname, '../../node_modules/@babel/plugin-proposal-class-properties'),
			// 				path.resolve(__dirname, '../../node_modules/@babel/plugin-proposal-object-rest-spread')
			// 			],
			// 		},
			// 	},
			// },
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'builtin:swc-loader',
					options: {
						jsc: {
							parser: {
								syntax: "typescript",
								tsx: true,
								decorators: true
							},
							transform: {
								legacyDecorator: true,
								decoratorMetadata: true
							}
						}
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					path.resolve(__dirname, '../../node_modules/vue-style-loader/index.js'),
					// rspack.CssExtractRspackPlugin.loader,
					{
						loader: path.resolve(__dirname, '../../node_modules/css-loader'),
						options: {
							// esModule: false,
							// modules: true,
						},
					},
					{
						loader: path.resolve(__dirname, '../../node_modules/postcss-loader'),
						options: {
							postcssOptions: {
								plugins: [require('autoprefixer')],
							},
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					path.resolve(__dirname, '../../node_modules/vue-style-loader/index.js'),
					// rspack.CssExtractRspackPlugin.loader,
					{
						loader: path.resolve(__dirname, '../../node_modules/css-loader'),
						options: {
							// esModule: false,
							// modules: true,
						},
					},
					{
						loader: path.resolve(__dirname, '../../node_modules/postcss-loader'),
						options: {
							postcssOptions: {
								plugins: [require('autoprefixer')],
							},
						},
					},
					{
						loader: path.resolve(__dirname, '../../node_modules/less-loader'),
						options: { lessOptions: { javascriptEnabled: true } },
					},
				],
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					path.resolve(__dirname, '../../node_modules/vue-style-loader/index.js'),
					// rspack.CssExtractRspackPlugin.loader,
					{
						loader: path.resolve(__dirname, '../../node_modules/css-loader'),
						options: {
							// esModule: false,
							// modules: true,
						},
					},
					{
						loader: path.resolve(__dirname, '../../node_modules/postcss-loader'),
						options: {
							postcssOptions: {
								plugins: [require('autoprefixer')],
							},
						},
					},
					path.resolve(__dirname, '../../node_modules/sass-loader')
				],
			},
			// {
			// 	test: /\.styl$/,
			// 	use: [
			// 		path.resolve(__dirname, '../../node_modules/vue-style-loader/index.js'),
			// 		rspack.CssExtractRspackPlugin.loader,
			// 		path.resolve(__dirname, '../../node_modules/css-loader'),
			// 		{
			// 			loader: path.resolve(__dirname, '../../node_modules/postcss-loader'),
			// 			options: {
			// 				postcssOptions: {
			// 					plugins: require('autoprefixer'),
			// 				},
			// 			},
			// 		},
			// 		path.resolve(__dirname, '../../node_modules/stylus-loader')
			// 	],
			// },
			{
				test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new rspack.HtmlRspackPlugin({
			template: path.resolve(projectRoot, "index.html"),
			filename: "index.html",
			inject: true,
		}),
		new rspack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
				// NODE_ENV: JSON.stringify("production"),
				// API_HOST: JSON.stringify("/api"),
				// API_IMG: JSON.stringify("/image/"),
				// API_HOST_WWW: JSON.stringify("/api"),
				// API_IMG_WWW: JSON.stringify("/image/"),
			},
		}),
		new rspack.CssExtractRspackPlugin({
			filename: "static/css/[name].[contenthash].css",
		}),
	],
	// optimization: {
	// 	splitChunks: {
	// 		chunks: "all",
	// 		minSize: 80 * 1024,
	// 		maxSize: 200 * 1024,
	// 		minChunks: 1,
	// 		maxAsyncRequests: 6,
	// 		maxInitialRequests: 4,
	// 	},
	// 	minimize: true,
	// },
};
