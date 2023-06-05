import { resetRouter, router } from '@/router/index'

router.beforeEach(async (to: any, from: any, next: any) => {
  start()
  document.title = `${to.meta.title}` ? `小雷甄选运营平台-${to.meta.title}` : '小雷甄选运营平台'
  const token = useUserStore().token
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    }
    else {
      if (useUserStore().name) { // 这里注意，不要把他存在本地，因为用户刷新时动态路由要重新获取，根据这个字段来判断，如果没有这个字段，就会重新获取，重新添加到router中，这样路由就不会丢失。
        next()
      }
      else {
        try {
          await useUserStore().userInfo() // 每次刷新，都需要重新获取动态路由,再次使用addRoute添加到路由表中。
          next({ ...to, replace: true }) // 防止刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果  hank方法
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
