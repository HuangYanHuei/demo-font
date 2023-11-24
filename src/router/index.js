import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */'../views/home/HomePage')
  },
  {
    path: '/restaurants',
    name: 'Restaurants',
    component: () => import(/* webpackChunkName: "restaurants" */'../views/home/HomePage')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */'../views/cartList/CartList')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "my" */'../views/my/MyPage')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/*  webpackChunkName: "orderConfirmation" */'../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/*  webpackChunkName: "orderList" */'../views/orderList/OrderList')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/*  webpackChunkName: "shop" */'../views/shop/ShopPage')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */'../views/login/RegisterPage'),
    // 已經登入就直接跳轉去Home
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'../views/login/LoginPage'),
    // 已經登入就直接跳轉去Home
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/*  webpackChunkName: "search" */'../views/search/SearchPage')
  },
  {
    path: '/searchList',
    name: 'SearchList',
    component: () => import(/*  webpackChunkName: "searchList" */'../views/searchList/SearchList')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import(/*  webpackChunkName: "address" */'../views/orderConfirmation/AddressPart.vue')
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import(/*  webpackChunkName: "userInfo" */'../views/my/UserForm.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { token } = localStorage
  const isLoginorRegister = (to.name === 'Login' || to.name === 'Register');
  (token || isLoginorRegister) ? next() : next({ name: 'Login' })
})
router.beforeEach(async (to, from, next) => {
  await store.dispatch('fetchCurrentUser')
  next()
})

export default router
