<template>
  <div id="app"
       class="page">
    <transition name="fade"
                mode="out-in">
      <router-view />
    </transition>
    <OfflineHandle offlineTitle="断网处理标题"
                   desc="断网处理描述"
                   onlineTitle="连网提醒">
    </OfflineHandle>
  </div>
</template>

<script>
import OfflineHandle from '@/components/OfflineHandle'
export default {
  name: 'App',
  components: {
    OfflineHandle
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
