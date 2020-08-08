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
        component: () => import('../views/frontend/Index.vue')
      },
      {
        path: 'products',
        component: () => import('../views/frontend/Products.vue')
      },
      { // 動態路由
        path: '/product/:id',
        component: () => import('../views/frontend/Product.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/frontend/Cart.vue')
      },
      {
        path: 'about',
        component: () => import('../views/frontend/About.vue')
      },
      {
        path: 'payment',
        component: () => import('../views/frontend/Payment.vue')
      },
      {
        path: 'paymentok',
        component: () => import('../views/frontend/Paymentok.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/backend/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/Coupons.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/backend/Orders.vue')
      },
      {
        path: 'pictures',
        component: () => import('../views/backend/Pictures.vue')
      }
    ]
  },
  { // 無此頁面導向首頁
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
