import Vue from 'vue'
import store from '@/store/index'

Vue.config.errorHandler = (error, vm, info) => {
  if (vm && error) {
    store.commit('sys/pushError', {
      url: vm.$route ? vm.$route.fullPath : 'none',
      message: error.message || 'some error',
      method: 'vue page',
      stack: error.stack || 'no stack',
      time: Date.now()
    })
  }
}
