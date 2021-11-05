# <%= name %>

> <%= description %>

如果您还不了解腾讯连连 h5 面板，可以查看[快速入门](https://cloud.tencent.com/document/product/1081/49027)及[开发指南](https://cloud.tencent.com/document/product/1081/49028)

- version: <%= version %>

开始初始化面板项目

```shell
# create h5-panel apps by this template
$ npx caz tencentyun/h5-panel-template my-h5-panel

# 如果全局安装了 caz
$ caz tencentyun/h5-panel-template my-h5-panel

$ cd my-h5-panel

$ npm run dev -- --productId=your_product_id --deviceName=your_devicename # -deviceName为选填，然后会自动打开面板页面
```
