import{r as p,o as e,c as t,a as n,d as o,F as c,b as s,e as l}from"./app.6a81c09a.js";import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";const u={},k={id:"_234-\u56DE\u6587\u94FE\u8868",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#_234-\u56DE\u6587\u94FE\u8868","aria-hidden":"true"},"#",-1),b=s(),d={href:"https://leetcode-cn.com/problems/palindrome-linked-list",target:"_blank",rel:"noopener noreferrer"},m=s("234. \u56DE\u6587\u94FE\u8868"),w=l(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">ListNode</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> <span class="token punctuation">(</span>val<span class="token operator">===</span><span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> val<span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token punctuation">(</span>next<span class="token operator">===</span><span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> next<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

a<span class="token punctuation">.</span>next <span class="token operator">=</span> b
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="\u601D\u8DEF1" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF1" aria-hidden="true">#</a> \u601D\u8DEF1</h2><p>\u5C06\u94FE\u8868\u53CD\u8F6C\uFF0C\u63D2\u5165\u4E00\u4E2A\u65B0\u94FE\u8868\uFF0C\u5224\u65AD\u4E24\u4E2A\u94FE\u8868\u662F\u5426\u76F8\u540C\uFF0CO(2N)\u7684\u65F6\u95F4\u590D\u6742\u5EA6\u548CO(N)\u7684\u7A7A\u95F4\u590D\u6742\u5EA6\uFF0C\u8FD8\u662F\u6709\u6BD4\u8F83\u5927\u7684\u4F18\u5316\u7A7A\u95F4</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">palindromeLinkedList</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token comment">// \u4E0D\u53D8\u52A8\u539F\u94FE\u8868 \u521B\u5EFA\u65B0\u7684\u94FE\u8868</span>
  <span class="token keyword">function</span> <span class="token function">linkReverseClone</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> cloneNext <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token keyword">let</span> curr <span class="token operator">=</span> root
    <span class="token keyword">while</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      cloneNext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>curr<span class="token punctuation">.</span>val<span class="token punctuation">,</span> cloneNext<span class="token punctuation">)</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>curr<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
      curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> cloneNext
  <span class="token punctuation">}</span>
  
  <span class="token keyword">let</span> linkNode <span class="token operator">=</span> head
  <span class="token keyword">let</span> linkRNode <span class="token operator">=</span> <span class="token function">linkReverseClone</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>linkNode<span class="token punctuation">,</span> linkRNode<span class="token punctuation">)</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>linkNode <span class="token operator">&amp;&amp;</span> linkRNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>linkNode<span class="token punctuation">.</span>val <span class="token operator">!==</span> linkRNode<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span>
    linkNode <span class="token operator">=</span> linkNode<span class="token punctuation">.</span>next
    linkRNode <span class="token operator">=</span> linkRNode<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>

  <span class="token comment">// \u53EA\u6709\u4E24\u4E2A\u90FD\u662Fnull\u7684\u60C5\u51B5\u624D\u76F8\u7B49 \u5176\u4ED6\u60C5\u51B5\u90FD\u8BF4\u660E\u4E0D\u7B49 \u6240\u4EE5\u65E0\u9700.val\u5224\u65AD\u5176\u503C</span>
  <span class="token keyword">return</span> linkNode <span class="token operator">===</span> linkRNode
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="\u601D\u8DEF2" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF2" aria-hidden="true">#</a> \u601D\u8DEF2</h2><p>\u7528\u6808\uFF0C\u672C\u8D28\u8DDF\u7528\u94FE\u8868\u4E00\u6837</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">palindromeLinkedList</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">let</span> curr <span class="token operator">=</span> head
  
  <span class="token keyword">while</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>curr<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  curr <span class="token operator">=</span> head
  <span class="token keyword">while</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!==</span> curr<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span>
    curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="\u601D\u8DEF3" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF3" aria-hidden="true">#</a> \u601D\u8DEF3</h2><p>\u501F\u52A9\u6811\u7684\u540E\u7EED\u904D\u5386\uFF0C\u672C\u8D28\u8DDF\u7528\u6808\u4E00\u6837\uFF0C\u53EA\u4E0D\u8FC7\u7528\u7684\u662F\u9012\u5F52\u51FD\u6570\u7684\u8C03\u7528\u6808</p><h2 id="\u601D\u8DEF4" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF4" aria-hidden="true">#</a> \u601D\u8DEF4</h2><p>\u4F7F\u7528\u5FEB\u6162\u6307\u9488\u627E\u5230\u94FE\u8868\u4E2D\u70B9 \u53CD\u8F6C\u540E\u534A\u90E8\u5206 \u8DDF\u524D\u534A\u90E8\u5206\u8FDB\u884C\u6BD4\u8F83</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">palindromeLinkedList</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span> <span class="token comment">// \u5355\u4E2A\u94FE\u8868</span>

  <span class="token keyword">function</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> prev <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token keyword">let</span> curr <span class="token operator">=</span> head
    <span class="token keyword">while</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next
      curr<span class="token punctuation">.</span>next <span class="token operator">=</span> prev
      prev <span class="token operator">=</span> curr
      curr <span class="token operator">=</span> next
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> prev
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> slow <span class="token operator">=</span> head
  <span class="token keyword">let</span> fast <span class="token operator">=</span> head
  <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>fast<span class="token punctuation">)</span><span class="token punctuation">{</span>
    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next
    fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token operator">?.</span>next <span class="token operator">??</span> <span class="token keyword">null</span>    
    count <span class="token operator">+=</span> fast <span class="token operator">?</span> <span class="token number">2</span> <span class="token operator">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> odd <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">(</span>count <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>odd<span class="token punctuation">)</span> slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next <span class="token comment">// \u5947\u6570</span>
  
  <span class="token keyword">let</span> halfHead <span class="token operator">=</span> head
  <span class="token keyword">let</span> reverseHalfHead <span class="token operator">=</span> <span class="token function">reverse</span><span class="token punctuation">(</span>slow<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reverseHalfHead<span class="token punctuation">)</span>
  <span class="token keyword">debugger</span>

  <span class="token comment">// \u8C03\u8F6C\u4E4B\u540E\u4F1A\u5F62\u6210\u76F8\u4EA4\u94FE \u5947\u6570\u60C5\u51B5\u6700\u7EC8\u90FD\u4F1A\u6307\u5411\u94FE\u8868\u4E2D\u70B9 \u5076\u6570\u60C5\u51B5reverseHalfHead\u4F1A\u6307\u5411null halfHead\u4F1A\u6307\u5411slow \u53EF\u4EE5\u753B\u56FE\u4E00\u8BD5</span>
  
  <span class="token keyword">while</span><span class="token punctuation">(</span>reverseHalfHead<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>halfHead<span class="token punctuation">.</span>val <span class="token operator">!==</span> reverseHalfHead<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span>
    halfHead <span class="token operator">=</span> halfHead<span class="token punctuation">.</span>next
    reverseHalfHead <span class="token operator">=</span> reverseHalfHead<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div>`,12);function h(f,y){const a=p("ExternalLinkIcon");return e(),t(c,null,[n("h1",k,[i,b,n("a",d,[m,o(a)])]),w],64)}var _=r(u,[["render",h]]);export{_ as default};
