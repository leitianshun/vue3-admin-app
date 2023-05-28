import type { loginForm } from '@/types/user'

interface userInfo {
  token: string
}

export const useUserStore = defineStore({
  id: 'user',
  persist: true,
  state: (): userInfo => ({
    token: '',
  }),
  getters: {
    getToken(): string {
      return this.token
    },
  },
  actions: {
    async  login(data: loginForm) {
      const res = await login(data)
      if (res.data)
        console.log(res.data.data)
      this.token = res.data.data
    },
  },
})
