import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)
// VueRouter 路由懒加载
// const loadView = (path) => {
//   if (process.env.NODE_ENV === 'development') {
//     const comp = require(`@views/${path}.vue`);
//     return comp.default || comp
//   }
//   return () => import(/* webpackChunkName: "view-[request]" */ `@views/${path}.vue`)
// }
// 自动导入路由
//查询当前目录下所有文件夹中router.js的文件
const routerFunc = require.context('@views', true, /router.js$/)

//列出所有路由文件
const routerList = routerFunc.keys()

//keepAlive 是否缓存，isAuth 是否需要登录才有权限
let routeMapList = [],
  routeMap = []
routerList.forEach(function (val) {
  const itemRouter = routerFunc(val).default
  if (Array.isArray(itemRouter)) {
    itemRouter.forEach(item => {
      routeMapList.push(item)
    })
  } else {
    routeMapList.push(itemRouter)
  }
})

// 递归路由组装
const routerEach = function (item) {
  if (item.meta && item.meta.title != undefined) {
    item.title = item.meta.title
  }
  if (item.menu) {
    if (item.children.length > 1) {
      item.children.forEach(val => {
        if (!/^\//g.test(val.path)) {
          val.path = item.path + '/' + val.path
        }
        if (val.meta.title != undefined && val.meta.title != '') {
          val.title = val.meta.title
        }
        if (val.children && val.children.length > 0) {
          routerEach(val)
        }
      })
    } else if (item.children.length === 1) {
      item = { ...item.children[0], children: [] }
    }
    return item
  }
}

routeMapList.forEach(item => {
  if (item.menu) {
    let resRouer = routerEach(item)
    if (resRouer) routeMap.push(resRouer)
  }
})
store.dispatch(
  'menuList',
  routeMap.sort(function (a, b) {
    return a.children.length - b.children.length
  })
)

let defaultRouter = [{
    path: '/',
    redirect: '/login'
  },
  //没有匹配到任何页面则跳转到index页面
  {
    path: '*',
    redirect: '/login'
  }
]
//合并多个路由
let newRouterList = defaultRouter.concat(routeMapList)

const router = new VueRouter({
  mode: 'hash', // 访问路径不带井号
  routes: newRouterList,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?
      savedPosition :
      {
        x: 0,
        y: 0
      }
  }
})

router.beforeEach((to, from, next) => {
  //跳转路由验证用户登录状态
  // if (to.meta.isAuth && !store.getters['user/isLogin']) {
  //   next('/login')
  // }
  //路由发生变化修改页面title
  document.title = (to.meta.title || 'shop') + ' - Shop'
  next()
})
router.afterEach(function (to, from) {})

export default router
