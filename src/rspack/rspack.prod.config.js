const path = require("path");
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./rspack.base.config");

const projectRoot = process.cwd();

const prodConfig = {
  mode: "production",
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(projectRoot, "index.html"),
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 80 * 1024,
      maxSize: 200 * 1024,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
    },
    minimize: true,
    // rspack 内置 terser，无需单独配置 minimizer
  },
};

module.exports = merge(baseConfig, prodConfig);
