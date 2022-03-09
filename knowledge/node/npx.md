# npx

npx命令的核心目的，是可以很方便的调用一些项目中安装的模块所提供的可执行命令，之前可执行命令只能通过配置在*npm scripts*中执行，因为可执行命令处在命令执行目录的*node_modules/.bin*下，*npm scripts*会自动将命令执行目录的*node_modules/.bin*加入新建shell环境的*PATH*变量中，所以如果没有npx直接执行，需要通过类似`node-modules/.bin/mocha --version`的方式执行。

## 原理

而npx的原理也很简单，就是运行的时候，会到`node_modules/.bin`路径和环境变量*$PATH*里面，检查命令是否存在。由于 npx 会检查环境变量*$PATH*，所以系统命令也可以调用。

```bash
npx ls
```

> 注意，bash内置的命令不在*$PATH*里面，所以不能用。比如，*cd*是bash命令，因此就不能用*npx cd*。

## 远程模块

npx还可以拉取远程模块直接执行，借助此特性，可以实现一些功能

### 执行GitHub源码

npx还可以执行GitHub上面的模块源码

```bash
# 执行 Gist 代码
$ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32

# 执行仓库代码
$ npx github:piuccio/cowsay hello
```

>  注意，远程代码必须是一个模块，即必须包含`package.json`和入口脚本。

### 避免全局安装模块

通常有些需要全局安装但不常用的工具，npx会将其下载到临时目录，执行完后再清理；在下载的同时还支持指定脚本

```bash
$ npx uglify-js@3.1.0 main.js -o ./dist/main.js
```

#### --no-install

*--no-install*可以强制使用本地模块，不下载模块，没有本地模块时会报错

#### --ignore-existing

*--ignore-existing*可以强制使用远程模块，不使用本地模块

#### -p

*-p*参数用于指定 npx 所要安装的模块

```bash
$ npx -p node@0.12.8 node -v 
```

#### -c

如果npx安装多个模块，默认情况下，所执行的命令之中，只有第一个可执行项会使用npx安装的模块，后面的可执行项还是会交给shell解释。

```bash
$ npx -p lolcatjs -p cowsay 'cowsay hello | lolcatjs'
# 报错
```

上面代码中，`cowsay hello | lolcatjs`执行时会报错，原因是第一项`cowsay`由 npx 解释，而第二项命令`localcatjs`由 Shell 解释，但是`lolcatjs`并没有全局安装，所以报错。

`-c`参数可以将所有命令都用 npx 解释。有了它，下面代码就可以正常执行了。

```bash
$ npx -p lolcatjs -p cowsay -c 'cowsay hello | lolcatjs'
```

`-c`参数的另一个作用，是将环境变量带入所要执行的命令。举例来说，npm 提供当前项目的一些环境变量，可以用下面的命令查看。

```bash
$ npm run env | grep npm_
```

`-c`参数可以把这些 npm 的环境变量带入 npx 命令。

```bash
$ npx -c 'echo "$npm_package_name"'
```

上面代码会输出当前项目的项目名。


## 总结

总的来说，npx就是一个npm命令执行提效工具，整体的方式类似`npm scripts`，提供更丰富的命令位置范围（主要是为了能执行*node_modules/.bin*下的命令脚本）以及远程模块拉取执行能力

## 参考

1. [npx 使用教程 | 阮一峰](http://www.ruanyifeng.com/blog/2019/02/npx.html)
