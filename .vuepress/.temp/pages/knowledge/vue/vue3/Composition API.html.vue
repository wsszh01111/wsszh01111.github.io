<template><h1 id="composition-api" tabindex="-1"><a class="header-anchor" href="#composition-api" aria-hidden="true">#</a> Composition API</h1>
<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2>
<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<p>为了在<code>setup</code>中提供相同的响应式能力和生命周期能力，vue3中暴露出了一系列接口，如on*的生命周期钩子、ref、watch、computed等</p>
<h3 id="ref" tabindex="-1"><a class="header-anchor" href="#ref" aria-hidden="true">#</a> ref</h3>
<p>接收一个值，为值创建一个响应式引用（ Reactive Reference）并返回</p>
<p>两个原因促成了<code>ref</code>函数的产生，首先不管是Vue2中的<code>Object. 同时不会意外丢失响应式能力defineProperty</code>还是Vue3中的<code>Proxy</code>，监听数据变动的主体都是对象，监听对象中的属性变动，对于JS中的基础类型，是无法做到监听数据变动的，因此使用<code>ref</code>将基础数据类型包裹在对象中，以实现响应式的监听；其次JS中基础数据类型的参数赋值或函数传参，都是值传递，因此直接使用基础数据类型容易处理不当导致意外丢失响应式的能力（例如对<code>reactive</code>生成的响应式对象进行解构）</p>
<p>总的来说，推荐使用ref对值进行包裹，保证JS中基础数据类型和引用类型具有相同的响应式能力，在数据传递时也具有相同的引用传递行为</p>
<h3 id="torefs" tabindex="-1"><a class="header-anchor" href="#torefs" aria-hidden="true">#</a> toRefs</h3>
<p>返回一个普通对象，对象中的每个值都指向原响应式对象属性对应的响应式引用（ Reactive Reference），即<code>ref</code>包裹之后的值。响应式对象属性的值和响应式属性的值是相关联的（引用类型应该指向的是同一个，基础数据类型的值同步应该由框架内部维护了）</p>
<p><code>toRefs</code>最大的意义就是可以避免由<code>reactive</code>创建的响应式对象解构等情况引起的响应式能力的缺失</p>
<h3 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h3>
<p>跟<code>option API</code>中的<code>watch</code>类似，提供了监听响应式数据变动的能力</p>
<h3 id="computed" tabindex="-1"><a class="header-anchor" href="#computed" aria-hidden="true">#</a> computed</h3>
</template>
