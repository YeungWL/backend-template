/**
 * 路由配置
 */

export default {
  path: '/error',
  name: 'error',
  menu: false,
  component: {
    template: '<router-view></router-view>'
  },
  meta: {
    title: "系统管理",
    keepAlive: false,
    isAuth: true
  },
  redirect: "/error/404",
  children: [{
    path: "404",
    menu: false,
    component: () => import( /* webpackChunkName: "error404" */ '@views/error/404.vue'),
    meta: {
      title: "出错啦！",
      keepAlive: false,
      isAuth: true
    }
  }, ],
};
