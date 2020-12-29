import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { public: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { auth: false }
  },
  {
    path: '/pay/invoice/:id',
    name: 'PayInvoice',
    component: () => import('../views/Invoice/Pay.vue'),
    meta: { auth: true }
  },
  {
    path: '/payments/history',
    name: 'PaymentsHistory',
    component: () => import('../views/History/Payments.vue'),
    meta: { auth: true }
  },
  {
    path: '/404',
    name: 'Error404',
    component: () => import('../views/Errors/404'),
    meta: { public: true }
  },
  {
    path: '*',
    redirect: '/404',
    meta: { public: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const isAuthRoute = to.meta.auth;
  const isPublicRoute = to.meta.public;
  const IS_AUTHENTICATED = localStorage.getItem('auth_token');

  if(isPublicRoute) next();
  else if(!isAuthRoute && IS_AUTHENTICATED) {
    next({ name: 'Home' })
  } else if(isAuthRoute && !IS_AUTHENTICATED) {
    next({ name: 'Login' })
  }

  next();
})

export default router
