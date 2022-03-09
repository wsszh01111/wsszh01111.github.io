# API

本系列记录在熟悉node的过程中用到的API

## os.networkInterfaces

获得本机网络设备及地址

## __dirname

Module Scope Variable之一（看似全局，但仅可用在Module作用域范围内），表明当前模块的目录名，等同于`path.dirname(__filename)`

## __dirname

Module Scope Variable之一（看似全局，但仅可用在Module作用域范围内），表明当前模块的完整路径名

## path.dirname

根据传入路径截取目录路径，分割符由`path.sep`决定

## path.sep

指定路径分隔符，windows下是'\\'，linux下是'/'

## path.join

拼接路径块并标准化返回的路径

## path.resolve

基于当前目录和传入路径块解析返回一个完整路径

## fs.readFileSync

通过文件路径或者文件标识符（file description）来同步读取文件数据

## http.createServer

创建`http.Server`实例，`http.Server`继承自`net.Server`，提供了http服务器的能力

## server.listen()

让服务器开始监听连接

## url.URL

实现了WHATWG URL标准的URL类

## EventEmitter

nodejs也是通过事件驱动，`events`模块提供了`EventEmitter`用来处理事件，`EventEmitter`实例提供了`emit`和`on`方法用来触发和监听事件，`EventEmitter`是整个nodejs整个事件系统的基石，有非常多的类都是继承自`EventEmitter`

## connect

connect是一个nodejs中间件框架，其核心思想是将处理逻辑拆分成一个个具有一个功能的中间件，所有中间件遵循connect规定的接口（req/resp/next）并组成一个队列，完成一系列的处理逻辑；个人认为就是一种管道模型

