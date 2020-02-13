import $http from '@/plugins/axios'

export default {
  namespaced: true,
  state: {
    user: {
      id: '',
      avatar: '',
      nickName: ''
    },
    token: ''
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    isLogin: state => {
      return !!state.user && !!state.token && !!state.user.id
    }
  },
  mutations: {
    user(state, payload) {
      state.user = payload
    },
    token(state, payload) {
      state.token = payload
    }
  },
  actions: {
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        if (!payload) {
          $http.post('user-service/user/v1/visitor/token/')
          commit('user', {
            id: '1001',
            avatar: '',
            nickName: ''
          })
          commit('token', 'THIS_IS_A_SAMPLE_TOKEN')
          resolve()
        }
      })
    }
  }
}
