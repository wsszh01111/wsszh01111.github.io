# npm scripts

在`package.json`的`scripts`字段中配置的脚本就被称为npm脚本，脚本命令可以为项目提供诸多的功能

## 原理

npm scripts的基本原理是自动创建一个新的shell环境，在shell中执行脚本，可以配置任意的shell脚本；比较特殊的一点是，会将当前目录下的node_modules/.bin目录加入到新创建的shell环境的PATH中，因此在node_modules/.bin目录下的脚本都可以直接调用执行

## 额外的参数

在npm scripts执行的过程中还可以拿到一些额外的参数，例如

还可以在node代码执行的过程中，通过`process.env.npm_package_*`前缀获取到package.json文件中的参数，通过`process.env.npm_config_*`获取到npm配置变量

```js
console.log(process.env.npm_package_name); // package.json中的名称
console.log(process.env.npm_config_tag) // npm配置参数的tag
```

或者在脚本命令行中通过`$npm_package_*`或者`$npm_config_*`读取

```bash
echo $npm_package_name
echo $npm_config_tag
```

## 通配符

由于npm scripts基本原理就是shell脚本，因此其命令行命令也是可以使用通配符，例如`*`表示任意文件名，`**`表示任意一层子目录。

```json
{
  "lint": "jshint *.js",
	"lint": "jshint **/*.js"
}
```

同样转义也是通过反斜杠\进行转义

```json
{
  "test": "tap test/\*.js"
}
```

## 传参

向 npm 脚本传入参数，在命令执行的时候，要使用*--*标明

```bash
$ npm run lint --  --reporter checkstyle > checkstyle.xml
```

也可以在*scripts*字段中里面再封装一个命令。

```javascript
{
  "lint": "jshint **.js",
  "lint:checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
}
```

## 参考

1. [npm scripts 使用指南 | 阮一峰](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
