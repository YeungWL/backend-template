<template>
  <div class="app-wrap">
    <el-layout v-if="$route.meta.isAuth" :asideMenu="menuList">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </el-layout>
    <template v-if="!$route.meta.isAuth">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </template>
  </div>
</template>

<script>
import elLayout from '@/layouts/default.vue'
export default {
  name: 'App',
  data() {
    return {
      menuList: []
    }
  },
  components: { elLayout },
  created() {
    // console.log(this.$store.state['menuList'])
    this.menuList = this.$store.state['menuList']
    console.log(this.menuList)
    // window.addEventListener('message', (e) => {
    //   console.log(e)
    //   // this.$store.dispatch('user/logout')
    // })
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
