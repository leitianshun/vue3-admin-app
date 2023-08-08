import type { RouteRecordRaw } from 'vue-router'

import cloneDeep from 'lodash/cloneDeep'
import { anyRoute, asyncRoutes, constantRoute } from '@/router/routes'
import type { loginForm } from '@/types/user'
import { router } from '@/router/index'

interface userInfo {
  token: string
  menuRoutes: RouteRecordRaw[]
  avatar: string
  buttons: any[]
  name: string
  routes: any[]
}

function filterAsyncRoute(asyncRoutes: any, routes: any) {
  return asyncRoutes.filter((item: any) => {
    if (routes.includes(item.name)) { // 这里要注意，如果符合条件要返回true
      if (item.children && item.children.length > 0)
        item.children = filterAsyncRoute(item.children, routes)
      return true
    }
  })
}

export const useUserStore = defineStore({
  id: 'user',
  persist: {
    paths: ['token', 'menuRoutes', 'avatar', 'buttons', 'routes', 'asyncRoutes'], // 这里配置需要持久化的数据，name就不会被持久化会存储，所以路由守卫可以根据他来重新获取路由数据
  },
  state: (): userInfo => ({
    token: '',
    menuRoutes: constantRoute,
    avatar: '',
    buttons: [],
    name: '',
    routes: [],
  }),
  getters: {
    getToken(): string {
      return this.token
    },
  },
  actions: {
    async login(data: loginForm) {
      try {
        const res = await login(data)
        if (res.code === 200)
          this.token = res.data
        else
          return Promise.reject(new Error(res.data))
      }
      catch (err) {
        console.log(err)
      }
    },
    async userInfo() {
      const res = await getUserInfo()
      if (res.code === 200) {
        this.avatar = res.data.avatar
        this.name = res.data.name
        this.buttons = res.data.buttons
        this.routes = res.data.routes
        const userAsyncRoutes = filterAsyncRoute(cloneDeep(asyncRoutes), res.data.routes) // 这里要进行深拷贝，否则就会影响下次过滤，这样就可以保证每次过滤的异步路由都是完整的,而不是被上次过滤之后的不完整的路由。
        // const userAsyncRoutes = filterAsyncRoute(cloneDeep(asyncRoutes), res.data.routes)  //这里可以深拷贝一下，解决路由丢失问题，不影响原有的异步路由
        console.log(userAsyncRoutes)
        this.menuRoutes = [...constantRoute, ...userAsyncRoutes, anyRoute]
        const asyncRoute = [...userAsyncRoutes, anyRoute]
        asyncRoute.forEach((route: any) => {
          router.addRoute(route)
        })
        return true // 保证获取成功，返回成功的promise
      }
      else {
        return Promise.reject(new Error(res.message))
      }
    },
    async logout() {
      const res = await logout()
      if (res.code === 200) {
        this.$reset()
        router.push('/login')
        return 'ok' // 保证退出成功，返回成功的promise
      }
      else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
})
