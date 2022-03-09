# Tips

记录一些编码小技巧

## 通过数组解构交换变量

数组结构小技巧

```js
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

### 机制

其机制是表达式从右向左执行，右边先用ab变量生成了新数组，解构时将数组中的变量又赋值左边解构结构中的相应变量；因此这边ab变量只能通过`var`/`let`声明，如果使用`const`则会在解构赋值时报错

## while(i--)

```js
let i = array.length
while(i--) {
  let value = array[i]
}
```