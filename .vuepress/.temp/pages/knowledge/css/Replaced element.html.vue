<template><h1 id="replaced-element" tabindex="-1"><a class="header-anchor" href="#replaced-element" aria-hidden="true">#</a> Replaced element</h1>
<p>可替换元素（replaced element）是一个外部对象，其样式效果不受当前页面的CSS效果控制，当前页面的CSS仅能影响到可替换元素的位置，例如计算外边距等，同时可替换元素其本身具有的尺寸和基线可能会在计算中被用到；也有部分CSS属性能够控制可替换元素内容框中的对象位置，在此不再深究</p>
<p>典型的可替换元素有</p>
<ul>
<li><code>&lt;iframe&gt;</code></li>
<li><code>&lt;video&gt;</code></li>
<li><code>&lt;embed&gt;</code></li>
<li><code>&lt;img&gt;</code></li>
</ul>
<p>在特定情况下有些元素也是可替换元素，如</p>
<ul>
<li><code>&lt;option&gt;</code></li>
<li><code>&lt;audio&gt;</code></li>
<li><code>&lt;canvas&gt;</code></li>
<li><code>&lt;object&gt;</code></li>
<li><code>&lt;applet&gt;</code></li>
<li><code>&lt;input&gt;</code></li>
</ul>
<blockquote>
<p>用CSS的<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/content" target="_blank" rel="noopener noreferrer"><code>content</code><ExternalLinkIcon/></a>属性插入的对象是匿名的可替换元素。它们并不存在于 HTML 标记中，因此是“匿名的”。</p>
</blockquote>
</template>
