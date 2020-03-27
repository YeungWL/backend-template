<template>
  <ul>
    <li>
      <el-input placeholder="请输入登录账号" size="default" class="je-f16" prefix-icon="el-icon-user" v-model="userName"></el-input>
    </li>
    <li>
      <el-input placeholder="请输入登录密码" size="default" type="password" class="je-f16" prefix-icon="el-icon-lock" :show-password="true" v-model="passWord"></el-input>
    </li>
    <!-- <li>
      <el-input placeholder="请输入验证码" size="default" v-model="code">
        <template slot="prepend">验&nbsp;&nbsp;&nbsp;&nbsp;证&nbsp;&nbsp;&nbsp;&nbsp;码</template>
        <template slot="append"><img :src="imgCodeUrl" @click="getImageCode" title="点击切换验证码"
            style="cursor: pointer;width:110px;height:38px;vertical-align: middle;" /></template>
      </el-input>
    </li> -->
    <li class="je-tc">
      <el-button type="primary" size="default" class="logobtn je-w80 je-f16 je-mt20" @click="onLogin" round>登 录
        平 台</el-button>
    </li>
  </ul>
</template>
<script>
export default {
  name:"AccountInput",
  data() {
    return {
      userName:'',
      passWord:''
    }
  },
  methods: {
    onLogin() {
      this.$store.dispatch('user/login').then(() => {
        this.$router.push('/main')
      })
    }
  },
}
</script>