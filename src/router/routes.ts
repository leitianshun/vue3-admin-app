export const constantRoute = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      hidden: false,
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {
          title: '首页',
          hidden: false,
          keepAlive: true,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
      keepAlive: false,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404/404.vue'),
    meta: {
      title: '404',
      hidden: true,
      keepAlive: false,
      icon: 'DocumentDelete',
    },
  },
  {
    path: '/screen/:id',
    component: () => import('@/views/screen/screen.vue'),
    name: 'screen',
    meta: {
      keepAlive: false,
      title: '数据大屏',
      icon: 'DataBoard',
    },
  },
]

export const asyncRoutes = [
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Memo',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    redirect: '/product/trademark',
    meta: {
      title: '商品管理',
      icon: 'Handbag',
    },
    children: [
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },

]

export const anyRoute = { // 任意路由，用来匹配不存在的路由，重定向到404路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'anyRoute',
  meta: {
    title: '任意路由',
    keepAlive: false,
    hidden: true,
    icon: 'DataLine',
  },
}
