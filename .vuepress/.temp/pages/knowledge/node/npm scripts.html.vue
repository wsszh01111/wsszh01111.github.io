<template><h1 id="npm-scripts" tabindex="-1"><a class="header-anchor" href="#npm-scripts" aria-hidden="true">#</a> npm scripts</h1>
<p>在<code>package.json</code>的<code>scripts</code>字段中配置的脚本就被称为npm脚本，脚本命令可以为项目提供诸多的功能</p>
<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2>
<p>npm scripts的基本原理是自动创建一个新的shell环境，在shell中执行脚本，可以配置任意的shell脚本；比较特殊的一点是，会将当前目录下的node_modules/.bin目录加入到新创建的shell环境的PATH中，因此在node_modules/.bin目录下的脚本都可以直接调用执行</p>
<h2 id="额外的参数" tabindex="-1"><a class="header-anchor" href="#额外的参数" aria-hidden="true">#</a> 额外的参数</h2>
<p>在npm scripts执行的过程中还可以拿到一些额外的参数，例如</p>
<p>还可以在node代码执行的过程中，通过<code>process.env.npm_package_*</code>前缀获取到package.json文件中的参数，通过<code>process.env.npm_config_*</code>获取到npm配置变量</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>npm_package_name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// package.json中的名称</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>npm_config_tag<span class="token punctuation">)</span> <span class="token comment">// npm配置参数的tag</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>或者在脚本命令行中通过<code>$npm_package_*</code>或者<code>$npm_config_*</code>读取</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">$npm_package_name</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$npm_config_tag</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="通配符" tabindex="-1"><a class="header-anchor" href="#通配符" aria-hidden="true">#</a> 通配符</h2>
<p>由于npm scripts基本原理就是shell脚本，因此其命令行命令也是可以使用通配符，例如<code>*</code>表示任意文件名，<code>**</code>表示任意一层子目录。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"lint"</span><span class="token operator">:</span> <span class="token string">"jshint *.js"</span><span class="token punctuation">,</span>
	<span class="token property">"lint"</span><span class="token operator">:</span> <span class="token string">"jshint **/*.js"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>同样转义也是通过反斜杠\进行转义</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"tap test/\*.js"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="传参" tabindex="-1"><a class="header-anchor" href="#传参" aria-hidden="true">#</a> 传参</h2>
<p>向 npm 脚本传入参数，在命令执行的时候，要使用*--*标明</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> run lint --  --reporter checkstyle <span class="token operator">></span> checkstyle.xml
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>也可以在<em>scripts</em>字段中里面再封装一个命令。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"lint"</span><span class="token operator">:</span> <span class="token string">"jshint **.js"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"lint:checkstyle"</span><span class="token operator">:</span> <span class="token string">"npm run lint -- --reporter checkstyle > checkstyle.xml"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ol>
<li><a href="http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html" target="_blank" rel="noopener noreferrer">npm scripts 使用指南 | 阮一峰<ExternalLinkIcon/></a></li>
</ol>
</template>
