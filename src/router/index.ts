import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
      keepAlive: false,
    },
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/404/404.vue'),
    meta: {
      title: '404',
      hidden: true,
      keepAlive: false,
      icon: 'DocumentDelete',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'anyRouter',
  },
]

export const router = createRouter({
  history: createWebHistory(), // createWebHashHistory URL带#，createWebHistory URL不带#
  routes,
  scrollBehavior() { // 滚动行为
    return {
      left: 0,
      top: 0,
    }
  },
})

console.log(router.hasRoute('login'))
console.log(router.getRoutes())
export function resetRouter(): void { // 重置路由
  const resetWhiteNameList = ['register', 'login'] // 路由白名单
  router.getRoutes().forEach((route) => { // 获取所有router数组
    const { name } = route // 获取路由name
    if (name && !resetWhiteNameList.includes(name as string))
      router.hasRoute(name) && router.removeRoute(name)
  })
}

export function setRouter(app: App<Element>) {
  app.use(router)
}
