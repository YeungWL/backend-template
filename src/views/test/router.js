export default {
  path: '/test',
  component: () => import('@/layouts/null.vue'),
  children: [
    {
      path: '',
      component: () => import('./index.vue'),
      meta: {
        title: 'test',
        keepAlive: false,
        isAuth: false
      }
    }
  ]
}
