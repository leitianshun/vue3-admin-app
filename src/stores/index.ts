import type { App } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // pinia 持久化存储插件
export function setPinia(app: App<Element>) {
  app.use(pinia)
}
