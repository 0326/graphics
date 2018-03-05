require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({9:[function(require,module,exports) {

},{}],13:[function(require,module,exports) {
module.exports=`<h1 id="gpu-cg-">GPU编程与CG语言</h1>
<p>Programmable Graphics Processing Unit(GPU)：即可编程图形处理单元，通常也称之为可编程图形硬件。</p>
<h2 id="gpu-vs-cpu">GPU VS CPU</h2>
<p>由于 GPU 具有高并行结构(highly parallel structure)，所以 GPU 在处理图形数据和复杂算法方面拥有比 CPU 更高的效率。GPU采取流式并行计算，流内元素计算不依赖其他同类型数据。但是如果运算依赖数据相关，则使用CPU更合适。</p>
<p>CPU不存在真正意义的并行，参考时间片轮询。而GPU具有多个处理器核可并行处理。</p>
<h2 id="gpu-">GPU图形绘制管线</h2>
<p>图形绘制管线三个阶段：</p>
<h3 id="-">应用程序阶段</h3>
<p>使用高级编程语言开发阶段，几何体数据通过数据总线传送到图形硬件。</p>
<h4 id="-">几何阶段</h4>
<p>主要负责顶点变换和光照计算（顶点坐标变换、光照、裁剪、投影、屏幕映射等计算），最终得到变换和投影后的顶点坐标、颜色、纹理坐标等。</p>
<p>顶点坐标变换流程：</p>
<p><em>1: Object space =&gt; World space</em></p>
<p>三维模型建模时会得到object space coordinate数据，用来描述模型本身，该过程就是将模型坐标空间转为世界坐标系空间，使模型有一个固定的原点进行参考来确定其位置。模型相对于坐标原点的位置就是word space coordinate。</p>
<p>该过程的变换由一个四阶矩阵控制，俗称world matrix。</p>
<p><em>2: World space =&gt; Eye space</em></p>
<p>每个人都是从各自的视点出发观察这个世界，无论是主观世界还是客观世 界。同样，在计算机中每次只能从唯一的视角出发渲染物体。在游戏中，都会提 供视点漫游的功能，屏幕显示的内容随着视点的变化而变化。这是因为 GPU 将 物体顶点坐标从 world space 转换到了 eye space。</p>
<p>所谓 eye space，即以 camera(视点或相机)为原点，由视线方向、视角和 远近平面，共同组成一个梯形体的三维空间，称之为 viewing frustum(视锥)，近平面，是梯形体较小的矩形面，作为投影平面，远平面是梯形体 较大的矩形，在这个梯形体中的所有顶点数据是可见的，而超出这个梯形体之外 的场景数据，会被视点去除(Frustum Culling，也称之为视锥裁剪)。</p>
<p><em>3. Eye space =&gt; Project and Clip space</em></p>
<p>一旦顶点坐标被转换到 eye space 中，就需要判断哪些点是视点可见的。 位于 viewing frustum 梯形体以内的顶点，被认定为可见，而超出这个梯形体之外 的场景数据，会被视点去除(Frustum Culling，也称之为视锥裁剪)。这一步通常 称之为“clip(裁剪)”，识别指定区域内或区域外的图形部分的过程称之为裁剪算法。</p>
<p>裁剪在一个被称为规范立方体（CVV)的单位立方体中进行，从视点坐标空间到屏幕坐标空间有三步：</p>
<ul>
<li>用透视变换矩阵把顶点从视锥体中变换到裁剪空间的CVV中(投影)；</li>
<li>在CVV中进行图元裁剪；</li>
<li>屏幕映射.</li>
</ul>
<h4 id="-">光栅阶段</h4>
<p>基于几何阶段的输出数据，为像素配色，绘制完成图像。该阶段进行的都是单个像素的操作，每个像素信息存储在颜色缓冲器中。</p>
<p>Pixel Operation：</p>
<ul>
<li>消除遮挡面；</li>
<li>Texture operation纹理操作，根据像素的纹理坐标，查询对应的纹理值；</li>
<li>Blending混色，alpha混合技术。</li>
</ul>
<h2 id="shader-language">Shader language</h2>
<p>使用 shader language 编写的程序称之为 shader program(着色程序)。着色程 序分为两类:vertex shader program(顶点着色程序)和 fragment shader program (片断着色程序)。顶点着色程序主要进行几何方面的运算，而片段着色程序主要针对最终的颜色值进行计算。</p>
<h1 id="-">参考</h1>
<p>《GPU编程与CG语言之阳春白雪下里巴人》</p>
`
},{}],10:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../article/L1/GPU.md"),e=l(t);function l(t){return t&&t.__esModule?t:{default:t}}exports.default=[{label:"一阶入门",list:[{title:"前端互动图形概述",templ:e.default},{title:"GPU 基础知识",templ:e.default},{title:"三维图形渲染基础",templ:e.default},{title:"WebGL 速成",templ:e.default},{title:"三维世界的编程",templ:e.default}]},{label:"二阶提升",list:[{title:"修炼矩阵运算大法",templ:e.default},{title:"WebGL 编程高阶斗技",templ:e.default},{title:"使用 three.js",templ:e.default},{title:"构建自己的三维模型",templ:e.default}]},{label:"三阶应用",list:[{title:"走进 WebVR",templ:e.default},{title:"使用 A-Frame ",templ:e.default},{title:"ARCore 与 ARKit",templ:e.default},{title:"打造自己的 AR 应用",templ:e.default}]}];
},{"../article/L1/GPU.md":13}],6:[function(require,module,exports) {
"use strict";require("./css/index.scss");var e=require("./article"),l=t(e);function t(e){return e&&e.__esModule?e:{default:e}}var a=$("#J_AsideMenu"),i=$("#J_Article");function u(){var e="";l.default.forEach(function(l){e+='<p class="menu-label">'+l.label+"</p>";var t="";l.list.forEach(function(e){t+="<li><a>"+e.title+"</a></li>"}),e+='<ul class="menu-list">'+t+"</ul>"}),a.append(e)}u(),i.html(l.default[0].list[0].templ);
},{"./css/index.scss":9,"./article":10}]},{},[6])