export default {
  path: '/system',
  component: () => import('@/layouts/null.vue'),
  menu: false,
  meta: {
    title: '系统管理',
    keepAlive: true,
    isAuth: true
  },
  children: [{
      path: 'adminList',
      menu: true,
      component: () =>
        import(
          /* webpackChunkName: "adminList" */
          '@views/system/AdminList.vue'
        ),
      meta: {
        title: '管理员列表',
        keepAlive: true,
        isAuth: true
      }
    },
    {
      path: 'authList',
      menu: true,
      component: () =>
        import( /* webpackChunkName: "authList" */ '@views/system/AuthList.vue'),
      meta: {
        title: '权限列表',
        keepAlive: true,
        isAuth: true
      }
    },
    {
      path: 'roleList',
      menu: true,
      component: () =>
        import( /* webpackChunkName: "roleList" */ '@views/system/RoleList.vue'),
      meta: {
        title: '角色列表',
        keepAlive: true,
        isAuth: true
      }
    }
  ]
}
