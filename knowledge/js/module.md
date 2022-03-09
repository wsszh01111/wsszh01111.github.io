# module

commonjs导出的是值的拷贝，ES Module导出的是值的引用

commonjs在运行时加载模块，即执行到require才知道需要相应模块，并执行相应模块；ES Module在静态分析和运行两个阶段，静态分析会分析每个模块的导入和导出的接口，也就是说模块加载是在静态分析阶段完成的（或者说整个模块依赖关系是在静态分析阶段就明确的），运行阶段会根据模块依赖关系从低至上开始运行

esmodule分为命名导出namedexports和默认导出defaultexports

1. `export default thing` is different to `export { thing as default }`

   默认导出一个基础类型的变量不行

   ```js
   let a = 1;
   // export default expression rather than export a variable 'a'
   export default a;
   ```

2. Why is "export default var a = 1;" invalid syntax?

   https://esdiscuss.org/topic/why-is-export-default-var-a-1-invalid-syntax

# 循环引用

https://www.jianshu.com/p/ba0faf79c167

https://www.ruanyifeng.com/blog/2015/11/circular-dependency.html

CommonJS模块的重要特性是加载时执行，即脚本代码在`require`的时候，就会全部执行。CommonJS的做法是，一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令`import`时，不会去执行模块，而是只生成一个引用（，应该还会去静态解析模块暴露出的接口（怎么静态解析的））。等到真的需要用到时，再到模块里面去取值。核心原因就是esmodule暴露出的是值的引用，实际调用时再处理，因此需要由程序员自行控制执行顺序；因此导出的变量可能会存在uninitialized状态，是由于模块还没有执行所以没有initialized（function/class等就不会有这个问题，因为静态解析阶段就知道他们是function/class），读取uninitialized的数据会报错
