import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/goods',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'goods',
        component: () => import('@/views/goods/index'),
        meta: { title: '全部商品', icon: 'form' }
      }
    ]
  },

  {
    path: '/cart',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'cart',
        component: () => import('@/views/cart/index'),
        meta: { title: '购物车', icon: 'form' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户', icon: 'form' }
      }
    ]
  },

  {
    path: '/duanjunxing',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/DuanJunXing/index'),
        meta: { title: '段', icon: 'form' }
      }
    ]
  },

  {
    path: '/maozijun',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/MaoZiJun/index'),
        meta: { title: '毛', icon: 'form' }
      }
    ]
  },

  {
    path: '/zhaoyulong',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/ZhaoYuLong/index'),
        meta: { title: '龙', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 添加管理员界面的路由
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    name: 'Admin',
    meta: { title: '管理员', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => import('@/views/admin/Login/index'),
        meta: { title: '系统登录', icon: 'el-icon-user' }
      },
      {
        path: 'role-management',
        name: 'RoleManagement',
        component: () => import('@/views/admin/RoleManagement/index'),
        meta: { title: '角色管理', icon: 'el-icon-s-custom' }
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: () => import('@/views/admin/UserManagement/index'),
        meta: { title: '用户管理', icon: 'el-icon-s-check' }
      },
      {
        path: 'category-management',
        name: 'CategoryManagement',
        component: () => import('@/views/admin/CategoryManagement/index'),
        meta: { title: '商品类别管理', icon: 'el-icon-menu' }
      },
      {
        path: 'product-management',
        name: 'ProductManagement',
        component: () => import('@/views/admin/ProductManagement/index'),
        meta: { title: '商品管理', icon: 'el-icon-goods' }
      },
      {
        path: 'area-management',
        name: 'AreaManagement',
        component: () => import('@/views/admin/AreaManagement/index'),
        meta: { title: '区域管理', icon: 'el-icon-place' }
      },
      {
        path: 'store-management',
        name: 'StoreManagement',
        component: () => import('@/views/admin/StoreManagement/index'),
        meta: { title: '门店管理', icon: 'el-icon-s-shop' }
      },
      {
        path: 'order-management',
        name: 'OrderManagement',
        component: () => import('@/views/admin/OrderManagement/index'),
        meta: { title: '订单管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'promotion-management',
        name: 'PromotionManagement',
        component: () => import('@/views/admin/PromotionManagement/index'),
        meta: { title: '促销管理', icon: 'el-icon-s-promotion' }
      },
      {
        path: 'notice-management',
        name: 'NoticeManagement',
        component: () => import('@/views/admin/NoticeManagement/index'),
        meta: { title: '通知公告', icon: 'el-icon-bell' }
      },
      {
        path: 'parking-management',
        name: 'ParkingManagement',
        component: () => import('@/views/admin/ParkingManagement/index'),
        meta: { title: '车位管理', icon: 'el-icon-s-platform' }
      },
      {
        path: 'visitor-record',
        name: 'VisitorRecord',
        component: () => import('@/views/admin/VisitorRecord/index'),
        meta: { title: '访客记录', icon: 'el-icon-s-data' }
      },
      {
        path: 'repair-management',
        name: 'RepairManagement',
        component: () => import('@/views/admin/RepairManagement/index'),
        meta: { title: '报事报修', icon: 'el-icon-s-tools' }
      },
      {
        path: 'payment-record',
        name: 'PaymentRecord',
        component: () => import('@/views/admin/PaymentRecord/index'),
        meta: { title: '缴纳记录', icon: 'el-icon-s-finance' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router