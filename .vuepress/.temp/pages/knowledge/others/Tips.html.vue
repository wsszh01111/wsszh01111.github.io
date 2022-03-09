<template><h1 id="tips" tabindex="-1"><a class="header-anchor" href="#tips" aria-hidden="true">#</a> Tips</h1>
<p>记录一些编码小技巧</p>
<h2 id="通过数组解构交换变量" tabindex="-1"><a class="header-anchor" href="#通过数组解构交换变量" aria-hidden="true">#</a> 通过数组解构交换变量</h2>
<p>数组结构小技巧</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>b<span class="token punctuation">,</span> a<span class="token punctuation">]</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="机制" tabindex="-1"><a class="header-anchor" href="#机制" aria-hidden="true">#</a> 机制</h3>
<p>其机制是表达式从右向左执行，右边先用ab变量生成了新数组，解构时将数组中的变量又赋值左边解构结构中的相应变量；因此这边ab变量只能通过<code>var</code>/<code>let</code>声明，如果使用<code>const</code>则会在解构赋值时报错</p>
<h2 id="while-i" tabindex="-1"><a class="header-anchor" href="#while-i" aria-hidden="true">#</a> while(i--)</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> i <span class="token operator">=</span> array<span class="token punctuation">.</span>length
<span class="token keyword">while</span><span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> value <span class="token operator">=</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></template>
