<template>
<div class="panel">
  <h1>Vue h5 面板</h1>
  <ul>
    <li>设备名称: {{ deviceName }}</li>
    <li>产品ID: {{ productId }}</li>
  </ul>

  <button @click="showTip">显示设备状态</button>
  <div>
    <h2>vue-router demo</h2>
    <div style="display:flex; gap: 10px">
      <router-link to="/">home</router-link>
      <router-link to="/about">about</router-link>
    </div>

    <router-view></router-view>
  </div>

</div>
</template>

<script>
  import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
  export default {
    data() {
      return {
        deviceName: sdk.deviceName,
        productId: sdk.productId,
      };
    },
    methods: {
      showTip() {
        sdk.getDeviceStatus().then(res => {
          console.log('res', res);
          sdk.tips.alert('设备已离线');
        })
      }
    }
  };
</script>

<style lang="less">
  @green: green;
  h3{
    color: red;
    font-size: 18px;
  }
  h1 {
    color: @green;
  }
  .panel{
    padding: 0 10px;
  }
</style>
