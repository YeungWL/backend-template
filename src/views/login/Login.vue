<template>
  <div class="login-wrap">
    <div class="login-box">
      <el-row>
        <el-col :span="14" class="logshowpic"> </el-col>
        <el-col :span="10" class="logshowbox">
          <div class="logo"></div>
          <h3 class="je-tc je-f22 je-c8">欢迎登录自运营平台</h3>
          <ul>
            <li>
              <el-input
                placeholder="请输入登录账号"
                size="default"
                class="je-f16"
                prefix-icon="el-icon-user"
                v-model="userName"
              ></el-input>
            </li>
            <li>
              <el-input
                placeholder="请输入登录密码"
                size="default"
                type="password"
                class="je-f16"
                prefix-icon="el-icon-lock"
                :show-password="true"
                v-model="passWord"
              ></el-input>
            </li>
            <!-- <li>
              <el-input placeholder="请输入验证码" size="default" v-model="code">
                <template slot="prepend">验&nbsp;&nbsp;&nbsp;&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;码</template>
                <template slot="append"><img :src="imgCodeUrl" @click="getImageCode" title="点击切换验证码"
                    style="cursor: pointer;width:110px;height:38px;vertical-align: middle;" /></template>
              </el-input>
            </li> -->
            <li class="je-tc">
              <el-button
                type="primary"
                size="default"
                class="logobtn je-w80 je-f16 je-mt20"
                @click="onLogin"
                round
                >登 录 平 台</el-button
              >
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      passWord: '',
      code: '',
      imgCodeUrl: ''
    }
  },
  mounted() {
    this.getImageCode()
    document.addEventListener(
      'keyup',
      event => {
        if (event.keyCode == 13) {
          this.onLogin()
        }
      },
      false
    )
  },
  methods: {
    onLogin() {
      this.$store.dispatch('user/login').then(() => {
        this.$router.push('/home')
      })
      // this.$api
      //   .login({
      //     username: this.userName,
      //     password: this.passWord
      //   })
      //   .then(json => {
      //     if (json.data) {
      //       console.log(json.data)
      //     }
      //   })
    },
    // 生成图形码
    getImageCode() {
      // 生成随机字符
      let randomString =
        Math.random()
          .toString(36)
          .substr(2) + new Date().getTime()
      this.imgCodeUrl = this.api.verifyCode + '?UUID=' + randomString
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
      background-size: contain;
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
      // 设置登录logo
      width: 100%;
      height: 80px;
      // background-image: url('~@img/logo-blue.png');
      background-color: #fff;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 34% auto;
    }
    ul {
      padding: 50px 50px 50px 50px;
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
