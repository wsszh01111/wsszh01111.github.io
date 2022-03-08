<template><h1 id="shebang" tabindex="-1"><a class="header-anchor" href="#shebang" aria-hidden="true">#</a> Shebang</h1>
<p>所谓Shebang，即<code>#!</code>，在Linux/Unix系统中常在脚本第一行出现，作为声明用哪个解释器来解释脚本</p>
<p>在指定解释器的同时，也需要指定解释器的位置，通常使用<code>/usr/bin/env</code>，<code>/usr/bin/env</code>是Linux/Unix系统中用来显示当前用户环境变量的命令，指定在所有环境变量中寻找指定的解释器</p>
<p>因此，在node脚本头常见的<code>#!/usr/bin/env node</code>，即当前脚本使用node执行，在环境变量指定的路径中寻找node</p>
</template>
