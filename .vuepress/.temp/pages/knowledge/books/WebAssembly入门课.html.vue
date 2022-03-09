<template><h1 id="webassembly入门课" tabindex="-1"><a class="header-anchor" href="#webassembly入门课" aria-hidden="true">#</a> WebAssembly入门课</h1>
<p>极客时间<a href="https://time.geekbang.org/column/intro/100059901" target="_blank" rel="noopener noreferrer">WebAssembly入门课<ExternalLinkIcon/></a>的部分笔记</p>
<h2 id="核心原理" tabindex="-1"><a class="header-anchor" href="#核心原理" aria-hidden="true">#</a> 核心原理</h2>
<h3 id="webassembly二进制层面的基本数据规则" tabindex="-1"><a class="header-anchor" href="#webassembly二进制层面的基本数据规则" aria-hidden="true">#</a> WebAssembly二进制层面的基本数据规则</h3>
<p>即WebAssembly针对不同数据类型有不同的编码方式</p>
<h4 id="字节序" tabindex="-1"><a class="header-anchor" href="#字节序" aria-hidden="true">#</a> 字节序</h4>
<p>Little-Endian：低地址位对应低数据位</p>
<p>Big-Endian：低地址位对应高数据位</p>
<h4 id="leb-128-整数编码" tabindex="-1"><a class="header-anchor" href="#leb-128-整数编码" aria-hidden="true">#</a> LEB-128 整数编码</h4>
<p>LEB-128 的全称为 “Little Endian Base 128”，是一种用于整数的、基于小端模式的可变长编码</p>
<p>Unsigned LEB-128/Signed LEB-128</p>
<h4 id="ieee-754" tabindex="-1"><a class="header-anchor" href="#ieee-754" aria-hidden="true">#</a> IEEE-754</h4>
<h4 id="utf-8-字符串编码" tabindex="-1"><a class="header-anchor" href="#utf-8-字符串编码" aria-hidden="true">#</a> UTF-8 字符串编码</h4>
<h4 id="wasm-数字类型" tabindex="-1"><a class="header-anchor" href="#wasm-数字类型" aria-hidden="true">#</a> Wasm 数字类型</h4>
<h2 id="_07wasi" tabindex="-1"><a class="header-anchor" href="#_07wasi" aria-hidden="true">#</a> 07WASI</h2>
<p>WebAssembly System Interface，WebAssembly 操作系统接口</p>
<h4 id="capability-based-security" tabindex="-1"><a class="header-anchor" href="#capability-based-security" aria-hidden="true">#</a> Capability-based Security</h4>
<p>Capability-based Security 是一种已知的、常用的安全模型。通常来讲，在计算机领域中，我们所提及的 capability 可以指代如 Token、令牌等概念。capability 是一种用于表示某种权限的标记，它可以在用户之间进行传递且无法被伪造。</p>
<h2 id="_08与浏览器交互所需的web-api和js-api" tabindex="-1"><a class="header-anchor" href="#_08与浏览器交互所需的web-api和js-api" aria-hidden="true">#</a> 08与浏览器交互所需的Web API和JS API</h2>
<p>Wasm 核心标准（Core Interfaces）以及嵌入接口标准（Embedding interfaces），与浏览器的交互标准主要是嵌入接口标准。JavaScript API 提供了众多的包装类型，这样便能够在 JavaScript 环境中表示 Wasm 模块的不同组成部分；还提供了代表wasm各个解析阶段的api</p>
<h3 id="wasm-浏览器加载流程" tabindex="-1"><a class="header-anchor" href="#wasm-浏览器加载流程" aria-hidden="true">#</a> Wasm 浏览器加载流程</h3>
<p>一个wasm二进制模块大致经过四个流程才能最终被浏览器使用</p>
<ul>
<li>Fetch：通过HTTP将wasm二进制模块加载到浏览器中</li>
<li>Compile：wasm字节码-&gt;平台相关代码，还未执行</li>
<li>Instantiate：执行上一步Compile后的代码，导入Import Section所定义的宿主资源资源，生成wasm模块实例</li>
<li>Call：调用wasm模块实例导出的函数</li>
</ul>
<h3 id="wasm-javascript-api" tabindex="-1"><a class="header-anchor" href="#wasm-javascript-api" aria-hidden="true">#</a> Wasm JavaScript API</h3>
<h4 id="模块对象" tabindex="-1"><a class="header-anchor" href="#模块对象" aria-hidden="true">#</a> 模块对象</h4>
<p><code>WebAssembly.Module</code>：对应Compile阶段完成后生成的wasm模块</p>
<p><code>WebAssembly.Instance</code>：对应Instantiate阶段完成后生成的wasm模块实例</p>
<p><code>WebAssembly.Module</code>和<code>WebAssembly.Instance</code>可以作为构造函数，生成对应的wasm模块和wasm模块实例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// "..." 为包含有效的 Wasm 二进制字节码数据的ArrayBuffer或是TypedArray；</span>
<span class="token keyword">let</span> bufferSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Int8Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> module <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebAssembly<span class="token punctuation">.</span>Module</span><span class="token punctuation">(</span>bufferSource<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 根据wasm字节码生成的wasm模块对象 即module是一个模块</span>
<span class="token keyword">let</span> bufferSource2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Int8Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> moduleInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebAssembly<span class="token punctuation">.</span>Instance</span><span class="token punctuation">(</span>bufferSource2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 生成一个wasm模块实例 即moduleInstance是一个由模块实例化之后生成的模块实例</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="导入对象" tabindex="-1"><a class="header-anchor" href="#导入对象" aria-hidden="true">#</a> 导入对象</h4>
<p>wasm模块可以在实例化时接收宿主环境提供的数据</p>
<p>浏览器作为wasm最主要的宿主环境，以JSAPI的方式定义了（在Import Section中声明的）能够被导入到wasm模块中的数据类型，分别是函数（JS Function）、全局数据（<code>WebAssembly.Global</code>）、线性内存对象（<code>WebAssembly.Memory</code>）以及 Table 对象（<code>WebAssembly.Table</code>）</p>
<p>同<code>WebAssembly.Module</code>和<code>WebAssembly.Instance</code>，<code>WebAssembly.Global</code>、<code>WebAssembly.Memory</code>和<code>WebAssembly.Table</code>也可以作为构造函数来创建js对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> memory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebAssembly<span class="token punctuation">.</span>Memory</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">initial</span><span class="token operator">:</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">maximum</span><span class="token operator">:</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="错误对象" tabindex="-1"><a class="header-anchor" href="#错误对象" aria-hidden="true">#</a> 错误对象</h4>
<p>JSAPI中还提供了几个错误对象，用来对应在wasm模块加载、编译、实例化、运行的各个阶段发生的错误</p>
<ul>
<li>
<p><code>WebAssembly.CompileError</code> 表示在 Wasm 模块编译阶段（Compile）发生的错误，比如模块的字节码编码格式错误、魔数不匹配</p>
</li>
<li>
<p><code>WebAssembly.LinkError</code> 表示在 Wasm 模块实例化阶段（Instantiate）发生的错误，比如导入到 Wasm 模块实例 Import Section 的内容不正确</p>
</li>
<li>
<p><code>WebAssembly.RuntimeError</code> 表示在 Wasm 模块运行时阶段（Call）发生的错误，比如常见的“除零异常”</p>
</li>
</ul>
<h4 id="模块实例化函数" tabindex="-1"><a class="header-anchor" href="#模块实例化函数" aria-hidden="true">#</a> 模块实例化函数</h4>
<p><code>WebAssembly.instantiate(bufferSource, importObject)</code>可以wasm二进制字节码实例化成一个wasm模块对象（即进行了编译和实例化两步），根据入参不同，其返回结果也有所差异，详见MDN上的<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly" target="_blank" rel="noopener noreferrer">API文档<ExternalLinkIcon/></a></p>
<h4 id="模块编译函数" tabindex="-1"><a class="header-anchor" href="#模块编译函数" aria-hidden="true">#</a> 模块编译函数</h4>
<p><code>WebAssembly.compile(bufferSource)</code>可以单独进行Compile编译步骤，返回一个编译好的静态WebAssembly.Module对象</p>
<h3 id="wasm-web-api" tabindex="-1"><a class="header-anchor" href="#wasm-web-api" aria-hidden="true">#</a> Wasm Web API</h3>
<p>JSAPI中主要定义的是与wasm相关的类型和操作，这些类型和操作是平台无关的；除此之外，为了充分利用Web平台的特性，还以Web API的形式提供了新的、高性能的编译和实例化接口。</p>
<h4 id="模块流式实例化方法" tabindex="-1"><a class="header-anchor" href="#模块流式实例化方法" aria-hidden="true">#</a> 模块流式实例化方法</h4>
<p>WebAssembly.instantiateStreaming(source, importObject)，提前对wasm模块进行实例化（而不是从远程加载好的完整 Wasm 模块二进制数据（bufferSource）），能够提升整体效率</p>
<h4 id="模块流式编译方法" tabindex="-1"><a class="header-anchor" href="#模块流式编译方法" aria-hidden="true">#</a> 模块流式编译方法</h4>
<p>WebAssembly.compileStreaming(source)，提前进行编译</p>
<h3 id="wasm-运行时-runtime" tabindex="-1"><a class="header-anchor" href="#wasm-运行时-runtime" aria-hidden="true">#</a> Wasm 运行时（Runtime）</h3>
<p>每个wasm模块实例在运行时都会维护自己的调用栈，由wasm模块实例导出的函数在运行过程中会影响调用栈中的数据。</p>
<p>每个wasm模块实例还有它对应的由“Memory Section” 和 “Data Section”共同描述的线性内存段（在线性MVP下只能有一个），线性内存段中存储wasm模块实例所有可用的数据资源；这些数据资源可以是wasm模块实例在运行时产生的，也可以是在实例化时通过<code>WebAssembly.Memory</code>对象形式导入的</p>
<p>浏览器会将wasm模块实例的线性内存段和JS内存进行隔离，因此js不能直接访问和调用wasm中的数据，反之亦然；并且现行的MVP尚无垃圾回收相关标准，因此需要手动对线性内存段进行资源释放</p>
<p>wasm内存访问的安全性由“Bound Check”保证</p>
<h3 id="wasm-与宿主环境的数据交互" tabindex="-1"><a class="header-anchor" href="#wasm-与宿主环境的数据交互" aria-hidden="true">#</a> Wasm 与宿主环境的数据交互</h3>
<p>由于js内存段和wasm内存段是隔离的，因此一般有两种方式用来使用js环境中的数据</p>
<ol>
<li>对于简单（字符/数字值等）数据类型，可以选择将其视为全局数据，通过 “Import Section” 导入到模块中使用；</li>
<li>对于复杂数据，需要将其以“字节”（TypeArray）的形式，拷贝到模块实例的线性内存段中来使用。</li>
</ol>
<h3 id="局限" tabindex="-1"><a class="header-anchor" href="#局限" aria-hidden="true">#</a> 局限</h3>
<ol>
<li>无法引用宿主环境的不透明数据（数据结构和内容未知），如DOM；间接的解决方案是使用函数</li>
<li>大部分数据结构复制时需要编解码</li>
</ol>
<blockquote>
<p>就目前 MVP 标准而言，Wasm 模块的线性内存段是与外部宿主环境进行直接信息交换的最重要“场所”。</p>
</blockquote>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>目前 Wasm MVP 标准在 Web 浏览器上的能力：凡是能够使用 Wasm 来实现的功能，现阶段都可以通过 JavaScript 来实现；而能够使用 JavaScript 来实现的功能，其中部分还无法直接通过 Wasm 实现（比如调用 Web API）。</p>
<h2 id="_09为前端框架赋能" tabindex="-1"><a class="header-anchor" href="#_09为前端框架赋能" aria-hidden="true">#</a> 09为前端框架赋能</h2>
<h2 id="_12已有的wasm运行时" tabindex="-1"><a class="header-anchor" href="#_12已有的wasm运行时" aria-hidden="true">#</a> 12已有的wasm运行时</h2>
</template>
