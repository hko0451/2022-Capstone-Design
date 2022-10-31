import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/style.scss'
import '@/assets/styles/icofont.min.css'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import { store } from '@/store/store'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

const Vue = createApp(App)

Vue.config.globalProperties.$store = store
Vue.config.globalProperties.$axios = axios // vue3 global properties

Vue.use(router)
Vue.use(VueCookies)
Vue.use(store)
// Vue.use(BootstrapVue)
Vue.mount('#app')
