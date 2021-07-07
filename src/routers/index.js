/**
 * @description: 路由
 * @author: bing
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页',
      requireAuth: false // 登录权限
    }
  },
  {
    path: '/dropdown',
    name: 'dropdown',
    component: () => import('@/views/dropdown/index.vue'),
    meta: {
      title: '下拉选择',
      requireAuth: false // 登录权限
    }
  },
  {
    path: '/sticky',
    name: 'sticky',
    component: () => import('@/views/sticky/index.vue'),
    meta: {
      title: '平滑锚点+吸顶',
      requireAuth: false // 登录权限
    }
  },
  {
    path: '/lazyLoad',
    name: 'lazyLoad',
    component: () => import('@/views/lazyLoadImg/index.vue'),
    meta: {
      title: '图片懒加载',
      requireAuth: false // 登录权限
    }
  }
  // {
  //   path: '/hello',
  //   name: 'hello',
  //   component: () =>
  //     import(/* webpackChunkName: "hello" */ '@/views/hello/index.vue'),
  //   meta: {
  //     title: '测试页',
  //     requireAuth: false // 登录权限
  //   }
  // },
  // {
  //   path: '/pull-refresh',
  //   name: 'pullRefresh',
  //   component: () => import('@/views/hello/pull-refresh.vue'),
  //   meta: {
  //     title: '无线加载页',
  //     requireAuth: false // 登录权限
  //   }
  // },
  // {
  //   path: '/announcement',
  //   name: 'announcement',
  //   component: () => import('@/views/hello/announcement.vue'),
  //   meta: {
  //     title: '官方公告',
  //     requireAuth: false // 登录权限
  //   }
  // },
  // {
  //   // 商户列表
  //   path: '/merchants/list',
  //   name: 'merchantsList',
  //   component: () => import('@/views/merchants/list.vue'),
  //   meta: {
  //     title: '商户列表',
  //     require: false
  //   }
  // },
  // {
  //   // 商户详情
  //   path: '/merchants/detail/:id',
  //   name: 'merchantsDetail',
  //   component: () => import('@/views/merchants/detail.vue'),
  //   meta: {
  //     title: '商户详情',
  //     require: false
  //   }
  // },
  // {
  //   // 商户全部评价列表
  //   path: '/merchants/comments/list',
  //   name: 'merchantsCommentsList',
  //   component: () => import('@/views/merchants/comments/list.vue'),
  //   meta: {
  //     title: '全部评价',
  //     require: false
  //   }
  // },
  // {
  //   // 商户全部评价详情
  //   path: '/merchants/comments/detail/:id',
  //   name: 'merchantsCommentsDetail',
  //   component: () => import('@/views/merchants/comments/detail.vue'),
  //   meta: {
  //     title: '评价详情',
  //     require: false
  //   }
  // },
  // {
  //   // 商户详情
  //   path: '/datePicker',
  //   name: 'datePicker',
  //   component: () => import('@/views/datepicker/index'),
  //   meta: {
  //     title: '日历展示页',
  //     require: false
  //   }
  // }
]

const router = new Router({
  // mode: 'history',
  mode: 'hash',
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
