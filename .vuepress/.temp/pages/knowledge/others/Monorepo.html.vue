<template><h1 id="monorepo" tabindex="-1"><a class="header-anchor" href="#monorepo" aria-hidden="true">#</a> Monorepo</h1>
<p>monorepo是一种代码管理方式，不同于传统的一个项目一个仓库的方式（multirepo），monorepo提倡将所有相关代码放到一个仓库中，在仓库中划分成多个包（package），一个package对应一块项目代码。已经被许多主流的框架/工具所采用。monorepo的思想核心就是集中管理代码，避免同时修改多个依赖包代码时导致的时间/心智成本的消耗</p>
<h2 id="好处" tabindex="-1"><a class="header-anchor" href="#好处" aria-hidden="true">#</a> 好处</h2>
<ul>
<li>最大的好处即是上面提到的，代码集中管理降低了项目体系复杂导致的维护成本（尤其是需要跨项目修改的时候），包括时间成本、心智成本等等</li>
<li>方便管理所有项目版本和项目依赖</li>
<li>统一的工作流，只需同一套lint/build/test/release命令覆盖所有代码</li>
</ul>
<h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2>
<ul>
<li>最明显的问题即所有代码在同一个仓库中，仓库体积将不可避免的增大，并且每个包都拥有自己的node_modules，将会进一步扩大整个仓库的体积</li>
<li>仓库具有全代码，也就意味着权限管理和代码管控也是比较重要的一个问题</li>
</ul>
<h2 id="lerna" tabindex="-1"><a class="header-anchor" href="#lerna" aria-hidden="true">#</a> lerna</h2>
<h2 id="yarn-workspaces" tabindex="-1"><a class="header-anchor" href="#yarn-workspaces" aria-hidden="true">#</a> yarn workspaces</h2>
<ul>
<li>管理仓库内的二方包依赖关系（始终保持二方包最新），优化第三方依赖安装</li>
<li>One lockfile</li>
</ul>
</template>
