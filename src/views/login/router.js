export default {
  path: '/login',
  menu: false,
  component: () => import('@/layouts/null.vue'),
  children: [
    {
      path: '',
      name: 'login',
      component: () => import('@views/login/Login2.vue'),
      meta: {
        title: '登录',
        keepAlive: false,
        isAuth: false
      }
    }
  ]
}
