import{r as e,o as p,c as t,a as n,d as o,F as c,b as s,e as r}from"./app.6a81c09a.js";import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";const u={},i={id:"_102-\u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#_102-\u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386","aria-hidden":"true"},"#",-1),d=s(),b={href:"https://leetcode-cn.com/problems/binary-tree-level-order-traversal/",target:"_blank",rel:"noopener noreferrer"},m=s("102. \u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386"),h=r(`<p>\u4E4B\u524D\u597D\u50CF\u6CA1\u548B\u63A5\u89E6\u5C42\u5E8F\u904D\u5386\uFF0C\u8865\u4E00\u4E0B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) <span class="token punctuation">{</span>
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * <span class="token punctuation">}</span>
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="\u601D\u8DEF1" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF1" aria-hidden="true">#</a> \u601D\u8DEF1</h2><p>\u4F7F\u7528\u961F\u5217\u5373\u53EF\uFF0C\u5728\u904D\u5386\u5F53\u524D\u8282\u70B9\u7684\u540C\u65F6\u5C06\u5B50\u8282\u70B9\u52A0\u5165\u961F\u5217\uFF0C\u7136\u540E\u4E0B\u4E00\u6B21\u904D\u5386\u76F4\u63A5\u4ECE\u961F\u5217\u4E2D\u53D6\u503C\u5373\u53EF\uFF0C\u961F\u5217\u7A7A\u4E86\u5C31\u8BF4\u660E\u904D\u5386\u5B8C\u4E86\uFF1B\u7531\u4E8E\u9898\u76EE\u6709\u7ED3\u6784\u8981\u6C42\uFF0C\u56E0\u6B64\u4F7F\u7528\u53CC\u961F\u5217<code>currQueue</code>\u548C<code>nextQueue</code>\u5206\u522B\u8BB0\u5F55\u5F53\u524D\u5C42\u548C\u4E0B\u4E00\u5C42\u7684\u8282\u70B9</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">levelOrder</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span> res
  
  <span class="token keyword">let</span> currQueue <span class="token operator">=</span> <span class="token punctuation">[</span>root<span class="token punctuation">]</span>
  <span class="token keyword">let</span> nextQueue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  <span class="token keyword">while</span><span class="token punctuation">(</span>currQueue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> level <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> currNode <span class="token keyword">of</span> currQueue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      level<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>currNode<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>currNode<span class="token punctuation">.</span>left<span class="token punctuation">)</span> nextQueue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>currNode<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>currNode<span class="token punctuation">.</span>right<span class="token punctuation">)</span> nextQueue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>currNode<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>level<span class="token punctuation">)</span>

    <span class="token keyword">const</span> temp <span class="token operator">=</span> currQueue
    currQueue <span class="token operator">=</span> nextQueue
    nextQueue <span class="token operator">=</span> temp

    nextQueue<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div>`,5);function f(_,v){const a=e("ExternalLinkIcon");return p(),t(c,null,[n("h1",i,[k,d,n("a",b,[m,o(a)])]),h],64)}var y=l(u,[["render",f]]);export{y as default};
