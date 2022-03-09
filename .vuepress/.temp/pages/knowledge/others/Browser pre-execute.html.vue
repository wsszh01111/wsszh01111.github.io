<template><h1 id="browser-pre-execute" tabindex="-1"><a class="header-anchor" href="#browser-pre-execute" aria-hidden="true">#</a> Browser pre-execute</h1>
<p>最近发现浏览器的控制台增加了函数预执行的功能，本来以为是个很简单的功能，后来发现事情没有这么简单....</p>
<p>简单思考了下，浏览器函数的预执行最好是个纯函数，但是获取时间这种非纯函数也可以，所以判断底层基本逻辑应该是判断函数执行时是否有变动非当前作用域的数据</p>
</template>
