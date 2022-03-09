# require

`require`在nodejs中用来加载模块，是nodejs中CommonJs模块体系的基础

> require 并不是全局性命令，而是每个模块提供的一个内部方法，也就是说，只有在模块内部才能使用 require 命令（唯一的例外是 REPL 环境）

## 加载机制

从源码层面将，模块的加载实质上就是，注入exports、require、module三个全局变量，然后执行模块的源码，然后将模块的 exports 变量的值输出。

翻译自https://nodejs.org/api/modules.html#modules_all_together

```
在目录Y下的模块中执行require(X)

1. 如果X是核心模块,
   a. 返回核心模块
   b. 停止
2. 如果X以'/'开始 # 即认为X是绝对路径
   a. 将Y设置为文件系统的根目录
3. 如果X以'./'、'/'、'../'开始
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
   c. 抛出异常"not found"
4. 如果X以'#'开头
   a. LOAD_PACKAGE_IMPORTS(X, dirname(Y))
5. LOAD_PACKAGE_SELF(X, dirname(Y))
6. LOAD_NODE_MODULES(X, dirname(Y))
7. 抛出异常"not found"

# LOAD_AS_FILE函数 认为X是个文件路径进行加载
LOAD_AS_FILE(X)
1. 如果X是个文件，按照X文件的文件扩展名进行加载。停止
2. 如果X.js是个文件，将X.js作为JS脚本加载。停止
3. 如果X.json是个文件，将X.json解析为一个JS对象加载。停止
4. 如果X.node是个文件，将X.node作为一个二进制插件加载。停止

# LOAD_INDEX函数 加载X目录下的index.js/index.json/index.node文件
LOAD_INDEX(X)
1. 如果X/index.js是文件，将X/index.js作为JS脚本加载。停止
2. 如果X/index.json是个文件，将X/index.json解析为一个JS对象加载。停止
3. 如果X/index.node是个文件，将X/index.node作为一个二进制插件加载。停止

# LOAD_AS_DIRECTORY函数 认为X是个目录路径进行加载
LOAD_AS_DIRECTORY(X)
1. 如果X/package.json是个文件,
   a. 解析X/package.json文件，读取main字段
   b. 如果main字段值为falsy，前往第二步
   c. let M = X + main字段值
   d. LOAD_AS_FILE(M)
   e. LOAD_INDEX(M)
   f. LOAD_INDEX(X) 不建议
   g. 抛出异常"not found"
2. LOAD_INDEX(X)

# LOAD_NODE_MODULES函数 认为X指向是的个NODE模块，加载该模块
LOAD_NODE_MODULES(X, START)
1. let DIRS = NODE_MODULES_PATHS(START)
2. 遍历DIRS，每个值为DIR:
   a. LOAD_PACKAGE_EXPORTS(X, DIR)
   b. LOAD_AS_FILE(DIR/X)
   c. LOAD_AS_DIRECTORY(DIR/X)

# 处理模块路径
NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = [GLOBAL_FOLDERS]
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS

# 加载imports包
LOAD_PACKAGE_IMPORTS(X, DIR)
1. 找到DIR的父目录SCOPE
2. 没有父目录，返回
3. 如果SCOPE/package.json中的imports字段是null或者undefined，返回
4. let MATCH = PACKAGE_IMPORTS_RESOLVE(X, pathToFileURL(SCOPE),
  ["node", "require"]) defined in the ESM resolver.
5. RESOLVE_ESM_MATCH(MATCH).

# 加载exports包
LOAD_PACKAGE_EXPORTS(X, DIR)
1. 尝试将X分解成为NAME和SUBPATH两部分，其中NAME应该有个@scope/前缀，SUBPATH以/开头
2. 如果X分解失败，或者DIR/NAME/package.json不是个文件，直接返回
3. 解析DIR/NAME/package.json文件，查找exports字段
4. 如果exports字段是null或者undefined，直接返回
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(DIR/NAME), "." + SUBPATH,
   `package.json` "exports", ["node", "require"]) defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

# 加载包
LOAD_PACKAGE_SELF(X, DIR)
1. 找到DIR的父目录SCOPE
2. 没有父目录，返回
3. 如果SCOPE/package.json中的exports字段是null或者undefined，返回
4. 如果X不是以SCOPE/package.json的name字段值作为开头，返回
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(SCOPE),
   "." + X.slice("name".length), `package.json` "exports", ["node", "require"])
   defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

# 解析ESM匹配
RESOLVE_ESM_MATCH(MATCH)
1. let { RESOLVED, EXACT } = MATCH
2. let RESOLVED_PATH = fileURLToPath(RESOLVED)
3. EXACT是true
   a. 如果RESOLVED_PATH指向的文件存在，根据文件扩展名按类加载。停止
4. EXACT是false
   a. LOAD_AS_FILE(RESOLVED_PATH)
   b. LOAD_AS_DIRECTORY(RESOLVED_PATH)
5. 抛出异常"not found"
```

## 参考

1. [require() 源码解读 | 阮一峰](http://www.ruanyifeng.com/blog/2015/05/require.html)
2. [modules | node Docs](https://nodejs.org/api/modules.html#modules_all_together)