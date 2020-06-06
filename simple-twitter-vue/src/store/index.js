import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      role: 'user'
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }

      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      // 登出時一併將 state 內的 token 移除
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來

        const { data, statusText } = await usersAPI.getCurrentUser()

        if (statusText === 'error') {
          console.log('statusText!', statusText)
          throw new Error(data)
        }

        const { id, name, email, avatar, role } = data

        commit('setCurrentUser', {
          id,
          name,
          email,
          avatar,
          role
        })
      } catch (error) {
        console.log('error', error)
        commit('revokeAuthentication')
        console.error('can not fetch user information')
      }
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState()
  ]
})
