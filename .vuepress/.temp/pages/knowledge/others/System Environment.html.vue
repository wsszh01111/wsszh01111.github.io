<template><h1 id="system-environment" tabindex="-1"><a class="header-anchor" href="#system-environment" aria-hidden="true">#</a> System Environment</h1>
<p>环境变量是一组环境参数配置信息，因为现有的操作系统都是多用户的，因此环境变量是有可能根据用户的不同而不同</p>
<p><code>set</code>命令用来修改Shell环境的运行参数，即定制Shell环境，不带参数时显示所有运行参数，包括了环境变量和Shell函数等</p>
<p><code>env</code>显示当前Shell环境中有哪些环境变量，应该是包括了用户环境变量、系统环境变量和Shell本身的一些环境变量；同时也能够创建一个新的环境用于执行命令</p>
<p><code>export</code>显示本次Shell登录使用export设置的环境变量</p>
</template>
