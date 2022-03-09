<template><h1 id="electron-model" tabindex="-1"><a class="header-anchor" href="#electron-model" aria-hidden="true">#</a> Electron Model</h1>
<p>Electron继承其来自Chromium的多进程架构，这使得其进程模型在结构上与现代网络浏览器非常相似</p>
<p>网络浏览器是个复杂应用，为了解决每个Tab页之间的高资源消耗、崩溃影响等问题，Chrome团队将浏览器设计为每个Tab在各自的进程中进行渲染，再由一个浏览器进程控制这些进程及整个浏览器的生命周期。这也同样是Electron进程模型的基本结构</p>
<h2 id="主进程" tabindex="-1"><a class="header-anchor" href="#主进程" aria-hidden="true">#</a> 主进程</h2>
<p>每个Electron应用都有一个单一的主进程，作为应用程序的入口点。 主过程在Node.js环境中运行，这意味着它具有加载模块（require）和使用所有Node.js API的能力。</p>
<h3 id="窗口管理" tabindex="-1"><a class="header-anchor" href="#窗口管理" aria-hidden="true">#</a> 窗口管理</h3>
<p>主进程的主要目的是使用<a href="https://www.electronjs.org/docs/api/browser-window" target="_blank" rel="noopener noreferrer"><code>BrowserWindow</code><ExternalLinkIcon/></a>模块创建和管理应用程序窗口。每个<code>BrowserWindow</code>实例是通过将会创建一个应用程序窗口，引用程序窗口会在单独的<em>渲染器进程</em>中渲染页面，主进程中可以通过<code>BrowserWindow</code>实例的<code>webContent</code>属性和<em>渲染器进程</em>中的页面内容进行交互</p>
<p>由于<code>BrowserWindow</code>模块是一个<a href="https://nodejs.org/api/events.html#events_class_eventemitter" target="_blank" rel="noopener noreferrer"><code>EventEmitter</code><ExternalLinkIcon/></a>，您还可以为各种用户事件（例如，最小化或最大化窗口）添加处理程序。</p>
<p>当一个<code>BrowserWindow</code>实例被销毁时，对应的渲染器进程也会被终止。</p>
<h3 id="应用程序生命周期" tabindex="-1"><a class="header-anchor" href="#应用程序生命周期" aria-hidden="true">#</a> 应用程序生命周期</h3>
<p>主进程还通过 Electron 的 <a href="https://www.electronjs.org/docs/api/app" target="_blank" rel="noopener noreferrer"><code>app</code><ExternalLinkIcon/></a> 模块来控制您的应用程序的生命周期。 该模块提供了一系列的事件和函数，您可以使用它来添加或修饰应用程序窗口的行为（例如退出进程，窗口贴边或最小化以及展示“关于”菜单）。</p>
<h3 id="原生api" tabindex="-1"><a class="header-anchor" href="#原生api" aria-hidden="true">#</a> 原生API</h3>
<p>Electron提供了大量的API以提升对于桌面系统的控制能力，例如菜单，对话框以及托盘气泡图标。</p>
<h2 id="渲染器进程" tabindex="-1"><a class="header-anchor" href="#渲染器进程" aria-hidden="true">#</a> 渲染器进程</h2>
<p>每个Electron应用程序都会为每个打开的浏览窗口（包括每个网页嵌入）生成一个单独的渲染进程。 顾名思义，一个渲染器进程负责渲染网络内容。 出于某些目的，渲染器进程中运行的代码应该按照网页标准行事（至少就Chromium而言是如此，因为Electron中的页面就是在Chromium中渲染的）。所谓网页标准非常宽泛，简单来说，使用HTML书写页面结构，CSS书写样式，JS书写逻辑内容</p>
<p>符合WEB标准，也就意味着不能通过使用NodeAPI以及Electron提供的原生桌面API，Electron中提供了<em>Preload scripts</em>以曲线救国的方式来实现</p>
<h3 id="preload-scripts" tabindex="-1"><a class="header-anchor" href="#preload-scripts" aria-hidden="true">#</a> Preload scripts</h3>
<p>预加载脚本包含在网络内容开始加载之前在渲染器进程中执行的代码，在其中可以访问NodeAPI。</p>
<p>预加载脚本跟渲染器共享<code>window</code>接口，因此可以通过在<code>window</code>上暴露接口的方式跟页面内容进行通信。</p>
<p>但由于默认情况下存在<a href="https://www.electronjs.org/docs/tutorial/context-isolation" target="_blank" rel="noopener noreferrer"><code>contextIsolation</code><ExternalLinkIcon/></a>（上下文隔离），可以避免将特权代码（privileged APIs）泄露到网页内容中，可以通过<code>contextBridge</code>去安全的进行暴露。这种方式在两种情况下显得特别有用：</p>
<ol>
<li>将<a href="https://www.electronjs.org/docs/api/ipc-renderer" target="_blank" rel="noopener noreferrer"><code>ipcRenderer</code><ExternalLinkIcon/></a>暴露给渲染器，可以通过IPC调用（inter-process communication）在渲染器中触发主进程中的任务，反之也可以在主进程中触发渲染器任务</li>
<li>如果是利用Electron作为现有网络应用的壳，在<code>window</code>上挂载标识以区分WEB端与桌面端</li>
</ol>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ol>
<li><a href="https://www.electronjs.org/docs/tutorial/process-model" target="_blank" rel="noopener noreferrer">进程模型 | Electron Docs<ExternalLinkIcon/></a></li>
</ol>
</template>
