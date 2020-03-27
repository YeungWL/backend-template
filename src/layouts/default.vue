<template>
  <el-container class="layout-wrap">
    <el-header class="layout-header je-flex je-align-center" height="50px">
      <div class="je-flex je-justify-left je-align-center logo je-f22">
        <svg x="0px" y="0px" viewBox="0 0 1024 1024" style="enable-background:new 0 0 1024 1024;width: 50px;
    fill: #fff;" xml:space="preserve">
          <g>
            <path class="st0" d="M243.36,814.31V211.58h340.68c53.62,0,92.47,6.32,116.57,18.98c28.31,13.86,49.7,37.05,64.16,69.58
		c10.24,22.29,15.36,45.48,15.36,69.58c0,31.33-8.28,60.55-24.85,87.65c-16.57,27.11-37.5,45.79-62.8,56.03
		c58.43,26.5,87.65,73.8,87.65,141.87c0,39.16-9.34,71.99-28.01,98.5c-16.27,22.89-37.05,38.71-62.35,47.44
		c-25.3,8.74-62.95,13.1-112.96,13.1H243.36L243.36,814.31z M593.94,454.14c5.51-2.15,10.94-5.28,16.31-9.41
		c18.68-14.46,28.01-34.34,28.01-59.64c0-24.1-8.74-41.87-26.21-53.32c-12.65-8.43-33.73-12.65-63.25-12.65H371.68V441.7h-0.01
		v198.88h0.01v66.2h174.4c18.68,0,32.23-0.9,40.66-2.71c8.43-1.81,16.27-5.72,23.49-11.75c18.68-14.46,28.01-34.34,28.01-59.64
		c0-24.1-8.74-41.87-26.21-53.32c-4.81-3.21-10.85-5.81-18.12-7.8V454.14z" />
            <path class="st0" d="M479.8,598.2c46.96,0,85.25-38.3,85.25-85.26c0-46.96-38.3-85.25-85.25-85.25c-46.96,0-85.25,38.3-85.25,85.25
		C394.54,559.9,432.84,598.2,479.8,598.2z" />
          </g>
        </svg>
        <span>XXXX</span>
      </div>
      <div class="je-flex je-align-center navs">
        <div style="padding: 3px 15px 0 0;" @click="toggleClick">
          <em class="je-f24" :class="isActive ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></em>
        </div>
        <div class="je-text-center je-align-left je-orient-ver je-flex je-boxflex je-white">
          <!-- 顶部菜单列表 -->
        </div>
        <div class="je-dib je-pr30">
          <em class="el-icon-search je-f24 je-pl10 je-pr10"></em>
          <em class="el-icon-rank je-f24 je-pl10 je-pr10 iconfull" @click="handleFullScreen"></em>
          <el-badge is-dot class="je-ml10 je-mr10" style="vertical-align: baseline;">
            <em class="el-icon-bell je-f24"></em>
          </el-badge>
        </div>
        <el-dropdown size="medium" style="outline: none;cursor: pointer;" @command="handleCommand">
          <div class="je-flex je-align-center">
            <el-avatar :src="userInfo.avatar || avatar"></el-avatar>
            <span class="je-pl10 je-f16 je-white">{{ userInfo.name }}</span>
            <em class="el-icon-caret-bottom je-white"></em>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-lock">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command="logout" :divided="true">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container style="height: 100%;">
      <el-aside :width="sidebarWidth">
        <el-menu ref="menu" :collapse="isCollapse" :unique-opened="true" :default-active="$route.path"
          @select="menuSelect">
          <template v-for="item in navList">
            <el-submenu :index="item.path" :key="item.path" v-if="item.children && item.children.length > 0">
              <template slot="title">
                <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                <i v-else class="el-icon-menu"></i>
                <span slot="title" class="je-f16">{{ item.meta.title }}</span>
              </template>
              <template v-for="val in item.children">
                <el-menu-item :index="val.path" :key="val.path" v-if="val.menu">
                  <i class="el-icon-document"></i>
                  <span slot="title" class="je-f14">{{ val.meta.title }}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item :index="item.path" :key="item.path" v-else>
              <i v-if="item.meta.icon" :class="item.meta.icon"></i>
              <i v-else class="el-icon-house"></i>
              <span slot="title" class="je-f16">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="layout-content">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ElLayout',
  props: {
    topMenu: {
      type: Array,
      default: () => []
    },
    asideMenu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isActive: false,
      isCollapse: false,
      sidebarWidth: '200px',
      fullscreen: false, // 是否全屏
      avatar: require('../assets/images/defaultPhoto.png'),
      userName: '超级管理员'
    }
  },
  created() {},
  computed: {
    ...mapGetters({ // 获得登录后的用户信息
      userInfo: 'user/user'
    }),
    navList: {
      get() {
        console.log(this.asideMenu)
        return this.asideMenu
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
    },
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.$store.dispatch('user/logout')
          this.$router.push('login/enter')
          break
      
        default:
          break
      }
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement
      // 判断是否已经是全屏
      // 如果是全屏，退出
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
        // console.log('已还原！')
      } else {
        // 否则，进入全屏
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
        // console.log('已全屏！')
      }
      // 改变当前全屏状态
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style>
.layout-wrap {
  width: 100%;
  height: 100%;
}

.layout-header {
  padding: 0 15px 0 0;
  background-color: rgba(0, 160, 232, 1);
  /* background: -webkit-linear-gradient(left, rgba(0,160,232,0.95), rgba(45, 124, 251,1));  */
  color: #ffffff;
}

.layout-header .logo {
  width: 200px;
  height: 100%;
  text-align: center;
  flex-shrink: 0;
  /* background-image: url('~@img/logo-white.png'); */
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
  position: relative;
}
.el-aside > ul {
  border-right: none;
  position: absolute;
  top: 0;
  right:0;
  bottom: 0;
  left:0;
  overflow: hidden;
  overflow-y: auto;
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
}
.iconfull {
  transform: rotate(45deg);
}
</style>
