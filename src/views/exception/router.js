/**
 * 路由配置
 */

export default {
  path: '/error',
  name: 'error',
  menu: true,
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
    menu: true,
    component: () => import( /* webpackChunkName: "error404" */ '@views/exception/404.vue'),
    meta: {
      title: "出错啦！",
      keepAlive: false,
      isAuth: true
    }
  }, ],
};
