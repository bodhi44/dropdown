<template>
  <div class="page-content">
    <ul>
      <li class="lazy-loaded"
          v-for="v in 10"
          :key="v">
        <div class="template"
             style="display:none;">
          <img src="https://fmm-oss.jijuekeji.com/d_icon3.png"
               width="100%"
               height="100%"
               border="0" />
        </div>
        <span class="loading">正在加载...</span>
      </li>
    </ul>
  </div>
</template>

<script>
let observer = null
export default {
  name: 'lazyLoadImg',
  mounted () {
    // 事件观察者
    observer = new IntersectionObserver(this.observerCall)
    // 过滤元素
    this.filterDom('.lazy-loaded').forEach(function (item) {
      console.log(item)
      observer.observe(item)
    })
  },
  methods: {
    // 获取dom
    filterDom (selector) {
      return Array.from(document.querySelectorAll(selector))
    },
    observerCall (changes) {
      changes.forEach(function (change) {
        setTimeout(function () {
          if (change.intersectionRatio > 0) {
            var container = change.target
            var content = container.querySelector('.template').children[0]
            container.appendChild(content)
            container.querySelector('.loading').style.display = 'none'
            observer.unobserve(container)
          }
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
ul {
  width: 100%;
  overflow: hidden;
}
ul li {
  position: relative;
  width: 100%;
  height: 0;
  background-color: #ccc;
  overflow: hidden;
  text-align: center;
  line-height: 400px;
  color: red;
  font-size: 24px;
  padding-top: 100%;
}
ul li img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
