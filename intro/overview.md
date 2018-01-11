# Nerv介绍

## Nerv

Nerv是一款基于virtual dom技术的类React UI框架，它基于React标准，拥有和React一致的API与生命周期，对于熟悉React的开发者来说Nerv可以快速上手进行开发。得益于与React保持一致API的特性，Nerv可以无缝兼容到React的相关生态，例如[react-router](https://github.com/ReactTraining/react-router)，[react-redux](https://github.com/reactjs/react-redux)，以及大部分使用React开发的组件，所以对于旧的React项目，可以无痛地将React替换成Nerv。

那么有了React珠玉在前，为什么我们还是需要Nerv呢？

首先，是兼容性问题，自从React15之后便已不再兼容IE9以下版本的浏览器，可是相信很多公司的PC端页面还需要去兼容更低版本的IE浏览器，很多人因此而放弃React技术栈，这是一个很大的遗憾；其次，是大小问题，React+react-dom太过庞大，它们在压缩之后有109kb左右的大小，即使在gzip之后也有32kb左右，这对于PC来说都有点太大了，更何况是移动端，而纵观整个React，其实大部分代码是在实现合成事件层，这其实是没有必要的；再者，是React其实本身速度并不快，对于复杂的页面可能达不到我们的要求，而且，React的virtual dom本身其实并不完美，我们有一些自己的想法，来进行优化。那么能不能有这么一款框架，它既继承了React的优秀思想，同时兼具兼容性与性能优异的优点，又能让我们去做更多的探索呢？当然，这就是Nerv的使命。

## Nerv特性

### 功能特性

| 特性           | Nerv支持度     | 特性           | Nerv支持度     |
| ------------- |:-------------:| ------------- |:-------------:|
| JSX      | ✔︎ | SSR | ✔︎      |
| 生命周期      | ✔︎      | 自定义DOM属性 | ✔︎     |
| 事件代理 | ✔︎      | 组件返回数组和字符串 | ✔︎      |
| 字符串ref | ✔︎      | createPortal | ✔︎      |
| SVG | ✔︎      | componentDidCatch | ✔︎      |

### 兼容性

Nerv可以兼容到IE8及以上版本浏览器，以及各种主流浏览器

[![Build Status](https://saucelabs.com/browser-matrix/nerv-project.svg)](https://saucelabs.com/u/nerv-project)

### 性能

Nerv与各个框架性能对比情况

<div align="center">
  <a href="https://github.com/krausest/js-framework-benchmark" target="_blank"><img src="http://storage.360buyimg.com/mtd/home/js-framework-bench1513839979605.png"></a>
  <br>
  <p>js framework benchmark</p>
</div>

<div align="center">
  <a href="https://github.com/krausest/js-framework-benchmark" target="_blank"><img src="http://storage.360buyimg.com/mtd/home/memery1513840180804.png"></a>
  <br>
  <p>Memory usage</p>
</div>

<div align="center">
  <a href="https://github.com/localvoid/uibench" target="_blank"><img src="http://storage.360buyimg.com/mtd/home/ui-bench1513840233491.png"></a>
  <br>
  <p>UI Bench</p>
</div>

<div align="center">
  <a href="https://github.com/mathieuancelin/js-repaint-perfs" target="_blank"><img src="http://storage.360buyimg.com/mtd/home/ui-bench1513840302362.png"></a>
  <br>
  <p>DB Monster (fps)</p>
</div>

请愉快地使用吧！
