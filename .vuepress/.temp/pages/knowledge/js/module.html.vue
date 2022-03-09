<template><h1 id="module" tabindex="-1"><a class="header-anchor" href="#module" aria-hidden="true">#</a> module</h1>
<p>commonjs导出的是值的拷贝，ES Module导出的是值的引用</p>
<p>commonjs在运行时加载模块，即执行到require才知道需要相应模块，并执行相应模块；ES Module在静态分析和运行两个阶段，静态分析会分析每个模块的导入和导出的接口，也就是说模块加载是在静态分析阶段完成的（或者说整个模块依赖关系是在静态分析阶段就明确的），运行阶段会根据模块依赖关系从低至上开始运行</p>
<p>esmodule分为命名导出namedexports和默认导出defaultexports</p>
<ol>
<li>
<p><code>export default thing</code> is different to <code>export { thing as default }</code></p>
<p>默认导出一个基础类型的变量不行</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">// export default expression rather than export a variable 'a'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> a<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<p>Why is &quot;export default var a = 1;&quot; invalid syntax?</p>
<p>https://esdiscuss.org/topic/why-is-export-default-var-a-1-invalid-syntax</p>
</li>
</ol>
<h1 id="循环引用" tabindex="-1"><a class="header-anchor" href="#循环引用" aria-hidden="true">#</a> 循环引用</h1>
<p>https://www.jianshu.com/p/ba0faf79c167</p>
<p>https://www.ruanyifeng.com/blog/2015/11/circular-dependency.html</p>
<p>CommonJS模块的重要特性是加载时执行，即脚本代码在<code>require</code>的时候，就会全部执行。CommonJS的做法是，一旦出现某个模块被&quot;循环加载&quot;，就只输出已经执行的部分，还未执行的部分不会输出。</p>
<p>ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令<code>import</code>时，不会去执行模块，而是只生成一个引用（，应该还会去静态解析模块暴露出的接口（怎么静态解析的））。等到真的需要用到时，再到模块里面去取值。核心原因就是esmodule暴露出的是值的引用，实际调用时再处理，因此需要由程序员自行控制执行顺序；因此导出的变量可能会存在uninitialized状态，是由于模块还没有执行所以没有initialized（function/class等就不会有这个问题，因为静态解析阶段就知道他们是function/class），读取uninitialized的数据会报错</p>
</template>
