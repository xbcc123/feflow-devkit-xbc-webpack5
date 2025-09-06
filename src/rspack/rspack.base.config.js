const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const colors = require("colors");

const projectRoot = process.cwd();

module.exports = {
  context: path.join(projectRoot, "./"),
  entry: path.join(projectRoot, "./src/index.js"),
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "static/js/[name].[hash].bundle.js",
    chunkFilename: "static/js/[name].[chunkhash].bundle.js",
    publicPath: "/",
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
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        // 这里可根据需要添加拷贝规则
      ],
    }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
  ],
};
