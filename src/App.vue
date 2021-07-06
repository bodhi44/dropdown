<template>
  <div id="app"
       class="page">
    <transition name="fade"
                mode="out-in">
      <DropDown @closeMask="obtainData" />
    </transition>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown.vue'

export default {
  name: 'App',
  components: {
    DropDown
  },
  methods: {
    obtainData (data) {
      console.log(data, '===data')
    }
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
