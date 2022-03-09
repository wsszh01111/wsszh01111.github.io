<template><h1 id="currying" tabindex="-1"><a class="header-anchor" href="#currying" aria-hidden="true">#</a> Currying</h1>
<p>柯里化简单来说就是**只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数*，我觉得，更加深入来说，柯里化是一种利用语言特性（闭包、js中函数也是对象可以在函数逻辑中被返回）来组织代码逻辑的方式。</p>
<p>利用柯里化（本质上是利用闭包）可以实现部分参数固定；在Vue的模板编译中，通过柯里化实现了不同平台配置的拆分和固定，同时将核心编译逻辑和参数解析、缓存等其他逻辑相分离，非常厉害</p>
<h2 id="柯里化函数实现" tabindex="-1"><a class="header-anchor" href="#柯里化函数实现" aria-hidden="true">#</a> 柯里化函数实现</h2>
<h3 id="简单实现" tabindex="-1"><a class="header-anchor" href="#简单实现" aria-hidden="true">#</a> 简单实现</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">currying</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> <span class="token operator">...</span>args1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args1<span class="token punctuation">,</span> <span class="token operator">...</span>args2<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="递归实现" tabindex="-1"><a class="header-anchor" href="#递归实现" aria-hidden="true">#</a> 递归实现</h3>
<p>简单实现只能固定支持两个参数，不够灵活</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 注意这里利用fn.length获取了函数的参数个数 竟然还可以这样 之前都不知道</span>
<span class="token keyword">function</span> <span class="token function">currying</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> <span class="token operator">...</span>args1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fn<span class="token punctuation">.</span>length <span class="token operator">===</span> args1<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args1<span class="token punctuation">)</span>
  
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">currying</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token operator">...</span>args1<span class="token punctuation">,</span> <span class="token operator">...</span>args2<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<ol>
<li>柯里化可以实现参数复用和延迟执行</li>
<li>柯里化在js里性能比较差，主要还是套了太多函数</li>
<li>柯里化生于函数式编程，也陷于函数式编程，个人感觉在js中还是不适合大量使用，但函数式编程及其思想还是需要关注</li>
</ol>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ol>
<li><a href="https://juejin.cn/post/6844903603266650125" target="_blank" rel="noopener noreferrer">大佬，JavaScript 柯里化，了解一下？<ExternalLinkIcon/></a></li>
</ol>
</template>
