# 从 React 切换到 Nerv

Nerv 提供了比 React 更好的浏览器兼容性和更高的性能，与此同时也不会放弃 React 庞大的生态系统。兼容 React 生态系统是我们开发 Nerv 的重要目标之一。

假设我们有这样一段代码：

```js
var React = require('react');
var ReactDOM = require('react-dom');
 
class MyComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}
 
ReactDOM.render(<MyComponent />, node);
```

我们迁移的目标就是更改一些配置，但是不用改变代码本身任意一行。

## 目前支持的特性

### `react`

* React.createElement
* React.cloneElement
* React.Component
* React.PureComponent
* React.Children
* React.isValidElement
* componentDidCatch (React 16)

### `react-dom`

* ReactDOM.render
* ReactDOM.unmountComponentAtNode
* ReactDOM.findDOMNode
* ReactDOM.createPortal (React 16)


### 使用 Webpack

只需要在 `alias` 把 `nervjs` 和 `react`、`react-dom` 关联起来即可：

```js
{
  resolve: {
    alias: {
      'react': 'nervjs',
      'react-dom': 'nervjs'
    }
  }
}
```

### 使用 Babel

直接单独使用 babel 需要安装一个叫 `babel-plugin-module-resolver` 的插件，接下来就在 `.babelrc` 添加以下内容，就可以把 `react`、`react-dom` 和 `nervjs` 关联起来：

```js
{
    "plugins": [
        ["module-resolver", {
            "root": ["."],
            "alias": {
                "react": "nervjs",
                "react-dom": "nervjs"
            }
        }]
    ]
}
```

### 使用 Browserify

使用 Browserify 也需要安装一个叫 `aliasify` 的插件，然后在 `package.json` 把 `react` 和 `react-dom` 关联到 `nervjs`：

```js
{
    "aliasify": {
        "aliases": {
            "react": "inferno-compat",
            "react-dom": "inferno-compat"
        }
    }
}
```