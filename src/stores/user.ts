import type { RouteRecordRaw } from 'vue-router'
import { anyRoute, asyncRoutes } from './../router/asyncRoutes'
import type { loginForm } from '@/types/user'
import { router, routes } from '@/router/index'

interface userInfo {
  token: string
  menuRoutes: RouteRecordRaw[]
  avatar: string
  buttons: any[]
  name: string
  routes: any[]
}

function filterAsyncRoute(asyncRoutes: any[], routes: string[]) {
  return asyncRoutes.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0)
        item.children = filterAsyncRoute(item.children, routes)
    }
    return true
  })
}

export const useUserStore = defineStore({
  id: 'user',
  persist: true,
  state: (): userInfo => ({
    token: '',
    menuRoutes: routes,
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
    async  login(data: loginForm) {
      try {
        const res = await login(data)
        if (res.code === 200)
          this.token = res.data
        else
          return Promise.reject(new Error('登录失败'))
      }
      catch (err) {
        return Promise.reject(err)
      }
    },
    async getUserInfo() {
      const res = await getUserInfo()
      if (res.data) {
        this.avatar = res.data.avatar
        this.name = res.data.name
        this.buttons = res.data.buttons
        this.routes = res.data.routes
        const userAsyncRoutes = filterAsyncRoute(asyncRoutes, this.routes)
        this.menuRoutes = [...routes, ...userAsyncRoutes, anyRoute]
        const asyncRoute = [...userAsyncRoutes, anyRoute]
        asyncRoute.forEach((route: any) => {
          router.addRoute(route)
        })
        // console.log(routes)
      }
    },
    async logout() {
      await logout()
      this.$reset()
      // useRouter().push('/login')
    },
  },
})
