import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: '',
        name: '首頁',
        component: () => import('../views/frontend/Index.vue')
      },
      {
        path: 'products',
        name: '產品列表',
        component: () => import('../views/frontend/Products.vue')
      },
      { // 動態路由
        path: '/product/:id',
        name: '單一產品',
        component: () => import('../views/frontend/Product.vue')
      },
      {
        path: 'coupon',
        name: '優惠券',
        component: () => import('../views/frontend/Coupon.vue')
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('../views/frontend/Cart.vue')
      },
      { // 動態路由
        path: 'payment/:orderId',
        name: '訂單完成',
        component: () => import('../views/frontend/Payment.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登入',
    component: () => import('../views/backend/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: '產品列表',
        component: () => import('../views/backend/Products.vue')
      },
      {
        path: 'coupons',
        name: '優惠券列表',
        component: () => import('../views/backend/Coupons.vue')
      },
      {
        path: 'orders',
        name: '訂單列表',
        component: () => import('../views/backend/Orders.vue')
      },
      {
        path: 'storages',
        name: '圖片儲存列表',
        component: () => import('../views/backend/Storages.vue')
      }
    ]
  },
  { // 無此頁面導向首頁
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
