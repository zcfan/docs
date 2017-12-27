# 组件

我们的页面一般都是由各种各样的组件构成的，组件就像一个一个积木一样，被用来搭建成页面。例如一个带有用户信息、logo的头部就是一个组件，而用户信息、logo也许也可以是独立组件。组件化可以让我们把一个庞大的页面切割成一个一个小块来分别进行管理，也就是分而治之的思想，同时组件化也能帮助我们更好地进行代码复用。

<div align="center">
  <img src="http://storage.360buyimg.com/mtd/home/wx20171225-111010-2x1514171469651.jpg" width="500">
</div>

`Nerv`天生是支持组件化的，组件是`Nerv`中的核心概念。`Nerv`中的组件分为Stateful Component、Stateless Component 以及 PureComponent。

## Stateless Component

Stateless Component（无状态组件）是一个纯函数，它意味着只渲染 Class Component 的 `render()` 函数的内容。

使用 JSX：

```jsx
function Hello ( { text } ) {
  return <span> Hello, { text } </span>
}
```

使用 `createElement`:

```js
function Hello ( { text } ) {
  return createElement('span', null, text)
}
```

Stateless Component 正如它的名字一样——没有 state。但它接受一个参数 `props`，当 `props` 改变的时候，Nerv 会根据新旧 props 返回内容的不同而去渲染组件。另外一个和 Class Component 不同的地方在于，Stateless Component 没有完整的生命周期。（和 React 不一样的地方）在 Nerv 里，你可以传入一个叫 `onShouldComponentUpdate` 的 `props` 来手动判定该组件是否被更新。


## Class Component

这一类组件需要继承 `Nerv` 的 `Component` 类，例如

```javascript
import Nerv from 'nervjs'

class Username extends Nerv.Component {
  constructor () {
    super(...arguments)
    this.state = {}
  }

  render () {
    return (
      <div>Hi, Tony</div>
    )
  }
}
```

### `setState`

ES2015 Component 是带有自身状态的组件，你可以在组件的内部调用 `this.setState` 方法来改变组件的状态。每次 `setState` 之后 Nerv 将会把 `state` 暂存到一个队列，然后在一个 eventloop 的 microtask 合并最终的 `state`，对比新旧 `state` 创建的虚拟 DOM 对象的不同，然后对真实 DOM 进行更新。或者你也可以直接调用 `this.forceUpdate()` 强制对比新旧虚拟 DOM，然后更新。

### `forceUpdate`

一般而言，每次 `setState()` 更新状态都是异步的，并且 Nerv 内部会对比新旧虚拟 DOM 的不同之处再进行更新。但你可以通过调用 `forceUpdate()` 直接立即进行一次强制的同步更新，`forceUpdate()` 的造成的更新和 `setState()` 的更新一样，会走完整个的组件生命周期流程。


### `defaultProps`

`defaultProps` 是一个 `Nerv.Component` 的*可选*静态属性，当一个 Component 实例化了之后（也就是写成了 JSX 的形式或者直接被 `createElement` 调用），如果没有传入相应的 `props` ，就会给它传入默认的 `defaultProps`。`defaultProps` 只在没有传入 `props` 时（也就是 `props` 是 `undefined` 时）起作用，当 `props` 是 `null` 时不会传入 `defaultProps`。

```js
class CustomButton extends React.Component {
  static defaultProps = {
    color: 'blue'
  }
  // ...
}

### `render()`

一个 `render()` 函数*必须*返回内容，返回内容是该组件将要被渲染的内容，它们必须是以下是其中任意一种类型：

1. Nerv 组件。由 JSX 创建的组件，它可以是一个 Component，也可以是纯粹的 JSX 创建的虚拟 DOM，或者通过 `createPortal` 创建的内容；
2. 字符串或数字。这两样内容会被渲染成 DOM 中的文本节点；
3. `null`。返回 `Null` 时 Nerv 什么也不渲染；
4. 布尔值。你可以这样写你的逻辑 `return condition && <App />`, 当 `condition` 为 `false` 时 Nerv 也不会渲染任何内容。

// 或者这样：
CustomButton.defaultProps = {
  color: 'blue'
};
```

### 组件生命周期

生命周期是指组件从创建到销毁一个完整的生命过程，`Nerv`通过定义了一系列的函数来控制组件在生命周期的各个阶段的动作。

名称 | 调用时机 | 传入参数
:---: | :---: | :---:
`componentWillUnmount` | 组件即将要从 DOM 中卸载 | 空
`componentWillMount` | 组件即将要加载到 DOM 中 | 空
`componentDidMount` | 组件已加载到 DOM 中 | 空
`componentDidUnmount` | 组件已从 DOM 中卸载 | 空
`componentWillReceiveProps` | 新的 `props` 传入组件之前 | `nextProps`
`shouldComponentUpdate` | 手动判断是否要更新组件，返回 `false` 将不会调用 `render()` | `nextProps`, `nextState`
`componentWillUpdate` | 组件即将要更新，在 `render()` 之前 | `lastProps`, `nextProps`
`componentDidUpdate` | 组件已经更新，在 `render()` 之后 | `lastProps`, `nextProps`


![组件生命周期](https://i.loli.net/2017/12/27/5a4336d23ebd4.png)
![组件生命周期](https://i.loli.net/2017/12/27/5a4336d23ee19.png)

## `PureComponent`

`PureComponent` 与 `Component` 几乎完全相同，但 `PureComponent` 通过 prop 和 state 的浅对比来实现 `shouldComponentUpate()`。

如果 Nerv 组件的 `render()` 函数在给定相同的 props 和 state 下渲染为相同的结果，在某些场景下你可以使用 `PureComponent` 来提升性能。


> `PureComponent` 的 `shouldComponentUpdate()` 只会对对象进行浅对比。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新)。当你期望只拥有简单的 props 和 state 时，才去继承 `PureComponent` ，或者在你知道深层的数据结构已经发生改变时使用 `forceUpate()` 。或者，考虑使用 [不可变对象](https://facebook.github.io/immutable-js/) 来促进嵌套数据的快速比较。
>
> 此外,`PureComponent` 的 `shouldComponentUpate()` 会忽略整个组件的子级。请确保所有的子级组件也是"Pure"的。
