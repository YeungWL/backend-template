<template>
  <div class="je-p10">登录中...</div>
</template>
<script>
export default {
  name: 'Logging',
  data() {
    return {
      ujson: {}
    }
  },
  created() {
    this.redirect()
  },
  methods: {
    redirect() {
      this.$http
        .get('user/v1/login', {
          params: { code: this.$route.query.code ,state:200}
        })
        .then(res => {
          this.ujson = res
          this.$store.commit('user/user', res)
          this.$router.push('/main')
        })
        .catch(err => {
          this.$store.dispatch('user/logout')
          this.$router.push('/login/enter')
        })
    }
  }
}
</script>