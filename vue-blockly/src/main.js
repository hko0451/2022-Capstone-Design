import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/style.scss'
import '@/assets/styles/icofont.min.css'
import VueCookies from 'vue-cookies'

const Vue = createApp(App)

Vue.use(router)
Vue.use(VueCookies)
Vue.mount('#app')
