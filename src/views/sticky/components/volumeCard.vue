<template>
  <div class="volume">
    <div class="title">
      <img class="icon"
           src="" />
      <span>{{title}}</span>
    </div>
    <div class="volume-list">
      <div class="list"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    },
    list: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style scoped lang="less">
.volume {
  .title {
    display: flex;
    align-items: center;
    padding-top: 32px;
    .icon {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
  }
  .list {
    margin-top: 20px;
    width: 100%;
    height: 200px;
    background-color: @themeBg;
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(124, 124, 124, 0.16);
  }
}
</style>
