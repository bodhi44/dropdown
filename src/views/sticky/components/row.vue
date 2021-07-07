<template>
  <div class="list-box">
    <div class="list"
         @click="gotoDetail(item.id)">
      <div class="title">
        <span>{{item.title}}</span>
      </div>
      <!-- 标签、距离 -->
      <div class="tag-box">
        <div class="tags">
          <p class="tag"
             v-for="tag in item.tags"
             :key="tag">
            {{tag}}
          </p>
        </div>
        <p class="distance">{{item.distance}}</p>
      </div>
      <!-- 评论，评论条数，没人多少钱，多少好友去过 -->
      <div class="misc-box">
        <div v-if="item.score"
             class="score-box">
          <div class="score">{{item.score}}</div>
        </div>
        <p v-if="item.commentNum"
           class="score-number">{{item.commentNum}}条</p>
        <p v-if="item.perPrice"
           class="per-price">{{item.perPrice}}元/人</p>
        <p v-if="item.friendNum"
           class="friend-number">{{item.friendNum}}个好友去过</p>
      </div>
      <!-- 图片列表 -->
      <div v-if="true"
           class="img-box">
        <img @click.stop="previewPicture"
             v-for="v in 5"
             :key="v"
             class="img"
             v-lazy="" />
      </div>
      <!-- 歇业背景色 -->
    </div>
    <div v-if="false"
         class="close-business"></div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        id: 1,
        title: '九田家黑牛烤肉料理',
        tags: ['桌游密室', '聚餐', 'K歌', '电影演出', '周边游', '酒吧', '网咖电竞', '游泳健身', '其他'],
        distance: '2.8km',
        score: 4,
        commentNum: 1280,
        perPrice: 1364,
        friendNum: 1253
      })
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 跳转到详情页
    gotoDetail (id) {
      this.$router.push({ name: 'merchantsDetail', params: { id } })
    },
    // 预览图片
    previewPicture () {
      console.log(11111111)
    }
  }
}
</script>

<style scoped lang="less">
.list-box {
  margin-top: 24px;
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 0 12px rgba(124, 124, 124, 0.16);
  background-color: @whiteBg;
  .list {
    padding: 28px;
    font-size: 24px;
    // 标题
    .title {
      font-size: 32px;
    }
    // 标签栏
    .tag-box {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      .tags {
        flex: 1;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .tag {
          margin-bottom: 12px;
          margin-right: 12px;
          padding: 10px 20px;
          border-radius: 10px;
          background-color: #fff3dd;
          color: #ffaf58;
        }
      }
      .distance {
        min-width: 80px;
        color: #999;
        text-align: right;
      }
    }
    // 评论杂项 misc
    .misc-box {
      display: flex;
      align-items: center;
      .score-box {
        width: 200px;
        height: 40px;
        margin-right: 8px;
        .score {
        }
      }
      .score-number {
        margin-right: 8px;
      }
      .per-price {
        margin-right: 8px;
      }
      .friend-number {
        color: #ff5f00;
      }
    }
    // 图片
    /* .img-box {
      margin-top: 20px;
      flex-wrap: wrap;
      display: flex;
      align-items: center;
      .img {
        width: 136px;
        height: 136px;
        border-radius: 10px;
        background-color: @themeBg;
        margin-right: 28px;
        margin-bottom: 20px;
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    } */
    // 图片
    .img-box {
      margin-top: 20px;
      white-space: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      padding-right: 18px;
      &::-webkit-scrollbar {
        display: none;
      }
      .img {
        width: 160px;
        height: 160px;
        border-radius: 10px;
        background-color: @themeBg;
        margin-right: 10px;
        white-space: nowrap;
        display: inline-block;
      }
    }
  }
  .close-business {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(247, 247, 247, 0.5);
  }
}
</style>
