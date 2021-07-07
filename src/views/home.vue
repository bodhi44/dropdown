<template>
  <div class="page-content">
    <div class="list">
      <router-link to="/dropdown">下拉选项</router-link>
    </div>
    <div class="list">
      <router-link to="/sticky">吸顶+平滑锚点</router-link>
    </div>
    <div class="list">
      <router-link to="/lazyLoad">图片懒加载</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped lang="less">
.list {
  margin-top: 60px;
  font-size: 40px;
}
</style>
