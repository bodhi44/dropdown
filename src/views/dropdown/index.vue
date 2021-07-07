<template>
  <div class="page-content"
       ref="pageContent">
    <DropDown @closeMask="obtainData" />
    <div ref="dropdown2"
         :style="`margin-top: ${top}px;`">
      <DropDown @closeMask="obtainData"
                :top="top" />
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown.vue'

export default {
  name: 'dropdown',
  components: {
    DropDown
  },
  data () {
    return {
      top: 80
    }
  },
  methods: {
    obtainData (data) {
      console.log(data, '===data')
    }
  }
}
</script>

<style scoped lang="less">
</style>
