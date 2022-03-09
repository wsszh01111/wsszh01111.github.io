# bind

用到`bind`的时候对于`bind`能否自行实现没有明确的认识，想了想比较简单，理解本质即可

```js
Function.prototype.ployfillBind = function(...args) {
  const bindContext = this
  return function() {
    bindContext.apply(args)
  }
}
```