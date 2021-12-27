<template>
  <div class="panel">
    <div>
      <h2>vue panel demo</h2>
      <div style="display:flex; gap: 10px">
        <router-link to="/">home</router-link>
        <router-link to="/about">about</router-link>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
@green: green;
h3 {
  color: red;
  font-size: 18px;
}
h1 {
  color: @green;
}
.panel {
  padding: 0 10px;
}
</style>
