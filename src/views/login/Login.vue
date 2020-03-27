<template>
  <div class="login-wrap">
    <div class="login-box">
      <el-row>
        <el-col :span="14" class="logshowpic"> </el-col>
        <el-col :span="10" class="logshowbox">
          <div class="logo"></div>
          <h3 class="je-tc je-f22 je-c8">欢迎登录自运营平台</h3>
          <div class="je-tc je-pt15" v-if="!isDingLogin">
            <el-radio-group v-model="loginType">
              <el-radio-button :label="true">钉钉登录</el-radio-button>
              <el-radio-button :label="false">Token登录</el-radio-button>
            </el-radio-group>
          </div>
          <div class="logingui">
            <DingTalk v-if="loginType || isDingLogin"></DingTalk>
            <textarea class="tokenText" placeholder="请输入Token" v-if="!loginType && !isDingLogin" v-model="token"></textarea>
            <el-button type="primary" size="default" class="logobtn je-w80 je-f16 je-mt20" v-if="!loginType && !isDingLogin" @click="onSubmit" round> 设置 Token </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { IS_DEV } from '../../utils/config'
import DingTalk from './components/DingTalk'
export default {
  name: 'Login',
  data() {
    return {
      isDev: IS_DEV,
      loginType: true,
      token: ''
    }
  },
  mounted() {
    let that = this
    document.onkeydown = function(e) {
      // 回车提交表单, 兼容FF和IE和Opera
      var theEvent = window.event || e
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode
      if (code == 13 && that.$route.path == '/login/enter') {
        that.onSubmit()
      }
    }
    this.getDingtalkCode()
  },
  components: { DingTalk },
  methods: {
    ...mapActions({
      setToken: 'user/setToken'
    }),
    onSubmit() {
      if (this.token === '') {
        this.$message.error('Token不能为空！')
      } else {
        this.setToken(this.token)
          .then(() => {
            this.$message.success('添加token成功')
            this.$router.push('/main')
          })
          .catch(err => {
            this.$message.error(err)
          })
      }
    },
    // 判断是否为域名
    isDomainName(value) {
      let domainReg = /([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/
      return (
        domainReg.test(value) && value.indexOf('operation.besmile.me') == -1
      )
    }
    // handleSetToken() {
    //   let routerUrl = this.$router.resolve('/test/setToken')
    //   window.open(routerUrl.href, '_blank')
    // }
  },
  computed: {
    isDingLogin() {
      let hostname = location.hostname
      return this.isDomainName(hostname)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url('~@img/bgby.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .tokenText {
    width: 300px;
    height: 238px;
    border: 1px solid #e8e8e8;
    padding: 10px;
    border-radius: 4px;
    box-shadow: inset 0px 0px 5px #ddd;
  }
  .login-box {
    position: absolute;
    width: 1000px;
    display: flex;
    .logshowpic {
      width: 600px;
      display: inline-block;
      background-image: url('~@img/bgbar.png');
      background-repeat: no-repeat;
      background-position: center left;
      background-size: 530px auto;
      flex: 1;
      height: 100%;
    }
    .logshowbox {
      width: 400px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 8px;
      justify-self: center;
      align-self: center;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(99, 64, 64, 0.3);
      // background-image: url('~@img/logbg.png');
      // background-repeat: no-repeat;
      // background-position: center bottom;
      // background-size: 100% auto;
    }
    .logo {
      width: 100%;
      height: 80px;
      background-image: url('~@img/logo-blue.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 34% auto;
    }
    .logingui {
      padding: 20px 50px 20px 50px;
      text-align: center;
      li {
        padding: 10px 0;
      }

      .logobtn {
        box-shadow: 0 2px 8px 0 rgba(0, 160, 232, 0.6);
        background: -webkit-linear-gradient(
          left,
          rgba(0, 160, 232, 0.9),
          rgba(45, 124, 251, 1)
        );
      }
    }
  }
}
</style>
