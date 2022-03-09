<template><h1 id="class" tabindex="-1"><a class="header-anchor" href="#class" aria-hidden="true">#</a> class</h1>
<p>CLASS是ES6中提出的基于原型继承的对象构造语法糖，但以往好像没有总结过，在此总结下</p>
<h2 id="类声明" tabindex="-1"><a class="header-anchor" href="#类声明" aria-hidden="true">#</a> 类声明</h2>
<h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3>
<ul>
<li>构造函数是可选的</li>
<li>类声明体中的代码在严格模式下运行</li>
</ul>
<h3 id="限制" tabindex="-1"><a class="header-anchor" href="#限制" aria-hidden="true">#</a> 限制</h3>
<ul>
<li>同一类声明在相关的作用域下不能被多次声明</li>
<li>类声明在其作用域下不会被提升，因此要在声明之后访问该类</li>
<li><code>super()</code>只能在构造函数中调用，且必须在调用<code>this</code>之前被调用</li>
</ul>
<h2 id="类表达式" tabindex="-1"><a class="header-anchor" href="#类表达式" aria-hidden="true">#</a> 类表达式</h2>
<p>类表达式和类声明基本一致，但取决于类表达式所赋值变量的不同声明（var/let/const），类表达式是有可能被变量提升的（var），其实本质上还是变量提升导致的</p>
<p>##语法</p>
<h3 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h3>
<p>构造函数不是必须的，默认会有空的构造函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>构造函数默认会返回当前创建的对象实例（this），也可以返回一个其他的值以改变该构造函数的行为</p>
<p>类名所指向的函数实际上就是构造函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">typeof</span> Point <span class="token operator">===</span> <span class="token string">'function'</span> <span class="token comment">// true</span>
p<span class="token punctuation">.</span><span class="token class-name">__proto__</span><span class="token punctuation">.</span>constructor <span class="token operator">===</span> Point <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="new调用" tabindex="-1"><a class="header-anchor" href="#new调用" aria-hidden="true">#</a> new调用</h3>
<p>虽然实际上类名所指向变量依然是个函数（该函数就是ES5中原型函数的封装），但该函数依然只能使用<code>new</code>操作符调用，不能跟普通函数一样直接调用</p>
<h3 id="静态函数" tabindex="-1"><a class="header-anchor" href="#静态函数" aria-hidden="true">#</a> 静态函数</h3>
<p>类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上<code>static</code>关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就是静态函数；核心来说就是具有<code>static</code>关键字的类不会被加入到实例的原型对象上，会直接挂在构造函数上</p>
<h3 id="new-target-属性" tabindex="-1"><a class="header-anchor" href="#new-target-属性" aria-hidden="true">#</a> new.target 属性</h3>
<p><code>new</code>是从构造函数生成实例对象的命令。ES6 为<code>new</code>命令引入了一个<code>new.target</code>属性，该属性一般用在构造函数之中，返回<code>new</code>命令作用于的那个构造函数。如果构造函数不是通过<code>new</code>命令或<code>Reflect.construct()</code>调用的，<code>new.target</code>会返回<code>undefined</code>，因此这个属性可以用来确定函数是怎么调用的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> Person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'必须使用 new 命令生成实例'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>实际上类的构造函数在解释器在执行层面已经做了检测，即类不能作为普通函数调用，只能通过<code>new</code>操作符调用；因此<code>new.target</code>的更大的实际意义是应对一般函数，既可以作为普通函数调用，也可以作为构造函数调用</p>
<blockquote>
<p>new.target不能用在函数外部</p>
</blockquote>
<p>##继承</p>
<p>之所以说<code>class</code>是语法糖，是因为其并没有改变JS语言仅能基于原型实现继承的本质，只是在语法上更接近传统认识里的类编写方式，但最终还是会以原型的方式进行执行，</p>
<h3 id="extends" tabindex="-1"><a class="header-anchor" href="#extends" aria-hidden="true">#</a> extends</h3>
<p><code>class</code>可以通过<code>extends</code>关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。虽然是很大的进步，但是依然只有类的继承而没有<code>interface</code>的实现，<code>interface</code>的实现只有在typescript中支持了</p>
<h3 id="super指向父类" tabindex="-1"><a class="header-anchor" href="#super指向父类" aria-hidden="true">#</a> super指向父类</h3>
<p>super关键字指向了父类的构造函数，用来构造父类的对象实例</p>
<p>子类必须在<code>constructor</code>方法中调用<code>super</code>方法，否则新建实例时会报错。这是因为子类自己的<code>this</code>对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用<code>super</code>方法，子类就得不到<code>this</code>对象。</p>
<p>ES5 的继承，实质是先创造子类的实例对象<code>this</code>，然后再将父类的方法添加到<code>this</code>上面（<code>Parent.apply(this)</code>）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到<code>this</code>上面（所以必须先调用<code>super</code>方法），然后再用子类的构造函数修改<code>this</code>。</p>
<p>所以其实现继承的核心原理还是所谓的寄生构造+原型的方式，再一次证明了<code>class</code>是个语法糖并没有改变js底层继承逻辑</p>
<blockquote>
<p>super作为构造函数调用只能放在constructor中</p>
</blockquote>
<h3 id="super作为对象" tabindex="-1"><a class="header-anchor" href="#super作为对象" aria-hidden="true">#</a> super作为对象</h3>
<p><code>super</code>作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">p</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">p</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>上面代码中，子类<code>B</code>当中的<code>super.p()</code>，就是将<code>super</code>当作一个对象使用。这时，<code>super</code>在普通方法之中，指向<code>A.prototype</code>，所以<code>super.p()</code>就相当于<code>A.prototype.p()</code>。注意这里是指向了父类的原型对象，即<code>Function.prototype</code>，所以定义在父类实例上的方法或属性，是无法通过<code>super</code>调用的。</p>
<p>ES6 规定，在子类普通方法中通过<code>super</code>调用父类的方法时，方法内部的<code>this</code>指向当前的子类实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">m</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
b<span class="token punctuation">.</span><span class="token function">m</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>上面代码中，<code>super.print()</code>虽然调用的是<code>A.prototype.print()</code>，但是<code>A.prototype.print()</code>内部的<code>this</code>指向子类<code>B</code>的实例，导致输出的是<code>2</code>，而不是<code>1</code>。也就是说，实际上执行的是<code>super.print.call(this)</code>。</p>
<p>由于<code>this</code>指向子类实例，所以如果通过<code>super</code>对某个属性赋值，这时<code>super</code>就是<code>this</code>，赋值的属性会变成子类实例的属性。</p>
<h3 id="继承的默认构造函数" tabindex="-1"><a class="header-anchor" href="#继承的默认构造函数" aria-hidden="true">#</a> 继承的默认构造函数</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 当子类没有构造函数时 下面的构造函数将会被加入</span>
<span class="token keyword">class</span> <span class="token class-name">ColorPoint</span> <span class="token keyword">extends</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="子类继承静态函数" tabindex="-1"><a class="header-anchor" href="#子类继承静态函数" aria-hidden="true">#</a> 子类继承静态函数</h3>
<p>父类的静态方法，也会被子类继承。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello world'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token constant">B</span><span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// hello world</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ol>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class" target="_blank" rel="noopener noreferrer">class | MDN<ExternalLinkIcon/></a></li>
<li><a href="https://es6.ruanyifeng.com/#docs/class" target="_blank" rel="noopener noreferrer">Class 的基本语法 | 阮一峰<ExternalLinkIcon/></a></li>
</ol>
</template>
