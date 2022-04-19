import{r as n,o as s,c,a as e,d as i,F as d,e as r,b as l}from"./app.6a81c09a.js";import{_ as o}from"./plugin-vue_export-helper.21dcd24c.js";const p={},t=r(`<h1 id="npx" tabindex="-1"><a class="header-anchor" href="#npx" aria-hidden="true">#</a> npx</h1><p>npx\u547D\u4EE4\u7684\u6838\u5FC3\u76EE\u7684\uFF0C\u662F\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u8C03\u7528\u4E00\u4E9B\u9879\u76EE\u4E2D\u5B89\u88C5\u7684\u6A21\u5757\u6240\u63D0\u4F9B\u7684\u53EF\u6267\u884C\u547D\u4EE4\uFF0C\u4E4B\u524D\u53EF\u6267\u884C\u547D\u4EE4\u53EA\u80FD\u901A\u8FC7\u914D\u7F6E\u5728<em>npm scripts</em>\u4E2D\u6267\u884C\uFF0C\u56E0\u4E3A\u53EF\u6267\u884C\u547D\u4EE4\u5904\u5728\u547D\u4EE4\u6267\u884C\u76EE\u5F55\u7684<em>node_modules/.bin</em>\u4E0B\uFF0C<em>npm scripts</em>\u4F1A\u81EA\u52A8\u5C06\u547D\u4EE4\u6267\u884C\u76EE\u5F55\u7684<em>node_modules/.bin</em>\u52A0\u5165\u65B0\u5EFAshell\u73AF\u5883\u7684<em>PATH</em>\u53D8\u91CF\u4E2D\uFF0C\u6240\u4EE5\u5982\u679C\u6CA1\u6709npx\u76F4\u63A5\u6267\u884C\uFF0C\u9700\u8981\u901A\u8FC7\u7C7B\u4F3C<code>node-modules/.bin/mocha --version</code>\u7684\u65B9\u5F0F\u6267\u884C\u3002</p><h2 id="\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#\u539F\u7406" aria-hidden="true">#</a> \u539F\u7406</h2><p>\u800Cnpx\u7684\u539F\u7406\u4E5F\u5F88\u7B80\u5355\uFF0C\u5C31\u662F\u8FD0\u884C\u7684\u65F6\u5019\uFF0C\u4F1A\u5230<code>node_modules/.bin</code>\u8DEF\u5F84\u548C\u73AF\u5883\u53D8\u91CF*$PATH<em>\u91CC\u9762\uFF0C\u68C0\u67E5\u547D\u4EE4\u662F\u5426\u5B58\u5728\u3002\u7531\u4E8E npx \u4F1A\u68C0\u67E5\u73AF\u5883\u53D8\u91CF</em>$PATH*\uFF0C\u6240\u4EE5\u7CFB\u7EDF\u547D\u4EE4\u4E5F\u53EF\u4EE5\u8C03\u7528\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>npx <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>\u6CE8\u610F\uFF0Cbash\u5185\u7F6E\u7684\u547D\u4EE4\u4E0D\u5728*$PATH<em>\u91CC\u9762\uFF0C\u6240\u4EE5\u4E0D\u80FD\u7528\u3002\u6BD4\u5982\uFF0C<em>cd</em>\u662Fbash\u547D\u4EE4\uFF0C\u56E0\u6B64\u5C31\u4E0D\u80FD\u7528</em>npx cd*\u3002</p></blockquote><h2 id="\u8FDC\u7A0B\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#\u8FDC\u7A0B\u6A21\u5757" aria-hidden="true">#</a> \u8FDC\u7A0B\u6A21\u5757</h2><p>npx\u8FD8\u53EF\u4EE5\u62C9\u53D6\u8FDC\u7A0B\u6A21\u5757\u76F4\u63A5\u6267\u884C\uFF0C\u501F\u52A9\u6B64\u7279\u6027\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u4E00\u4E9B\u529F\u80FD</p><h3 id="\u6267\u884Cgithub\u6E90\u7801" tabindex="-1"><a class="header-anchor" href="#\u6267\u884Cgithub\u6E90\u7801" aria-hidden="true">#</a> \u6267\u884CGitHub\u6E90\u7801</h3><p>npx\u8FD8\u53EF\u4EE5\u6267\u884CGitHub\u4E0A\u9762\u7684\u6A21\u5757\u6E90\u7801</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6267\u884C Gist \u4EE3\u7801</span>
$ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32

<span class="token comment"># \u6267\u884C\u4ED3\u5E93\u4EE3\u7801</span>
$ npx github:piuccio/cowsay hello
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><blockquote><p>\u6CE8\u610F\uFF0C\u8FDC\u7A0B\u4EE3\u7801\u5FC5\u987B\u662F\u4E00\u4E2A\u6A21\u5757\uFF0C\u5373\u5FC5\u987B\u5305\u542B<code>package.json</code>\u548C\u5165\u53E3\u811A\u672C\u3002</p></blockquote><h3 id="\u907F\u514D\u5168\u5C40\u5B89\u88C5\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#\u907F\u514D\u5168\u5C40\u5B89\u88C5\u6A21\u5757" aria-hidden="true">#</a> \u907F\u514D\u5168\u5C40\u5B89\u88C5\u6A21\u5757</h3><p>\u901A\u5E38\u6709\u4E9B\u9700\u8981\u5168\u5C40\u5B89\u88C5\u4F46\u4E0D\u5E38\u7528\u7684\u5DE5\u5177\uFF0Cnpx\u4F1A\u5C06\u5176\u4E0B\u8F7D\u5230\u4E34\u65F6\u76EE\u5F55\uFF0C\u6267\u884C\u5B8C\u540E\u518D\u6E05\u7406\uFF1B\u5728\u4E0B\u8F7D\u7684\u540C\u65F6\u8FD8\u652F\u6301\u6307\u5B9A\u811A\u672C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ npx uglify-js@3.1.0 main.js -o ./dist/main.js
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="no-install" tabindex="-1"><a class="header-anchor" href="#no-install" aria-hidden="true">#</a> --no-install</h4><p><em>--no-install</em>\u53EF\u4EE5\u5F3A\u5236\u4F7F\u7528\u672C\u5730\u6A21\u5757\uFF0C\u4E0D\u4E0B\u8F7D\u6A21\u5757\uFF0C\u6CA1\u6709\u672C\u5730\u6A21\u5757\u65F6\u4F1A\u62A5\u9519</p><h4 id="ignore-existing" tabindex="-1"><a class="header-anchor" href="#ignore-existing" aria-hidden="true">#</a> --ignore-existing</h4><p><em>--ignore-existing</em>\u53EF\u4EE5\u5F3A\u5236\u4F7F\u7528\u8FDC\u7A0B\u6A21\u5757\uFF0C\u4E0D\u4F7F\u7528\u672C\u5730\u6A21\u5757</p><h4 id="p" tabindex="-1"><a class="header-anchor" href="#p" aria-hidden="true">#</a> -p</h4><p><em>-p</em>\u53C2\u6570\u7528\u4E8E\u6307\u5B9A npx \u6240\u8981\u5B89\u88C5\u7684\u6A21\u5757</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ npx -p node@0.12.8 <span class="token function">node</span> -v 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="c" tabindex="-1"><a class="header-anchor" href="#c" aria-hidden="true">#</a> -c</h4><p>\u5982\u679Cnpx\u5B89\u88C5\u591A\u4E2A\u6A21\u5757\uFF0C\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u6240\u6267\u884C\u7684\u547D\u4EE4\u4E4B\u4E2D\uFF0C\u53EA\u6709\u7B2C\u4E00\u4E2A\u53EF\u6267\u884C\u9879\u4F1A\u4F7F\u7528npx\u5B89\u88C5\u7684\u6A21\u5757\uFF0C\u540E\u9762\u7684\u53EF\u6267\u884C\u9879\u8FD8\u662F\u4F1A\u4EA4\u7ED9shell\u89E3\u91CA\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ npx -p lolcatjs -p cowsay <span class="token string">&#39;cowsay hello | lolcatjs&#39;</span>
<span class="token comment"># \u62A5\u9519</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C<code>cowsay hello | lolcatjs</code>\u6267\u884C\u65F6\u4F1A\u62A5\u9519\uFF0C\u539F\u56E0\u662F\u7B2C\u4E00\u9879<code>cowsay</code>\u7531 npx \u89E3\u91CA\uFF0C\u800C\u7B2C\u4E8C\u9879\u547D\u4EE4<code>localcatjs</code>\u7531 Shell \u89E3\u91CA\uFF0C\u4F46\u662F<code>lolcatjs</code>\u5E76\u6CA1\u6709\u5168\u5C40\u5B89\u88C5\uFF0C\u6240\u4EE5\u62A5\u9519\u3002</p><p><code>-c</code>\u53C2\u6570\u53EF\u4EE5\u5C06\u6240\u6709\u547D\u4EE4\u90FD\u7528 npx \u89E3\u91CA\u3002\u6709\u4E86\u5B83\uFF0C\u4E0B\u9762\u4EE3\u7801\u5C31\u53EF\u4EE5\u6B63\u5E38\u6267\u884C\u4E86\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ npx -p lolcatjs -p cowsay -c <span class="token string">&#39;cowsay hello | lolcatjs&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>-c</code>\u53C2\u6570\u7684\u53E6\u4E00\u4E2A\u4F5C\u7528\uFF0C\u662F\u5C06\u73AF\u5883\u53D8\u91CF\u5E26\u5165\u6240\u8981\u6267\u884C\u7684\u547D\u4EE4\u3002\u4E3E\u4F8B\u6765\u8BF4\uFF0Cnpm \u63D0\u4F9B\u5F53\u524D\u9879\u76EE\u7684\u4E00\u4E9B\u73AF\u5883\u53D8\u91CF\uFF0C\u53EF\u4EE5\u7528\u4E0B\u9762\u7684\u547D\u4EE4\u67E5\u770B\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">npm</span> run <span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span> npm_
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>-c</code>\u53C2\u6570\u53EF\u4EE5\u628A\u8FD9\u4E9B npm \u7684\u73AF\u5883\u53D8\u91CF\u5E26\u5165 npx \u547D\u4EE4\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ npx -c <span class="token string">&#39;echo &quot;$npm_package_name&quot;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u4E0A\u9762\u4EE3\u7801\u4F1A\u8F93\u51FA\u5F53\u524D\u9879\u76EE\u7684\u9879\u76EE\u540D\u3002</p><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u603B\u7684\u6765\u8BF4\uFF0Cnpx\u5C31\u662F\u4E00\u4E2Anpm\u547D\u4EE4\u6267\u884C\u63D0\u6548\u5DE5\u5177\uFF0C\u6574\u4F53\u7684\u65B9\u5F0F\u7C7B\u4F3C<code>npm scripts</code>\uFF0C\u63D0\u4F9B\u66F4\u4E30\u5BCC\u7684\u547D\u4EE4\u4F4D\u7F6E\u8303\u56F4\uFF08\u4E3B\u8981\u662F\u4E3A\u4E86\u80FD\u6267\u884C<em>node_modules/.bin</em>\u4E0B\u7684\u547D\u4EE4\u811A\u672C\uFF09\u4EE5\u53CA\u8FDC\u7A0B\u6A21\u5757\u62C9\u53D6\u6267\u884C\u80FD\u529B</p><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,36),h={href:"http://www.ruanyifeng.com/blog/2019/02/npx.html",target:"_blank",rel:"noopener noreferrer"},m=l("npx \u4F7F\u7528\u6559\u7A0B | \u962E\u4E00\u5CF0");function u(b,x){const a=n("ExternalLinkIcon");return s(),c(d,null,[t,e("ol",null,[e("li",null,[e("a",h,[m,i(a)])])])],64)}var f=o(p,[["render",u]]);export{f as default};
