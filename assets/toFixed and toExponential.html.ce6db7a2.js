import{e as n}from"./app.6a81c09a.js";import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";const a={},o=n(`<h1 id="tofixed-and-toexponential" tabindex="-1"><a class="header-anchor" href="#tofixed-and-toexponential" aria-hidden="true">#</a> toFixed and toExponential</h1><blockquote><p>\u5B9A\u70B9\u8868\u793A\u6CD5\uFF1A\u662F\u8DDF\u6D6E\u70B9\u8868\u793A\u6CD5\u76F8\u5BF9\u5E94\u7684\u6570\u5B57\u8868\u793A\u65B9\u5F0F\uFF0C\u6240\u8C13\u201C\u5B9A\u201D\u4E0E\u201C\u6D6E\u201D\uFF0C\u6307\u7684\u662F\u5C0F\u6570\u70B9\u4F4D\u7F6E\u7684\u56FA\u5B9A\u4E0E\u6D6E\u52A8\u3002\u5982\u679C\u5C0F\u6570\u70B9\u56FA\u5B9A\uFF0C\u5BF9\u6BD4\u6D6E\u70B9\u8868\u793A\u6CD5\uFF0C\u5B9A\u70B9\u8868\u793A\u6CD5\u80FD\u8868\u793A\u7684\u6570\u5B57\u8303\u56F4\u548C\u6570\u5B57\u7CBE\u5EA6\u90FD\u4F1A\u66F4\u5C0F\uFF0C\u56E0\u6B64\u5728\u8BA1\u7B97\u673A\u4E2D\u8868\u793A\u6570\u5B57\u4E00\u822C\u90FD\u662F\u4F7F\u7528\u6D6E\u70B9\u8868\u793A\u6CD5\u3002\u52A8\u6001\u6D6E\u52A8\u5C0F\u6570\u70B9\uFF0C\u786E\u5B9E\u80FD\u591F\u540C\u65F6\u652F\u6301\u66F4\u5927\u7684\u6570\u5B57\u8303\u56F4\u548C\u6570\u5B57\u7CBE\u5EA6</p></blockquote><p><code>toFixed(digits)</code>/<code>toExponential(fractionDigits)</code>\u4F5C\u4E3A\u4E00\u5BF9\u6570\u5B57\u8F6C\u6362\u51FD\u6570\u3002</p><p><code>toFixed(digits)</code>\u5C06\u6570\u5B57\u8F6C\u6362\u6210\u5B9A\u70B9\u8868\u793A\u6CD5\u7684\u5B57\u7B26\u4E32\u5F62\u5F0F\uFF0C\u4E5F\u5C31\u662F\u5E38\u89C1\u7684\u7B26\u5408\u76F4\u63A5\u7684\u6570\u5B57\u8868\u793A\u65B9\u5F0F\uFF1B<code>toFixed(digits)</code>\u4F1A\u6839\u636E\u5165\u53C2<code>digits</code>\u5BF9\u5C0F\u6570\u90E8\u5206\u8FDB\u884C\u56DB\u820D\u4E94\u5165\u6216\u8865\u51680\uFF1B\u4F46\u6CE8\u610F\u5982\u679C\u6570\u503C\u5927\u4E8E 1e+21\uFF0C\u8BE5\u65B9\u6CD5\u4F1A\u7B80\u5355\u8C03\u7528<code>Number.prototype.toString()</code>\u5E76\u8FD4\u56DE\u4E00\u4E2A\u6307\u6570\u8BB0\u6570\u6CD5\u683C\u5F0F\u7684\u5B57\u7B26\u4E32\u3002</p><p><code>toExponential(fractionDigits)</code>\u5C06\u6570\u5B57\u8F6C\u6362\u6210\u6307\u6570\u8868\u793A\u6CD5\u7684\u5B57\u7B26\u4E32\u5F62\u5F0F\uFF0C\u5176\u5BF9\u4E8E\u5C0F\u6570\u90E8\u5206\u7684\u5904\u7406\u548C<code>toFixed(digits)</code>\u7C7B\u4F3C\uFF0C\u4F1A\u8FDB\u884C\u56DB\u820D\u4E94\u5165\u548C\u8865\u51680\uFF0C\u5F62\u5982<code>&#39;2.500e+0&#39;</code></p><h2 id="\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898" aria-hidden="true">#</a> \u95EE\u9898</h2><p>\u7531\u4E8E\u4E8C\u8FDB\u5236\u4E2D\u7684\u6D6E\u70B9\u6570\u8868\u793A\u6CD5\u5E76\u4E0D\u80FD\u7CBE\u786E\u7684\u8868\u793A\u6BCF\u4E2A\u6570\uFF0C\u56E0\u6B64\u9700\u8981\u6CE8\u610F\u5728\u4E00\u4E9B\u60C5\u51B5\u4E0B<code>toFixed(digits)</code>\u548C<code>toExponential(fractionDigits)</code>\u7684\u56DB\u820D\u4E94\u5165\u662F\u4F1A\u6709\u95EE\u9898\u7684\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token number">2.55</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// &#39;2.5&#39;</span>
<span class="token number">2.55</span> <span class="token punctuation">.</span><span class="token function">toExponential</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// &#39;2.5e+0&#39; \u6CE8\u610F\u8FD9\u91CC\u7A7A\u5F00\u4E86\u4E00\u4F4D \u5728\u6CA1\u6709\u5C0F\u6570\u70B9\u548C\u6307\u6570\u65F6\uFF0C\u9694\u5F00\u4E00\u4F4D\u53EF\u4EE5\u907F\u514D\u70B9\u53F7\u88AB\u89E3\u91CA\u4E3A\u4E00\u4E2A\u5C0F\u6570\u70B9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,8);function s(t,c){return o}var p=e(a,[["render",s]]);export{p as default};
