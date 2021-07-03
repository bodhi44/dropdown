<template>
  <div id="app">
    <DropDown />
  </div>
</template>

<script>
import DropDown from '@/components/DropDown.vue'

export default {
  name: 'App',
  components: {
    DropDown
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
