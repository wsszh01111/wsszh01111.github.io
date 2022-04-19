import{r as p,o as e,c as o,a as n,d as t,F as c,b as s,e as r}from"./app.6a81c09a.js";import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";const u={},i={id:"_77-\u7EC4\u5408",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#_77-\u7EC4\u5408","aria-hidden":"true"},"#",-1),b=s(),d={href:"https://leetcode-cn.com/problems/combinations/",target:"_blank",rel:"noopener noreferrer"},m=s("77. \u7EC4\u5408"),_=n("h2",{id:"\u601D\u8DEF1",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u601D\u8DEF1","aria-hidden":"true"},"#"),s(" \u601D\u8DEF1")],-1),h=s("\u8DDF78\u9898\u7C7B\u4F3C\uFF0C\u53EA\u662F\u9700\u8981\u6709\u5B50\u96C6\u4E2A\u6570\u7684\u9650\u5236\uFF0C\u4E5F\u5C31\u662F\u7EC8\u6B62\u6761\u4EF6\u53D1\u751F\u4E86\u53D8\u5316\uFF0C\u5177\u4F53\u7684\u8BB2\u89E3\u5728"),f={href:"https://labuladong.gitee.io/algo/1/10/",target:"_blank",rel:"noopener noreferrer"},x=s("\u56DE\u6EAF\u7B97\u6CD5\u79D2\u6740\u6240\u6709\u6392\u5217/\u7EC4\u5408/\u5B50\u96C6\u95EE\u9898"),g=s("\u4E2D\u8BB2\u89E3\u7684\u975E\u5E38\u6E05\u695A\u4E86"),v=r(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">combinations</span><span class="token punctuation">(</span><span class="token parameter">n<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">function</span> <span class="token function">backtrack</span><span class="token punctuation">(</span><span class="token parameter">path<span class="token punctuation">,</span> startIndex</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span>length <span class="token operator">===</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>path<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span> startIndex <span class="token operator">&lt;=</span> n<span class="token punctuation">;</span> startIndex<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      path<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>startIndex<span class="token punctuation">)</span>
      <span class="token function">backtrack</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> startIndex<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span>
      path<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">backtrack</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,1);function w(y,I){const a=p("ExternalLinkIcon");return e(),o(c,null,[n("h1",i,[k,b,n("a",d,[m,t(a)])]),_,n("p",null,[h,n("a",f,[x,t(a)]),g]),v],64)}var j=l(u,[["render",w]]);export{j as default};
