import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '@/views/SignUp'
import Redirect from '@/oauth/Redirect'
import BlocklyDisplay from '@/views/BlocklyDisplay'
import Login from '@/views/Login'
import CodeDisplay from '@/views/CodeDisplay'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/blockly',
    name: 'BlocklyDisplay',
    component: BlocklyDisplay
  },
  {
    path: '/code',
    name: 'CodeDisplay',
    component: CodeDisplay
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
