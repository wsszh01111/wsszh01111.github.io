# GUN

##  理查德·馬修·斯托曼（Richard Matthew Stallman, RMS）

自由软件精神领袖，其发起了自由软件运动，倡导人们能够对软件自由的使用、分享和修改；其发起了GNU项目并创建了自由软件基金会，开发了GNU项目下的众多自由软件如GCC、GNU Emacs，并发布了GNU通用公共协议GPL。神一样的理想主义者

## GUN项目

GNU是“GNU is Not Unix”的递归缩写，是一个自由软件集体协作计划，最终目标是创建一个自由的操作系统。到了1990年，GNU计划已经开发出的软件包括了一个功能强大的文字编辑器Emacs、C语言编译器GCC以及大部分UNIX系统的程序库和工具。唯一依然没有完成的重要组件，就是操作系统的内核（称为HURD）。由于Linux的风靡，Linux内核+GNU工具集的组合流行起来，经常被称为GNU/linux

## GPL

GNU通用公共协议，其赋予了人们自由使用、分享、修改、发布软件的权利，最初是为了GNU计划而产生。GPL与其他一些更“许可的”自由软件许可协议（比如BSD许可协议）相比，主要区别就在于GPL寻求确保上述自由能在复制件及演绎作品中得到保障。

比较有意思的一点是，其中包含了名为**copyleft**的许可机制。英文中著作权名为**copyright**，足以见得其和传统封闭的形式针锋相对

# js中的转义字符串

在js中表示一个字符串时，除了常用的直接表示外，也常常因为各种原因使用的到各种类型的字符串转义，做个总结：

- 转义各种控制符号，如\0、\v等等
- \uXXXX，XXXX对应范围从0000-FFFF的unicode编码
- 由于\uXXXX表示的unicode编码数量有限，因此ES6中增加了\u{X}到\u{XXXXXX}的表示方式，如\u{A}，等同于\u000A
- \xXX，XX对应范围从00-FF，对应unicode中的U+0000到U+00FF，表示了拉丁字符集ISO-8859-1的内容
- \XXX，XXX范围从000到377，也表示了拉丁字符集ISO-8859-1中的内容

## 参考

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#escape_sequences

