export default {
  namespaced: true,
  state: {
    errorList: []
  },
  getters: {
    errorList: state => state.errorList
  },
  mutations: {
    pushError(state, payload) {
      state.errorList.push(payload)
    }
  },
  actions: {}
}
