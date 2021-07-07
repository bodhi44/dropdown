<template>
  <div class="page-content"
       ref="pageContent">
    <!-- 头部信息 -->
    <div class="header">
      <!-- 店铺名称 -->
      <div class="title">
        {{detail.title}}
      </div>
      <!-- 标签，多少好友去过 -->
      <div class="tag-box">
        <div class="tags">
          <p class="tag"
             v-for="tag in detail.tags"
             :key="tag">
            {{tag}}
          </p>
        </div>
        <div class="friend-number">
          {{detail.friendNum}}个好友去过
        </div>
      </div>
      <!-- 评分，评论条数，人均、钱 -->
      <div class="misc-box pdr28">
        <div class="score-box">
          <div class="score">
            {{detail.score}}
          </div>
        </div>
        <p class="score-number">{{detail.score}}</p>
        <p class="comment-number">{{detail.commentNum}}条</p>
        <p class="per-price">{{detail.perPrice}}元/人</p>
      </div>
      <!-- 商家图片 -->
      <div class="img-box">
        <img class="img"
             v-for="v in 5"
             :key="v"
             v-lazy="v" />
      </div>
      <!-- 店铺营业时间 -->
      <div class="store-intro pdr28">
        <img class="time-icon"
             src="" />
        <!-- 店铺营业时间表 -->
        <div class="table-time">
          <p class="caption">营业中：<span>{{detail.morning}}</span> <span class="afternoon">{{detail.afternoon}}</span></p>
          <div class="store-tags">
            <p class="tag"
               v-for="tag in detail.storeInfo.tags"
               :key="tag">
              {{tag}}
            </p>
          </div>
        </div>
      </div>
      <!-- 店铺地址 -->
      <div class="store-adress pdr28">
        <!-- 店铺位置图标 -->
        <img class="site-icon"
             src="" />
        <!-- 店铺位置详情 -->
        <div class="site-main">
          <div class="site-box">
            <span class="site">{{detail.storeInfo.site}}</span>
            <span class="distance">{{detail.storeInfo.distance}}</span>
          </div>
          <!-- 查看店铺路线 -->
          <div class="store-link">
            <a href="#"
               class="look-site">查看路线></a>
            <div class="store-btn">
              <img class="btn-icon"
                   src="" />
              <span>联系商家</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 买卷，推荐，评价 -->
    <div class="tabbar-box">
      <div class="tab-bar-fixed"
           ref="pride_tab_fixed">
        <div class="tab-bar"
             :class="{'tab-fixed': titleFixed === true}">
          <div class="tab-item"
               :class="{'active': tabIndex === 0}"
               @click="switchTab(0)">买卷</div>
          <div class="tab-item"
               :class="{'active': tabIndex === 1}"
               @click="switchTab(1)">推荐</div>
          <div class="tab-item"
               :class="{'active': tabIndex === 2}"
               @click="switchTab(2)">评价</div>
        </div>
      </div>
      <div class="volume-box">
        <!-- 代金卷 -->
        <volume-card :title="'代金卷'"
                     :list="[]" />
        <!-- 套餐卷 -->
        <volume-card :title="'套餐卷'"
                     :list="[]" />
      </div>
    </div>
    <!-- 商家推荐 -->
    <div class="store-recommend"
         ref="recommend">
      <p class="title">商家推荐</p>
      <!-- 推荐图片列表 -->
      <store />
    </div>
    <!-- 用户评价 comments discuss -->
    <div class="comments-box"
         ref="comments">
      <div class="comments-header">
        <div class="comments-friend">
          <div class="friend-list"></div>
          <span>{{3}}位好友来过</span>
        </div>
        <div class="entire-btn"
             @click="jumpPage">
          <span> 全部评价</span>
          <img class="icon"
               src="" />
        </div>
      </div>
      <!-- 评价列表 -->
      <div class="comments-main">
        <review v-for="v in 5"
                ref="commentsList"
                :key="v" />
      </div>
    </div>
  </div>
</template>

<script>
import { throttle, scrollSmoothTo } from '@/utils/index.js'
import review from './components/review.vue'
import store from './components/store.vue'
import volumeCard from './components/volumeCard.vue'

export default {
  name: 'sticky',
  components: {
    review,
    store,
    volumeCard
  },
  data () {
    return {
      isClickTab: false, // 是否点击了tab
      titleFixed: false, // 是否吸顶（绝对定位）
      tabIndex: 0, // 那个tabItem展示，0：买卷，1：推荐，2：评价
      detail: {
        title: '武汉光谷万豪超级豪华大酒店',
        tags: ['桌游密室', '聚餐', 'K歌', '电影演出', '周边游', '酒吧', '网咖电竞', '游泳健身', '其他'],
        friendNum: 3,
        score: 4,
        commentNum: 128,
        perPrice: 100,
        morning: '10:00-24:00',
        afternoon: '17:00-23:00',
        storeInfo: {
          tags: ['有宝箱', '可停车', '有宝宝座椅'],
          site: '松竹路楚河汉街第三街区薇拉摄影对面(近地铁楚河汉街B出口)',
          distance: '2.4km'
        }
      }
    }
  },
  created () {
    // 获取详情id
  },
  mounted () {
    this.titleFixed = false
    this.$refs.pageContent.addEventListener('scroll', this.handleScroll())
  },
  methods: {
    // 滚动监听，头部固定
    handleScroll () {
      let self = this
      // tabbar模块
      let ele = self.$refs.pride_tab_fixed
      // 商家推荐模块
      let recommendEle = self.$refs.recommend
      // 评价模块
      let commentsEle = self.$refs.comments
      // 监听函数——函数防抖
      return throttle(function () {
        // 获取tabbar距离顶部的距离
        let offsetTop = ele.getBoundingClientRect().top
        // tabbar是否吸顶
        self.titleFixed = offsetTop < 0
        // 判断当前事件是否是点击事件触发的，是，就直接退出，否则继续下步操作
        if (self.isClickTab) {
          return
        }
        // 获取商家推荐距离顶部的距离
        let offsetTopStore = recommendEle.getBoundingClientRect().top
        // 判断是否到顶
        // 获取评价模块距离顶部距离
        let offsetTopComments = commentsEle.getBoundingClientRect().top
        // 判断是否到顶
        if (offsetTopComments < 48) {
          self.tabIndex = 2
          return
        }
        if (offsetTopStore < 48) {
          self.tabIndex = 1
          return
        }
        if (offsetTop < 0) {
          self.tabIndex = 0
        }
      }, 50)
    },
    // 跳转到对应的模块
    switchTab (index) {
      // 当前是点击事件
      this.isClickTab = true
      // 对应的模块
      this.tabIndex = index
      // 元素对象
      const scrollPage = this.$refs.pageContent
      // 跳转
      const self = this
      // 声明距离顶部距离
      let distanceTop = 0
      // 判断点击的是那个tab，将其对应的offset进行保存
      switch (index) {
        case 0:
          // tabbar模块
          const ele = self.$refs.pride_tab_fixed
          distanceTop = ele.offsetTop
          break
        case 1:
          // 商家推荐模块
          const recommendEle = self.$refs.recommend
          distanceTop = recommendEle.offsetTop - 44
          break
        case 2:
          // 评价模块
          const commentsEle = self.$refs.comments
          distanceTop = commentsEle.offsetTop - 44
          break
      }
      // console.log(window.getComputedStyle(scrollPage).scrollBehavior)
      if (typeof window.getComputedStyle(scrollPage).scrollBehavior === 'undefined') {
        scrollSmoothTo(distanceTop, scrollPage)
      } else {
        scrollPage.scrollTo({
          top: distanceTop,
          behavior: 'smooth'
        })
      }
      setTimeout(() => {
        this.isClickTab = false
      }, 500)
    },
    // 跳转到全部评价
    jumpPage () {
      this.$router.push({ path: '/merchants/comments/list' })
    }
  },
  beforeDestroy () {
    this.$refs.pageContent.removeEventListener('scroll', this.handleScroll())
  }
}
</script>

<style scoped lang="less">
/* header */
.header {
  margin-top: 20px;
  background-color: @whiteBg;
  padding: 28px 0 32px 28px;
  // 标题
  .title {
    padding-right: 28px;
    font-size: 32px;
    line-height: 48px;
  }
  // 标签栏
  .tag-box {
    padding: 20px 0;
    padding-right: 28px;
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
    .friend-number {
      flex-shrink: 0;
      color: #999;
      text-align: right;
    }
  }
  // 评论杂项 misc
  .misc-box {
    display: flex;
    align-items: center;
    color: #ff5f00;
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
    }
    .comment-number {
      margin-right: 8px;
    }
  }
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
  // 店铺营业时间
  .store-intro {
    margin-top: 20px;
    display: flex;
    .time-icon {
      margin-top: 4px;
      width: 32px;
      height: 32px;
      margin-right: 16px;
      background-color: @themeBg;
      border-radius: 50%;
    }
    .table-time {
      .caption {
        line-height: 40px;
        .afternoon {
          margin-left: 40px;
        }
      }
      .store-tags {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .tag {
          margin-top: 12px;
          margin-right: 12px;
          padding: 4px 10px;
          border-radius: 10px;
          background-color: #d9d9d9;
          color: @colorWhite;
        }
      }
    }
  }
  // 店铺地址
  .store-adress {
    margin-top: 20px;
    display: flex;
    .site-icon {
      margin-top: 4px;
      width: 32px;
      height: 32px;
      margin-right: 16px;
      background-color: @themeBg;
      border-radius: 50%;
    }
    .site-main {
      line-height: 40px;
      .site-box {
        .distance {
          padding-left: 60px;
          position: relative;
          color: #999;
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 34px;
            width: 2px;
            height: 100%;
            background-color: #999;
          }
        }
      }
      .store-link {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .look-site {
          color: @themeColor;
        }
        .store-btn {
          display: flex;
          align-items: center;
          color: @colorWhite;
          background-color: @themeColor;
          padding: 8px 28px;
          border-radius: 80px;
          .btn-icon {
            width: 20px;
            height: 20px;
            background-color: @whiteBg;
            margin-right: 12px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
/* tab-bar-box start */
.tabbar-box {
  margin-top: 20px;
  background-color: @whiteBg;
  .tab-bar-fixed {
    width: 100%;
    height: 88px;
  }
  .tab-bar {
    width: 100%;
    height: 88px;
    line-height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid @themeBg;
    background-color: @whiteBg;
    &.tab-fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 49;
    }
    .tab-item {
      padding: 0 40px;
      position: relative;
      font-weight: bold;
      color: #888;
      &.active {
        color: #474747;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 44px;
          height: 8px;
          border-radius: 80px;
          background-color: @themeColor;
        }
      }
    }
  }
  .volume-box {
    padding: 0 28px 20px;
    overflow: hidden;
  }
}
/* tab-bar-box end */
/* 商家推荐 start */
.store-recommend {
  margin-top: 20px;
  padding: 28px 0 28px 28px;
  background-color: @whiteBg;
  .title {
    font-size: 32px;
  }
}
/* 商家推荐 end */
/* 评价列表 start */
.comments-box {
  margin-top: 20px;
  padding: 0 28px;
  background-color: @whiteBg;
  .comments-header {
    padding-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .comments-friend {
      display: flex;
      align-items: center;
    }
    .entire-btn {
      display: flex;
      align-items: center;
      color: @themeColor;
      .icon {
        width: 16px;
        height: 24px;
        margin-left: 10px;
        background-color: @themeColor;
      }
    }
  }
  .comments-main {
    padding-bottom: 40px;
  }
}
/* 评价列表 end */
</style>
