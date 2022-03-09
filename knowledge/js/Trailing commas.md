# Trailing commas

所谓尾后逗号就是js的一个语法，义如其名，就是在数组、对象的属性跟随的逗号，ES2017中还支持函数参数中的尾后逗号，其有以下几个特点

1. 在使用版本控制时，尾后逗号能让代码diff更加清晰
2. 数组字面量的尾后逗号是最先支持的，带有超过一个尾后逗号的被称之为稀疏数组，形如`[1,2,,,,]`，对于稀疏数组，在使用`forEach`、`map`等数组遍历函数时会跳过数组间隙
3. ES5中支持了对象字面量尾后逗号
4. ES2017支持了函数参数中的尾后逗号，形如`function test(arg1,){}`，在函数调用时也可以使用尾后逗号的形式，形如`test(1,)`；尾后逗号并不影响函数定义，或者其`arguments`对象的 `length`属性
5. 解构左侧也同样可以使用尾后逗号，形如`[a, b,] = [1, 2]`或`const {arg1,} = obj`，但不能在存在剩余参数时使用，形如`var [a, ...b,] = [1, 2, 3];`会触发语法错误SyntaxError
6. JSON中不支持尾后逗号

## 参考

1. [Trailing_commas | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Trailing_commas)