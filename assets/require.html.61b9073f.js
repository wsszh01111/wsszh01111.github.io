import{r,o as l,c as p,a as n,d as e,F as b,e as u,b as a}from"./app.6a81c09a.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const o={},c=u(`<h1 id="require" tabindex="-1"><a class="header-anchor" href="#require" aria-hidden="true">#</a> require</h1><p><code>require</code>\u5728nodejs\u4E2D\u7528\u6765\u52A0\u8F7D\u6A21\u5757\uFF0C\u662Fnodejs\u4E2DCommonJs\u6A21\u5757\u4F53\u7CFB\u7684\u57FA\u7840</p><blockquote><p>require \u5E76\u4E0D\u662F\u5168\u5C40\u6027\u547D\u4EE4\uFF0C\u800C\u662F\u6BCF\u4E2A\u6A21\u5757\u63D0\u4F9B\u7684\u4E00\u4E2A\u5185\u90E8\u65B9\u6CD5\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u53EA\u6709\u5728\u6A21\u5757\u5185\u90E8\u624D\u80FD\u4F7F\u7528 require \u547D\u4EE4\uFF08\u552F\u4E00\u7684\u4F8B\u5916\u662F REPL \u73AF\u5883\uFF09</p></blockquote><h2 id="\u52A0\u8F7D\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#\u52A0\u8F7D\u673A\u5236" aria-hidden="true">#</a> \u52A0\u8F7D\u673A\u5236</h2><p>\u4ECE\u6E90\u7801\u5C42\u9762\u5C06\uFF0C\u6A21\u5757\u7684\u52A0\u8F7D\u5B9E\u8D28\u4E0A\u5C31\u662F\uFF0C\u6CE8\u5165exports\u3001require\u3001module\u4E09\u4E2A\u5168\u5C40\u53D8\u91CF\uFF0C\u7136\u540E\u6267\u884C\u6A21\u5757\u7684\u6E90\u7801\uFF0C\u7136\u540E\u5C06\u6A21\u5757\u7684 exports \u53D8\u91CF\u7684\u503C\u8F93\u51FA\u3002</p><p>\u7FFB\u8BD1\u81EAhttps://nodejs.org/api/modules.html#modules_all_together</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u5728\u76EE\u5F55Y\u4E0B\u7684\u6A21\u5757\u4E2D\u6267\u884Crequire(X)

1. \u5982\u679CX\u662F\u6838\u5FC3\u6A21\u5757,
   a. \u8FD4\u56DE\u6838\u5FC3\u6A21\u5757
   b. \u505C\u6B62
2. \u5982\u679CX\u4EE5&#39;/&#39;\u5F00\u59CB # \u5373\u8BA4\u4E3AX\u662F\u7EDD\u5BF9\u8DEF\u5F84
   a. \u5C06Y\u8BBE\u7F6E\u4E3A\u6587\u4EF6\u7CFB\u7EDF\u7684\u6839\u76EE\u5F55
3. \u5982\u679CX\u4EE5&#39;./&#39;\u3001&#39;/&#39;\u3001&#39;../&#39;\u5F00\u59CB
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
   c. \u629B\u51FA\u5F02\u5E38&quot;not found&quot;
4. \u5982\u679CX\u4EE5&#39;#&#39;\u5F00\u5934
   a. LOAD_PACKAGE_IMPORTS(X, dirname(Y))
5. LOAD_PACKAGE_SELF(X, dirname(Y))
6. LOAD_NODE_MODULES(X, dirname(Y))
7. \u629B\u51FA\u5F02\u5E38&quot;not found&quot;

# LOAD_AS_FILE\u51FD\u6570 \u8BA4\u4E3AX\u662F\u4E2A\u6587\u4EF6\u8DEF\u5F84\u8FDB\u884C\u52A0\u8F7D
LOAD_AS_FILE(X)
1. \u5982\u679CX\u662F\u4E2A\u6587\u4EF6\uFF0C\u6309\u7167X\u6587\u4EF6\u7684\u6587\u4EF6\u6269\u5C55\u540D\u8FDB\u884C\u52A0\u8F7D\u3002\u505C\u6B62
2. \u5982\u679CX.js\u662F\u4E2A\u6587\u4EF6\uFF0C\u5C06X.js\u4F5C\u4E3AJS\u811A\u672C\u52A0\u8F7D\u3002\u505C\u6B62
3. \u5982\u679CX.json\u662F\u4E2A\u6587\u4EF6\uFF0C\u5C06X.json\u89E3\u6790\u4E3A\u4E00\u4E2AJS\u5BF9\u8C61\u52A0\u8F7D\u3002\u505C\u6B62
4. \u5982\u679CX.node\u662F\u4E2A\u6587\u4EF6\uFF0C\u5C06X.node\u4F5C\u4E3A\u4E00\u4E2A\u4E8C\u8FDB\u5236\u63D2\u4EF6\u52A0\u8F7D\u3002\u505C\u6B62

# LOAD_INDEX\u51FD\u6570 \u52A0\u8F7DX\u76EE\u5F55\u4E0B\u7684index.js/index.json/index.node\u6587\u4EF6
LOAD_INDEX(X)
1. \u5982\u679CX/index.js\u662F\u6587\u4EF6\uFF0C\u5C06X/index.js\u4F5C\u4E3AJS\u811A\u672C\u52A0\u8F7D\u3002\u505C\u6B62
2. \u5982\u679CX/index.json\u662F\u4E2A\u6587\u4EF6\uFF0C\u5C06X/index.json\u89E3\u6790\u4E3A\u4E00\u4E2AJS\u5BF9\u8C61\u52A0\u8F7D\u3002\u505C\u6B62
3. \u5982\u679CX/index.node\u662F\u4E2A\u6587\u4EF6\uFF0C\u5C06X/index.node\u4F5C\u4E3A\u4E00\u4E2A\u4E8C\u8FDB\u5236\u63D2\u4EF6\u52A0\u8F7D\u3002\u505C\u6B62

# LOAD_AS_DIRECTORY\u51FD\u6570 \u8BA4\u4E3AX\u662F\u4E2A\u76EE\u5F55\u8DEF\u5F84\u8FDB\u884C\u52A0\u8F7D
LOAD_AS_DIRECTORY(X)
1. \u5982\u679CX/package.json\u662F\u4E2A\u6587\u4EF6,
   a. \u89E3\u6790X/package.json\u6587\u4EF6\uFF0C\u8BFB\u53D6main\u5B57\u6BB5
   b. \u5982\u679Cmain\u5B57\u6BB5\u503C\u4E3Afalsy\uFF0C\u524D\u5F80\u7B2C\u4E8C\u6B65
   c. let M = X + main\u5B57\u6BB5\u503C
   d. LOAD_AS_FILE(M)
   e. LOAD_INDEX(M)
   f. LOAD_INDEX(X) \u4E0D\u5EFA\u8BAE
   g. \u629B\u51FA\u5F02\u5E38&quot;not found&quot;
2. LOAD_INDEX(X)

# LOAD_NODE_MODULES\u51FD\u6570 \u8BA4\u4E3AX\u6307\u5411\u662F\u7684\u4E2ANODE\u6A21\u5757\uFF0C\u52A0\u8F7D\u8BE5\u6A21\u5757
LOAD_NODE_MODULES(X, START)
1. let DIRS = NODE_MODULES_PATHS(START)
2. \u904D\u5386DIRS\uFF0C\u6BCF\u4E2A\u503C\u4E3ADIR:
   a. LOAD_PACKAGE_EXPORTS(X, DIR)
   b. LOAD_AS_FILE(DIR/X)
   c. LOAD_AS_DIRECTORY(DIR/X)

# \u5904\u7406\u6A21\u5757\u8DEF\u5F84
NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = [GLOBAL_FOLDERS]
4. while I &gt;= 0,
   a. if PARTS[I] = &quot;node_modules&quot; CONTINUE
   b. DIR = path join(PARTS[0 .. I] + &quot;node_modules&quot;)
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS

# \u52A0\u8F7Dimports\u5305
LOAD_PACKAGE_IMPORTS(X, DIR)
1. \u627E\u5230DIR\u7684\u7236\u76EE\u5F55SCOPE
2. \u6CA1\u6709\u7236\u76EE\u5F55\uFF0C\u8FD4\u56DE
3. \u5982\u679CSCOPE/package.json\u4E2D\u7684imports\u5B57\u6BB5\u662Fnull\u6216\u8005undefined\uFF0C\u8FD4\u56DE
4. let MATCH = PACKAGE_IMPORTS_RESOLVE(X, pathToFileURL(SCOPE),
  [&quot;node&quot;, &quot;require&quot;]) defined in the ESM resolver.
5. RESOLVE_ESM_MATCH(MATCH).

# \u52A0\u8F7Dexports\u5305
LOAD_PACKAGE_EXPORTS(X, DIR)
1. \u5C1D\u8BD5\u5C06X\u5206\u89E3\u6210\u4E3ANAME\u548CSUBPATH\u4E24\u90E8\u5206\uFF0C\u5176\u4E2DNAME\u5E94\u8BE5\u6709\u4E2A@scope/\u524D\u7F00\uFF0CSUBPATH\u4EE5/\u5F00\u5934
2. \u5982\u679CX\u5206\u89E3\u5931\u8D25\uFF0C\u6216\u8005DIR/NAME/package.json\u4E0D\u662F\u4E2A\u6587\u4EF6\uFF0C\u76F4\u63A5\u8FD4\u56DE
3. \u89E3\u6790DIR/NAME/package.json\u6587\u4EF6\uFF0C\u67E5\u627Eexports\u5B57\u6BB5
4. \u5982\u679Cexports\u5B57\u6BB5\u662Fnull\u6216\u8005undefined\uFF0C\u76F4\u63A5\u8FD4\u56DE
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(DIR/NAME), &quot;.&quot; + SUBPATH,
   \`package.json\` &quot;exports&quot;, [&quot;node&quot;, &quot;require&quot;]) defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

# \u52A0\u8F7D\u5305
LOAD_PACKAGE_SELF(X, DIR)
1. \u627E\u5230DIR\u7684\u7236\u76EE\u5F55SCOPE
2. \u6CA1\u6709\u7236\u76EE\u5F55\uFF0C\u8FD4\u56DE
3. \u5982\u679CSCOPE/package.json\u4E2D\u7684exports\u5B57\u6BB5\u662Fnull\u6216\u8005undefined\uFF0C\u8FD4\u56DE
4. \u5982\u679CX\u4E0D\u662F\u4EE5SCOPE/package.json\u7684name\u5B57\u6BB5\u503C\u4F5C\u4E3A\u5F00\u5934\uFF0C\u8FD4\u56DE
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(SCOPE),
   &quot;.&quot; + X.slice(&quot;name&quot;.length), \`package.json\` &quot;exports&quot;, [&quot;node&quot;, &quot;require&quot;])
   defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

# \u89E3\u6790ESM\u5339\u914D
RESOLVE_ESM_MATCH(MATCH)
1. let { RESOLVED, EXACT } = MATCH
2. let RESOLVED_PATH = fileURLToPath(RESOLVED)
3. EXACT\u662Ftrue
   a. \u5982\u679CRESOLVED_PATH\u6307\u5411\u7684\u6587\u4EF6\u5B58\u5728\uFF0C\u6839\u636E\u6587\u4EF6\u6269\u5C55\u540D\u6309\u7C7B\u52A0\u8F7D\u3002\u505C\u6B62
4. EXACT\u662Ffalse
   a. LOAD_AS_FILE(RESOLVED_PATH)
   b. LOAD_AS_DIRECTORY(RESOLVED_PATH)
5. \u629B\u51FA\u5F02\u5E38&quot;not found&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br></div></div><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,8),t={href:"http://www.ruanyifeng.com/blog/2015/05/require.html",target:"_blank",rel:"noopener noreferrer"},m=a("require() \u6E90\u7801\u89E3\u8BFB | \u962E\u4E00\u5CF0"),_={href:"https://nodejs.org/api/modules.html#modules_all_together",target:"_blank",rel:"noopener noreferrer"},E=a("modules | node Docs");function d(A,S){const s=r("ExternalLinkIcon");return l(),p(b,null,[c,n("ol",null,[n("li",null,[n("a",t,[m,e(s)])]),n("li",null,[n("a",_,[E,e(s)])])])],64)}var R=i(o,[["render",d]]);export{R as default};
