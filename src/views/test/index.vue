<template>
  <div class="page">
    <div class="msg">ok</div>
    <div class="card">ppp</div>
    <div class="card">ppp</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    console.log('ok')
    this.$store.dispatch('user/login')
  }
}
</script>

<style lang="less" scoped>
.page {
  background: @primary;
}
</style>
