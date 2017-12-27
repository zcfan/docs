### Devtools

调试 Nerv 是一件非常简单的事情。

如果你在 Chrome 安装了 [React Chrome Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) 之后，需要安装 `nerv-devtools`:

```bash
$ npm i --save nerv-devtools
```

然后只需要在你的 `Nerv.render()` 函数之前引入如下代码：

```js
import 'nerv-devtools'
```

由于引入 `devtools` 之后内部会做很多不必要的操作，在你正式发布的版本中，一般而言不会包括 `nerv-devtools`:

```js
if (process.env.NODE_ENV !== 'production')  {
  require('nerv-devtools')
}
// before Nerv.render()
Nerv.render(<App />, document.getElementById('#root'))
```

最后就可以开心地在 Chrome Dev Tools 中使用了：

![React Dev tools](https://cloud.githubusercontent.com/assets/677114/21539681/0a442c54-cde4-11e6-89cd-687dbc244d94.png)