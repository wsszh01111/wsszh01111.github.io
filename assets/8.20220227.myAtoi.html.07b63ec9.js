import{r as p,o as t,c as e,a as n,d as o,F as c,b as s,e as l}from"./app.6a81c09a.js";import{_ as u}from"./plugin-vue_export-helper.21dcd24c.js";const r={},i={id:"_8-\u5B57\u7B26\u4E32\u8F6C\u6362\u6574\u6570-atoi",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#_8-\u5B57\u7B26\u4E32\u8F6C\u6362\u6574\u6570-atoi","aria-hidden":"true"},"#",-1),b=s(),m={href:"https://leetcode-cn.com/problems/string-to-integer-atoi/",target:"_blank",rel:"noopener noreferrer"},d=s("8. \u5B57\u7B26\u4E32\u8F6C\u6362\u6574\u6570 (atoi)"),g=l(`<h2 id="\u601D\u8DEF1" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF1" aria-hidden="true">#</a> \u601D\u8DEF1</h2><p>\u6839\u636E\u9898\u610F\u6A21\u62DF\u5373\u53EF</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myAtoi</span><span class="token punctuation">(</span><span class="token parameter">s</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> maxBound <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span>
  <span class="token keyword">let</span> minBound <span class="token operator">=</span> <span class="token operator">-</span>Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">let</span> sign <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">let</span> decimalDigit <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token keyword">const</span> invalidMap <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;.&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[A-Za-z]</span><span class="token regex-delimiter">/</span></span>
  <span class="token keyword">const</span> <span class="token function-variable function">isInvalid</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">txt</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>txt<span class="token punctuation">)</span> <span class="token operator">||</span> invalidMap<span class="token punctuation">[</span>txt<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> intMap <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token number">0</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token number">1</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token number">2</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token number">3</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token number">4</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
    <span class="token number">5</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token number">6</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span>
    <span class="token number">7</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>
    <span class="token number">8</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>
    <span class="token number">9</span><span class="token operator">:</span> <span class="token number">9</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isInvalid</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> result <span class="token operator">=</span> sign <span class="token operator">*</span> res
      <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">&gt;</span> maxBound<span class="token punctuation">)</span> <span class="token keyword">return</span> maxBound
      <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">&lt;</span> minBound<span class="token punctuation">)</span> <span class="token keyword">return</span> minBound
      <span class="token keyword">return</span> result
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&#39; &#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">continue</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      invalidMap<span class="token punctuation">[</span><span class="token string">&#39; &#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&#39;+&#39;</span> <span class="token operator">||</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&#39;-&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      invalidMap<span class="token punctuation">[</span><span class="token string">&#39;+&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> invalidMap<span class="token punctuation">[</span><span class="token string">&#39;-&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&#39;-&#39;</span><span class="token punctuation">)</span> sign <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span>
      <span class="token keyword">continue</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      decimalDigit <span class="token operator">=</span> <span class="token number">1</span>
      invalidMap<span class="token punctuation">[</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token keyword">continue</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">const</span> intChar <span class="token operator">=</span> intMap<span class="token punctuation">[</span>s<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>invalidMap<span class="token punctuation">[</span><span class="token string">&#39;+&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      invalidMap<span class="token punctuation">[</span><span class="token string">&#39;+&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> invalidMap<span class="token punctuation">[</span><span class="token string">&#39;-&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">if</span> <span class="token punctuation">(</span>decimalDigit <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">delete</span> invalidMap<span class="token punctuation">[</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>intChar <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>res <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>decimalDigit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          decimalDigit<span class="token operator">++</span> <span class="token comment">// \u5728\u5C0F\u6570\u4F4D\u76840</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token keyword">continue</span> <span class="token comment">// 0\u5728\u6700\u524D\u5934</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>decimalDigit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 0\u53C8\u6DA8\u4E86\u4E00\u4F4D</span>
        decimalDigit<span class="token operator">++</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        res <span class="token operator">=</span> res <span class="token operator">*</span> <span class="token number">10</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>intChar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>decimalDigit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        res <span class="token operator">=</span> res <span class="token operator">+</span> intChar <span class="token operator">/</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> decimalDigit<span class="token punctuation">)</span>
        decimalDigit<span class="token operator">++</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        res <span class="token operator">=</span> res <span class="token operator">*</span> <span class="token number">10</span> <span class="token operator">+</span> intChar
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> sign <span class="token operator">*</span> res
  <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">&gt;</span> maxBound<span class="token punctuation">)</span> <span class="token keyword">return</span> maxBound
  <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">&lt;</span> minBound<span class="token punctuation">)</span> <span class="token keyword">return</span> minBound
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myAtoi</span><span class="token punctuation">(</span><span class="token string">&quot;   +0 123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myAtoi</span><span class="token punctuation">(</span><span class="token string">&quot;00000-42a1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myAtoi</span><span class="token punctuation">(</span><span class="token string">&quot;-12&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myAtoi</span><span class="token punctuation">(</span><span class="token string">&quot;words and 987&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// \u51FA\u9519 \u56E0\u4E3A\u9898\u610F\u5176\u5B9E\u662F\u8BF4\u6570\u5B57\u53EA\u4F1A\u51FA\u73B0\u5728\u6700\u524D\u9762</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myAtoi</span><span class="token punctuation">(</span><span class="token string">&quot;001&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br></div></div>`,3);function y(w,f){const a=p("ExternalLinkIcon");return t(),e(c,null,[n("h1",i,[k,b,n("a",m,[d,o(a)])]),g],64)}var x=u(r,[["render",y]]);export{x as default};