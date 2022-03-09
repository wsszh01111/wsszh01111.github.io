# Encoding function

JS中基本有四种编码函数，本质上都是都是将字符串进行一些编码，能在使用非标准ascii字符时（比如中日韩越统一表意文字CJKV Unified Ideographs），满足一些字符编码范围受限的情况

## escape/unescape

已经被废弃，稍做了解即可

```javascript
escape('abc123');     // "abc123"
escape('äöü');        // "%E4%F6%FC" Latin1中的相关编码会被编码成十六进制的%XX格式
escape('ć');          // "%u0107" 其余编码将会变成%uXXXX的格式
escape('@*_+-./');    // "@*_+-./" 特殊字符将会被跳过
escape("𠮷");         // '%uD842%uDFB7' 由超过4位的16进制编码表示的字符将会被拆分成两个16进制的形式

unescape("𠮷")        // "𠮷" 对于无法解码的数据 将直接返回
```

## encodeURI/decodeURI

对URI中除了对保留字符（reserved characters，也就是#+=等在URI中有特殊意义的字符）和非保留标记（unreserved marks，虽然在URI中没有特殊意义但依然原样保留的字符）之外的其他字符进行编码，转换成字符对应的UTF-8编码对应的表示形式

其不编码的字符有`A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( ) #`

## encodeURIComponent/decodeURIComponent

encodeURIComponent/decodeURIComponent与encodeURI/decodeURI功能其实类似，只是不编码的字符范围更小，仅有` A-Z a-z 0-9 - _ . ! ~ * ' ( )`几个；相比encodeURI/decodeURI少了=&等URI参数中用到的字符，也印证了其名称，是用来编码URI组成部分的，而不是用于URI本身的编码

## btoa/atob

盲猜btoa和atob的意思应该是binarytoascii和asciitobinary的缩写

> base64编码是将二进制数据转换成字符串的一种编码方式，将二进制数据以三个字节为划分单位，划分成四份，没份正好是6bit，即3\*8bit->4\*6bit，因此其映射表的所有可能为2^6=64，因此称之为base64编码。
>
> 注意这只是种编码方式而不能用于加密。
>
> 注意base64将原有的3字节转换成了4字节（因为转换成了4个字符且假设是utf8编码的情况下），其实容量是扩大了33%

所谓btoa/atob，实际上就是浏览器端提供的base64编码实现，但是其入参比较特别，其入参虽然看上去是个字符串，但实际该字符串代表了要编码的二进制数据的ASCII码表示形式（由于ASCII后128位都是空缺的，因此试了下实际浏览器基本都使用了Latin1编码的表示形式），因此该字符串中每个字符的编码需要在0x00到0xFF之间，否则将会触发InvalidCharacterError错误

## 参考

1. [中日韩越统一表意文字](https://baike.baidu.com/item/%E4%B8%AD%E6%97%A5%E9%9F%A9%E8%B6%8A%E7%BB%9F%E4%B8%80%E8%A1%A8%E6%84%8F%E6%96%87%E5%AD%97/1301611)
1. [escape](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/escape)
1. [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
1. [encodeComponentURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
1. [atob](https://developer.mozilla.org/zh-CN/docs/Web/API/atob)



