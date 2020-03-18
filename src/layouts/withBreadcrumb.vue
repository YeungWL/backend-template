<!--
 * @Date: 2020-02-15 15:47:16
 * @LastEditTime: 2020-03-18 17:19:03
 * @Description: layout
 -->
<template>
  <div class="breadcrumbLayout">
    <el-page-header class="breadcrumbStatusBar" :content="$route.meta.title" v-if="$route.name == 'postDetail' || $route.name == 'commentDetail'" slot="site" @back="$router.go(-1)"></el-page-header>
    <el-breadcrumb class="breadcrumbStatusBar" v-else slot="site" separator="/">
      <el-breadcrumb-item :to="{ path: '/main' }">后台首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view class="routerView"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="less" scoped>
.breadcrumbLayout {
  overflow: hidden;
  .breadcrumbStatusBar {
    position: relative;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    padding: 0 15px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
    border-left: 1px solid @border;
    border-bottom: 1px solid @border;
    z-index: 100;
    & > div {
      line-height: 40px;
    }
  }
  .routerView {
    height: calc(~'100vh - 90px');
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
