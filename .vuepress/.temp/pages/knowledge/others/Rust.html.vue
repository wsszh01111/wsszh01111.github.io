<template><h1 id="rust" tabindex="-1"><a class="header-anchor" href="#rust" aria-hidden="true">#</a> Rust</h1>
<p>Rust是一门静态编译语言，具有内存安全的特性，且拥有更好的并发性能</p>
<h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2>
<ul>
<li>
<p>变量使用<code>let</code>定义，默认不可变；使用<code>mut</code>标识为可变</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> test <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
test <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// cannot assign twice to immutable variable</span>

<span class="token keyword">let</span> <span class="token keyword">mut</span> test2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
test2 <span class="token operator">=</span> <span class="token number">2</span> <span class="token comment">// ok</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
<li>
<p>常量使用<code>const</code>定义，需要注明类型，只能被常量表达式赋值（所谓常量表达式应该就是指表达式中只有字面量或常量的表达式）</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">const</span> test <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// missing type for `const` item</span>

<span class="token keyword">let</span> test2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> test3 <span class="token operator">=</span> test2 <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// attempt to use a non-constant value in a constant</span>

<span class="token keyword">const</span> test4<span class="token punctuation">:</span> <span class="token keyword">i32</span> <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span> <span class="token comment">// ok</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li>
<li>
<p>shadowing，变量可同名，新声明的变量将会遮盖（shadow）原有同名变量</p>
</li>
</ul>
<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<p>由于Rust是静态语言，在编译时需要知晓变量类型，其编译器在很多情况下能够推断出变量类型，但有些情况下变量类型会有多义性，需要主动声明</p>
<h3 id="标量类型" tabindex="-1"><a class="header-anchor" href="#标量类型" aria-hidden="true">#</a> 标量类型</h3>
<h4 id="整数" tabindex="-1"><a class="header-anchor" href="#整数" aria-hidden="true">#</a> 整数</h4>
<ul>
<li>整数类型有有符号整数i8/i16/i32/i64/i128，无符号整数</li>
</ul>
<h3 id="复合类型" tabindex="-1"><a class="header-anchor" href="#复合类型" aria-hidden="true">#</a> 复合类型</h3>
<h4 id="tuple" tabindex="-1"><a class="header-anchor" href="#tuple" aria-hidden="true">#</a> Tuple</h4>
<p><code>Tuple</code>元组是长度固定且可以承载任意类型的集合，可以使用解构读取元组中的值，也可以使用点标记法读取Tuple中的元素</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> test <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token char">'2'</span><span class="token punctuation">,</span> <span class="token number">23.11</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 编译器推断Tuple中每个值的类型</span>
<span class="token keyword">let</span> test2<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token keyword">i32</span><span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token punctuation">,</span> <span class="token keyword">f64</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token char">'2'</span><span class="token punctuation">,</span> <span class="token number">23.11</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 显式声明元组元素类型</span>

<span class="token keyword">let</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span> <span class="token operator">=</span> test2<span class="token punctuation">;</span> <span class="token comment">// 解构</span>

<span class="token macro property">println!</span><span class="token punctuation">(</span>'<span class="token punctuation">{</span><span class="token punctuation">}</span>'<span class="token punctuation">,</span> test2<span class="token number">.1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="array" tabindex="-1"><a class="header-anchor" href="#array" aria-hidden="true">#</a> Array</h4>
<p><code>Array</code>数组是长度固定且必须类型一致的集合，其数据存放在栈内存上，使用索引进行访问；与其类似的有<code>Vector</code>，<code>Vector</code>由标准库提供，更加灵活</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> test <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 编译器推断Array中每个值的类型</span>
<span class="token keyword">let</span> test2<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token keyword">i32</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 显式声明</span>

<span class="token keyword">let</span> test3 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 批量初始化Array相同值</span>

<span class="token macro property">println!</span><span class="token punctuation">(</span>'<span class="token punctuation">{</span><span class="token punctuation">}</span>'<span class="token punctuation">,</span> test3<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2>
<h2 id="控制流" tabindex="-1"><a class="header-anchor" href="#控制流" aria-hidden="true">#</a> 控制流</h2>
<h3 id="if表达式" tabindex="-1"><a class="header-anchor" href="#if表达式" aria-hidden="true">#</a> if表达式</h3>
<p>Rust中的if与其他语言有一些差异</p>
<ol>
<li>Rust的if表达式中，跟判断逻辑相关的表达式返回的必须是Boolean类型的值，不像其他语言会对判断逻辑做隐式转换</li>
<li>Rust中的if表达式，if后面跟着的判断逻辑不需要小括号包裹</li>
<li>Rust中的if是个表达式，因此其可以出现在赋值语句的右边</li>
</ol>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> test <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> if_result <span class="token operator">=</span> <span class="token keyword">if</span> test <span class="token operator">></span> <span class="token number">1</span> <span class="token punctuation">{</span> <span class="token number">5</span> <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token number">6</span> <span class="token punctuation">}</span>

<span class="token macro property">println!</span><span class="token punctuation">(</span>'<span class="token punctuation">{</span><span class="token punctuation">}</span>'<span class="token punctuation">,</span> if_result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="loop表达式" tabindex="-1"><a class="header-anchor" href="#loop表达式" aria-hidden="true">#</a> loop表达式</h3>
<p>loop表达式在执行到<code>break</code>时才会停止，其也是表达式因此也可以作为表达式放在赋值语句右侧使用；<code>break</code>后的值也会作为loop表达式的值返回</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> loop_result <span class="token operator">=</span> <span class="token keyword">loop</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// shadowing</span>
    <span class="token keyword">if</span> count <span class="token operator">==</span> <span class="token number">10</span> <span class="token punctuation">{</span>
      <span class="token keyword">break</span> count <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token macro property">println!</span><span class="token punctuation">(</span>'<span class="token punctuation">{</span><span class="token punctuation">}</span>'<span class="token punctuation">,</span> loop_result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="while" tabindex="-1"><a class="header-anchor" href="#while" aria-hidden="true">#</a> while</h3>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> <span class="token keyword">mut</span> number <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> number <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
    number <span class="token operator">=</span> number <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token macro property">println!</span><span class="token punctuation">(</span>'<span class="token punctuation">{</span><span class="token punctuation">}</span>'<span class="token punctuation">,</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> for</h3>
<p>遍历集合元素</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">i32</span><span class="token punctuation">;</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> element <span class="token keyword">in</span> array<span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"{}"</span><span class="token punctuation">,</span> element<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="range" tabindex="-1"><a class="header-anchor" href="#range" aria-hidden="true">#</a> range</h4>
<p>由标准库提供的范围生成器，还提供了<code>rev()</code>对范围进行反转</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">for</span> number <span class="token keyword">in</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">rev</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"{}"</span><span class="token punctuation">,</span> number<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h1 id="_4-1所有权" tabindex="-1"><a class="header-anchor" href="#_4-1所有权" aria-hidden="true">#</a> 4.1所有权</h1>
<p>Rust的核心特性，Rust推出的第三种管理内存的方式</p>
<blockquote>
<p>其余两种管理内存的方式</p>
<ol>
<li>GC垃圾回收，程序运行的同时回收不再使用的内存</li>
<li>程序员显式的分配和释放内存</li>
</ol>
</blockquote>
<p>Rust中的内存是通过所有权系统进行管理，所有权系统中还包含了一组编译器在编译时会进行检查的规则（也就意味着没有运行时开销）</p>
<h2 id="stack-memory-heap-memory" tabindex="-1"><a class="header-anchor" href="#stack-memory-heap-memory" aria-hidden="true">#</a> Stack Memory/Heap Memory</h2>
<p>在栈内存上进行压栈/出栈操作，且数据必须具有已知大小；堆内存的组织性差一些，在堆内存上进行数据<strong>分配</strong>，操作系统会分配一块内存区域并返回地址。本质上是两种不同的管理内存的方式，读取和存储操作在栈内存上更快，堆内存的扩展性更强。实际运行时，调用函数，值被传递给函数（包括指向堆内存位置的指针）。函数本地声明的变量被压入栈内存，在函数结束时弹出栈</p>
<h2 id="所有权解决的问题" tabindex="-1"><a class="header-anchor" href="#所有权解决的问题" aria-hidden="true">#</a> 所有权解决的问题</h2>
<p>管理Heap Memory中的数据</p>
<ol>
<li>追踪代码的哪些部分正在使用Heap Memory</li>
<li>最小化Heap Memory上的数据重复</li>
<li>清理Heap Memory上的无用数据</li>
</ol>
<h2 id="所有权规则" tabindex="-1"><a class="header-anchor" href="#所有权规则" aria-hidden="true">#</a> 所有权规则</h2>
<ul>
<li>每个值都对应一个变量，该变量是该值的所有者</li>
<li>每个值同时只能有一个所有者</li>
<li>当变量（所有者）超出作用域时，该值将会被删除（从Stack Memory中弹出/从Heap Memory中清理掉），内存将会释放（drop函数）</li>
</ul>
<h2 id="变量与数据交互的两种方式" tabindex="-1"><a class="header-anchor" href="#变量与数据交互的两种方式" aria-hidden="true">#</a> 变量与数据交互的两种方式</h2>
<blockquote>
<p>String类型是在堆上分配内存的类型</p>
</blockquote>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> test <span class="token operator">=</span> <span class="token string">"asdf"</span><span class="token punctuation">;</span> <span class="token comment">// 字符串字面量 赋值后字符串内容就不可变</span>
<span class="token keyword">let</span> <span class="token keyword">mut</span> test2 <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 创建String类型</span>
test2<span class="token punctuation">.</span><span class="token function">push_str</span><span class="token punctuation">(</span><span class="token string">"asdf"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 为什么push_str要求test2是mut的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote>
<p>为什么String可以修改而字符串字面值不行？</p>
<p>字符串字面值在编译时已知，会被硬编码到可执行文件中，运行时会压入栈内存，因为其不可变性而变得快速高效；String需要在Heap Memory上分配编译时未知的可变字符串内容</p>
</blockquote>
<h3 id="move" tabindex="-1"><a class="header-anchor" href="#move" aria-hidden="true">#</a> move</h3>
<p>在栈内存中复制，在Heap Memory中的数据只有同一份，基本行为类似于浅拷贝</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> test <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> test2 <span class="token operator">=</span> test<span class="token punctuation">;</span> <span class="token comment">// 在Stack Memory上进行的数据复制</span>

<span class="token keyword">let</span> test3 <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"rust"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> test4 <span class="token operator">=</span> test3<span class="token punctuation">;</span> <span class="token comment">// 栈内存上的len/capacity/ptr指针会进行复制 ptr指向的Heap Memory上的实际字符串数据是同一份</span>

<span class="token macro property">println!</span><span class="token punctuation">(</span>test3<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// borrow of moved value: `test3` 从字面上理解 这里就是说test3已经移动了 在移动后不可以再使用（借用？）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>但又与常见的有所不同，在引用传递时，Rust为了让保证内存安全，避免<strong>double free bug</strong>重复释放相同的内存（上述test3和test4引用的Heap Memory上的字符串内容是同一块内存），会让上述test3失效，<strong>从字面上理解，就是将test3变量对值的所有权移动（move）到了test4的位置</strong></p>
<h3 id="copy" tabindex="-1"><a class="header-anchor" href="#copy" aria-hidden="true">#</a> copy</h3>
<p>会把Heap Memory上的数据也进行拷贝，也就是深拷贝</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> test <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"rust"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> test2 <span class="token operator">=</span> test<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"{}"</span><span class="token punctuation">,</span> test<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//ok bacause test2 is cloned from test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="copy-trait-drop-trait" tabindex="-1"><a class="header-anchor" href="#copy-trait-drop-trait" aria-hidden="true">#</a> copy trait/drop trait</h3>
<p>copy trait可以用于像是整数等直接可以放到栈内存的类型，如果一个类型实现了copy trait，则在赋值新变量后旧变量依然可以操作（即在赋值新变量时是copy操作深拷贝，而不是move操作浅拷贝）</p>
<p>copy trait和drop trait互斥，一个类型或该类型的一部分实现了drop trait，则不能再实现copy trait</p>
<h3 id="具有copy-trait的类型" tabindex="-1"><a class="header-anchor" href="#具有copy-trait的类型" aria-hidden="true">#</a> 具有copy trait的类型</h3>
<ul>
<li>简单标量类型，整数、bool、char、所有元素均可copy的元组（像(i32, String)则不是）</li>
</ul>
<h2 id="所有权与函数" tabindex="-1"><a class="header-anchor" href="#所有权与函数" aria-hidden="true">#</a> 所有权与函数</h2>
<p><strong>语义上将参数传递给函数或函数将值返回，和变量赋值一样，均会有move或copy操作，在所有权的体系下来讲，是变量对于值的所有权的转移</strong></p>
<blockquote>
<p>一个变量的所有权遵循相同的模式</p>
<ul>
<li>把值赋值给其他变量时所有权就会发生变动</li>
<li>如果变量对Heap Memory上的数据有所有权，当变量离开作用域，则数据会被drop函数清理</li>
</ul>
</blockquote>
<h1 id="_4-2引用和借用" tabindex="-1"><a class="header-anchor" href="#_4-2引用和借用" aria-hidden="true">#</a> 4.2引用和借用</h1>
<p>引用的意思是允许使用某些值但不取得其所有权，引用用<code>&amp;</code>表示；引用的值不会在引用超出其作用域时被清除，因为引用并没有其所引用值的所有权</p>
<p>把引用作为函数参数的形式被称为<strong>借用</strong></p>
<h2 id="可变引用" tabindex="-1"><a class="header-anchor" href="#可变引用" aria-hidden="true">#</a> 可变引用</h2>
<p>默认情况下引用不可变，需要使用<code>mut</code>关键字使其可变</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token keyword">mut</span> s1 <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> len <span class="token operator">=</span> <span class="token function">ccc</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">mut</span> s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">fn</span> <span class="token function-definition function">ccc</span><span class="token punctuation">(</span>s<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token keyword">usize</span> <span class="token punctuation">{</span>
    s<span class="token punctuation">.</span><span class="token function">push_str</span><span class="token punctuation">(</span><span class="token string">", world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    s<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="可变引用的限制" tabindex="-1"><a class="header-anchor" href="#可变引用的限制" aria-hidden="true">#</a> 可变引用的限制</h3>
<ol>
<li>
<p>在特定的作用域范围内，对某一块数据只能有一个可变的引用。这样可以在编译时防止数据竞争</p>
<blockquote>
<p>数据竞争：</p>
<ol>
<li>xxx</li>
<li>xxx</li>
<li>Xxx</li>
</ol>
</blockquote>
<p>可以通过创建新的作用域，来允许<strong>非同时</strong>的创建多个可变引用</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token keyword">mut</span> s <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">let</span> s1 <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> s2 <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></li>
<li>
<p>可以有多个不可变引用，但不可以同时拥有一个可变引用和一个不可变引用，</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token keyword">mut</span> s <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> r1 <span class="token operator">=</span> <span class="token operator">&amp;</span>s<span class="token punctuation">;</span>
    <span class="token keyword">let</span> r2 <span class="token operator">=</span> <span class="token operator">&amp;</span>s<span class="token punctuation">;</span>
    <span class="token keyword">let</span> r3 <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> s<span class="token punctuation">;</span> <span class="token comment">// wrong</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li>
</ol>
<h2 id="dangling-references-悬空引用" tabindex="-1"><a class="header-anchor" href="#dangling-references-悬空引用" aria-hidden="true">#</a> Dangling References（悬空引用）</h2>
<blockquote>
<p>Dangling References：一个指针引用了内存中的某个地址，而这个地址已经被释放并分配给其他人了</p>
</blockquote>
<p>在Rust中编译器能够保证引用<strong>永远都不是悬空引用</strong>，如果引用了某些数据，编译器将保证在引用离开作用域之前数据不会离开作用域</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">dangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token operator">&amp;</span><span class="token class-name">String</span> <span class="token punctuation">{</span> <span class="token comment">// missing lifetime specifier</span>
    <span class="token keyword">let</span> s <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  	<span class="token operator">&amp;</span>s
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="引用的作用域" tabindex="-1"><a class="header-anchor" href="#引用的作用域" aria-hidden="true">#</a> 引用的作用域</h2>
<p>一个引用的作用域从声明的地方开始一直持续到最后一次使用为止</p>
<h2 id="引用总结" tabindex="-1"><a class="header-anchor" href="#引用总结" aria-hidden="true">#</a> 引用总结</h2>
<ol>
<li>
<p>在特定作用域内（即最早被定义的作用域），引用只能满足下列条件之一</p>
<ol>
<li>一个可变引用</li>
<li>多个不可变引用</li>
</ol>
</li>
<li>
<p>引用必须一直有效（防止悬空引用）</p>
</li>
<li>
<p>引用的作用域在其声明到最后一次使用截止</p>
</li>
</ol>
<h1 id="_4-3slice-切片" tabindex="-1"><a class="header-anchor" href="#_4-3slice-切片" aria-hidden="true">#</a> 4.3Slice（切片）</h1>
<p>Slice是Rust中另外一种不持有所有权的数据类型（也可以理解是是另一种创建引用的方式？）</p>
<h2 id="字符串切片" tabindex="-1"><a class="header-anchor" href="#字符串切片" aria-hidden="true">#</a> 字符串切片</h2>
<p>指向字符串中一部分内容的引用</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> s <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> hello <span class="token operator">=</span> <span class="token operator">&amp;</span>s<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">..</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// [起始索引, 终止索引)</span>
<span class="token comment">// let hello = &amp;s[..5];</span>
<span class="token keyword">let</span> world <span class="token operator">=</span> <span class="token operator">&amp;</span>s<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">..</span><span class="token number">11</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// let world = &amp;s[6..];</span>
<span class="token keyword">let</span> whole <span class="token operator">=</span> <span class="token operator">&amp;</span>s<span class="token punctuation">[</span><span class="token punctuation">..</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="字符串切片能解决的一个问题" tabindex="-1"><a class="header-anchor" href="#字符串切片能解决的一个问题" aria-hidden="true">#</a> 字符串切片能解决的一个问题</h3>
<p>字符串长度、位置等信息跟字符串绑定，随时变化</p>
<h2 id="字符串字面值实际也是切片" tabindex="-1"><a class="header-anchor" href="#字符串字面值实际也是切片" aria-hidden="true">#</a> 字符串字面值实际也是切片</h2>
<h3 id="在设计函数参数时使用字符串切片作为参数类型更合适" tabindex="-1"><a class="header-anchor" href="#在设计函数参数时使用字符串切片作为参数类型更合适" aria-hidden="true">#</a> 在设计函数参数时使用字符串切片作为参数类型更合适</h3>
<h2 id="其他类型的切片" tabindex="-1"><a class="header-anchor" href="#其他类型的切片" aria-hidden="true">#</a> 其他类型的切片</h2>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> slice <span class="token operator">=</span> <span class="token operator">&amp;</span>a<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">3</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h1 id="_5struct" tabindex="-1"><a class="header-anchor" href="#_5struct" aria-hidden="true">#</a> 5struct</h1>
<p>结构体</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">struct</span> <span class="token type-definition class-name">User</span> <span class="token punctuation">{</span>
    username<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span>
    email<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span>
    sign_count<span class="token punctuation">:</span> <span class="token keyword">u64</span><span class="token punctuation">,</span>
    active<span class="token punctuation">:</span> <span class="token keyword">bool</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> <span class="token keyword">mut</span> user1 <span class="token operator">=</span> <span class="token class-name">User</span> <span class="token punctuation">{</span> <span class="token comment">// mutable则所有字段均mutable</span>
    username<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"asdf"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    email<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"asdf"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    sign_count<span class="token punctuation">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
    active<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>简写语法</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span>email<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> <span class="token punctuation">{</span>
        username<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"asdf"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        email<span class="token punctuation">,</span>
        sign_count<span class="token punctuation">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
        active<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>更新语法</p>
<h1 id="_6枚举" tabindex="-1"><a class="header-anchor" href="#_6枚举" aria-hidden="true">#</a> 6枚举</h1>
<p>枚举中的值被称为枚举中的变体</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">enum</span> <span class="token type-definition class-name">IP_TYPE</span> <span class="token punctuation">{</span>
    <span class="token constant">IPV4</span><span class="token punctuation">,</span>
  	<span class="token constant">IPV6</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token constant">IP_TYPE</span><span class="token punctuation">::</span><span class="token constant">IPV4</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token type-definition class-name">T</span> <span class="token punctuation">{</span>
    <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token constant">IP_TYPE</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> <span class="token type-definition class-name">IP_TYPE</span> <span class="token punctuation">{</span>
    <span class="token constant">IPV4</span><span class="token punctuation">(</span><span class="token keyword">u8</span><span class="token punctuation">,</span> <span class="token keyword">u8</span><span class="token punctuation">,</span> <span class="token keyword">u8</span><span class="token punctuation">,</span> <span class="token keyword">u8</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 附加类型数据</span>
  	<span class="token constant">IPV6</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token class-name">T</span> <span class="token punctuation">{</span>
    <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token constant">IP_TYPE</span><span class="token punctuation">::</span><span class="token constant">IPV4</span><span class="token punctuation">(</span><span class="token number">127</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>和<code>stuct</code>类型，可以使用<code>impl</code>为枚举定义方法</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">impl</span> <span class="token constant">IP_TYPE</span> <span class="token punctuation">{</span>
    <span class="token keyword">fn</span> <span class="token function-definition function">test_enum_method</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token constant">IP_TYPE</span><span class="token punctuation">::</span><span class="token constant">IPV4</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">test_enum_method</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="option" tabindex="-1"><a class="header-anchor" href="#option" aria-hidden="true">#</a> Option</h2>
<blockquote>
<p>Rust中没有null</p>
</blockquote>
<p>Null意味着因为某种原因无效或缺失的值，由于Rust中没有Null，因此类似于Null功能的<code>Option&lt;T&gt;</code></p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token comment">// Option在预导入模块中的定义</span>
<span class="token keyword">enum</span> <span class="token type-definition class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">></span> <span class="token punctuation">{</span>
    <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token class-name">None</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token number">56</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> string <span class="token operator">=</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token string">"asdf"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> nothing<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token keyword">i32</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token class-name">None</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>使用<code>Option&lt;T&gt;</code>比直接使用<code>Null</code>的好处：Option&lt;T&gt;和T不是同一个类型，若想使用Option&lt;T&gt;中的T，则需要将Option&lt;T&gt;转化为T，即T一定有值，只有Option&lt;T&gt;才有可能为空</p>
<h2 id="match" tabindex="-1"><a class="header-anchor" href="#match" aria-hidden="true">#</a> match</h2>
<p>强大的控制流表达式<code>match</code>，其将一个值与一系列模式进行匹配，并执行匹配的模式相对应的代码</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">enum</span> <span class="token type-definition class-name">Coin</span> <span class="token punctuation">{</span>
    a<span class="token punctuation">,</span>
    b<span class="token punctuation">,</span>
  	c<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">fn</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span>coin<span class="token punctuation">:</span> <span class="token class-name">Coin</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token keyword">u8</span> <span class="token punctuation">{</span>
    <span class="token keyword">match</span> coin <span class="token punctuation">{</span>
        <span class="token class-name">Coin</span><span class="token punctuation">::</span>a <span class="token operator">=></span> <span class="token number">1</span><span class="token punctuation">,</span>
      	<span class="token class-name">Coin</span><span class="token punctuation">::</span>c <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"asdf"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Coin</span><span class="token punctuation">::</span>b <span class="token operator">=></span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>绑定值的模式</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">enum</span> <span class="token type-definition class-name">Coin</span> <span class="token punctuation">{</span>
    a<span class="token punctuation">,</span>
    b<span class="token punctuation">,</span>
  	<span class="token function">c</span><span class="token punctuation">(</span><span class="token keyword">u32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">fn</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span>coin<span class="token punctuation">:</span> <span class="token class-name">Coin</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token keyword">u8</span> <span class="token punctuation">{</span>
    <span class="token keyword">match</span> coin <span class="token punctuation">{</span>
        <span class="token class-name">Coin</span><span class="token punctuation">::</span>a <span class="token operator">=></span> <span class="token number">1</span><span class="token punctuation">,</span>
      	<span class="token class-name">Coin</span><span class="token punctuation">::</span><span class="token function">c</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"asdf, {}"</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Coin</span><span class="token punctuation">::</span>b <span class="token operator">=></span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>匹配<code>Option&lt;T&gt;</code></p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">match_option</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token keyword">u32</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token keyword">u32</span><span class="token operator">></span> <span class="token punctuation">{</span>
    <span class="token keyword">match</span> x <span class="token punctuation">{</span>
        <span class="token class-name">None</span> <span class="token operator">=></span> <span class="token class-name">None</span><span class="token punctuation">,</span>
        <span class="token class-name">Some</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token class-name">Some</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>match匹配必须穷举所有可能，但也可以使用_替代其他情况</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">match</span> coin <span class="token punctuation">{</span>
    <span class="token class-name">Coin</span><span class="token punctuation">::</span>a <span class="token operator">=></span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token class-name">Coin</span><span class="token punctuation">::</span><span class="token function">c</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"asdf, {}"</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    _ <span class="token operator">=></span> <span class="token number">3</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="if-let" tabindex="-1"><a class="header-anchor" href="#if-let" aria-hidden="true">#</a> if let</h2>
<p>简单的控制流，只关心一种匹配；但同时也放弃了穷举的可能性</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">=</span> v <span class="token punctuation">{</span>
     <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"hhhh"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>搭配else</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">=</span> v <span class="token punctuation">{</span>
     <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"hhhh"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
     <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"not hhhh"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h1 id="_7-1package、crate、module" tabindex="-1"><a class="header-anchor" href="#_7-1package、crate、module" aria-hidden="true">#</a> 7.1Package、Crate、Module</h1>
<h2 id="package" tabindex="-1"><a class="header-anchor" href="#package" aria-hidden="true">#</a> Package</h2>
<ul>
<li>包含一个Cargo.toml，其描述了如何构建这些Crate</li>
<li>只能包含0-1个<em>library crate</em></li>
<li>可以包含0-1个<em>binary crate</em></li>
</ul>
<h2 id="crate" tabindex="-1"><a class="header-anchor" href="#crate" aria-hidden="true">#</a> Crate</h2>
<p>Crate有<em>binary</em>和<em>library</em>两种类型</p>
<h3 id="crate-root" tabindex="-1"><a class="header-anchor" href="#crate-root" aria-hidden="true">#</a> Crate Root</h3>
<p>Crate Root是一个源代码文件，是组成Crate的根Module，编译器从此文件开始编译</p>
<h3 id="crate惯例" tabindex="-1"><a class="header-anchor" href="#crate惯例" aria-hidden="true">#</a> Crate惯例</h3>
<ul>
<li>src/main.rs是<em>binary crate</em>的<em>crate root</em></li>
<li>src/lib.rs是<em>library crate</em>的<em>crate root</em></li>
<li>src/main.rs所代表的<em>binary crate</em>和src/lib.rs所代表<em>library crate</em>的名均与<em>package</em>名相同</li>
<li>src/bin下的每个文件都是一个独立的<em>library crate</em></li>
</ul>
<h2 id="module" tabindex="-1"><a class="header-anchor" href="#module" aria-hidden="true">#</a> Module</h2>
<p>在<em>Crate</em>中将代码进行分组，使用<code>mod</code>关键字定义且可嵌套，其内可包含其他（<code>struct</code>、<code>enum</code>、常量、<code>trait</code>、<code>fn</code>等）定义</p>
<p>src/main.rs和src/lib.rs作为整个<em>crate root</em>隐式生成了名为crate的模块，作为<em>crate</em>内部整个模块树的根模块</p>
<h1 id="_7-2路径" tabindex="-1"><a class="header-anchor" href="#_7-2路径" aria-hidden="true">#</a> 7.2路径</h1>
<p>为了在Rust的模块中找到条目（Item，即<code>fn</code>、<code>struct</code>、<code>enum</code>、<code>mod</code>、<code>const</code>等等），需要使用路径</p>
<p>两种形式：</p>
<ol>
<li>绝对：从<em>crate root</em>开始使用<em>crate</em>名或字面量<em>crate</em></li>
<li>相对：从当前模块开始使用<code>self</code>、<code>super</code>或当前模块的标识符</li>
</ol>
<p>路径至少由一个标识符组成，标识符之间使用<code>::</code>连接</p>
<h3 id="privacy-boundary-私有边界" tabindex="-1"><a class="header-anchor" href="#privacy-boundary-私有边界" aria-hidden="true">#</a> privacy boundary（私有边界）</h3>
<p>模块不仅可以组织代码，还能定义<em>privacy boundary</em>；Rust中的条目（Item，即<code>fn</code>、<code>struct</code>、<code>enum</code>、<code>mod</code>、<code>const</code>等等）默认是私有的</p>
<p>父级模块无法访问子模块中的私有条目，但子模块中可以使用所有祖先模块的条目</p>
<h3 id="pub关键字" tabindex="-1"><a class="header-anchor" href="#pub关键字" aria-hidden="true">#</a> pub关键字</h3>
<p><code>pub</code>将条目变成公有的</p>
<p>根级的模块不论私有公有都可相互调用</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">mod</span> <span class="token module-declaration namespace">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token namespace">test1<span class="token punctuation">::</span></span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="super关键字" tabindex="-1"><a class="header-anchor" href="#super关键字" aria-hidden="true">#</a> super关键字</h3>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">mod</span> <span class="token module-declaration namespace">test2</span> <span class="token punctuation">{</span>
    <span class="token keyword">fn</span> <span class="token function-definition function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token module-declaration namespace"><span class="token punctuation">::</span>test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="pub-struct" tabindex="-1"><a class="header-anchor" href="#pub-struct" aria-hidden="true">#</a> pub struct</h3>
<p>公共结构体，但字段默认是私有，同样是使用<code>pub</code>关键字将其变成公有</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token comment">// todo restaurant</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="pub-enum" tabindex="-1"><a class="header-anchor" href="#pub-enum" aria-hidden="true">#</a> pub enum</h3>
<p>公共枚举且其所有变体也是公共的</p>
<h1 id="_7-3use" tabindex="-1"><a class="header-anchor" href="#_7-3use" aria-hidden="true">#</a> 7.3use</h1>
<p>使用<code>use</code>将条目引入到当前作用域内，其仍然遵守私有性原则</p>
<p>在使用<code>use</code>引入函数时，将函数的父级模块引入作用域；引入<code>struct</code>、<code>enum</code>等指定完整路径</p>
<h2 id="as" tabindex="-1"><a class="header-anchor" href="#as" aria-hidden="true">#</a> as</h2>
<p><code>as</code>为引入的条目指定本地的别名</p>
<h2 id="pub-use" tabindex="-1"><a class="header-anchor" href="#pub-use" aria-hidden="true">#</a> pub use</h2>
<p><code>use</code>导入之后，对外部作用域来说，导入的条目依然是私有的不可见；<code>pub use</code>重新导出名称</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">pub</span> <span class="token keyword">use</span> <span class="token keyword">crate</span><span class="token module-declaration namespace"><span class="token punctuation">::</span>front_of_house<span class="token punctuation">::</span></span>hosting<span class="token punctuation">;</span> <span class="token comment">// 这里的crate是跟crate同名的根模块</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="使用外部package" tabindex="-1"><a class="header-anchor" href="#使用外部package" aria-hidden="true">#</a> 使用外部Package</h2>
<ol>
<li>Cargo.toml添加依赖包</li>
<li>使用<code>use</code>引入特定作用域</li>
</ol>
<p>标准库std也被作为外部Package，但不需要在Cargo.toml中定义</p>
<h3 id="使用嵌套路径清理在引入相同包时导致的大量use语句" tabindex="-1"><a class="header-anchor" href="#使用嵌套路径清理在引入相同包时导致的大量use语句" aria-hidden="true">#</a> 使用嵌套路径清理在引入相同包时导致的大量use语句</h3>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span></span><span class="token punctuation">{</span><span class="token namespace">cmp<span class="token punctuation">::</span></span><span class="token class-name">Ordering</span><span class="token punctuation">,</span> io<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// use std::io;</span>
<span class="token comment">// use std::io:Write;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>io<span class="token punctuation">::</span></span><span class="token punctuation">{</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token class-name">Write</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>io<span class="token punctuation">::</span></span><span class="token operator">*</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h1 id="_7-4将模块拆分到其他文件" tabindex="-1"><a class="header-anchor" href="#_7-4将模块拆分到其他文件" aria-hidden="true">#</a> 7.4将模块拆分到其他文件</h1>
<p>Rust会从模块同名文件加载内容</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">mod</span> <span class="token module-declaration namespace">test</span><span class="token punctuation">;</span> <span class="token comment">// src/test.rs</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="_8-1vector" tabindex="-1"><a class="header-anchor" href="#_8-1vector" aria-hidden="true">#</a> 8.1Vector</h1>
<p>Vec&lt;T&gt;，由标准库提供的存储多个相同类型的值的类型；使用<code>vec!</code>宏在创建的同时声明初始值</p>
<h1 id="_10-5-10-8生命周期" tabindex="-1"><a class="header-anchor" href="#_10-5-10-8生命周期" aria-hidden="true">#</a> 10.5-10.8生命周期</h1>
<p>生命周期是引用有效的作用域，每个引用都有自己的生命周期；大多数情况下生命周期是隐式可推断的，少数情况下需要手动标注生命周期</p>
<p>生命周期存在主要是为了防止悬空引用</p>
<blockquote>
<p>Rust：借用检查器通过比较作用域来判断所有借用是否合法</p>
</blockquote>
<h2 id="生命周期标注" tabindex="-1"><a class="header-anchor" href="#生命周期标注" aria-hidden="true">#</a> 生命周期标注</h2>
<ul>
<li>生命周期的标注不会改变引用的生命周期长度</li>
<li>当指定了生命周期参数，函数可以接收带有任何生命周期的引用</li>
<li>生命周期的标注：描述了多个引用的生命周期间的关系，但不影响生命周期</li>
</ul>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token operator">&amp;</span><span class="token keyword">i32</span> <span class="token comment">// 引用</span>
<span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">'a</span> <span class="token keyword">i32</span> <span class="token comment">// 带有显式生命周期的引用</span>
<span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">'a</span> <span class="token keyword">mut</span> <span class="token keyword">i32</span> <span class="token comment">// 带有显式生命周期的可变引用</span>

<span class="token keyword">fn</span> <span class="token function-definition function">test</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">'a</span><span class="token operator">></span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">'a</span> <span class="token keyword">str</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">'a</span> <span class="token keyword">str</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">'a</span> <span class="token keyword">str</span> <span class="token punctuation">{</span> <span class="token comment">// 泛型生命周期</span>
    <span class="token comment">// 泛型生命周期的意思是x、y、返回值都要有相同的生命周期，'a的生命周期是x、y生命周期的交集</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>本质上，生命周期标注就是手动对引用作用域进行约束，最大保证安全原则</p>
<p>是否指定生命周期参数依赖于函数所做的事情</p>
<h1 id="_15-3drop-trait" tabindex="-1"><a class="header-anchor" href="#_15-3drop-trait" aria-hidden="true">#</a> 15.3Drop trait</h1>
<p>实现Drop trait以自定义值离开作用域时的行为</p>
<h2 id="std-mem-drop" tabindex="-1"><a class="header-anchor" href="#std-mem-drop" aria-hidden="true">#</a> std::mem:drop</h2>
<p>使用<code>std::mem:drop</code>提前drop值</p>
<h1 id="个人总结" tabindex="-1"><a class="header-anchor" href="#个人总结" aria-hidden="true">#</a> 个人总结</h1>
<h2 id="good-reference" tabindex="-1"><a class="header-anchor" href="#good-reference" aria-hidden="true">#</a> good reference</h2>
<p>https://www.jianshu.com/p/707385771ad1</p>
<p>https://zhuanlan.zhihu.com/p/109285917</p>
<h2 id="good-example" tabindex="-1"><a class="header-anchor" href="#good-example" aria-hidden="true">#</a> good example</h2>
<ol>
<li>
<p>为啥不行</p>
<p>https://learnku.com/rust/t/48233</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> <span class="token keyword">mut</span> s1 <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s2 <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> s1<span class="token punctuation">;</span>
<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"{} "</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"{} "</span><span class="token punctuation">,</span> s2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">fn</span> <span class="token function-definition function">bar</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">fn</span> <span class="token function-definition function">foo</span><span class="token punctuation">(</span>a<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> y <span class="token operator">=</span> <span class="token operator">&amp;</span>a<span class="token punctuation">;</span> <span class="token comment">// a is borrowed as immutable.</span>
    <span class="token function">bar</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// error: cannot borrow `*a` as mutable because `a` is also borrowed</span>
            <span class="token comment">//        as immutable</span>
    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"{}"</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> <span class="token keyword">mut</span> origin <span class="token operator">=</span> <span class="token number">1234</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> aa<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token keyword">u16</span> <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> origin<span class="token punctuation">;</span>
<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"{}"</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"{} "</span><span class="token punctuation">,</span> aa<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
<li>
<p>为啥不行</p>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> origin <span class="token operator">=</span> <span class="token number">1234</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token keyword">mut</span> aa<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token keyword">u16</span> <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> origin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ol>
<h2 id="堆栈" tabindex="-1"><a class="header-anchor" href="#堆栈" aria-hidden="true">#</a> 堆栈</h2>
<p>堆栈都是程序运行时可供使用的内存，对应不同的数据管理方式；栈是先进先出且数据大小已知，堆是随机分配一块足够大的空间</p>
<h2 id="变量和值交互的两种范式" tabindex="-1"><a class="header-anchor" href="#变量和值交互的两种范式" aria-hidden="true">#</a> 变量和值交互的两种范式</h2>
<h3 id="move-1" tabindex="-1"><a class="header-anchor" href="#move-1" aria-hidden="true">#</a> move</h3>
<h3 id="clone" tabindex="-1"><a class="header-anchor" href="#clone" aria-hidden="true">#</a> clone</h3>
<h2 id="引用" tabindex="-1"><a class="header-anchor" href="#引用" aria-hidden="true">#</a> 引用</h2>
<p>引用规则</p>
<ol>
<li>同一时间，给定作用域内只能有一个可变引用（防止出现数据竞争data race）/一个或多个不可变引用</li>
<li>引用必须总是有效的（防止出现悬空引用<a href="https://kaisery.github.io/trpl-zh-cn/ch04-02-references-and-borrowing.html#%E6%82%AC%E5%9E%82%E5%BC%95%E7%94%A8dangling-references" target="_blank" rel="noopener noreferrer">Dangling References<ExternalLinkIcon/></a>）</li>
</ol>
<p>不可变引用实现了<code>copy trait</code>，因此赋值时是copy行为，可变引用没有实现<code>copy trait</code>，因此赋值时是move行为</p>
<p>slice切片是引用集合中的一段连续元素，是一种特殊引用，是没有所有权的数据类型</p>
<h2 id="所有权" tabindex="-1"><a class="header-anchor" href="#所有权" aria-hidden="true">#</a> 所有权</h2>
<ol>
<li>任意时刻值有且只有一个owner（变量）</li>
<li>owner离开作用域，则值将会被销毁（drop）</li>
</ol>
</template>
