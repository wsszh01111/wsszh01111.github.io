# toFixed and toExponential

> 定点表示法：是跟浮点表示法相对应的数字表示方式，所谓“定”与“浮”，指的是小数点位置的固定与浮动。如果小数点固定，对比浮点表示法，定点表示法能表示的数字范围和数字精度都会更小，因此在计算机中表示数字一般都是使用浮点表示法。动态浮动小数点，确实能够同时支持更大的数字范围和数字精度

`toFixed(digits)`/`toExponential(fractionDigits)`作为一对数字转换函数。

`toFixed(digits)`将数字转换成定点表示法的字符串形式，也就是常见的符合直接的数字表示方式；`toFixed(digits)`会根据入参`digits`对小数部分进行四舍五入或补全0；但注意如果数值大于 1e+21，该方法会简单调用`Number.prototype.toString()`并返回一个指数记数法格式的字符串。

`toExponential(fractionDigits)`将数字转换成指数表示法的字符串形式，其对于小数部分的处理和`toFixed(digits)`类似，会进行四舍五入和补全0，形如`'2.500e+0'`

## 问题

由于二进制中的浮点数表示法并不能精确的表示每个数，因此需要注意在一些情况下`toFixed(digits)`和`toExponential(fractionDigits)`的四舍五入是会有问题的，例如：

```js
2.55.toFixed(1) // '2.5'
2.55 .toExponential(1) // '2.5e+0' 注意这里空开了一位 在没有小数点和指数时，隔开一位可以避免点号被解释为一个小数点
```

