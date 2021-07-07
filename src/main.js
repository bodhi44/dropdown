import Vue from 'vue'
import App from './App.vue'
import router from './routers/'

// h5自适应 rem
import 'amfe-flexible/index'
// 全局样式，重置，跨浏览器重置，字体图标
import './styles/main.less'
// vue h5 穿透 300毫秒延迟
import FastClick from 'fastclick'

// 导入mint ui 组件
import {
  Button,
  InfiniteScroll,
  Spinner,
  Loadmore,
  Field,
  Lazyload
} from 'mint-ui'

// 注册mint ui 组件
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
Vue.use(InfiniteScroll)
Vue.use(Lazyload)

// vue h5 300毫秒延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
