/*
 * @Date: 2020-02-12 11:34:48
 * @LastEditors  : Yeung
 * @LastEditTime : 2020-02-12 21:45:05
 * @Description: 用户管理模块路由文件
 */
export default {
  path: '/user',
  name: 'user',
  menu: true,
  component: () => import('@/layouts/default.vue'),
  meta: { title: "用户管理", keepAlive: true, isAuth: true },
  children: [
    {
      path: 'userList',
      menu: true,
      component: () => import('@views/user/UserList.vue'),
      meta: { title: "用户列表", keepAlive: true, isAuth: true }
    },
    {
      path: 'userAuthentication',
      menu: true,
      component: () => import('@views/user/UserAuthentication.vue'),
      meta: { title: "用户认证管理", keepAlive: true, isAuth: true }
    }
  ]
};
