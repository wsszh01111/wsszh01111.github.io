<template><h1 id="trailing-commas" tabindex="-1"><a class="header-anchor" href="#trailing-commas" aria-hidden="true">#</a> Trailing commas</h1>
<p>所谓尾后逗号就是js的一个语法，义如其名，就是在数组、对象的属性跟随的逗号，ES2017中还支持函数参数中的尾后逗号，其有以下几个特点</p>
<ol>
<li>在使用版本控制时，尾后逗号能让代码diff更加清晰</li>
<li>数组字面量的尾后逗号是最先支持的，带有超过一个尾后逗号的被称之为稀疏数组，形如<code>[1,2,,,,]</code>，对于稀疏数组，在使用<code>forEach</code>、<code>map</code>等数组遍历函数时会跳过数组间隙</li>
<li>ES5中支持了对象字面量尾后逗号</li>
<li>ES2017支持了函数参数中的尾后逗号，形如<code>function test(arg1,){}</code>，在函数调用时也可以使用尾后逗号的形式，形如<code>test(1,)</code>；尾后逗号并不影响函数定义，或者其<code>arguments</code>对象的 <code>length</code>属性</li>
<li>解构左侧也同样可以使用尾后逗号，形如<code>[a, b,] = [1, 2]</code>或<code>const {arg1,} = obj</code>，但不能在存在剩余参数时使用，形如<code>var [a, ...b,] = [1, 2, 3];</code>会触发语法错误SyntaxError</li>
<li>JSON中不支持尾后逗号</li>
</ol>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ol>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Trailing_commas" target="_blank" rel="noopener noreferrer">Trailing_commas | MDN<ExternalLinkIcon/></a></li>
</ol>
</template>
