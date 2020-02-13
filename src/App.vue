<template>
  <div class="app-wrap">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 首次进入，如果未登录则跳去登录页
    // if (!this.$store.getters['user/isLogin']) {
    //   this.$router.push('/login')
    // }
  }
}
</script>

<style lang="less">
@import './style/gloabal.less';
.app-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
