<template>
  <div>
    <div class="drop-menu">
      <div class="drop-item"
           @click="handleClick(index)"
           v-for="(item, index) in menu"
           :key="item.id"
           :class="{'active': item.isActive}">
        <span>{{item.text}}</span>
        <img class="menu-img"
             :class="{'active': item.isActive}"
             :src="dropDownImg" />
      </div>
    </div>
    <!-- 选项 -->
    <div>
      <div class="drop-content"
           :style="overlay">
        <div class="mask"
             @click="closeMask"
             :style="`animation-duration: ${duration}s; ${overlay}`"
             :class="maskClassConversion"></div>
        <!-- 下拉选项框 -->
        <div class="drop-options"
             :class="[showOrHide?'slide-down':'slide-up']"
             :style="`transition-duration: ${duration}}s; ${overlay}`">
          <div class="options"
               @click="closeMask(item)"
               v-for="item in selectedItem"
               :class="{'active': item.itemIsActive}"
               :key="item.id">
            <!-- <span>{{item.text}}</span> -->
            <!-- <i :class="{'options-icon': item.itemIsActive}"></i> -->
            <div>{{item.text}}</div>
            <img class="options-img"
                 :src="item.itemIsActive?checkedImg:checkImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default: () => ([
        {
          id: 11,
          text: '分类',
          isActive: false,
          selectedId: 1,
          type: 'test'
        },
        {
          id: 21,
          text: '排序',
          isActive: false,
          selectedId: 1,
          type: 'test1'
        }
      ])
    },
    dropOptions: {
      type: Array,
      default: () => ([
        {
          id: 0,
          rank: [
            {
              id: 1,
              text: '浙江',
              itemIsActive: true
            },
            {
              id: 2,
              text: '江苏',
              itemIsActive: false
            },
            {
              id: 3,
              text: '海南',
              itemIsActive: false
            }
          ]
        },
        {
          id: 1,
          rank: [
            {
              id: 1,
              text: '好评优先',
              itemIsActive: true
            },
            {
              id: 2,
              text: '距离优先',
              itemIsActive: false
            }
          ]
        }
      ])
    },
    dropSelArray: {
      type: Array,
      default: () => ([{
        id: 1,
        text: '好评优先',
        itemIsActive: true
      },
      {
        id: 2,
        text: '距离优先',
        itemIsActive: false
      }])
    },
    treeItems: {
      type: Array,
      default: () => ([{ id: 1, text: '浙江', selected: {}, children: [{ id: 11, text: '杭州' }, { id: 12, text: '温州' }, { id: 13, text: '义乌' }] }, { id: 2, text: '江苏', selected: {}, children: [{ id: 21, text: '南京' }, { id: 22, text: '徐州' }, { id: 23, text: '苏州' }] }])
    },
    treeSelIndex: {
      type: Number,
      default: 0
    },
    treeSelSubIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      dropDownImg: require('../assets/images/merchants/down.png'),
      checkImg: require('../assets/images/merchants/check.png'),
      checkedImg: require('../assets/images/merchants/checked.png'),
      isFirstOpen: true,
      duration: 0.2, // 延时时间
      overlay: 'display:none;', // 是否覆盖, 默认none
      showOrHide: false, // 是否显示，默认false
      maskClassConversion: 'mask-leave', // 遮罩层显示样式，默认mask-leave
      selectIndex: -1, // 默认选中的下标
      // 下拉选项，被选中那组的数据，由下面的js控制赋值
      selectedItem: [],
      menu: [],
      options: [],
      navItems: [],
      subActiveIndex: -1, // 当前选中的右边下标
      activeIndex: 0 // 当前选中的左边下标
    }
  },
  created () {
    // 初始化数据
    this.menu = this.menus
    this.options = this.dropOptions
    this.selectedItem = this.dropSelArray
    // 多列选择
    this.navItems = this.treeItems
    this.activeIndex = this.treeSelIndex
    this.subActiveIndex = this.treeSelSubIndex
    // 先找出当前选中的值
    // 判断是否有默认值
    this.menu.map((v, i) => {
      // eslint-disable-next-line no-self-assign
      if (v.selectedId) {
        this.options[i].rank.forEach(item => {
          if (item.id === v.selectedId) {
            v.text = item.text
          }
        })
      }
    })
  },
  methods: {
    handleClick (index) {
      // 展示的样式动画
      this.openOverlay(index)
      // 点击事件，开始时一定会执行的，先令所有下拉选项先隐藏
      this.showOrHide = false
      // 当点击的是已经点开的菜单项，则隐藏
      if (this.selectIndex === index) {
        this.menu[index].isActive = false
        // 重置所有样式
        this.selectIndex = -1
        // 恢复其第一次状态
        this.isFirstOpen = true
        return
      }
      // 令当前点击的菜单栏高亮
      this.menu.map((v, i) => {
        i === index ? v.isActive = true : v.isActive = false
      })
      // this.selectedItem = this.options[index].rank
      // this.selectIndex = index
      // 延时下拉上收
      // 判断当前mask是否展开，展开300，与动画同步，否则，100
      let time = !this.isFirstOpen ? 400 : 100
      // 定义一个延迟0.1秒的函数，和函数动画事件对上
      setTimeout(() => {
        this.showOrHide = true
        // 替换数据
        // if (index === 1) {
        this.selectedItem = this.options[index].rank
        // }
        // 选中当前对应的下标
        this.selectIndex = index
      }, time)
    },
    closeMask (item = {}) {
      // 恢复其第一次状态
      this.isFirstOpen = true
      // 隐藏的样式动画
      this.closeOverlay()
      // 如果点击的是选项
      if (item.text) {
        // 被点击的下拉选项高亮
        this.selectedItem.map((v) => {
          v.text === item.text ? v.itemIsActive = true : v.itemIsActive = false
        })
      }
      // 判断点击的是遮罩层还是下拉选项，如果是下拉选项则把选择的内容赋值到导航栏上，并且把v.isActive = false，让菜单栏高亮消失
      // 如果不是，不用赋值，直接把v.isActive = false，让菜单栏高亮消失
      item.text ? (this.menu.map((v, i) => {
        // eslint-disable-next-line no-self-assign
        i === this.selectIndex ? (v.text = item.text) : v.text = v.text
        v.isActive = false
      })) : (this.menu.map((v) => { v.isActive = false }))

      // 拿到listNum对应的navItem的数据，对比id，如果相同，直接退出并关闭；
      if (item.id === undefined || this.menu[this.selectIndex].selectedId === item.id) {
        this.selectIndex = -1
        this.showOrHide = false
        // 通知父级
        // this.$emit('closeMask', { menu: this.menu, options: this.options, dropSelArray: this.selectedItem, treeItems: this.navItems, treeSelIndex: this.activeIndex, treeSelSubIndex: this.subActiveIndex })
        // 选中的哪些对象
        const dropSelObj = this.selectedItem.filter(v => {
          return v.itemIsActive
        })
        // 通知父级
        this.$emit('closeMask', { dropSelObj: dropSelObj[0] })
        return
      }
      // 否则继续其他操作，并发送请求获取数据
      this.menu[this.selectIndex].selectedId = item.id
      this.selectIndex = -1
      this.showOrHide = false
      // 选中的哪些对象
      const dropSelObj = this.selectedItem.filter(v => {
        return v.itemIsActive
      })
      // 通知父级
      this.$emit('closeMask', { dropSelObj: dropSelObj[0] })
    },
    // 打开延时时间展示覆盖
    openOverlay (index) {
      // 如果点击的是同一个，则直接关闭drop
      if (this.selectIndex === index) {
        this.closeOverlay()
        return
      }
      // 判断当前mask是打开状态下
      if (this.overlay === '') {
        this.isFirstOpen = false
        return
      }
      // 获取延时时间
      this.overlay = ''
      this.maskClassConversion = 'mask-active'
      setTimeout(() => {
        this.maskClassConversion = ''
      }, this.duration * 1000)
    },
    // 根据延时时间展示覆盖
    closeOverlay () {
      // 获取延时时间
      this.maskClassConversion = 'mask-leave'
      setTimeout(() => {
        this.overlay = 'display:none;'
        this.maskClassConversion = ''
      }, this.duration * 1000)
    },
    // 点击treeSelect关闭，并赋值
    closeTreeSelect (detail) {
      // console.log(detail)
      this.navItems = detail.items
      this.subActiveIndex = detail.selSubIndex
      this.activeIndex = detail.selIndex
      this.closeMask()
    }
  }
}
</script>

<style scoped lang="less">
.drop-menu {
  width: 100%;
  height: 100px;
  line-height: 100px;
  box-shadow: 0 4px 24px rgba(100, 101, 102, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.drop-item {
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &.active {
    color: @themeColor;
  }
}

.menu-icon {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 16px solid #888;
  margin-left: 16px;
  transition: transform 0.2s;
  &.active {
    border-top-color: @themeColor;
    transform: rotate(180deg);
  }
}
.menu-img {
  width: 28px;
  height: 16px;
  margin-left: 16px;
  transition: transform 0.2s;
  &.active {
    transform: rotate(180deg);
  }
}

.drop-content {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 110;
  overflow: hidden;
}

.drop-options {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 400px;
  min-height: 200px;
  background-color: @whiteBg;
  // transition: transform 0.3s, -webkit-transform 0.3s;
  transition: transform 0.3s cubic-bezier(1, 0, 0, 1),
    -webkit-transform 0.3s cubic-bezier(1, 0, 0, 1);
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 48px;
  padding: 20px 36px;
  &.active {
    color: @themeColor;
  }
}

.options-icon {
  width: 48px;
  height: 48px;
  position: relative;
  &::before,
  &::after {
    content: '';
    width: calc(100% / 3);
    height: 2px;
    background-color: @themeColor;
    transform: rotate(-135deg);
    position: absolute;
    top: 70%;
    left: 40%;
    border-radius: 2px;
    transform-origin: left bottom;
  }
  &::after {
    width: calc((100% / 3) * 2);
    transform: rotate(-45deg);
  }
}
.options-img {
  width: 28px;
  height: 28px;
  object-fit: revert;
}

/* 动画slide-down/slide-up 开始 */
.slide-up {
  transform: translate3d(0, -100%, 0);
}

.slide-down {
  transition-timing-function: ease-out;
}
/* 动画slide-down/slide-up 结束 */

/* mask 遮罩层 start */
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.26);
  z-index: 1;
  &.mask-active {
    animation: 0.3s van-fade-in both ease-out;
  }

  &.mask-leave {
    animation: 0.3s van-fade-out both ease-in;
  }
}
/* mask 遮罩层 end */

/* animation start */
@keyframes van-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes van-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
/* animation end */
</style>
