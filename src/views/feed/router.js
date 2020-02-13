export default {
  path: '/feed',
  component: () => import('@/layouts/default.vue'),
  menu: true,
  meta: { title: '帖子管理' },
  children: [
    {
      path: 'list',
      name: 'feedList',
      menu: true,
      component: () => import('./list.vue'),
      meta: {
        title: '帖子列表',
        isAuth: true
      }
    },
    {
      path: 'illegalList',
      name: 'illegalList',
      menu: true,
      component: () => import('./illegalList.vue'),
      meta: {
        title: '违规帖子',
        isAuth: true
      }
    },
    {
      path: 'detail',
      name: 'feedDetail',
      component: () => import('./detail.vue'),
      meta: {
        title: '帖子详情',
        isAuth: true
      }
    }
  ]
}
