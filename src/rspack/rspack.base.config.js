const path = require("path");
const CopyRspackPlugin = require("@rspack/plugin-copy");
const VueLoaderPlugin = require("@rspack/plugin-vue");
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
  cache: {
    type: "filesystem",
  },
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
            loader: require.resolve("@rspack/plugin-vue/loader")
          }
        ]
      },
      // 其他 loader 配置
    ],
  },
  plugins: [
    new CopyRspackPlugin({
      patterns: [
        // 这里可根据需要添加拷贝规则
      ],
    }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
  ],
};
