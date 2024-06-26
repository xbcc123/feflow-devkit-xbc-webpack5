

<h1 align="center">feflow-devkit-xbc-webpack5</h1>
feflow-devkit-webpack5 为feflow套件 支持编译指定React，Vue项目模板 通过配置套件配置可以定制化项目编译参数



## 特性

- 使用webpack5 + babel7 最新的构建解决方案

- 支持React，Vue的编译运行

- 目前支持多个环境配置（dev， test，formalTest，demo,  prod ）

  


## 开始使用

先通过 cnpm 安装 feflow 开始.

```
cnpm install @feflow/cli -g
```



### 添加feflow配置文件

在项目根目录添加 `feflow.json` 或者 `feflow.js`  配置文件

```js
{
    "devkit": {
        "commands": {
            "dev": {
                "builder": "feflow-devkit-xbc-webpack5:dev",
                "options": { // 配置单独配置 配置项参考下面公用配置项
                    "isMinicss": false,
                    "port": 8013
                }
            },
            "test": {
                "builder": "feflow-devkit-xbc-webpack5:test",
                "options": {
                    "isMinicss": true
                }
            },
            "formalTest": {
                "builder": "feflow-devkit-xbc-webpack5:formalTest",
                "options": {
                    "isMinicss": true
                }
            },
            "demo": {
                "builder": "feflow-devkit-xbc-webpack5:demo",
                "options": {
                    "isMinicss": true
                }
            },
            "build": {
                "builder": "feflow-devkit-xbc-webpack5:build",
                "options": {
                    "port": 8003,
                    "isMinicss": true,
                    externals: [{
                        optionsId: 100, // xbc会将 optionsId 一致的配置去重，用作公共配置和单个配置的 去重
                        module: "antd",
                        entry: "https://cdn.bootcss.com/antd/3.26.12/antd.min.js",
                        global: "antd"
                    }, {
                        module: "Vue",
                        entry: "",
                        global: "vue"
                    }, ],
                }
            }
        },
        "commons": { // 此处为公用配置
            "entry": "main.js", // 配置项目webpack 编译入口
            "isModule": false, // 开启css模块化 (vue项目不需要开启)
            "isMinicss": true, // 是否需要抽离css (本地调试环境不需要)		
            "hasAnalyzer": false, // 是否开启webpack包大小的调试
            "analyzerOptions": { // 调试包的配置
                "analyzerPort": 3478
            },
            "port": 1234, // webpack静态服务器启动端口号
            "alias": { // webpack别名配置
                "@": "src",
            },
            externals: [{
                optionsId: 100, //  xbc会将 optionsId 一致的配置去重，用作公共配置和单个配置的 去重
                module: "antd",
                entry: "https://cdn.bootcss.com/antd/3.26.12/antd.min.js",
                global: "antd"
            }, {
                module: "Vue",
                entry: "",
                global: "vue"
            }, ],
            "envs": { // 环境变量配置 目前只支持固定环境变量配置
                "dev": {
                    "envObj": {
                        "NODE_ENV": "\"development\"",
                        "API_HOST": "\"http://xxx.xxx.xx.x:xxxx\"",
                    }
                },
                "test": {
                    "envObj": {
                        "NODE_ENV": "\"test\"",
                        "API_HOST": "\"http://xxx.xxx.xx.x:xxxx\"",
                    }
                },
                "formalTest": {
                    "envObj": {
                        "NODE_ENV": "\"formalTest\"",
                        "API_HOST": "\"http://xxx.xxx.xx.x:xxxx\"",
                    }
                },
                "demo": {
                    "envObj": {
                        "NODE_ENV": "\"demo\"",
                        "API_HOST": "\"http://xxx.xxx.xx.x:xxxx\"",
                    }
                },
                "build": {
                    "envObj": {
                        "NODE_ENV": "\"production\"",
                        "API_HOST": "\"http://xxx.xxx.xx.x:xxxx\"",
                    }
                }
            }
        }
    }
}
   
```



### API

| 参数     | 说明         | 必须 | 类型   | 默认值 |
| -------- | ------------ | ---- | ------ | ------ |
| commands | 脚本配置命令 | true | object | {}     |
| commons  | 面包屑路径   | true | object | {}     |



### commands
| 参数        | 说明                          | 必须 | 类型   | 默认值 |
| ----------- | ----------------------------- | ---- | ------ | ------ |
| dev,test... | 对应不同的环境                | true | object | {}     |
| builder     | 对应不同的脚本                | true | object | {}     |
| options     | 项目具体配置对应commons中参数 | true | object | {}     |



### commons
| 参数        | 说明                                    | 必须 | 类型   | 默认值 |
| ----------- | --------------------------------------- | ---- | ------ | ------ |
| entry       | webpack编译入口，例子index.tsx          | true | string | 无     |
| isModule    | 开启css模块化 (vue项目不需要开启)       | true | object | {}     |
| isMinicss   | 是否需要抽离css (本地调试环境不需要)    | true | object | {}     |
| hasAnalyzer | 是否开启webpack包大小的调试             | true | object | {}     |
| analyzer    | analyzer调试包的配置                    | true | object | {}     |
| port        | webpack静态服务器启动端口号             | true | number | 无     |
| alias       | webpack别名配置                         | true | object | {}     |
| externals   | externals配置                           | true | array  | []     |
| envs        | 环境变量配置 目前只支持固定环境变量配置 | true | object | {}     |

### 配置说明
- 项目中需要用到的技术栈和UI框架建议使用externals插件配置
- Vue项目
	
	- 配置isModule为false
	
- React项目
	- 配置isModule为true
	
	  
	
### 模板 

##### 模板使用方式
```shell
	fef install generator-**
	fef init 
```


#####  搭配套件使用的模板
- [generator-xbc-react](https://github.com/xbcc123/generator-xbc-react) React后台管理模板
	- 配置TS
	- mobx
	- ant4
- [generator-xbc-vue](https://github.com/xbcc123/generator-xbc-vue) Vue后台管理模板
	- 配置TS
	- Vuex
	- element	
- [generator-xbc-wechat ](https://github.com/xbcc123/generator-xbc-wechat)  微信小程序模板
	- vant
	- mobx

#####  自定义模板
- [开发模板](https://github.com/Tencent/feflow/wiki/%E5%BC%80%E5%8F%91%E8%80%85%E6%96%87%E6%A1%A3)

### *配置注意事项

- 单个环境的配置比commons中的配置优先级高

- 类似externals这种对象数组的配置在commons和单个环境中同时存在时，插件会将optionsId相同的配置去重
- 目前只支持固定环境变量配置

### 配置文件demo
[Vue项目配置](./example/vue/.feflowrc.js)

[React项目配置](./example/react/.feflowrc.js)


### 命令
> 根据作者目前公司配置的环境 可以只使用其中一部分

```sh
$ fef dev      # 本地开发时的命令
$ fef test     # 发布时的打包命令开发测试
$ fef formalTest   # 发布时的打包命令测试测试
$ fef demo     # 发布时的打包命令演示环境
$ fef build    # 发布时的打包命令生产环境
```

### 本地调试

[点击进入](./test/smoke/README.md)

## 发布

1. 发布版本
```
	npm run release
```
2. 生成CHANGELOG
```
	npm run changelog
```

## 发布日志

本项目遵从 [Semantic Versioning](http://semver.org/).
每次发布信息都会在 Github 的 [Releases](./CHANGELOG.md) 中呈现.


##  贡献代码方式

pr工作流

##  git提交规范

[参考地址](https://github.com/xbcc123/git-commit)

##  eslint规范
待定
