# WebAssembly入门课

## 核心原理

### WebAssembly二进制层面的基本数据规则

即WebAssembly针对不同数据类型有不同的编码方式

#### 字节序

Little-Endian：低地址位对应低数据位

Big-Endian：低地址位对应高数据位

#### LEB-128 整数编码

LEB-128 的全称为 “Little Endian Base 128”，是一种用于整数的、基于小端模式的可变长编码

Unsigned LEB-128/Signed LEB-128

#### IEEE-754

#### UTF-8 字符串编码

#### Wasm 数字类型

## 07WASI

WebAssembly System Interface，WebAssembly 操作系统接口

#### Capability-based Security

Capability-based Security 是一种已知的、常用的安全模型。通常来讲，在计算机领域中，我们所提及的 capability 可以指代如 Token、令牌等概念。capability 是一种用于表示某种权限的标记，它可以在用户之间进行传递且无法被伪造。

## 08与浏览器交互所需的Web API和JS API

Wasm 核心标准（Core Interfaces）以及嵌入接口标准（Embedding interfaces），与浏览器的交互标准主要是嵌入接口标准。JavaScript API 提供了众多的包装类型，这样便能够在 JavaScript 环境中表示 Wasm 模块的不同组成部分；还提供了代表wasm各个解析阶段的api

### Wasm 浏览器加载流程

一个wasm二进制模块大致经过四个流程才能最终被浏览器使用

- Fetch：通过HTTP将wasm二进制模块加载到浏览器中
- Compile：wasm字节码->平台相关代码，还未执行
- Instantiate：执行上一步Compile后的代码，导入Import Section所定义的宿主资源资源，生成wasm模块实例
- Call：调用wasm模块实例导出的函数

### Wasm JavaScript API

#### 模块对象

`WebAssembly.Module`：对应Compile阶段完成后生成的wasm模块

`WebAssembly.Instance`：对应Instantiate阶段完成后生成的wasm模块实例

`WebAssembly.Module`和`WebAssembly.Instance`可以作为构造函数，生成对应的wasm模块和wasm模块实例

```javascript
// "..." 为包含有效的 Wasm 二进制字节码数据的ArrayBuffer或是TypedArray；
let bufferSource = new Int8Array([...]);
let module = new WebAssembly.Module(bufferSource); // 根据wasm字节码生成的wasm模块对象 即module是一个模块
let bufferSource2 = new Int8Array([...]);
let moduleInstance = new WebAssembly.Instance(bufferSource2); // 生成一个wasm模块实例 即moduleInstance是一个由模块实例化之后生成的模块实例
```

#### 导入对象

wasm模块可以在实例化时接收宿主环境提供的数据

浏览器作为wasm最主要的宿主环境，以JSAPI的方式定义了（在Import Section中声明的）能够被导入到wasm模块中的数据类型，分别是函数（JS Function）、全局数据（`WebAssembly.Global`）、线性内存对象（`WebAssembly.Memory`）以及 Table 对象（`WebAssembly.Table`）

同`WebAssembly.Module`和`WebAssembly.Instance`，`WebAssembly.Global`、`WebAssembly.Memory`和`WebAssembly.Table`也可以作为构造函数来创建js对象

```javascript
let memory = new WebAssembly.Memory({ initial:10, maximum:100,});
```

#### 错误对象

JSAPI中还提供了几个错误对象，用来对应在wasm模块加载、编译、实例化、运行的各个阶段发生的错误

- `WebAssembly.CompileError` 表示在 Wasm 模块编译阶段（Compile）发生的错误，比如模块的字节码编码格式错误、魔数不匹配

- `WebAssembly.LinkError` 表示在 Wasm 模块实例化阶段（Instantiate）发生的错误，比如导入到 Wasm 模块实例 Import Section 的内容不正确

- `WebAssembly.RuntimeError` 表示在 Wasm 模块运行时阶段（Call）发生的错误，比如常见的“除零异常”

#### 模块实例化函数

`WebAssembly.instantiate(bufferSource, importObject)`可以wasm二进制字节码实例化成一个wasm模块对象（即进行了编译和实例化两步），根据入参不同，其返回结果也有所差异，详见MDN上的[API文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly)

#### 模块编译函数

`WebAssembly.compile(bufferSource)`可以单独进行Compile编译步骤，返回一个编译好的静态WebAssembly.Module对象

### Wasm Web API

JSAPI中主要定义的是与wasm相关的类型和操作，这些类型和操作是平台无关的；除此之外，为了充分利用Web平台的特性，还以Web API的形式提供了新的、高性能的编译和实例化接口。

#### 模块流式实例化方法

WebAssembly.instantiateStreaming(source, importObject)，提前对wasm模块进行实例化（而不是从远程加载好的完整 Wasm 模块二进制数据（bufferSource）），能够提升整体效率

#### 模块流式编译方法

WebAssembly.compileStreaming(source)，提前进行编译

### Wasm 运行时（Runtime）

每个wasm模块实例在运行时都会维护自己的调用栈，由wasm模块实例导出的函数在运行过程中会影响调用栈中的数据。

每个wasm模块实例还有它对应的由“Memory Section” 和 “Data Section”共同描述的线性内存段（在线性MVP下只能有一个），线性内存段中存储wasm模块实例所有可用的数据资源；这些数据资源可以是wasm模块实例在运行时产生的，也可以是在实例化时通过`WebAssembly.Memory`对象形式导入的

浏览器会将wasm模块实例的线性内存段和JS内存进行隔离，因此js不能直接访问和调用wasm中的数据，反之亦然；并且现行的MVP尚无垃圾回收相关标准，因此需要手动对线性内存段进行资源释放

wasm内存访问的安全性由“Bound Check”保证

### Wasm 与宿主环境的数据交互

由于js内存段和wasm内存段是隔离的，因此一般有两种方式用来使用js环境中的数据

1. 对于简单（字符/数字值等）数据类型，可以选择将其视为全局数据，通过 “Import Section” 导入到模块中使用；
2. 对于复杂数据，需要将其以“字节”（TypeArray）的形式，拷贝到模块实例的线性内存段中来使用。

### 局限

1. 无法引用宿主环境的不透明数据（数据结构和内容未知），如DOM；间接的解决方案是使用函数
2. 大部分数据结构复制时需要编解码

> 就目前 MVP 标准而言，Wasm 模块的线性内存段是与外部宿主环境进行直接信息交换的最重要“场所”。

### 总结

目前 Wasm MVP 标准在 Web 浏览器上的能力：凡是能够使用 Wasm 来实现的功能，现阶段都可以通过 JavaScript 来实现；而能够使用 JavaScript 来实现的功能，其中部分还无法直接通过 Wasm 实现（比如调用 Web API）。

## 09为前端框架赋能

## 12已有的wasm运行时

