import{r as e,o as t,c as p,a as n,d as o,F as c,b as s,e as r}from"./app.6a81c09a.js";import{_ as u}from"./plugin-vue_export-helper.21dcd24c.js";const l={},i={id:"_1791-\u627E\u51FA\u661F\u578B\u56FE\u7684\u4E2D\u5FC3\u8282\u70B9",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#_1791-\u627E\u51FA\u661F\u578B\u56FE\u7684\u4E2D\u5FC3\u8282\u70B9","aria-hidden":"true"},"#",-1),d=s(),m={href:"https://leetcode-cn.com/problems/find-center-of-star-graph/",target:"_blank",rel:"noopener noreferrer"},_=s("1791. \u627E\u51FA\u661F\u578B\u56FE\u7684\u4E2D\u5FC3\u8282\u70B9"),b=r(`<h2 id="\u601D\u8DEF1" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF1" aria-hidden="true">#</a> \u601D\u8DEF1</h2><p>\u7531\u4E8E\u661F\u578B\u56FE\u7684\u7279\u6B8A\u6027\u8D28\uFF0C\u53EA\u9700\u9009\u53D6\u4EFB\u610F\u4E24\u6761\u8FB9\uFF0C\u6C42\u516C\u5171\u8282\u70B9\u5373\u53EF\uFF0CO(1)\u7684\u65F6\u95F4\u590D\u6742\u5EA6</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">findCenterOfStarGraph2</span><span class="token punctuation">(</span><span class="token parameter">edges</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>edges<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> edges<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">||</span> edges<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> edges<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span> edges<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
  <span class="token keyword">return</span> edges<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,3);function h(f,g){const a=e("ExternalLinkIcon");return t(),p(c,null,[n("h1",i,[k,d,n("a",m,[_,o(a)])]),b],64)}var w=u(l,[["render",h]]);export{w as default};