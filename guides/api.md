# API

`Nerv` 是Nerv库的入口点。如果你通过 `<script>` 标签加载Nerv，这些高阶API可用于 `Nerv` 全局。如果你使用ES6，你可以使用 `import Nerv from 'Nerv'` 。如果你使用ES5，你可以使用 `var Nerv = require('Nerv')` 。

### `Nerv.Component`

用 [ES6 类](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 定义时，`Nerv.Component`是Nerv组件的基类。

```javascript
class Greeting extends Nerv.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

有关 `Nerv.Component` 的方法和属性列表，请参阅 [`Nerv.Component`](./component.md)。

* * *

### `Nerv.PureComponent`

请参阅 [`Nerv.Component`](./component.md)。

* * *

### `createElement()`

```javascript
Nerv.createElement(
  type,
  [props],
  [...children]
)
```

根据给定的类型创建并返回新的 [`Nerv element`](/docs/rendering-elements.html) 。参数type既可以是一个html标签名称字符串(例如`'div'` 或 `'span'` )，也可以是一个 [`Nerv component`](./component.md) 类型(一个类或一个函数)。

`Nerv.DOM` 提供了DOM组件的 `Nerv.createElement()` 的便捷包装。举个例子，`Nerv.DOM.a(...)` 是 `Nerv.createELement('a', ...)` 的一个便捷包装。这个用法被认为是过时的，我们推荐您使用JSX，或者直接使用 `Nerv.createElement()` 。

用 [`JSX`](./component.md) 编写的代码会被转换成用 `Nerv.createElement()` 实现。如果使用了JSX，你通常不会直接调用 `Nerv.createElement()` 。

* * *

### `cloneElement()`

```
Nerv.cloneElement(
  element,
  [props],
  [...children]
)
```

以 `element` 作为起点，克隆并返回一个新的Nerv元素(Nerv Element)。生成的元素将会拥有原始元素props与新props的浅合并。新的子级会替换现有的子级。来自原始元素的 `key` 和 `ref` 将会保留。

`Nerv.cloneElement()` 几乎相当于：

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

然而，它也保留了 `ref`。这意味着，如果你通过 `ref` 获取到子级组件时，不会一不小心从祖先组件里窃取了它。你将获得与你新元素相同的 `ref` 。

### `isValidElement()`

```javascript
Nerv.isValidElement(object)
```

验证对象是否是一个Nerv元素。返回 `true` 或 `false` 。

* * *

### `Nerv.Children`

`Nerv.Children` 提供了处理 `this.props.children` 这个不透明数据结构的工具。

#### `Nerv.Children.map`

```javascript
Nerv.Children.map(children, function[(thisArg)])
```

在包含在 `children` 里的每个子级上调用函数，调用的函数的 `this` 设置为 `thisArg` 。如果 `children` 是一个嵌套的对象或数组，它将被遍历。如果 `children` 是 `null` 或 `undefined` ，返回 `null` 或 `undefined` 而不是一个空数组。

#### `Nerv.Children.forEach`

```javascript
Nerv.Children.forEach(children, function[(thisArg)])
```

类似 `Nerv.Children.map()` ，但是不返回数组。

#### `Nerv.Children.count`

```javascript
Nerv.Children.count(children)
```

返回 `children` 中的组件总数，相等于传给 `map` 或 `forEach` 时，回调函数被调用次数。

#### `Nerv.Children.only`

```javascript
Nerv.Children.only(children)
```

返回`children`里仅有的子级。否则抛出异常。

#### `Nerv.Children.toArray`

```javascript
Nerv.Children.toArray(children)
```

返回以赋key给每个子级 `child` 的扁平数组形式来组成不透明的 `children` 数据结构。如果你打算在你的渲染方法里操纵子级集合这很有用，特别是你想在 `this.props.children` 传下之前对它重新排序或切割。

> Note:
>
> 当children是扁平列表时，`Nerv.Children.toArray()` 改变key来保留嵌套数组的语义。也就是说，为了在展开时保留嵌套数组的语义，`toArray` 会自动的给数组中每个 key 加了上前缀，以便将每个元素的key被限定到包含它的输入数组。

### `render()`

```javascript
Nerv.render(
  element,
  container,
  [callback]
)
```

渲染一个Nerv元素，添加到位于提供的`container`里的DOM元素中，并返回这个组件的一个引用。

如果这个Nerv元素之前已经被渲染到`container`里去了，这段代码就会进行一次更新，并且只会改变那些反映元素最新状态所必须的DOM元素。

回调函数是可选的。如果你提供了，程序会在渲染或更新之后执行这个函数。

> 注意:
>
> `Nerv.render()` 控制你传进来的容器节点里的的内容。第一次被调用时，内部所有已经存在的DOM元素都会被替换掉。之后的调用会使用Nerv的DOM比较算法进行高效的更新。
>
> `Nerv.render()`不会修改容器节点（只修改容器的子项）。你可以在不覆盖已有子节点的情况下添加一个组件到已有的DOM节点中去。
>
> `Nerv.render()` 目前会返回一个引用， 指向 `Nerv.Component`的根实例。但是这个返回值是历史遗留，应该避免使用。因为未来版本的Nerv可能会在某些情况下进行异步渲染。如果你真的需要一个指向 `Nerv.Component` 的根实例的引用，推荐的方法是添加一个 callback ref 到根元素上。

* * *

### `unmountComponentAtNode()`

```javascript
Nerv.unmountComponentAtNode(container)
```

从DOM元素中移除已挂载的Nerv组件，清除它的事件处理器和state。如果容器内没有挂载任何组件，这个函数什么都不会干。
有组件被卸载的时候返回`true`，没有组件可供卸载时返回 `false`。

* * *

### `findDOMNode()`

```javascript
Nerv.findDOMNode(component)
```
如果这个组件已经被挂载到DOM中，函数会返回对应的浏览器中生成的DOM元素 。
当你需要从DOM中读取值时，比如表单的值，或者计算DOM元素的尺寸，这个函数会非常有用。
 **大多数情况下，你可以添加一个指向DOM节点的引用，从而完全避免使用`findDOMNode` 这个函数.** 当 `render` 返回 `null` 或者 `false` 时, `findDOMNode` 也返回 `null`.

> 注意:
>
> `findDOMNode` 是用于操作底层DOM节点的备用方案。在大部分情况下都不提倡使用这个方案，因为它破坏了组件的抽象化。
>
> `findDOMNode` 只对挂载过的组件有效（也就是已经添加到DOM中去的组件）。如果你试图对一个未挂载的组件调用这个函数
（比如在一个还未创建的组件的 `render()` 函数中中调用 `findDOMNode()`），程序会抛出一个异常。
>
> `findDOMNode` 不能用于函数式的组件中。