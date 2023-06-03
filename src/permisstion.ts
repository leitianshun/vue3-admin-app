import { resetRouter, router } from '@/router/index'

router.beforeEach(async (to: any, from: any, next: any) => {
  start()
  document.title = `小雷甄选运营平台-${to.meta.title}`
  const token = useUserStore().token
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    }
    else {
      if (useUserStore().name) {
        next()
      }
      else {
        try {
          await useUserStore().userInfo()
          next({ ...to }) // 防止刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果  hank方法
        }
        catch (err) {
          useUserStore().logout()
        }
      }
    }
  }
  else {
    if (to.path === '/login')
      next()
    else
      resetRouter()
    next({ path: '/login', query: { redirect: to.path } })
  }
})

router.afterEach((to: any, from: any) => {
  close()
})
