export default {
  path: '/category',
  component: () => import('@/layouts/default.vue'),
  menu: true,
  meta: { title: '分类管理' },
  children: [
    {
      path: 'rootList',
      name: 'rootList',
      menu: true,
      component: () => import('./rootList.vue'),
      meta: {
        title: '一级分类',
        isAuth: true
      }
    },
    {
      path: 'subList',
      name: 'subList',
      menu: true,
      component: () => import('./subList.vue'),
      meta: {
        title: '二级分类',
        isAuth: true
      }
    },
    {
      path: 'tagList',
      name: 'tagList',
      menu: true,
      component: () => import('./tagList.vue'),
      meta: {
        title: '标签管理',
        isAuth: true
      }
    },
    {
      path: 'userTypeList',
      name: 'userTypeList',
      menu: true,
      component: () => import('./userTypeList.vue'),
      meta: {
        title: '用户认证标签',
        isAuth: true
      }
    }
  ]
}
