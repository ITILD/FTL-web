import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
// 基础路径配置   vite.config.js    define后可读取
// console.log('js基础路径配置',process)
