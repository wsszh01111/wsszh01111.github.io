# 《CSS世界》

## 3 流、元素与基本尺寸

### 3.2 width/height 作用的具体细节

#### 3.2.1 深藏不露的 width:auto

##### Extrinsic Sizing

外部尺寸计算，即元素尺寸由外部决定

1. 块级元素在正常布局流下的默认宽度

   ```css
   div {
     display: block;
     width: auto; // 有无width: auto;均可 width默认值就是auto
   }
   ```

   > 所谓正常布局流（流动性），并不是看上去的宽度 100%显示这么简单，而是一种 margin/border/padding 和 content 内容区域自动分配水平空间的机制。

2. 格式化宽度，在`absolute`和`fixed`中，对于非替换元素，当`left/top`或`top/bottom`对立方位的属性值同时 存在的时候，元素的宽度表现为“格式化宽度”，其宽度大小相对于最近的具有定位特性（非static）的祖先元素计算。

   ```css
   div {
     position: absolute;
     left: 20px;
     right: 20px;
   }
   ```

#### Intrinsic Sizing

1. 内联元素在不超过最大宽度的时候，其尺寸由其内容决定，比如`inline`、`inline-block`等

2. 内联元素在其父元素过小时，即内联元素被挤压至小于*首选最小宽度*，其宽度为*首选最小宽度*

   - 东亚文字（如中文）的*首选最小宽度*为每个汉字的宽度

   - 西方文字的*首选最小宽度*由特定的连续的英文字符单元决定。并不是所有的英文字符都会组成连续单元， 一般会终止于空格(普通空格)、短横线、问号以 及其他非英文字符等。例如，“display:inline- block”这几个字符以连接符“-”作为分隔符，形 成了“display:inline”和“block”两个连续 单元，由于连接符“-”分隔位置在字符后面，因此， 最后的宽度就是“display:inline-”的宽度
   - 对于`img`等可替换元素来说，其*首选最小宽度*就是内容本身的宽度

   ```css
   # 实现凹凸效果
   .ao {
     display: inline-block;
     width: 0;
   }
   .ao:before {
     content: "love你love";
     outline: 2px solid #cd0000;
     color: #fff;
   }
   ```

3. 内联元素最大宽度由其内部的最长内容决定