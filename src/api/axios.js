import axios from 'axios'
import { Message } from 'element-ui';
let baseURL = "/apis/";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  withCredentials: true,
})
instance.defaults.retry = 3;
instance.defaults.retryDelay = 1000;
// http request 拦截器
instance.interceptors.request.use(
  config => {
    // const { userId } = utils.locStore.get('userInfo')
    // 权限认证：如果系统需要token认证，则在这里打开
    // config.headers.userId = utils.locStore.get("userInfo");
    return config
  },
  err => {
    return Promise.reject(err)
  }
);

// http response 拦截器
instance.interceptors.response.use(
  response => {
    const contentDisposition = response.headers['content-disposition']
    const res = response.data;
    // 当响应属于附件时，直接返回响应体，不需处理错误逻辑
    if (contentDisposition && contentDisposition.includes('attachment')) {
      return response
    }

    if (res.code !== 200) {
      if (res.msg) {
        Message.error(res.msg || '服务器繁忙')
      }
    }
    return response
  },
  err => {
    var config = err.config;
    // 如果配置不存在或未设置重试选项，否则拒绝
    if (!config || !config.retry) return Promise.reject(err);

    // 设置用于重试计数的变量
    config.__retryCount = config.__retryCount || 0;

    // 检查重试的总数是否已经用完
    if (config.__retryCount >= config.retry) {
      return Promise.reject(err);
    }

    // 增加重试数
    config.__retryCount += 1;

    // 创建新的请求来重新处理
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });

    // 返回符合axios重试请求的配置
    return backoff.then(function () {
      return axios(config);
    });
  });


export default instance
