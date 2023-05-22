import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/home/home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(), // createWebHashHistory URL带#，createWebHistory URL不带#
  routes,
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
