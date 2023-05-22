import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:uno.css'
import { setRouter } from './router'

const app = createApp(App)
setPinia(app)
setRouter(app)
app.mount('#app')
// createApp(App ).mount('#app')
