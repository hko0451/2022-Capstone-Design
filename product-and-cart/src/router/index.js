import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products'
import PastOrders from '../views/PastOrders'
// import VueCookies from 'vue-cookies'
import SignUp from '@/views/SignUp'
import Login from '@/views/Login'
import Redirect from '@/oauth/Redirect'
import BlocklyDisplay from '@/views/BlocklyDisplay'
// import { store } from '@/store/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/past-orders',
    name: 'PastOrders',
    component: PastOrders
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/oauth/redir',
    name: 'redirect',
    component: Redirect
  },
  {
    path: '/blockly',
    name: 'BlocklyDisplay',
    component: BlocklyDisplay
  }
]

// routes.beforeEach(async (to, from, next) => {
//   if (VueCookies.get('accessToken') === null && VueCookies.get('refreshToken') != null) {
//     await store.dispatch('refreshToken')
//   }
//   if (VueCookies.get('accessToken')) {
//     return next()
//   }
//   if (VueCookies.get('accessToken') === null && VueCookies.get('refreshToken') === null) {
//     return next({ name: 'Login' })
//   }
//
//   return next()
// })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
