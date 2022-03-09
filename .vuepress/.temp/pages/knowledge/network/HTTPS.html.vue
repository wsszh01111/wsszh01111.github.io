<template><h1 id="https" tabindex="-1"><a class="header-anchor" href="#https" aria-hidden="true">#</a> HTTPS</h1>
<p>HTTP是使用明文传播的，这样势必会造成安全问题。因此就有了HTTPS，HTTPS的全称就是Hyper Text Transfer Protocol over SecureSocket Layer，是将HTTP的内容通过TLS/SSL协议加密后再进行传输，也就是在原有的应用层（HTTP）和传输层（TCP）之间加入了加密/解密层，常说HTTPS使用443端口，其实也是TLS/SSL是在443端口上建立的链接</p>
<h2 id="tls-ssl是如何基于非对称加密做到安全的" tabindex="-1"><a class="header-anchor" href="#tls-ssl是如何基于非对称加密做到安全的" aria-hidden="true">#</a> TLS/SSL是如何基于非对称加密做到安全的</h2>
<blockquote>
<p>一个前提假设就是所有网络传输都是不安全的，所有传输信息黑客都可以拦截到。就像无线电信息每个有设备的人都可以接收到，但是没办法进行解密</p>
</blockquote>
<h3 id="非对称加密是什么" tabindex="-1"><a class="header-anchor" href="#非对称加密是什么" aria-hidden="true">#</a> 非对称加密是什么</h3>
<p>非对称加密，是相对于对称加密而言的。对称加密，就是说信息是由同一个秘钥进行加密解密的。对称加密是一种历史非常久远的加密方式，在以前使用对称加密的历史中，秘钥都是通过别的方式进行传递的（比如战争时的秘钥员、密码本之类的）。但在互联网时代，任何信息的传递都是通过互联网进行的（不可能将数据传递给别人后，再以别的方式将秘钥传递给别人，这样就没有意义了），这样就存在秘钥和被加密信息同时被黑客截获的可能性，因此对称加密并不适用于互联网加密。</p>
<p>非对称加密，则有一对秘钥对，即公钥与私钥，并且由公钥推导出私钥应该是不可能的（或者很难），因此公钥可以随意分发，私钥要严格保密，由公钥加密的数据只能由私钥解密，由私钥加密的数据只能由公钥解密，这个特性也就是非对称加密的核心特性了，至于非对称加密的更多内部细节、数学基础等等，就不过多涉猎了</p>
<p>非对称加密在实际运用时主要为两大功能提供了支持：<strong>数据安全传递</strong>与<strong>数字签名</strong>，TLS/SSL也在协议执行的不同阶段用到了这两大功能。可以说TLS/SSL的理论基础就是非对称加密，没有非对称加密也就不会有TLS/SSL</p>
<h4 id="数据安全传递" tabindex="-1"><a class="header-anchor" href="#数据安全传递" aria-hidden="true">#</a> 数据安全传递</h4>
<p>数据安全传递比较好理解，当A希望向B传递信息时，B生成一对秘钥对BPublicKey和BPrivateKey，B可以随意将BPublicKey传给A，即使被黑客截取了也无妨，A使用BPublicKey将信息加密，之后再传递给B，此时基于<strong>由公钥加密的数据只能由私钥解密</strong>，即使加密数据被黑客拦截，由于黑客没有BPrivateKey，黑客也无法破解加密数据</p>
<h4 id="数字签名" tabindex="-1"><a class="header-anchor" href="#数字签名" aria-hidden="true">#</a> 数字签名</h4>
<p>基于开头的<strong>所有网络传输都是不安全的</strong>这一前提假设，在上面<strong>数据安全传递</strong>的例子中，忽略了一个重要问题，在<em>B可以随意将BPublicKey传给A</em>这一过程中，传递的BPublicKey也是可能被黑客篡改为假的BPublicKey'，所以如果这一步出了问题，那后续A使用了假的BPublicKey’加密了数据，黑客自然有假的BPublicKey’对应的私钥BPrivateKey’，自然可以解密数据。因此，A需要验证接收到的BPublicKey，确实是真实的由B给出的BPublicKey，这就涉及到非对称加密提供的另一大功能：数字签名</p>
<p>假设A需要验证由B给出的信息，数字签名的大致过程如下：</p>
<ol>
<li>B对需要传递的数据进行hash运算形成摘要（Digest）</li>
<li>B用私钥BPrivateKey对摘要进行加密得到签名（Signature）</li>
<li>同时传递数据和签名</li>
<li>A接受到之后，使用BPublicKey，对签名进行解密得到摘要1，摘要是由hash算法实现的，A再自己对数据执行一遍hash算法得到摘要2，如果摘要1===摘要2，则说明数据确实是B给的。</li>
</ol>
<p>按照上述几个步骤，如果B传给A的信息中被人进行了篡改，由于B的私钥BPrivateKey只有B有，篡改之后形成的新的签名是无法被BPublicKey解密的，因此可以断定数据信息被篡改了</p>
<h3 id="数据安全传递和数字签名的一些问题" tabindex="-1"><a class="header-anchor" href="#数据安全传递和数字签名的一些问题" aria-hidden="true">#</a> 数据安全传递和数字签名的一些问题</h3>
<p>虽然由非对称加密提供理论基础的<strong>数据安全传递</strong>和<strong>数字签名</strong>是可靠的，但放到实际应用中，还是有一些问题需要解决：</p>
<ol>
<li>由上述解释过程可以看出，数字签名具有验证发送人的特性，但没有加密的特性，而数据安全传递的过程基于可以做到的，因此一拍即合，实际应用上需要综合两者的优势，形成的一套比较安全的信息传递机制</li>
<li>在<em>A使用BPublicKey将信息加密，之后再传递给B</em>这一过程，要传递的数据也可以遭到拦截和篡改。B也需要验证接受到的信息确实是由A经过加密后给出的，这就要求B也需要有A的公钥APublicKey，去验证加密信息真的是由A传递的</li>
<li>再想的彻底点，在数字签名验证过程中，首次进行公钥传输的时候也需要验证，此时传输的数据中必然有公钥，则如果黑客将所有传输的摘要、签名、公钥全部拦截篡改，数字签名在事实上也无法起2到验证的作用了</li>
<li>非对称加密的性能不佳，如果直接使用非对称加密对报文内容进行加密，碰到大数据量的报文时会遇到性能问题</li>
</ol>
<h3 id="tls-ssl简单模型" tabindex="-1"><a class="header-anchor" href="#tls-ssl简单模型" aria-hidden="true">#</a> TLS/SSL简单模型</h3>
<p>实际的TLS/SSL是十分复杂的，其中涉及到了如根证书、证书信任链、中介证书（intermediate-certificate）等更为细节的知识，为了先理解TLS/SSL的核心，先描述一个比较简单的过程</p>
<blockquote>
<p>证书认证机构（Certificate Authority，CA）：CA是整个公钥基础设施的核心，它为每个使用公开密钥的用户发放一个数字证书，数字证书的作用是为了证明证书中的用户是证书中公有秘钥的合法拥有者。在现实中，浏览器通过校验服务器给出的由CA认证的证书来判断收到的公钥是否被篡改过。目前证书的格式和验证方法普遍遵循<a href="https://zh.wikipedia.org/wiki/X.509" target="_blank" rel="noopener noreferrer">X.509<ExternalLinkIcon/></a>国际标准</p>
</blockquote>
<h4 id="_1-服务器获得证书" tabindex="-1"><a class="header-anchor" href="#_1-服务器获得证书" aria-hidden="true">#</a> 1. 服务器获得证书</h4>
<p>证书申请者会向CA发出一个CSR（证书签署请求，certificate signing request）用来申请<a href="https://zh.wikipedia.org/wiki/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E8%AE%A4%E8%AF%81" target="_blank" rel="noopener noreferrer">公开密钥证书<ExternalLinkIcon/></a>，CSR中一般包括了公钥、域名等信息，CSR最常用格式是<a href="https://zh.wikipedia.org/wiki/PKCS" target="_blank" rel="noopener noreferrer">PKCS#10<ExternalLinkIcon/></a>。CA收到这些信息之后，将独立对信息进行审查，审查通过之后CA将使用自己的私钥为申请者颁发一个<a href="https://zh.wikipedia.org/wiki/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E8%AE%A4%E8%AF%81" target="_blank" rel="noopener noreferrer">公开密钥证书<ExternalLinkIcon/></a>。因此，从技术角度看，颁发证书的过程实际上就是<strong>CA用自己的私钥将申请者的公钥和其他一些信息加密，证书就是加密结果</strong></p>
<blockquote>
<p>怎么验证申请证书的过程中信息没有被篡改？还是需要实践实践</p>
</blockquote>
<h4 id="_2-浏览器请求服务器证书" tabindex="-1"><a class="header-anchor" href="#_2-浏览器请求服务器证书" aria-hidden="true">#</a> 2. 浏览器请求服务器证书</h4>
<p>浏览器向服务器请求其证书，服务器返回证书，证书实际是由CA的私钥加密的，因此如果篡改，浏览器使用CA的公钥解密时就会解密失败，篡改就会被发现，这里就是用到了数字签名的功能。那浏览器本身又是如何获得CA的公钥的呢？解决方式简单粗暴，各大CA的公钥都是集成在操作系统中的，也就是不需要进行网络传输，避免了<em>上面一些问题中的第三点</em>。获得证书之后，浏览器进行CA公钥进行解密，获得了服务器的公钥，此时获得的公钥，就可以认为是真实的服务器公钥（对证书本身、对操作系统中的CA公钥攻击的方式应该也是有的，只是成本很高概率很低罢了）</p>
<h4 id="_3-浏览器传递会话秘钥" tabindex="-1"><a class="header-anchor" href="#_3-浏览器传递会话秘钥" aria-hidden="true">#</a> 3. 浏览器传递会话秘钥</h4>
<p><em>上面一些问题中的第四点</em>中提到，非对称加密的性能不佳，因此不直接加密数据，而是加密会话秘钥。所谓会话秘钥，也就是一个对称加密中的秘钥，对称加密的性能相比非对称加密更好。浏览器将会话秘钥通过服务器公钥进行加密并传递，服务器接收到之后使用自己的私钥进行解密，则也获得了会话秘钥。</p>
<blockquote>
<p>如何判断浏览器发送的会话秘钥没有被篡改？</p>
</blockquote>
<h4 id="_4-进行正常信息传递" tabindex="-1"><a class="header-anchor" href="#_4-进行正常信息传递" aria-hidden="true">#</a> 4. 进行正常信息传递</h4>
<p>服务器和浏览器之间都有了会话秘钥，它们之间的信息即可通过会话秘钥加密</p>
<h3 id="证书信任链" tabindex="-1"><a class="header-anchor" href="#证书信任链" aria-hidden="true">#</a> 证书信任链</h3>
<blockquote>
<p>为什么要证书信任链：要保护CA的私钥</p>
</blockquote>
<h1 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h1>
<ol>
<li><a href="https://www.bilibili.com/video/BV1Sg411A79a?p=4" target="_blank" rel="noopener noreferrer">【一听就懂】https协议原理<ExternalLinkIcon/></a></li>
<li><a href="https://zh.wikipedia.org/wiki/%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84" target="_blank" rel="noopener noreferrer">证书颁发机构<ExternalLinkIcon/></a></li>
<li>浏览器如何验证HTTPS证书的合法性？ - 知乎 https://www.zhihu.com/question/37370216</li>
</ol>
</template>
