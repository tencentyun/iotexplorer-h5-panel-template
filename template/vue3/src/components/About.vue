<template>
  <div>
    <ul>
      <li>设备名称: {{ deviceName }}</li>
      <li>产品ID: {{ productId }}</li>
    </ul>
    查看<a href="https://tencentyun.github.io/iot-panel-component/">组件库</a>
  </div>
</template>

<script>
const sdk = window.h5PanelSdk;
  export default {
    setup() {
      return {
        deviceName: sdk.deviceName,
        productId: sdk.productId
      }
    }
  }
</script>