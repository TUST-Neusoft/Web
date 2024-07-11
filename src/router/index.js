import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: Layout,
    children: [{
      path: '',
      name: 'login',
      component: () => import('@/views/login/index')
    }],
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
        name: 'Goods',
        component: () => import('@/views/goods/index'),
        meta: { title: '全部商品', icon: 'form' }
      }
    ]
  },
  {
    path: '/goods/detail',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Detail',
        component: () => import('@/views/goods/detail'),
        meta: { title: '商品详情', icon: 'form' }
      }
    ]
  },
  {
    path: '/cart',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Cart',
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
        path: '',
        name: 'User',
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
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
