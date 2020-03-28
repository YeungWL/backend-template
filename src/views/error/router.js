export default {
  path: '/error',
  name: 'error',
  menu: false,
  component: () => import('@/layouts/withBreadcrumb.vue'),
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
