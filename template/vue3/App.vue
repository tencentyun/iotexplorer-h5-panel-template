<template>
<div class="panel">
  <h1>Vue h5 面板</h1>
  <div>Hello {{ name }}!</div>
  <button @click="showTip">显示状态</button>
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
  imp
  export default {
    data() {
      return {
        name: "panel",
      };
    },
    methods: {
      showTip() {
        window.h5PanelSdk.tips.alert('设备已离线');
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