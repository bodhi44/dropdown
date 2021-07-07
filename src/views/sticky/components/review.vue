<template>
  <!-- 用户评价 comments discuss -->
  <!-- <div class="comments-main">
    <div @click="gotoDetail(v)"
         class="comments-list"
         v-for="v in 5"
         :key="v"> -->
  <div class="comments-list">
    <div class="comments-left">
      <img class="user-icon"
           v-lazy="" />
    </div>
    <div class="comments-content">
      <div class="user-header">
        <div class="user-info">
          <p class="user-name">灰小太</p>
          <p class="comments-date">2021年8月12日</p>
        </div>
        <div class="misc">
          <div class="score-box">
            <div class="score"></div>
          </div>
          <p class="per-price">100元/人</p>
        </div>
      </div>
      <div class="comments-detail">
        {{'餐厅很大，每一处都是一幅画，可以来拍拍拍！'}}
      </div>
      <div class="comments-imgs">
        <!-- <div class="img-box"
             v-for="v in 5"
             :key="v">
          <p class="span"
             style="display:none;">https://fmm-oss.jijuekeji.com/d_icon3.png</p>
          <img class="img"
               src="" />
        </div> -->
        <p class="img-box"
           v-for="v in 5"
           :key="v">
          <img class="img"
               v-lazy="'https://fmm-oss.jijuekeji.com/d_icon3.png'" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    gotoDetail (item) {
      // this.$router.push({ name: 'merchantsCommentsDetail', params: { id: item } })
    }
  }
}
</script>

<style scoped lang="less">
/* 评价列表 start */

// .comments-main {
//   padding-bottom: 40px;
// }
.comments-list {
  margin-top: 44px;
  display: flex;
  .comments-left {
    flex-shrink: 0;
    .user-icon {
      width: 120px;
      height: 120px;
      background-color: @themeBg;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  .comments-content {
    flex: 1;
    padding-bottom: 20px;
    border-bottom: 2px solid @themeBg;
    .user-header {
      .user-info {
        line-height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-name {
          flex: 1;
          font-size: 28px;
          color: #5895ab;
        }
        .comments-date {
          flex-shrink: 0;
          color: #c9c9c9;
        }
      }
      .misc {
        display: flex;
        align-items: center;
        color: #ff5f00;
        .score-box {
          width: 200px;
          height: 40px;
          margin-right: 20px;
          .score {
          }
        }
      }
    }
    .comments-detail {
      padding: 20px 0;
      line-height: 40px;
    }
    .comments-imgs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .img-box {
        width: 176px;
        height: 176px;
        border-radius: 10px;
        margin-right: 12px;
        margin-bottom: 12px;
        background-color: @themeBg;
        &:nth-child(3n) {
          margin-right: 0px;
        }
        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  &:last-of-type {
    .comments-content {
      border-bottom: none;
    }
  }
}
/* 评价列表 end */
</style>
