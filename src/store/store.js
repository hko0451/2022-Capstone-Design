import { createStore } from 'vuex'
import { login } from './module/login'
// import Vuex from vuex => vuex 3.0

export const store = createStore({
  modules: {
    login
  }
})
