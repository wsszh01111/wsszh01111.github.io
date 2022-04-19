import{r as p,o as t,c as e,a as n,d as o,F as c,b as s,e as l}from"./app.6a81c09a.js";import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";const u={},i={id:"_2016-\u589E\u91CF\u5143\u7D20\u4E4B\u95F4\u7684\u6700\u5927\u5DEE\u503C",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#_2016-\u589E\u91CF\u5143\u7D20\u4E4B\u95F4\u7684\u6700\u5927\u5DEE\u503C","aria-hidden":"true"},"#",-1),m=s(),b={href:"https://leetcode-cn.com/problems/maximum-difference-between-increasing-elements/",target:"_blank",rel:"noopener noreferrer"},d=s("2016. \u589E\u91CF\u5143\u7D20\u4E4B\u95F4\u7684\u6700\u5927\u5DEE\u503C"),f=l(`<h2 id="\u601D\u8DEF1" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF1" aria-hidden="true">#</a> \u601D\u8DEF1</h2><p>\u666E\u901A\u601D\u8DEF\uFF0C\u4E24\u904D\u904D\u5386</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">maximumDifference</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> max <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        max <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">-</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> max
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="\u601D\u8DEF2" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF2" aria-hidden="true">#</a> \u601D\u8DEF2</h2><p>LeetCode\u5B98\u65B9\u601D\u8DEF\uFF0C\u6700\u5C0F\u524D\u7F00\u503C\uFF0C\u7528\u4E00\u4E2A\u503C\u8BB0\u5F55\u4E4B\u524D\u7684\u6700\u5C0F\u503C\u5373\u53EF</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">maximumDifference</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> minPrefix <span class="token operator">=</span> <span class="token number">Infinity</span>
  <span class="token keyword">let</span> max <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>minPrefix <span class="token operator">&gt;</span> nums<span class="token punctuation">[</span>j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      minPrefix <span class="token operator">=</span> nums<span class="token punctuation">[</span>j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> minPrefix<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      max <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">-</span> minPrefix<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> max
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>`,6);function h(x,_){const a=p("ExternalLinkIcon");return t(),e(c,null,[n("h1",i,[k,m,n("a",b,[d,o(a)])]),f],64)}var w=r(u,[["render",h]]);export{w as default};
