<template>
  <div class="panel">
    <Loading v-if="!isShowLoading" />
    <div v-else>
      <h2 class="title">vue panel demo</h2>
      <img
        :src="logo"
        className="logo"
      >
      <van-tabs
        v-model:active="active"
        style="margin-bottom: 20px"
      >
        <van-tab
          title="home"
          name="/"
        />
        <van-tab
          title="about"
          name="/about"
        />
      </van-tabs>

      <router-view />
    </div>
  </div>
</template>

<script setup>
  // 小图可以用这种方式生成data-url，大图请上传服务器后使用url
  import logo from 'data-url:./assets/logo.svg';
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import Loading from './hooks/Loading.vue';
  import { useDeviceData } from './hooks/useDeviceData';

  const { deviceData } = useDeviceData();
  const isShowLoading = ref(deviceData);
  const route = useRoute();
  const router = useRouter();
  const active = ref('/');
  const { path } = route;
  router.isReady().then(() => {
    active.value = path;
  });
  watch(active, (active) => {
    router.push(active);
  });

</script>

<style lang="less">
@green: green;
// 如果需要将 vant等 UI库的 px 也转成 vw, 可以去掉注释，同时去掉 index.js 中引入的 css
// @import 'vant/lib/index.css';
h3 {
  color: red;
  font-size: 18px;
}
h1 {
  color: @green;
}
.panel {
  padding: 0 10px;
  .title{
    font-size: 20px;
  }
}
.logo{
  display:block;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
</style>
