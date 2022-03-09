<template><h1 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h1>
<p>本系列记录在熟悉node的过程中用到的API</p>
<h2 id="os-networkinterfaces" tabindex="-1"><a class="header-anchor" href="#os-networkinterfaces" aria-hidden="true">#</a> os.networkInterfaces</h2>
<p>获得本机网络设备及地址</p>
<h2 id="dirname" tabindex="-1"><a class="header-anchor" href="#dirname" aria-hidden="true">#</a> __dirname</h2>
<p>Module Scope Variable之一（看似全局，但仅可用在Module作用域范围内），表明当前模块的目录名，等同于<code>path.dirname(__filename)</code></p>
<h2 id="dirname-1" tabindex="-1"><a class="header-anchor" href="#dirname-1" aria-hidden="true">#</a> __dirname</h2>
<p>Module Scope Variable之一（看似全局，但仅可用在Module作用域范围内），表明当前模块的完整路径名</p>
<h2 id="path-dirname" tabindex="-1"><a class="header-anchor" href="#path-dirname" aria-hidden="true">#</a> path.dirname</h2>
<p>根据传入路径截取目录路径，分割符由<code>path.sep</code>决定</p>
<h2 id="path-sep" tabindex="-1"><a class="header-anchor" href="#path-sep" aria-hidden="true">#</a> path.sep</h2>
<p>指定路径分隔符，windows下是'\'，linux下是'/'</p>
<h2 id="path-join" tabindex="-1"><a class="header-anchor" href="#path-join" aria-hidden="true">#</a> path.join</h2>
<p>拼接路径块并标准化返回的路径</p>
<h2 id="path-resolve" tabindex="-1"><a class="header-anchor" href="#path-resolve" aria-hidden="true">#</a> path.resolve</h2>
<p>基于当前目录和传入路径块解析返回一个完整路径</p>
<h2 id="fs-readfilesync" tabindex="-1"><a class="header-anchor" href="#fs-readfilesync" aria-hidden="true">#</a> fs.readFileSync</h2>
<p>通过文件路径或者文件标识符（file description）来同步读取文件数据</p>
<h2 id="http-createserver" tabindex="-1"><a class="header-anchor" href="#http-createserver" aria-hidden="true">#</a> http.createServer</h2>
<p>创建<code>http.Server</code>实例，<code>http.Server</code>继承自<code>net.Server</code>，提供了http服务器的能力</p>
<h2 id="server-listen" tabindex="-1"><a class="header-anchor" href="#server-listen" aria-hidden="true">#</a> server.listen()</h2>
<p>让服务器开始监听连接</p>
<h2 id="url-url" tabindex="-1"><a class="header-anchor" href="#url-url" aria-hidden="true">#</a> url.URL</h2>
<p>实现了WHATWG URL标准的URL类</p>
<h2 id="eventemitter" tabindex="-1"><a class="header-anchor" href="#eventemitter" aria-hidden="true">#</a> EventEmitter</h2>
<p>nodejs也是通过事件驱动，<code>events</code>模块提供了<code>EventEmitter</code>用来处理事件，<code>EventEmitter</code>实例提供了<code>emit</code>和<code>on</code>方法用来触发和监听事件，<code>EventEmitter</code>是整个nodejs整个事件系统的基石，有非常多的类都是继承自<code>EventEmitter</code></p>
<h2 id="connect" tabindex="-1"><a class="header-anchor" href="#connect" aria-hidden="true">#</a> connect</h2>
<p>connect是一个nodejs中间件框架，其核心思想是将处理逻辑拆分成一个个具有一个功能的中间件，所有中间件遵循connect规定的接口（req/resp/next）并组成一个队列，完成一系列的处理逻辑；个人认为就是一种管道模型</p>
</template>
