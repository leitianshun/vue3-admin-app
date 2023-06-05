import type { RouteRecordRaw } from 'vue-router'
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

function filterAsyncRoute(asyncRoutes: any[], routes: any) {
  return asyncRoutes.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0)
        item.children = filterAsyncRoute(item.children, routes)
    }
    return true
  })
}

// function addRute(route: any) {
//   route.forEach((route: any) => {
//     if (!route.children)
//       route.component = layout
//     else
//       route.component = () => import(`@/views/${route.path}`)
//     if (route.children && route.children.length > 0)
//       route.children = addRute(route.children)
//   })
// }

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
    async  login(data: loginForm) {
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
        const userAsyncRoutes = filterAsyncRoute(asyncRoutes, res.data.routes)
        this.menuRoutes = [...constantRoute, ...userAsyncRoutes, anyRoute]
        const asyncRoute = [...userAsyncRoutes, anyRoute]
        asyncRoute.forEach((route: any) => {
          router.addRoute(route)
        })
        return true
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
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
})
