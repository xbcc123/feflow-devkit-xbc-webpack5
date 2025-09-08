
const { rspack } = require("@rspack/core");
const RspackDevServer = require("@rspack/dev-server");
const merge = require("webpack-merge");

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

const myHost = "0.0.0.0";

module.exports = async (ctx) => {
	importConfig = getConfig(ctx.projectConfig, "dev");
	// 这里建议你将 currentConfig 替换为 rspack 的 dev 配置
	const currentConfig = require("./rspack/rspack.dev.config");
	config = merge(currentConfig, build.createDevConfig(importConfig));
	const compiler = rspack(config);
	const devServerOptions = Object.assign({}, config.devServer, {
		open: true,
		host: myHost,
	});
	const server = new RspackDevServer(devServerOptions, compiler);
	await server.start();
};
