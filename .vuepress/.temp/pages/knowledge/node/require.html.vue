<template><h1 id="require" tabindex="-1"><a class="header-anchor" href="#require" aria-hidden="true">#</a> require</h1>
<p><code>require</code>在nodejs中用来加载模块，是nodejs中CommonJs模块体系的基础</p>
<blockquote>
<p>require 并不是全局性命令，而是每个模块提供的一个内部方法，也就是说，只有在模块内部才能使用 require 命令（唯一的例外是 REPL 环境）</p>
</blockquote>
<h2 id="加载机制" tabindex="-1"><a class="header-anchor" href="#加载机制" aria-hidden="true">#</a> 加载机制</h2>
<p>从源码层面将，模块的加载实质上就是，注入exports、require、module三个全局变量，然后执行模块的源码，然后将模块的 exports 变量的值输出。</p>
<p>翻译自https://nodejs.org/api/modules.html#modules_all_together</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>在目录Y下的模块中执行require(X)

1. 如果X是核心模块,
   a. 返回核心模块
   b. 停止
2. 如果X以'/'开始 # 即认为X是绝对路径
   a. 将Y设置为文件系统的根目录
3. 如果X以'./'、'/'、'../'开始
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
   c. 抛出异常"not found"
4. 如果X以'#'开头
   a. LOAD_PACKAGE_IMPORTS(X, dirname(Y))
5. LOAD_PACKAGE_SELF(X, dirname(Y))
6. LOAD_NODE_MODULES(X, dirname(Y))
7. 抛出异常"not found"

# LOAD_AS_FILE函数 认为X是个文件路径进行加载
LOAD_AS_FILE(X)
1. 如果X是个文件，按照X文件的文件扩展名进行加载。停止
2. 如果X.js是个文件，将X.js作为JS脚本加载。停止
3. 如果X.json是个文件，将X.json解析为一个JS对象加载。停止
4. 如果X.node是个文件，将X.node作为一个二进制插件加载。停止

# LOAD_INDEX函数 加载X目录下的index.js/index.json/index.node文件
LOAD_INDEX(X)
1. 如果X/index.js是文件，将X/index.js作为JS脚本加载。停止
2. 如果X/index.json是个文件，将X/index.json解析为一个JS对象加载。停止
3. 如果X/index.node是个文件，将X/index.node作为一个二进制插件加载。停止

# LOAD_AS_DIRECTORY函数 认为X是个目录路径进行加载
LOAD_AS_DIRECTORY(X)
1. 如果X/package.json是个文件,
   a. 解析X/package.json文件，读取main字段
   b. 如果main字段值为falsy，前往第二步
   c. let M = X + main字段值
   d. LOAD_AS_FILE(M)
   e. LOAD_INDEX(M)
   f. LOAD_INDEX(X) 不建议
   g. 抛出异常"not found"
2. LOAD_INDEX(X)

# LOAD_NODE_MODULES函数 认为X指向是的个NODE模块，加载该模块
LOAD_NODE_MODULES(X, START)
1. let DIRS = NODE_MODULES_PATHS(START)
2. 遍历DIRS，每个值为DIR:
   a. LOAD_PACKAGE_EXPORTS(X, DIR)
   b. LOAD_AS_FILE(DIR/X)
   c. LOAD_AS_DIRECTORY(DIR/X)

# 处理模块路径
NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = [GLOBAL_FOLDERS]
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS

# 加载imports包
LOAD_PACKAGE_IMPORTS(X, DIR)
1. 找到DIR的父目录SCOPE
2. 没有父目录，返回
3. 如果SCOPE/package.json中的imports字段是null或者undefined，返回
4. let MATCH = PACKAGE_IMPORTS_RESOLVE(X, pathToFileURL(SCOPE),
  ["node", "require"]) defined in the ESM resolver.
5. RESOLVE_ESM_MATCH(MATCH).

# 加载exports包
LOAD_PACKAGE_EXPORTS(X, DIR)
1. 尝试将X分解成为NAME和SUBPATH两部分，其中NAME应该有个@scope/前缀，SUBPATH以/开头
2. 如果X分解失败，或者DIR/NAME/package.json不是个文件，直接返回
3. 解析DIR/NAME/package.json文件，查找exports字段
4. 如果exports字段是null或者undefined，直接返回
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(DIR/NAME), "." + SUBPATH,
   `package.json` "exports", ["node", "require"]) defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

# 加载包
LOAD_PACKAGE_SELF(X, DIR)
1. 找到DIR的父目录SCOPE
2. 没有父目录，返回
3. 如果SCOPE/package.json中的exports字段是null或者undefined，返回
4. 如果X不是以SCOPE/package.json的name字段值作为开头，返回
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(SCOPE),
   "." + X.slice("name".length), `package.json` "exports", ["node", "require"])
   defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

# 解析ESM匹配
RESOLVE_ESM_MATCH(MATCH)
1. let { RESOLVED, EXACT } = MATCH
2. let RESOLVED_PATH = fileURLToPath(RESOLVED)
3. EXACT是true
   a. 如果RESOLVED_PATH指向的文件存在，根据文件扩展名按类加载。停止
4. EXACT是false
   a. LOAD_AS_FILE(RESOLVED_PATH)
   b. LOAD_AS_DIRECTORY(RESOLVED_PATH)
5. 抛出异常"not found"
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ol>
<li><a href="http://www.ruanyifeng.com/blog/2015/05/require.html" target="_blank" rel="noopener noreferrer">require() 源码解读 | 阮一峰<ExternalLinkIcon/></a></li>
<li><a href="https://nodejs.org/api/modules.html#modules_all_together" target="_blank" rel="noopener noreferrer">modules | node Docs<ExternalLinkIcon/></a></li>
</ol>
</template>
