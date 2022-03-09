<template><h1 id="tofixed-and-toexponential" tabindex="-1"><a class="header-anchor" href="#tofixed-and-toexponential" aria-hidden="true">#</a> toFixed and toExponential</h1>
<blockquote>
<p>定点表示法：是跟浮点表示法相对应的数字表示方式，所谓“定”与“浮”，指的是小数点位置的固定与浮动。如果小数点固定，对比浮点表示法，定点表示法能表示的数字范围和数字精度都会更小，因此在计算机中表示数字一般都是使用浮点表示法。动态浮动小数点，确实能够同时支持更大的数字范围和数字精度</p>
</blockquote>
<p><code>toFixed(digits)</code>/<code>toExponential(fractionDigits)</code>作为一对数字转换函数。</p>
<p><code>toFixed(digits)</code>将数字转换成定点表示法的字符串形式，也就是常见的符合直接的数字表示方式；<code>toFixed(digits)</code>会根据入参<code>digits</code>对小数部分进行四舍五入或补全0；但注意如果数值大于 1e+21，该方法会简单调用<code>Number.prototype.toString()</code>并返回一个指数记数法格式的字符串。</p>
<p><code>toExponential(fractionDigits)</code>将数字转换成指数表示法的字符串形式，其对于小数部分的处理和<code>toFixed(digits)</code>类似，会进行四舍五入和补全0，形如<code>'2.500e+0'</code></p>
<h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2>
<p>由于二进制中的浮点数表示法并不能精确的表示每个数，因此需要注意在一些情况下<code>toFixed(digits)</code>和<code>toExponential(fractionDigits)</code>的四舍五入是会有问题的，例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">2.55</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// '2.5'</span>
<span class="token number">2.55</span> <span class="token punctuation">.</span><span class="token function">toExponential</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// '2.5e+0' 注意这里空开了一位 在没有小数点和指数时，隔开一位可以避免点号被解释为一个小数点</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></template>
