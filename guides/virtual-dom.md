# Virtual DOM

**Virtual DOM**（虚拟DOM）是`Nerv`从`React`上继承的一项非常优秀的技术思想。

DOM，文档对象模型，它是JavaScript与页面元素交互的桥梁，可以让我们使用JavaScript去方便地修改、添加页面元素。但我们都知道，直接操作DOM性能较差，人为去操作DOM可能会产生一些性能糟糕的修改，而且手工去修改DOM、维护DOM状态的成本非常高，这些都非常令人痛苦。

而为了解决操作DOM的痛点，`React`另辟蹊径地引入了**虚拟DOM**的思想。**虚拟DOM**是对真实DOM的抽象描述，它的运行机制是这样的：
* **创建**，首先根据数据创建出虚拟DOM对象树，它将描述真实DOM树对应的每个节点的类型、属性，以及它的子节点，由虚拟DOM树我们可以创建出真实DOM树
* **修改**，随后，如果数据发生改变，我们就能创建出一颗新的虚拟DOM树
* **对比更新**，将新、旧虚拟DOM树进行比较、得出差异这样就能对之前生成的真实DOM做出相应的修改。

<div align="center">
  <img src="http://storage.360buyimg.com/mtd/home/sdsdsd1514185541265.jpg" width="600">
</div>

在`Nerv`中我们是使用`Nerv.createElement()` 这个方法来创建虚拟DOM的，这个方法接受三个参数，第一个是节点类型，第二个参数是节点属性，第三个是拥有的子节点，例如

```javascript
import Nerv from 'nervjs'

// 创建一个简单DIV
const divSimple = Nerv.createElement('div', {
  id: 'divSimple',
  className: 'div_simple',
  style: {
    fontSize: 80,
    color: '#232323'
  }
})
// => <div id="divSimple" class="div_simple" style="font-size: 80px;color: #232323;"></div>

// 创建一个包含文字的DIV
const divWidthText = Nerv.createElement('div', {
  id: 'divWidthText',
  className: 'div_width_text',
  style: {
    fontSize: 80,
    color: '#232323'
  }
}, 'Hello, world!')

// => <div id="divWidthText" class="div_width_text" style="font-size: 80px;color: #232323;">Hello, world!</div>

// 创建一个包含多个子元素的DIV
const divWidthChildren =
  Nerv.createElement('div', { id: 'divWidthChildren'},
    Nerv.createElement('p', { className: 'paragraph' }, '1'),
    Nerv.createElement('p', { className: 'paragraph' }, '2'),
    Nerv.createElement('p', { className: 'paragraph' }, '3'))

// => <div id="divWidthChildren"><p class="paragraph">1</p><p class="paragraph">2</p><p class="paragraph">3</p></div>
```

通过调用`Nerv.createElement()`方法就可以得到我们想要的虚拟DOM树，但是如果我们的代码都这样来写的话就会显得非常繁琐了，代码看起来也会非常枯燥，所以我们可以换一种写法，使用`JSX`语法来书写创建虚拟DOM的代码。

`JSX`语法是一种类似XML的JavaScript扩展，它可以让我们在JavaScript中书写类似XML的代码，以此来简化上文中通过调用`Nerv.createElement()`方法来创建虚拟DOM的代码，例如，上述代码可以简化成

```javascript
const divSimple = <div id='divSimple' className='div_simple' style={{fontSize: 80, color: '#232323'}}></div>

const divWidthText = <div id='divWidthText' className='div_width_text' style={{fontSize: 80, color: '#232323'}}>Hello, world!</div>

const divWidthChildren = (
  <div id='divWidthChildren'>
    <p className='paragraph'>1</p>
    <p className='paragraph'>2</p>
    <p className='paragraph'>3</p>
  </div>
)

```

再配合相应工具，就可以将代码转换成正常的创建代码，更多JSX相关内容请参考[JSX这一章节](./jsx.md)。