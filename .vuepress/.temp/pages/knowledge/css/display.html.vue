<template><h1 id="display" tabindex="-1"><a class="header-anchor" href="#display" aria-hidden="true">#</a> display</h1>
<p>display是CSS样式布局中非常基础且重要的属性，在写CSS的过程中发现还是有欠缺，故回顾下</p>
<p>display可以去设置元素的内部（inner display types）和外部显示类型（outer display types），所谓外部显示类型，即控制了元素在流式布局中的表现效果，如<code>block</code>块级元素或<code>inline</code>内联元素；所谓内部显示类型，即声明其子元素的布局，如<code>flex</code>弹性布局</p>
<h2 id="属性值" tabindex="-1"><a class="header-anchor" href="#属性值" aria-hidden="true">#</a> 属性值</h2>
<p>display的属性值被分成6类</p>
<h3 id="display-outside" tabindex="-1"><a class="header-anchor" href="#display-outside" aria-hidden="true">#</a> &lt;display-outside&gt;</h3>
<p>定义了外部显示类型，包含了<code>block</code>和<code>inline</code>以及一个实验性质的<code>run-in</code></p>
<h3 id="display-inside" tabindex="-1"><a class="header-anchor" href="#display-inside" aria-hidden="true">#</a> &lt;display-inside&gt;</h3>
<p>定义了内部显示类型，包含了常用的<code>flex</code>、<code>grid</code>、<code>table</code>、<code>flow-root</code>以及带有实验性质的<code>flow</code>和<code>ruby</code></p>
<h3 id="display-listitem" tabindex="-1"><a class="header-anchor" href="#display-listitem" aria-hidden="true">#</a> &lt;display-listitem&gt;</h3>
<p>仅有一个单值<code>display: list-item</code>，将元素的外部显示类型设置为<code>block</code>，内部显示类型设置为list-item inline</p>
<h3 id="display-internal" tabindex="-1"><a class="header-anchor" href="#display-internal" aria-hidden="true">#</a> &lt;display-internal&gt;</h3>
<p>有些布局模型（如 <code>table</code> 和 <code>ruby</code>）有着复杂的内部结构，因此它们的子元素可能扮演着不同的角色。这一类关键字就是用来定义这些子元素的显示类型，并且只有在这些特定的布局模型中才有意义。如<code>table-row-group</code>、<code>table-header-group</code>等等</p>
<h3 id="display-box" tabindex="-1"><a class="header-anchor" href="#display-box" aria-hidden="true">#</a> &lt;display-box&gt;</h3>
<p>控制元素是否使用盒模型，包括了不显示元素时非常常用的<code>none</code>和以及实验性质的<code>contents</code></p>
<h3 id="display-legacy" tabindex="-1"><a class="header-anchor" href="#display-legacy" aria-hidden="true">#</a> &lt;display-legacy&gt;</h3>
<p>CSS2中定义的使用单个关键字来表示需要在同一个布局方式（layout mode）下同时使用两种布局类型的情况，最常见的就是<code>inline-block</code>，还包括了<code>inline-table</code>、<code>inline-flex</code>和<code>inline-grid</code></p>
<blockquote>
<p>在CSS3中规定了display属性的双值语法，但由于还没有被浏览器广泛支持，因此&lt;display-legacy&gt;的单关键字写法还将被支持很长一段时间</p>
</blockquote>
</template>
