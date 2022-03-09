# display

display是CSS样式布局中非常基础且重要的属性，在写CSS的过程中发现还是有欠缺，故回顾下

display可以去设置元素的内部（inner display types）和外部显示类型（outer display types），所谓外部显示类型，即控制了元素在流式布局中的表现效果，如`block`块级元素或`inline`内联元素；所谓内部显示类型，即声明其子元素的布局，如`flex`弹性布局

## 属性值

display的属性值被分成6类

### \<display-outside\>

定义了外部显示类型，包含了`block`和`inline`以及一个实验性质的`run-in`

### \<display-inside\>

定义了内部显示类型，包含了常用的`flex`、`grid`、`table`、`flow-root`以及带有实验性质的`flow`和`ruby`

### \<display-listitem\>

仅有一个单值`display: list-item`，将元素的外部显示类型设置为`block`，内部显示类型设置为list-item inline

### \<display-internal\>

有些布局模型（如 `table` 和 `ruby`）有着复杂的内部结构，因此它们的子元素可能扮演着不同的角色。这一类关键字就是用来定义这些子元素的显示类型，并且只有在这些特定的布局模型中才有意义。如`table-row-group`、`table-header-group`等等

### \<display-box\>

控制元素是否使用盒模型，包括了不显示元素时非常常用的`none`和以及实验性质的`contents`

### \<display-legacy\>

CSS2中定义的使用单个关键字来表示需要在同一个布局方式（layout mode）下同时使用两种布局类型的情况，最常见的就是`inline-block`，还包括了`inline-table`、`inline-flex`和`inline-grid`

> 在CSS3中规定了display属性的双值语法，但由于还没有被浏览器广泛支持，因此\<display-legacy\>的单关键字写法还将被支持很长一段时间