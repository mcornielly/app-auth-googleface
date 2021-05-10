import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from  '@/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/administracion',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
  },
]

const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (user) {
      next()
    } else {
      next({name: 'Login'})
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
