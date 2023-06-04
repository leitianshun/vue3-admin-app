interface useState {
  isCollapse: boolean
}

export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): useState => ({
    isCollapse: false,
  }),
  getters: {},
  actions: {
    setCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
})
