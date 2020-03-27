export default {
  path: '/home',
  name: 'home',
  component: () => import('@views/home/Home.vue'),
  menu: true,
  meta: {
    title: '后台首页',
    keepAlive: true,
    isAuth: true
  },
  children: [
    // {
    //   path: 'index',
    //   menu: true,
    //   component: () => import('@views/home/Home.vue'),
    // }
  ]
}
