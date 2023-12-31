// import { useI18n } from 'vue-i18n'
// const { locale } = useI18n()  这种写法适合setup
// local.value = 'zh'

// import i18n from '@/language'
// i18n.global.locale = 'zh'
// 如果关闭了legacy 可以使用i18n.global.locale.value = 'zh'

interface useState {
  isCollapse: boolean
  refresh: boolean
  isDark: boolean
  color: string
}

export const useLayoutStore = defineStore({
  id: 'layout',
  persist: true, // 这里要开启持久化缓存，不然不会持久化缓存
  //  {
  //   paths: ['color'],
  // },
  state: (): useState => ({
    isCollapse: false,
    refresh: false,
    isDark: false,
    color: '#1E90FF',
  }),
  getters: {
  },
  actions: {
    setCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setRefresh() {
      this.refresh = !this.refresh
    },
    setDark() { // 设置深色模式
      const html = document.documentElement
      this.isDark ? html.className = 'dark' : html.className = ''
    },
    setColor() { // 设置主题色
      const el = document.documentElement
      getComputedStyle(el).getPropertyValue('--el-color-primary')
      el.style.setProperty('--el-color-primary', this.color)
    },
  },
})
