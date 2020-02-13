export default {
  path: '/home',
  component: () => import('@/layouts/default.vue'),
  menu: true,
  children: [
    {
      path: 'index',
      name: 'home',
      menu: true,
      component: () => import('@views/home/Home.vue'),
      meta: {
        title: '后台首页',
        keepAlive: true,
        isAuth: true
      }
    }
  ]
}
