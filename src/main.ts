import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'
import './styles/index.scss'

// @ts-expect-error ts忽略下一行代码类型检查
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './style.css'
import App from './App.vue'
import 'virtual:uno.css'
import { setRouter } from './router'

// axios({ // 请求mock接口假数据
//   url: '/api/user/login',
//   method: 'post',
//   data: { username: 'admin', password: '111111' },
// })

const app = createApp(App)
setPinia(app)
setRouter(app)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
// createApp(App ).mount('#app')
