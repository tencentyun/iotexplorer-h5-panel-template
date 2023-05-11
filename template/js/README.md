# <%= name %>

> <%= description %>

如果您还不了解腾讯连连 h5 面板，可以查看[快速入门](https://cloud.tencent.com/document/product/1081/49027)及[开发指南](https://cloud.tencent.com/document/product/1081/49028)

#### whistle 配置

```shell
developing.script/developing.js https://127.0.0.1:9000/index.js
developing.style/developing.css https://127.0.0.1:9000/index.css
https://iot.cloud.tencent.com:9000 https://127.0.0.1:9000 # 用于支持HMR
```
如果您不了解whistle，推荐使用[免代理模式](https://cloud.tencent.com/document/product/1081/67441#proxy-free-mode)进行开发

开始初始化面板项目

```shell
# create h5-panel apps by this template
$ npx caz tencentyun/h5-panel-template my-h5-panel

# 如果全局安装了 caz
$ caz tencentyun/h5-panel-template my-h5-panel

$ cd my-h5-panel

$ npm run dev -- --productId=your_product_id --deviceName=your_devicename # -deviceName为选填，然后会自动打开面板页面
```

