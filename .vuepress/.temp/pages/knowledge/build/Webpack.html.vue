<template><h1 id="webpack" tabindex="-1"><a class="header-anchor" href="#webpack" aria-hidden="true">#</a> webpack</h1>
<h2 id="通过源码看webpack打包原理" tabindex="-1"><a class="header-anchor" href="#通过源码看webpack打包原理" aria-hidden="true">#</a> 通过源码看webpack打包原理</h2>
<h3 id="webpack启动过程" tabindex="-1"><a class="header-anchor" href="#webpack启动过程" aria-hidden="true">#</a> webpack启动过程</h3>
<p><code>npm run dev</code>时，会创建一个PATH中带有<code>/path/to/project/node_modules/.bin</code>路径的SHELL环境用于运行dev对应的npm scripts，一般都是<code>webpack xx xx</code>，所以执行webpack时实际执行的是<code>/path/to/project/node_modules/.bin</code>下的名为<code>webpack</code>的node脚本（第一行用Shebang指定node作为脚本的解释器）。在<code>.bin/webpack</code>中，包含了<code>runCommand</code>、<code>isInstalled</code>等工具函数，该脚本的核心目标是找到<strong>webpack-cli</strong>或<strong>webpack-command</strong>包并执行包中bin脚本</p>
<h3 id="webpack-cli主流程" tabindex="-1"><a class="header-anchor" href="#webpack-cli主流程" aria-hidden="true">#</a> webpack-cli主流程</h3>
<p>webpack-cli主要干了几件事</p>
<ol>
<li>位于不影响构建配置的命令，如<code>init</code>、<code>migrate</code>等，直接执行</li>
<li>引入yargs定制命令行</li>
<li>分析命令行参数，对参数进行转换并组成编译配置项</li>
<li>引入webpack，根据配置执行构建流程</li>
</ol>
<h3 id="tapable" tabindex="-1"><a class="header-anchor" href="#tapable" aria-hidden="true">#</a> Tapable</h3>
<p>webpack中核心模块<code>Compiler</code>和<code>Compilation</code>都是继承自Tapable，Tapable是一个类似于<em>EventEmitter</em>的库，但更专注于自定义事件的触发和处理，用于控制hooks的发布和订阅，webpack的插件机制就是通过tapable实现的</p>
<p>webpack在初始化的过程中，通过<code>new Compiler</code>实例化一个<code>compiler</code>编译器，之后通过<code>plugin.call(compiler, compiler)</code>或者<code>plugin.apply(compiler)</code>挂载插件（这也就是为什么在写Plugin时，需要提供apply方法），通常在Plugin的<code>apply(compiler)</code>中所做的事，一定包含了<code>compiler.hooks.xxx.tap</code>等调用，这里就是在订阅基于Tapable提供的名为xxx的hooks。之后，通过调用<code>new WebpackOptionsApply().process(options, compiler)</code>，根据参数不同启用不同的插件，内部细节较为复杂。最后调用<code>compiler.run</code>，在其内部通过<code>hooks.xxx.call</code>，触发相应的hooks。整个过程就是在webpack中如何使用Tapable的一个基本流程，也就是为什么说webpack的插件机制就是通过tapable实现的，实际上整个流程非常复杂，上面只是一个比较基本的描述</p>
<blockquote>
<p>基于Tapable，可以理解webpack是一种基于事件流的编程范式，是一系列插件的执行</p>
</blockquote>
<h3 id="webpack主流程" tabindex="-1"><a class="header-anchor" href="#webpack主流程" aria-hidden="true">#</a> Webpack主流程</h3>
<p>webpack编译流程的执行，本质上就是进行一系列的钩子调用，可以大致分为准备阶段、模块打包阶段、后续优化阶段；钩子非常多，但主要有以下几个</p>
<h4 id="准备阶段" tabindex="-1"><a class="header-anchor" href="#准备阶段" aria-hidden="true">#</a> 准备阶段</h4>
<ul>
<li><code>webpack</code>中调用<code>WebpackOptionsDefaulter</code>，设置一些webpack编译过程中的默认参数</li>
<li>创建<code>Compiler</code>实例
<ul>
<li>创建<code>NormalModuleFactory</code>实例和<code>ContextModuleFactory</code>实例</li>
<li>创建<code>Compilation</code>实例</li>
</ul>
</li>
<li><code>webpack</code>中调用<code>NodeEnvironmentPlugin</code></li>
<li><code>webpack</code>中调用<code>WebpackOptionsApply</code>，将参数转换成webpack内部的Plugin并调用了<code>entryOption</code>hook</li>
<li>执行<code>Compiler</code>实例上的<code>run</code>函数，依次执行<code>beforeRun</code>和<code>run</code>两个hooks</li>
<li><code>run</code>hook之后调用<code>compile</code>函数，并传入<code>onCompiled</code>作为执行结束之后的回调</li>
</ul>
<h4 id="模块打包阶段" tabindex="-1"><a class="header-anchor" href="#模块打包阶段" aria-hidden="true">#</a> 模块打包阶段</h4>
<blockquote>
<p>在webpack中包含了多种Module，包括NormalModule普通模块、ContextModule上下文模块（即通过上下文路径引入的模块，如./a/b）、ExternalModule外部模块（module.exports = jQuery）、DelegatedModule（如manifest）、MultiModule（entry:[a, b]）</p>
</blockquote>
<ul>
<li>使用loader-runner运行loaders</li>
<li>通过Parser解析（内部使用acron）</li>
<li>使用ParserPlugins添加依赖</li>
</ul>
<h5 id="chunk生成算法" tabindex="-1"><a class="header-anchor" href="#chunk生成算法" aria-hidden="true">#</a> chunk生成算法</h5>
<ol>
<li>根据entry的module生成一个新的chunk</li>
<li>遍历module，将依赖的module加入到chunk中</li>
<li>如果module是动态引入的，则新建一个chunk</li>
<li>重复上述步骤直到生成所有的chunks</li>
</ol>
<h4 id="文件生成阶段-seal" tabindex="-1"><a class="header-anchor" href="#文件生成阶段-seal" aria-hidden="true">#</a> 文件生成阶段（seal）</h4>
<ul>
<li>做了一些优化</li>
<li>创建hash</li>
<li>在createModuleAssets中导出已经构建过的模块内容</li>
<li>将导出内容输出到磁盘</li>
</ul>
<h2 id="webpack5的一些更新" tabindex="-1"><a class="header-anchor" href="#webpack5的一些更新" aria-hidden="true">#</a> webpack5的一些更新</h2>
<ol>
<li>node&gt;=10.13.0</li>
<li>清除webpack4被废弃的功能
<ul>
<li>require.includes等</li>
</ul>
</li>
<li>不再为nodejs模块引入polyfill</li>
<li>长期缓存：本质是更改了bundle的命名方式</li>
<li>持久化缓存：跟webpack4中cache-loader提供的功能类似，将构建结果在本地持久化</li>
<li>构建优化
<ul>
<li>嵌套Treeshaking</li>
<li>内部模块Treeshaking</li>
</ul>
</li>
<li>代码生成：支持生成ES6代码</li>
<li>模块联邦：webpack5中通过ModuleFederationPlugin将多个应用结合起来</li>
</ol>
</template>
