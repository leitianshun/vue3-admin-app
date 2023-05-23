import { createApp } from 'vue'
import ElementPlus from 'element-plus'

// @ts-expect-error ts忽略下一行代码类型检查
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './style.css'
import App from './App.vue'
import 'virtual:uno.css'
import { setRouter } from './router'

const app = createApp(App)
setPinia(app)
setRouter(app)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
// createApp(App ).mount('#app')
