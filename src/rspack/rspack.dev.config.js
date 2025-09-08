
const { merge } = require("webpack-merge");
const path = require("path");
const HtmlRspackPlugin = require("@rspack/plugin-html");
const baseConfig = require("./rspack.base.config");

const projectRoot = process.cwd();

const devConfig = {
  mode: "development",
  target: "web",
  plugins: [
    new HtmlRspackPlugin({
      filename: "index.html",
      template: path.join(projectRoot, "index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(projectRoot, "./dist"),
    },
    hot: true,
    host: "0.0.0.0",
    open: true,
    client: {
      overlay: false,
      logging: "warn",
    },
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 100,
    poll: 1000,
  },
  devtool: "eval-cheap-source-map",
};

module.exports = merge(baseConfig, devConfig);
