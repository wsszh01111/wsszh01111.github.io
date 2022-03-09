# Shebang

所谓Shebang，即`#!`，在Linux/Unix系统中常在脚本第一行出现，作为声明用哪个解释器来解释脚本

在指定解释器的同时，也需要指定解释器的位置，通常使用`/usr/bin/env`，`/usr/bin/env`是Linux/Unix系统中用来显示当前用户环境变量的命令，指定在所有环境变量中寻找指定的解释器

因此，在node脚本头常见的`#!/usr/bin/env node`，即当前脚本使用node执行，在环境变量指定的路径中寻找node
