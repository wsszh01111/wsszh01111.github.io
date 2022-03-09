<template><h1 id="process-and-thread" tabindex="-1"><a class="header-anchor" href="#process-and-thread" aria-hidden="true">#</a> Process and thread</h1>
<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2>
<ol>
<li>从浏览器资源分配的角度讲
<ol>
<li>进程是系统进行资源分配的的基本单位，实现了操作系统的并发</li>
<li>线程是CPU调度的基本单位，实现进程内部的并发；线程是操作系统可识别的最小执行和调度单位</li>
</ol>
</li>
<li>从底层硬件（cpu）执行的角度讲
<ol>
<li>进程和线程都是一个CPU工作时间段的描述</li>
<li>程序A得到CPU =》CPU加载上下文，开始执行程序A的a小段，然后执行A的b小段，然后再执行A的c小段，最后CPU保存A的上下文。</li>
</ol>
</li>
</ol>
<h2 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h2>
<ol>
<li>一个线程只能属于一个进程，而一个进程有一个或多个线程</li>
<li>进程在执行过程中拥有独立的内存单元，而多个线程共享进程的内存</li>
<li>进程是资源分配的基本单位，线程是CPU调度的基本单位；</li>
<li>进程切换的开销也远大于线程切换的开销；因为进程的切换整个CPU上下文、内存上下文等，而线程的切换只涉及少量寄存器状态的变动</li>
<li>线程的通信比进程简单</li>
</ol>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ol>
<li>https://cloud.tencent.com/developer/article/1688297</li>
<li>https://www.zhihu.com/question/25532384</li>
</ol>
</template>
