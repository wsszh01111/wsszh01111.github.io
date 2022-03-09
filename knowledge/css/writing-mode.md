# writing-mode

writing-mode定义了文本排布方向（横向/纵向）和（文本行）行进方向；同时其也决定了元素的堆叠方向

现代中文语法通常是横向排布，即以文本行的形式从上到下进行展示。但有些语言中也有纵向排布的方式，例如中文古诗等，当纵向排布时，其行进方向也可以分为从左到右和从右到左（横向排布一般行进方向都是从上到下，从下到上有点反人类直觉了，应该没有文明会使用吧）

常见的块级元素独占一行、内联元素紧跟前面元素直到占满整行等规则，都是基于水平文档流这一基本原则，当文档流变成纵向时，很多水平方向生效的规则变成了在垂直方向上生效，（但宽高、内外边距等盒模型的基本属性没有变化，即盒内容和盒排布的方向发生了变化，但盒本身的方向没有变化）

## 代码

```html
<html>
  <head>
    <style>
      .example.Text1 span, .example.Text1 {
        writing-mode: horizontal-tb;
        -webkit-writing-mode: horizontal-tb;
        -ms-writing-mode: horizontal-tb;
      }

      .example.Text2 span, .example.Text2 {
        writing-mode: vertical-lr;
        -webkit-writing-mode: vertical-lr;
        -ms-writing-mode: vertical-lr;
      }

      .example.Text3 span, .example.Text3 {
        writing-mode: vertical-rl;
        -webkit-writing-mode: vertical-rl;
        -ms-writing-mode: vertical-rl;
      }

      .example.Text4 span, .example.Text4 {
        writing-mode: sideways-lr;
        -webkit-writing-mode: sideways-lr;
        -ms-writing-mode: sideways-lr;
      }

      .example.Text5 span, .example.Text5 {
        writing-mode: sideways-rl;
        -webkit-writing-mode: sideways-rl;
        -ms-writing-mode: sideways-rl;
      }
    </style>
  </head>
  <body>
    <table>
      <tr>
        <th>Value</th>
        <th>Vertical script</th>
        <th>Horizontal (LTR) script</th>
        <th>Horizontal (RTL) script</th>
        <th>Mixed script</th>
      </tr>
      <tr>
        <td>horizontal-tb</td>
        <td class="example Text1"><span>我家没有电脑。</span></td>
        <td class="example Text1"><span>Example text</span></td>
        <td class="example Text1"><span>מלל ארוך לדוגמא</span></td>
        <td class="example Text1"><span>1994年に至っては</span></td>
      </tr>
      <tr>
        <td>vertical-lr</td>
        <td class="example Text2"><span>我家没有电脑。</span></td>
        <td class="example Text2"><span>Example text</span></td>
        <td class="example Text2"><span>מלל ארוך לדוגמא</span></td>
        <td class="example Text2"><span>1994年に至っては</span></td>
      </tr>
      <tr>
        <td>vertical-rl</td>
        <td class="example Text3"><span>我家没有电脑。</span></td>
        <td class="example Text3"><span>Example text</span></td>
        <td class="example Text3"><span>מלל ארוך לדוגמא</span></td>
        <td class="example Text3"><span>1994年に至っては</span></td>
      </tr>
      <tr>
        <td>sideways-lr</td>
        <td class="example Text4"><span>我家没有电脑。</span></td>
        <td class="example Text4"><span>Example text</span></td>
        <td class="example Text4"><span>מלל ארוך לדוגמא</span></td>
        <td class="example Text4"><span>1994年に至っては</span></td>
      </tr>
      <tr>
        <td>sideways-rl</td>
        <td class="example Text5"><span>我家没有电脑。</span></td>
        <td class="example Text5"><span>Example text</span></td>
        <td class="example Text5"><span>מלל ארוך לדוגמא</span></td>
        <td class="example Text5"><span>1994年に至っては</span></td>
      </tr>
    </table>
  </body>
</html>
```

## 参考

1. [writing-mode | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)
2. [改变CSS世界纵横规则的writing-mode属性 | 张鑫旭](https://www.zhangxinxu.com/wordpress/2016/04/css-writing-mode/)

