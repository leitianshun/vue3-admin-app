interface userInfo {
  name: string
  age: number
  count: number
}

export const useUserStore = defineStore({
  id: 'user',
  persist: true,
  state: (): userInfo => ({
    name: 'hello',
    age: 17,
    count: 0,
  }),
  getters: {
    getCount(): number {
      return this.count
    },
  },
  actions: {
    setCount() {
      this.count += 1
    },
  },
})
