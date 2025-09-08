const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const projectRoot = process.cwd();

module.exports = {
  context: projectRoot,
  entry: path.join(projectRoot, "src/index.ts"), // 主入口，可改成 index.js
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "static/js/[name].[contenthash].js",
    chunkFilename: "static/js/[name].[contenthash].js",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm-bundler.js",
      "@": path.join(projectRoot, "src"),
    },
    modules: ["node_modules", path.join(projectRoot, "node_modules")],
  },
  module: {
    rules: [
      // Vue 文件
  {
      test: /\.vue$/,
      loader: "vue-loader",
    },
	{
	test: /\.[jt]sx?$/,
	exclude: /node_modules/,
	use: {
		loader: "babel-loader",
		options: {
		cacheDirectory: true,
		presets: [
			["@babel/preset-env", { targets: "defaults" }],
			["@babel/preset-typescript", { allExtensions: true }],
		],
		plugins: [
			["@babel/plugin-proposal-decorators", { legacy: true }],
			"@babel/plugin-proposal-class-properties",
			"@babel/plugin-proposal-object-rest-spread",
		],
		},
	},
	},
      // 图片
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb 以下转 base64
          },
        },
      },
      // 字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: "asset/resource",
      },
      // 音视频
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.join(projectRoot, "static"),
    //       to: "static",
    //       globOptions: {
    //         ignore: ["**/.*"],
    //       },
    //     },
    //   ],
    // }),
    new ProgressBarPlugin(),
  ],
  cache: true,
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "source-map", // 可选，方便调试
};
