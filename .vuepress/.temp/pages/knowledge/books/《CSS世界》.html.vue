<template><h1 id="《css世界》" tabindex="-1"><a class="header-anchor" href="#《css世界》" aria-hidden="true">#</a> 《CSS世界》</h1>
<h2 id="_3-流、元素与基本尺寸" tabindex="-1"><a class="header-anchor" href="#_3-流、元素与基本尺寸" aria-hidden="true">#</a> 3 流、元素与基本尺寸</h2>
<h3 id="_3-2-width-height-作用的具体细节" tabindex="-1"><a class="header-anchor" href="#_3-2-width-height-作用的具体细节" aria-hidden="true">#</a> 3.2 width/height 作用的具体细节</h3>
<h4 id="_3-2-1-深藏不露的-width-auto" tabindex="-1"><a class="header-anchor" href="#_3-2-1-深藏不露的-width-auto" aria-hidden="true">#</a> 3.2.1 深藏不露的 width:auto</h4>
<h5 id="extrinsic-sizing" tabindex="-1"><a class="header-anchor" href="#extrinsic-sizing" aria-hidden="true">#</a> Extrinsic Sizing</h5>
<p>外部尺寸计算，即元素尺寸由外部决定</p>
<ol>
<li>
<p>块级元素在正常布局流下的默认宽度</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span> // <span class="token property">有无width</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>均可 width默认值就是auto
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote>
<p>所谓正常布局流（流动性），并不是看上去的宽度 100%显示这么简单，而是一种 margin/border/padding 和 content 内容区域自动分配水平空间的机制。</p>
</blockquote>
</li>
<li>
<p>格式化宽度，在<code>absolute</code>和<code>fixed</code>中，对于非替换元素，当<code>left/top</code>或<code>top/bottom</code>对立方位的属性值同时 存在的时候，元素的宽度表现为“格式化宽度”，其宽度大小相对于最近的具有定位特性（非static）的祖先元素计算。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
</ol>
<h4 id="intrinsic-sizing" tabindex="-1"><a class="header-anchor" href="#intrinsic-sizing" aria-hidden="true">#</a> Intrinsic Sizing</h4>
<ol>
<li>
<p>内联元素在不超过最大宽度的时候，其尺寸由其内容决定，比如<code>inline</code>、<code>inline-block</code>等</p>
</li>
<li>
<p>内联元素在其父元素过小时，即内联元素被挤压至小于<em>首选最小宽度</em>，其宽度为<em>首选最小宽度</em></p>
<ul>
<li>
<p>东亚文字（如中文）的<em>首选最小宽度</em>为每个汉字的宽度</p>
</li>
<li>
<p>西方文字的<em>首选最小宽度</em>由特定的连续的英文字符单元决定。并不是所有的英文字符都会组成连续单元， 一般会终止于空格(普通空格)、短横线、问号以 及其他非英文字符等。例如，“display:inline- block”这几个字符以连接符“-”作为分隔符，形 成了“display:inline”和“block”两个连续 单元，由于连接符“-”分隔位置在字符后面，因此， 最后的宽度就是“display:inline-”的宽度</p>
</li>
<li>
<p>对于<code>img</code>等可替换元素来说，其<em>首选最小宽度</em>就是内容本身的宽度</p>
</li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector"># 实现凹凸效果
.ao</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.ao:before</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">"love你love"</span><span class="token punctuation">;</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> 2px solid #cd0000<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li>
<li>
<p>内联元素最大宽度由其内部的最长内容决定</p>
</li>
</ol>
</template>
