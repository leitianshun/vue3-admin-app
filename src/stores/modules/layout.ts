interface useState {
  isCollapse: boolean
  refresh: boolean
}

export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): useState => ({
    isCollapse: false,
    refresh: false,
  }),
  getters: {},
  actions: {
    setCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setRefresh() {
      this.refresh = !this.refresh
    },
  },
})
