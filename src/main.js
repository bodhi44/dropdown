import Vue from 'vue'
import App from './App.vue'

// h5自适应 rem
import 'amfe-flexible/index'
// 全局样式，重置，跨浏览器重置，字体图标
import './styles/main.less'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
