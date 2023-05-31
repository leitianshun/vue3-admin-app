// import { asyncRoutes } from './../router/asyncRoutes';
import type { RouteRecordRaw } from 'vue-router'
import type { loginForm } from '@/types/user'
import { routes } from '@/router/index'

interface userInfo {
  token: string
  menuRoutes: RouteRecordRaw[]
  avatar: string
  buttons: any[]
  name: string
}

// filterAsyncRoute(asyncRoute:typeRouteRecordRaw,routes:string[]){
//   return asyncRoutes.filter(item => {
//     if (routes.includes(item.name)) {
//       if (item.children && item.children.length > 0) {
//         item.children = filterAsyncRoute(item.children,routes)
//       }
//     }
//   })

// }

export const useUserStore = defineStore({
  id: 'user',
  persist: true,
  state: (): userInfo => ({
    token: '',
    menuRoutes: routes,
    avatar: '',
    buttons: [],
    name: '',
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
      }
    },
    async logout() {
      await logout()
      this.$reset()
      // useRouter().push('/login')
    },
  },
})
