import Vue from 'vue'
import api from '../api'
import axios from './axios'
Vue.prototype.$http = axios

//把api挂到Vue对象上面，在所有Vue实例中可this.$api调用
Vue.prototype.$api = api
