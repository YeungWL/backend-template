import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// 自动引入modules目录下的文件
const modules = {}
require
  .context('./modules', false, /.js$/)
  .keys()
  .forEach(i => {
    modules[i.substring(2, i.length - 3)] = require(`./modules/${i.substring(
      2,
      i.length
    )}`).default
  })

export default new Vuex.Store({
  state: {
    menuList: []
  },
  mutations: {
    menuList(state, options) {
      state.menuList = options
    }
  },
  actions: {
    menuList(context, data) {
      context.commit('menuList', data)
    }
  },
  modules,
  plugins: [vuexLocal.plugin]
})
