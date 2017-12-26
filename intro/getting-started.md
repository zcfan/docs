# 快速开始

## 开始一个全新的项目

推荐使用[webpack](https://webpack.js.org)配合[babel](https://babeljs.io)来进行开发

### 创建项目

创建一个目录，使用`npm`快速初始化

```bash
$ mkdir my-project && npm init -y
```

### 安装依赖

安装`webpack`以及`babel`

```bash
$ npm install --save-dev webpack webpack-dev-server html-webpack-plugin babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env @babel/plugin-transform-react-jsx
```

安装Nerv

```bash
$ npm install --save nervjs
```

### 添加配置文件

在项目根目录下添加一个简单的webpack配置文件`webpack.config.js`

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ]
}
```

在项目根目录下添加一个babel的配置文件`.babelrc`

```
{
  "presets": [
    [
      "@babel/env",
      {
        "spec": true,
        "useBuiltIns": false
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "Nerv.createElement"
      }
    ]
  ]
}
```

### 添加项目入口文件

在项目根目录下添加一个入口html文件`index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Nerv App</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

### 书写代码

然后就可以书写代码了，新建一个`src`目录，添加一个`Hello.js`文件

```javascript
import Nerv from 'nervjs'
// import { Component, createElement } from 'nervjs'

class Hello extends Nerv.Component {
  constructor () {
    super(...arguments)
    this.state = {
      message: 'world'
    }
  }

  render () {
    return (
      <div>
        Hello, {this.state.message}
      </div>
    )
  }
}

export default Hello
```

随后在`src`目录下新建一个`index.js`文件来调用`Hello.js`

```javascript
import Nerv from 'nervjs'
import Hello from './Hello'

Nerv.render(<Hello />, document.getElementById('app'))
```

最后在`package.json`文件的`scripts`字段中增加

```json
"scripts": {
  "dev": "webpack-dev-server --config webpack.config.js"
}
```

在项目根目录下执行`npm run dev`，就能在浏览器中看到效果了！

![](http://storage.360buyimg.com/mtd/home/sample1513845790903.jpg)

注意：使用的时候需要配合babel的[@babel/plugin-transform-react-jsx](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx)插件来将JSX转换的创建虚拟DOM的代码替换成使用Nerv的API，使用方式如下

```json
{
  ...
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "Nerv.createElement" // 如果你 import { createElement } from 'nervjs' 的话，那这里设置成 `createElement` 就行了
    }]
  ]
}
```

当然，如果你想避免从0开始进行`webpack`与`babel`配置，你可以使用[Athena2](https://github.com/o2team/athena2)来进行开发

[Athena2](https://github.com/o2team/athena2)是一款基于`webpack`的前端工程化开发工具，它可以快速初始化一个新项目，内置项目所需的配置，对于普通需求基本可以零配置开发使用，当然你也可以自由地提供自己所需要的webpack配置。

相关使用请查看**Athena2**的[使用文档](https://github.com/o2team/athena2)