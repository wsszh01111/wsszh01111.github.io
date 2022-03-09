# webpack

## 通过源码看webpack打包原理

### webpack启动过程

`npm run dev`时，会创建一个PATH中带有`/path/to/project/node_modules/.bin`路径的SHELL环境用于运行dev对应的npm scripts，一般都是`webpack xx xx`，所以执行webpack时实际执行的是`/path/to/project/node_modules/.bin`下的名为`webpack`的node脚本（第一行用Shebang指定node作为脚本的解释器）。在`.bin/webpack`中，包含了`runCommand`、`isInstalled`等工具函数，该脚本的核心目标是找到**webpack-cli**或**webpack-command**包并执行包中bin脚本

### webpack-cli主流程

webpack-cli主要干了几件事

1. 位于不影响构建配置的命令，如`init`、`migrate`等，直接执行
2. 引入yargs定制命令行
3. 分析命令行参数，对参数进行转换并组成编译配置项
4. 引入webpack，根据配置执行构建流程

### Tapable

webpack中核心模块`Compiler`和`Compilation`都是继承自Tapable，Tapable是一个类似于*EventEmitter*的库，但更专注于自定义事件的触发和处理，用于控制hooks的发布和订阅，webpack的插件机制就是通过tapable实现的

webpack在初始化的过程中，通过`new Compiler`实例化一个`compiler`编译器，之后通过`plugin.call(compiler, compiler)`或者`plugin.apply(compiler)`挂载插件（这也就是为什么在写Plugin时，需要提供apply方法），通常在Plugin的`apply(compiler)`中所做的事，一定包含了`compiler.hooks.xxx.tap`等调用，这里就是在订阅基于Tapable提供的名为xxx的hooks。之后，通过调用`new WebpackOptionsApply().process(options, compiler)`，根据参数不同启用不同的插件，内部细节较为复杂。最后调用`compiler.run`，在其内部通过`hooks.xxx.call`，触发相应的hooks。整个过程就是在webpack中如何使用Tapable的一个基本流程，也就是为什么说webpack的插件机制就是通过tapable实现的，实际上整个流程非常复杂，上面只是一个比较基本的描述

> 基于Tapable，可以理解webpack是一种基于事件流的编程范式，是一系列插件的执行

### Webpack主流程

webpack编译流程的执行，本质上就是进行一系列的钩子调用，可以大致分为准备阶段、模块打包阶段、后续优化阶段；钩子非常多，但主要有以下几个

#### 准备阶段

- `webpack`中调用`WebpackOptionsDefaulter`，设置一些webpack编译过程中的默认参数
- 创建`Compiler`实例
  - 创建`NormalModuleFactory`实例和`ContextModuleFactory`实例
  - 创建`Compilation`实例
- `webpack`中调用`NodeEnvironmentPlugin`
- `webpack`中调用`WebpackOptionsApply`，将参数转换成webpack内部的Plugin并调用了`entryOption`hook
- 执行`Compiler`实例上的`run`函数，依次执行`beforeRun`和`run`两个hooks
- `run`hook之后调用`compile`函数，并传入`onCompiled`作为执行结束之后的回调

#### 模块打包阶段

> 在webpack中包含了多种Module，包括NormalModule普通模块、ContextModule上下文模块（即通过上下文路径引入的模块，如./a/b）、ExternalModule外部模块（module.exports = jQuery）、DelegatedModule（如manifest）、MultiModule（entry:[a, b]）

- 使用loader-runner运行loaders
- 通过Parser解析（内部使用acron）
- 使用ParserPlugins添加依赖

##### chunk生成算法

1. 根据entry的module生成一个新的chunk
2. 遍历module，将依赖的module加入到chunk中
3. 如果module是动态引入的，则新建一个chunk
4. 重复上述步骤直到生成所有的chunks

#### 文件生成阶段（seal）

- 做了一些优化
- 创建hash
- 在createModuleAssets中导出已经构建过的模块内容
- 将导出内容输出到磁盘

## webpack5的一些更新

1. node\>=10.13.0
2. 清除webpack4被废弃的功能
   - require.includes等
3. 不再为nodejs模块引入polyfill
4. 长期缓存：本质是更改了bundle的命名方式
5. 持久化缓存：跟webpack4中cache-loader提供的功能类似，将构建结果在本地持久化
6. 构建优化
   - 嵌套Treeshaking
   - 内部模块Treeshaking
7. 代码生成：支持生成ES6代码
8. 模块联邦：webpack5中通过ModuleFederationPlugin将多个应用结合起来
