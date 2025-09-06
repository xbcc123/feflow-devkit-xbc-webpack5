const { merge } = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./rspack.base.config");

const projectRoot = process.cwd();

const devConfig = {
  mode: "development",
  target: "web",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(projectRoot, "index.html"),
    }),
  ],
  devServer: {
    static: [path.join(projectRoot, "./dist")],
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
