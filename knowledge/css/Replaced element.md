# Replaced element

可替换元素（replaced element）是一个外部对象，其样式效果不受当前页面的CSS效果控制，当前页面的CSS仅能影响到可替换元素的位置，例如计算外边距等，同时可替换元素其本身具有的尺寸和基线可能会在计算中被用到；也有部分CSS属性能够控制可替换元素内容框中的对象位置，在此不再深究

典型的可替换元素有

- `<iframe>`
- `<video>`
- `<embed>`
- `<img>`

在特定情况下有些元素也是可替换元素，如

- `<option>`
- `<audio>`
- `<canvas>`
- `<object>`
- `<applet>`
- `<input>`

> 用CSS的[`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content)属性插入的对象是匿名的可替换元素。它们并不存在于 HTML 标记中，因此是“匿名的”。

