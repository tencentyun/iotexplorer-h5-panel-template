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

其他流程与[官网文档](https://cloud.tencent.com/document/product/1081/49027)一致
