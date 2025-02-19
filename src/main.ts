//import './assets/main.css'
//import 'normalize.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// if you just want to import css
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/dark/css-vars.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)

app.use(createPinia())
app.use(router)

app.mount('#app')
