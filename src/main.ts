import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'
import './styles/index.scss'

import 'element-plus/theme-chalk/dark/css-vars.css' // 设置深色模式

// @ts-expect-error ts忽略下一行代码类型检查
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './style.css'
import * as ElementPlusIcons from '@element-plus/icons-vue'

import i18n from './language' // 引入语言配置
import App from './App.vue'
import 'virtual:uno.css'
import { setRouter } from './router'
import './permisstion'

// axios({ // 请求mock接口假数据
//   url: '/api/user/login',
//   method: 'post',
//   data: { username: 'admin', password: '111111' },
// })

const app = createApp(App)
setPinia(app)
setRouter(app)
app.use(i18n)
for (const [key, component] of Object.entries(ElementPlusIcons))
  app.component(key, component)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
// createApp(App ).mount('#app')
