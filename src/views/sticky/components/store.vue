<template>
  <div class="recommend-box">
    <div class="recommend"
         v-for="v in 5"
         :key="v">
      <img class="img"
           v-lazy="v" />
      <p class="dishes one-ellipsis">嫰煎小羊排</p>
      <p class="price one-ellipsis">&yen;<span>146</span></p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="less">
/* 商家推荐 start */
.recommend-box {
  padding: 28px 18px 0 0;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .recommend {
    margin-right: 10px;
    white-space: nowrap;
    display: inline-block;
    width: 200px;
    .img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
      background-color: @themeBg;
    }
    .dishes {
      margin-top: 16px;
    }
    .price {
      margin-top: 8px;
      color: #ff413e;
      span {
        margin-left: 12px;
      }
    }
  }
}
/* 商家推荐 end */
</style>
