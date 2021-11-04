# @tencentyun/h5-panel-template

> A template for creating 腾讯连连 h5-panel apps.

## Usage

如果您还不了解 h5 面板，可以查看[快速入门](https://cloud.tencent.com/document/product/1081/49026)及[开发指南](https://cloud.tencent.com/document/product/1081/49028)

准备环境: [Node.js](https://nodejs.org) (>= 12.10 required, >= 14.17 preferred), [npm](https://www.npmjs.com) (>= 6.x) or [yarn](https://yarnpkg.com) (>= 1.22) [whistle](https://github.com/avwo/whistle) and [SwitchyOmega](https://github.com/FelisCatus/SwitchyOmega).

在 whistle 中配置如下：
```shell
developing.script/developing.js https://127.0.0.1:9000/index.js
developing.style/developing.css https://127.0.0.1:9000/index.css
```

开始初始化面板项目

```shell
# create h5-panel-template apps by this template
$ npx caz tencentyun/h5-panel-template my-h5-panel

# enter generated directory
$ cd my-h5-panel

$ npm run dev # 会自动打开面板页面
```

Or use globally installed CAZ:

```shell
# Install the `caz` globally
$ npm install caz --global # or `yarn global add caz`

# create h5-panel-template apps by this template
$ caz h5-panel-template my-h5-panel-template

```

### 常见问题

Q: 打开的页面白屏
A: 请检查 whistl配置是否正常

## Related

- [zce/caz](https://github.com/zce/caz) - A simple yet powerful template-based Scaffolding tools.

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE)



[travis-img]: https://img.shields.io/travis/com/tencentyun/h5-panel-template
[travis-url]: https://travis-ci.com/tencentyun/h5-panel-template
[dependency-img]: https://img.shields.io/david/tencentyun/h5-panel-template
[dependency-url]: https://david-dm.org/tencentyun/h5-panel-template
[devdependency-img]: https://img.shields.io/david/dev/tencentyun/h5-panel-template
[devdependency-url]: https://david-dm.org/tencentyun/h5-panel-template?type=dev
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com
