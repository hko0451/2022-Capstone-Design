import axios from 'axios'
import VueCookies from 'vue-cookies'
import URL from '@/const/url_const'

export const login = {
  state: {
    host: 'http://192.168.1.29:3000',
    accessToken: null,
    refreshToken: null
  },
  getters: {
    // 쿠키에 저장된 토큰 가져오기
    getToken (state) {
      const ac = VueCookies.get('accessToken')
      const rf = VueCookies.get('refreshToken')
      return {
        access: ac,
        refresh: rf
      }
    }
  },
  mutations: {
    loginToken (state, payload) {
      VueCookies.set('accessToken', payload.accessToken, '60s')
      VueCookies.set('refreshToken', payload.refreshToken, '1m')
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
    },
    refreshToken (state, payload) { // accessToken 재셋팅
      this.$cookies.set('accessToken', payload.accessToken, '60s')
      VueCookies.set('refreshToken', payload.refreshToken, '1h')
      state.accessToken = payload
    },
    removeToken () {
      VueCookies.remove('accessToken')
      VueCookies.remove('refreshToken')
    }
  },
  actions: {
    // oauth2 요청
    loginToken ({ commit }, payload) {
      commit('loginToken', payload)
    },
    async login ({ commit, dispatch }, params) {
      const serverParam = (params.param === undefined ? {} : params.param)

      if (VueCookies.get('accessToken') === null) {
        await dispatch('refreshToken')
      }

      const accessToken = VueCookies.get('accessToken')

      const config = { header: { token: accessToken } }

      // eslint-disable-next-line new-cap
      return new axios.post(params.url, serverParam, config).then((response) => {
        if (response.status === 200) {
          const ret = response.data

          if (ret.retObject !== null) {
            if (ret.retObject.accessToken !== null && ret.retObject.accessToken !== undefined) {
              VueCookies.set('accessToken', ret.retObject.token, 29 * 60)
            }
            if (ret.retObject.refreshToken !== null & ret.retObject.refreshToken !== undefined) {
              VueCookies.set('refreshToken', ret.retObject.refreshToken, 30 * 24 * 60 * 60)
            }
          }
          return ret
        } else {
          console.log('server call error' + response.statusText)
          return null
        }
      }).catch((err) => {
        console.log('server call error' + err)
        return { rStatus: 500, errMsg: err }
      })
    },
    refreshToken: ({ commit }) => { // accessToken 재요청
      // accessToken 만료로 재발급 후 재요청시 비동기처리로는 제대로 처리가 안되서 promise로 처리함
      return new Promise((resolve, reject) => {
        const refreshToken = VueCookies.get('refreshToken')

        if (refreshToken !== null) {
          if (refreshToken !== undefined) {
            const serverURL = URL.GET_TOKEN_REFRESH

            axios.post(serverURL, { refreshToken: refreshToken }).then((response) => {
              if (response.status === 200) {
                const ret = response.data

                if (ret.retObject !== null) {
                  if (ret.retObject.accessToken !== null && ret.retObject.accessToken !== undefined) {
                    VueCookies.set('accessToken', ret.retObject.accessToken, 29 * 60)
                  }

                  if (ret.retObject.refreshToken !== null && ret.retObject.refreshToken !== undefined) {
                    VueCookies.set('refreshToken', ret.retObject.refreshToken, 30 * 24 * 60)
                  }
                } else {
                  console.log('httpStatus 200 but retObject null')
                }
              } else {
                console.log('server error in refreshToken')
              }
            }).catch(() => {
              console.log('refreshToken Promise error')
              resolve(false)
            }
            )
          }
        }
      })
    },
    logout: ({ commit }) => { // 로그아웃
      commit('removeToken')
      location.reload()
    }
  }
}
