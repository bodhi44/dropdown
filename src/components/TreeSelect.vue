<template>
  <div class="aside-content">
    <div class="aside-nav">
      <div class="nav-item"
           :class="{'active': index === selIndex}"
           @click="changeNav(index)"
           v-for="(item, index) in navItems"
           :key="item.id">
        {{item.text}}
      </div>
    </div>
    <div class="aside-main">
      <div class="aside-sub"
           :class="{'active': selSubIndex === index}"
           @click="changeItem(index)"
           v-for="(item, index) in subItems"
           :key="item.id">
        <div>{{item.text}}</div>
        <img class="sub-icon"
             :src="index === selSubIndex?checkedImg:checkImg" />
      </div>
    </div>
  </div>
</template>

<script>
// const app = this.$app()

export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    subActiveIndex: {
      type: Number,
      default: -1
    },
    navItems: {
      type: Array,
      default: () => ([{ id: 1, text: '浙江', selected: {}, children: [{ id: 11, text: '杭州' }, { id: 12, text: '温州' }, { id: 13, text: '义乌' }] }, { id: 2, text: '江苏', selected: {}, children: [{ id: 21, text: '南京' }, { id: 22, text: '徐州' }, { id: 23, text: '苏州' }] }])
    }
  },
  data () {
    return {
      checkImg: require('../assets/images/merchants/check.png'),
      checkedImg: require('../assets/images/merchants/checked.png'),
      subItems: [],
      selIndex: 0,
      selSubIndex: -1
    }
  },
  watch: {
    // selIndex: { // 深度监听，可监听到对象、数组的变化
    //   handler (val, oldVal) {
    //     console.log('b.c: ' + val.c, oldVal.c)
    //   },
    //   deep: true // true 深度监听
    // }
    selIndex (index) {
      this.subItems = this.navItems[index].children
    }
  },
  created () {
    this.selIndex = this.activeIndex
    this.selSubIndex = this.subActiveIndex
    this.subItems = this.navItems[this.activeIndex].children
  },
  methods: {
    // 切换父级
    changeNav (index) {
      // console.log(index)
      this.selIndex = index
      // 将当前选中item保存
      const selectedItems = this.navItems[index]
      // 判断当前选中的数组中，是否有保存的选中对象，有则直接赋值，否则赋值为-1
      if (selectedItems.selected.id) {
        selectedItems.children.forEach((v, i) => {
          if (selectedItems.selected.id === v.id) {
            this.selSubIndex = i
          }
        })
      } else {
        this.selSubIndex = -1
      }
    },
    // 切换子集
    changeItem (index) {
      this.selSubIndex = index
      // 将但钱选中subItem保存
      const selectedSubItems = this.subItems[index]
      // 将其保存在选中的数据中
      this.navItems.map((v, i) => {
        if (i === this.selIndex) {
          v.selected = selectedSubItems
        } else {
          v.selected = {}
        }
      })
      // this.navItems[this.selIndex].selected = selectedSubItems
      // 将当前选中返回出去
      this.$emit('click-item', { items: this.navItems, selIndex: this.selIndex, selSubIndex: index })
    }
  }
}
</script>

<style scoped lang="less">
/* 分类选择 start */
.aside-content {
  display: flex;
  max-height: 400px;
  min-height: 200px;
}

.aside-nav {
  background-color: @bottomColor;
  width: 160px;
  max-height: 100%;
  overflow-y: auto;
  .nav-item {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    text-align: center;
    &.active {
      background-color: @whiteBg;
      color: @themeColor;
    }
  }
}

.aside-main {
  background-color: @whiteBg;
  width: calc(100% - 160px);
  max-height: 100%;
  padding: 0 20px;
  overflow-y: auto;
  .aside-sub {
    padding: 0 20px;
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-bottom: 2px solid @themeBg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:last-of-type {
      border-bottom: none;
    }
    &.active {
      color: @themeColor;
    }
  }
}

.sub-icon {
  width: 28px;
  height: 28px;
  object-fit: revert;
}
/* 分类选择 end */
</style>
