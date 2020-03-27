<template>
  <div class="je-show" id="loginContainer"></div>
</template>

<script>
import DD from '@/plugins/dingtalk'
export default {
  name:"DingTalk",
  data() {
    return {
      rUrl:"http://localhost:10095/#/login/logging"
    }
  },
  mounted() {
    this.getDingtalkCode()
  },
  methods: {
    // 生成钉钉二维码
    getDingtalkCode() {
      let redirectUri = encodeURIComponent(
        'http://localhost:10095/#/login/logging'
        // this.isDev
        //   ? 'http://api.besmile.me/admin-gw/madmin-service/user/v1/login'
        //   : window.location.origin + '#/login/logging'
      )
      let url =
        'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=' +
        DD.appid +
        '&response_type=code&scope=snsapi_login&redirect_uri=' +
        redirectUri

      DD.login({
        id: 'loginContainer',
        goto: encodeURIComponent(url),
        style: '',
        width: '300',
        height: '300'
      })

      let handleMessage = function(event) {
        let origin = event.origin
        if (origin == 'https://login.dingtalk.com') {
          //判断是否来自ddLogin扫码事件。
          let loginTmpCode = event.data //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          window.location.href = url + '&loginTmpCode=' + loginTmpCode
        }
      }
      if (typeof window.addEventListener != 'undefined') {
        window.addEventListener('message', handleMessage, false)
      } else if (typeof window.attachEvent != 'undefined') {
        window.attachEvent('onmessage', handleMessage)
      }
    },
  },
}
</script>