import Vue from 'vue'
import App from './App.vue'

// h5自适应 rem
import 'amfe-flexible/index'
// 全局样式，重置，跨浏览器重置，字体图标
import './styles/main.less'
// vue h5 穿透 300毫秒延迟
import FastClick from 'fastclick'

// vue h5 300毫秒延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
