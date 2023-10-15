import './assets/main.css'

import mitt from 'mitt'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const emitter = mitt()
const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.emitter = emitter
app.provide('emitter', emitter)
app.use(pinia)
app.mount('#app')
