<template>
  <el-container class="layout-wrap">
    <el-header class="layout-header je-flex je-align-center">
      <div class="je-flex je-box-center logo je-f26"></div>
      <div class="je-flex je-align-center navs">
        <div style="padding: 0 15px 0 0;" @click="toggleClick">
          <em class="je-f24" :class="isActive ? 'el-icon-s-unfold':'el-icon-s-fold'"></em>
        </div>
        <div class="je-text-center je-align-left je-orient-ver je-flex je-boxflex je-white">
          <!-- 顶部菜单列表 -->
        </div>
        <div class="je-dib je-pr30">
          <em class="el-icon-search je-f24 je-pl10 je-pr10"></em>
          <em class="el-icon-bell je-f24 je-pl10 je-pr10"></em>
        </div>
        <el-dropdown size="medium">
          <div class="je-flex je-align-center">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span class="je-pl10 je-f16 je-white">{{ userName }}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-lock">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" :divided="true">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container style="height: 100%;">
      <el-aside :width="sidebarWidth">
        <el-menu ref="menu" :collapse="isCollapse" :unique-opened="true" :default-active="$route.path"
          @select="menuSelect">
          <template v-for="item in navList">
            <el-submenu :index="item.path" :key="item.path" v-if="item.children && item.children.length">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title" class="je-f16">{{item.meta.title}}</span>
              </template>
              <template v-for="val in item.children">
                <el-menu-item :index="val.path" :key="val.path" v-if="val.menu" class="je-f14">
                  {{val.meta.title}}
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item :index="item.path" :key="item.path" v-else>
              <i class="el-icon-setting"></i>
              <span slot="title" class="je-f16">{{item.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="layout-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      isCollapse: false,
      sidebarWidth: '200px',
      userName: '超级管理员'
    }
  },
  created() {
    console.log(this.$store.state['menuList'])
  },
  computed: {
    navList: {
      get() {
        return this.$store.state['menuList']
      }
    }
  },
  methods: {
    toggleClick() {
      this.isActive = !this.isActive
      this.isCollapse = !this.isCollapse
      this.sidebarWidth = this.isActive ? '64px' : '200px'
    },
    menuSelect(routePath) {
      this.$router.push({
        path: routePath
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout-wrap {
  width: 100%;
  height: 100%;
}

.layout-header {
  padding: 0 15px 0 0;
  /* background-color: rgba(0,160,232,1); */
  background: -webkit-linear-gradient(
    left,
    rgba(0, 160, 232, 0.95),
    rgba(45, 124, 251, 1)
  );
  color: #ffffff;
}

.layout-header .logo {
  // 设置头部的logo
  width: 200px;
  height: 100%;
  text-align: center;
  flex-shrink: 0;
  // background-image: url('~@img/logo-white.png');
  background-color: #333;
  background-repeat: no-repeat;
  background-position: center center;
}

.layout-header .navs {
  width: 100%;
  height: 100%;
}

.goodsSelect {
  min-width: 500px;
  max-width: 1000px;
  position: relative;
  flex: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.el-aside {
  transition: width 0.28s;
}
.el-aside > ul {
  border-right: none;
}

.layout-header aside,
.layout-header main {
  display: inline-block;
  height: 60px;
}
.headermenu {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.headermenu.is-active {
  transform: rotate(180deg);
}

.layout-content {
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.15);
  background-color: #f5f7f9;
  position: relative;
  padding: 0;
  -webkit-box-flex: 1;
  flex: auto;
  min-height: 100%;
  overflow-y: auto;
  // padding: 1em;
}
</style>
