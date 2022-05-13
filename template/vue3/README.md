# vue开发h5面板

### whistle 配置

```
developing.script/developing.js http://127.0.0.1:9000/index.js
developing.style/developing.css http://127.0.0.1:9000/index.css
$wss://iot.cloud.tencent.com/ wss://localhost:9000/ # 代理 HMR
```


### dev
```bash
npm run dev -- --productId=your_productId # 将会生成 http://127.0.0.1:9000/index.js http://127.0.0.1:9000/index.css

```

### build
```bash
npm run build

```
### 体积优化

对于小图片，可以使用 data-url 的方式打包到js中

```js
import logo from 'data-url:./assets/logo.svg';
```

```css
.foo {
  background: url(data-url:./background.png);
}
```
对于比较大的图片，建议上传到[COS](https://cloud.tencent.com/document/product/597/72323)或者服务器上，然后通过 url 进行引用。

### 分包支持

当单个js文件的代码体积超过 2M 时，通过 `import()`函数，我们可以将依赖或者路由页面进行[分包](https://parceljs.org/features/code-splitting/)：

1. 将`vant`分包:

```js
// ...

(async() => {
  const { Button, Cell, Icon, Tab, Tabs } = await import('vant');

  const app = createApp(App);
  [router, Button, Cell, Icon, Tab, Tabs].forEach(plugin => app.use(plugin));
  app.mount("#app");
})();

```

2. 按照路由分包：

```js
// router.js
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: import('./components/About.vue') }, // 异步路由加载
]
```

其他流程与[官网文档](https://cloud.tencent.com/document/product/1081/49027)一致
