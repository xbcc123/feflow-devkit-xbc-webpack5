
import llconfig from "./rspack/rspack.config.js";
const { rspack, ProgressPlugin } = require("@rspack/core");
const {RspackDevServer} = require("@rspack/dev-server");
const merge = require("webpack-merge");
const path = require("path")

let config = {}, importConfig = {};

import Builder from "./build/index.js";
import { deepCloneUnique } from "./tools/index.js";

let build = new Builder();

function setSingleConfig(options) {
	for (let key in options.devkit.commands) {
		let single = merge(
			options.devkit.commons,
			options.devkit.commands[key].options
		);
		single = deepCloneUnique(single, "optionsId");
		single.currentEnv = key;
		Object.assign(options.devkit.commands[key].options, single);
	}
	return options;
}

function getConfig(options, env) {
	options = setSingleConfig(options);
	return options.devkit.commands[env].options;
}
const projectRoot = process.cwd();
const myHost = "0.0.0.0";

module.exports = async (ctx) => {
	importConfig = getConfig(ctx.projectConfig, "dev");
	// 这里建议你将 currentConfig 替换为 rspack 的 dev 配置
	// const currentConfig = require("./rspack/rspack.dev.config");
	// config = merge(currentConfig, build.createDevConfig(importConfig));
  // 添加进度条插件
  if (!llconfig.plugins) llconfig.plugins = [];
  llconfig.plugins.push(new ProgressPlugin());
  const compiler = rspack(llconfig);
  const devServerOptions = {
    open: true,
    host: "0.0.0.0",
    port: 8889,
    hot: true,
    static: {
      directory: path.join(projectRoot, "./dist"),
      watch: true,
    },
    client: {
      overlay: false,      // 显示编译错误在浏览器
      logging: "warn",    // 替代 clientLogLevel 和 noInfo
      progress: true,     // 浏览器端显示进度条
    },
    compress: true,
    historyApiFallback: true,
  };

  const server = new RspackDevServer(devServerOptions, compiler);
  await server.start();
};
