import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store/index'

const baseURL = process.env.VUE_APP_BASE_API_URL
const isDev = process.env.NODE_ENV === 'development'

const instance = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: false
})
instance.interceptors.request.use(
  config => {
    if (config.params) {
      delete config.params.finished
    }
    if (config.data) {
      delete config.data.finished
    }
    if (store.getters['user/token']) {
      config.headers['jwt-token'] = store.getters['user/token']
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  response => {
    if (response.data.code === -11) {
      Message.error(response.data.message || 'token expired')
      store.dispatch('user/logout')
      store.dispatch('user/visitorLogin')
    } else if (response.data.code && response.data.code !== '00000') {
      Message.error(response.data.message || '服务器繁忙')
      printError(response)
      return Promise.reject(response.data)
    } else {
      if (response.headers['jwt-token']) {
        // 自动刷新token
        store.commit('user/token', response.headers['jwt-token'])
      }
      // 这个要根据自己的项目来配置
      if (response.data.data && response.data.data.list) {
        // 如果返回数据是分页列表
        // 分页信息再包装，添加 finished 判断
        const finished =
          !response.data.data.hasNext ||
          response.data.data.list.length < response.config.params.count
        const page = {
          timeline: response.data.data.timeline,
          count: response.config.params.count,
          finished
        }
        printList(response, page)
        return Promise.resolve({
          list: response.data.data.list,
          page
        })
      } else {
        // 默认返回数据是对象
        printData(response)
        return Promise.resolve(response.data.data || response.data)
      }
    }
  },
  err => {
    return Promise.reject(err)
  }
)

export default instance

const printError = response => {
  if (isDev) {
    let url = response.config.url.replace(response.config.baseURL, '')
    console.groupCollapsed(
      '%cError >>>>>>>>>>>>>>> ' +
        response.config.method.toUpperCase() +
        ' ' +
        url,
      'color: #e74c3c'
    )
    printReq('request query', response.config.params)
    printReq('request payload', response.config.data)
    if (response.data) {
      printErrorCode(response.data.code)
      printMessage(response.data.message)
    }
    console.groupEnd()
  }
}
const printList = (response, page) => {
  if (isDev) {
    let url = response.config.url.replace(response.config.baseURL, '')
    groupStart(response.config.method.toUpperCase() + ' ' + url)
    printReq('请求参数, url query', response.config.params)
    printReq('请求参数, payload body', response.config.data)
    if (response.data.data.timeline) {
      printRes('返回内容, page', page)
    }
    printRes('返回内容, list', response.data.data.list)
    printMessage(response.data.message)
    console.groupEnd()
  }
}
const printData = response => {
  if (isDev) {
    let url = response.config.url.replace(response.config.baseURL, '')
    groupStart(response.config.method.toUpperCase() + ' ' + url)
    printReq('请求参数, url query', response.config.params)
    printReq('请求参数, payload body', response.config.data)
    printRes('返回内容', response.data.data || response.data)
    printMessage(response.data.message)
    console.groupEnd()
  }
}

const rainbow = [
  'color: #e74c3c',
  'color: #e67e22',
  'color: #f1c40f',
  'color: #2ecc71',
  'color: #1abc9c',
  'color: #3498db',
  'color: #9b59b6',
  'color: #333'
]
const printErrorCode = val => {
  if (val) {
    console.log(
      `%cserver error code: ` + val,
      'background:linear-gradient(to right,#ff6b81, #ff4757);color:#fff;padding:5px 10px'
    )
  }
}
const printMessage = val => {
  if (val) {
    console.log(
      `%cresponse message: ` + val,
      'background:linear-gradient(to top,#ff7f50, #ff6b81);color:#fff;padding:5px 10px'
    )
  }
}
const printRes = (type, val) => {
  if (val) {
    console.log(
      '%c' + (type || 'response data') + ':',
      'background:linear-gradient(to left,#2ed573, #1e90ff);color:#fff;padding:5px 15px;'
    )
    console.log({ ...val })
  }
}
const printReq = (type, val) => {
  if (val) {
    if (typeof val === 'string') {
      val = JSON.parse(val)
    }
    console.log(
      '%c' + (type || 'request payload') + ':',
      'background:linear-gradient(to right,#2ed573, #1e90ff);color:#fff;padding:5px 15px'
    )
    console.log(val)
  }
}
const groupStart = val => {
  let cord = []
  while (cord.length < 7) {
    let n = Math.floor(Math.random() * 7)
    if (!cord.includes(rainbow[n])) {
      cord.push(rainbow[n])
    }
  }
  console.groupCollapsed(
    '%cSuccess %c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c ' + val,
    'color: #2ecc71',
    ...cord,
    'color: #333'
  )
}
