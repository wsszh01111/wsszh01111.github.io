<template><h1 id="npx" tabindex="-1"><a class="header-anchor" href="#npx" aria-hidden="true">#</a> npx</h1>
<p>npx命令的核心目的，是可以很方便的调用一些项目中安装的模块所提供的可执行命令，之前可执行命令只能通过配置在<em>npm scripts</em>中执行，因为可执行命令处在命令执行目录的<em>node_modules/.bin</em>下，<em>npm scripts</em>会自动将命令执行目录的<em>node_modules/.bin</em>加入新建shell环境的<em>PATH</em>变量中，所以如果没有npx直接执行，需要通过类似<code>node-modules/.bin/mocha --version</code>的方式执行。</p>
<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2>
<p>而npx的原理也很简单，就是运行的时候，会到<code>node_modules/.bin</code>路径和环境变量*$PATH<em>里面，检查命令是否存在。由于 npx 会检查环境变量</em>$PATH*，所以系统命令也可以调用。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npx <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>注意，bash内置的命令不在*$PATH<em>里面，所以不能用。比如，<em>cd</em>是bash命令，因此就不能用</em>npx cd*。</p>
</blockquote>
<h2 id="远程模块" tabindex="-1"><a class="header-anchor" href="#远程模块" aria-hidden="true">#</a> 远程模块</h2>
<p>npx还可以拉取远程模块直接执行，借助此特性，可以实现一些功能</p>
<h3 id="执行github源码" tabindex="-1"><a class="header-anchor" href="#执行github源码" aria-hidden="true">#</a> 执行GitHub源码</h3>
<p>npx还可以执行GitHub上面的模块源码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 执行 Gist 代码</span>
$ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32

<span class="token comment"># 执行仓库代码</span>
$ npx github:piuccio/cowsay hello
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><blockquote>
<p>注意，远程代码必须是一个模块，即必须包含<code>package.json</code>和入口脚本。</p>
</blockquote>
<h3 id="避免全局安装模块" tabindex="-1"><a class="header-anchor" href="#避免全局安装模块" aria-hidden="true">#</a> 避免全局安装模块</h3>
<p>通常有些需要全局安装但不常用的工具，npx会将其下载到临时目录，执行完后再清理；在下载的同时还支持指定脚本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ npx uglify-js@3.1.0 main.js -o ./dist/main.js
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="no-install" tabindex="-1"><a class="header-anchor" href="#no-install" aria-hidden="true">#</a> --no-install</h4>
<p><em>--no-install</em>可以强制使用本地模块，不下载模块，没有本地模块时会报错</p>
<h4 id="ignore-existing" tabindex="-1"><a class="header-anchor" href="#ignore-existing" aria-hidden="true">#</a> --ignore-existing</h4>
<p><em>--ignore-existing</em>可以强制使用远程模块，不使用本地模块</p>
<h4 id="p" tabindex="-1"><a class="header-anchor" href="#p" aria-hidden="true">#</a> -p</h4>
<p><em>-p</em>参数用于指定 npx 所要安装的模块</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ npx -p node@0.12.8 <span class="token function">node</span> -v 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="c" tabindex="-1"><a class="header-anchor" href="#c" aria-hidden="true">#</a> -c</h4>
<p>如果npx安装多个模块，默认情况下，所执行的命令之中，只有第一个可执行项会使用npx安装的模块，后面的可执行项还是会交给shell解释。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ npx -p lolcatjs -p cowsay <span class="token string">'cowsay hello | lolcatjs'</span>
<span class="token comment"># 报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>上面代码中，<code>cowsay hello | lolcatjs</code>执行时会报错，原因是第一项<code>cowsay</code>由 npx 解释，而第二项命令<code>localcatjs</code>由 Shell 解释，但是<code>lolcatjs</code>并没有全局安装，所以报错。</p>
<p><code>-c</code>参数可以将所有命令都用 npx 解释。有了它，下面代码就可以正常执行了。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ npx -p lolcatjs -p cowsay -c <span class="token string">'cowsay hello | lolcatjs'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>-c</code>参数的另一个作用，是将环境变量带入所要执行的命令。举例来说，npm 提供当前项目的一些环境变量，可以用下面的命令查看。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> run <span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span> npm_
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>-c</code>参数可以把这些 npm 的环境变量带入 npx 命令。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ npx -c <span class="token string">'echo "$npm_package_name"'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>上面代码会输出当前项目的项目名。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>总的来说，npx就是一个npm命令执行提效工具，整体的方式类似<code>npm scripts</code>，提供更丰富的命令位置范围（主要是为了能执行<em>node_modules/.bin</em>下的命令脚本）以及远程模块拉取执行能力</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ol>
<li><a href="http://www.ruanyifeng.com/blog/2019/02/npx.html" target="_blank" rel="noopener noreferrer">npx 使用教程 | 阮一峰<ExternalLinkIcon/></a></li>
</ol>
</template>
