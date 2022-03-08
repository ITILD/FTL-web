import { createApp } from 'vue'
import App from './App.vue'
// import './index.css'
import Antd from './config/devLibConfig/antd'
import './config/devLibConfig/mock/mock.js'
// import axios from 'axios'
import './config/devLibConfig/axios'


import router from './router'
import store from './store'
const app = createApp(App)
 
app.use(router)
app.use(store)
app.use(Antd);
app.mount('#app')
 
// createApp(App).mount('#app')