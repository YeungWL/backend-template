import Ajax from './axios'
const baseURL = Ajax.defaults.baseURL;
export default {
  // 登录
  login: params => Ajax.post('', params || {}),
  // 验证码
  verifyCode: baseURL + "getVerifyCode",

  // 获取分类列表
  getUser: params => Ajax.get('', { params: params || {} }),
 
}
