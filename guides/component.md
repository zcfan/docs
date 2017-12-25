# 组件

我们的页面一般都是由各种各样的组件构成的，组件就像一个一个积木一样，被用来搭建成页面。例如一个带有用户信息、logo的头部就是一个组件，而用户信息、logo也许也可以是独立组件。组件化可以让我们把一个庞大的页面切割成一个一个小块来分别进行管理，也就是分而治之的思想，同时组件化也能帮助我们更好地进行代码复用。

<div align="center">
  <img src="http://storage.360buyimg.com/mtd/home/wx20171225-111010-2x1514171469651.jpg" width="500">
</div>

`Nerv`天生是支持组件化的，组件是`Nerv`中的核心概念。`Nerv`中的组件分为Stateful Component、Stateless Component以及PureComponent。

## Stateful Component

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
      <div>Hi, Tonny</div>
    )
  }
}
```

Stateful Component是带有自身状态的组件，