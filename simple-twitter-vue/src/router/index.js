import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signin',
    name: 'Sign-in',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'Sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'users-profile-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/users/:id/likes',
    name: 'users-likes',
    component: () => import('../views/UserLikes.vue')
  },
  {
    path: '/users/:id/followings',
    name: 'users-followings',
    component: () => import('../views/UserFollowing.vue')
  },
  {
    path: '/users/:id/followers',
    name: 'users-followers',
    component: () => import('../views/UserFollower.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 使用 dispatch 呼叫 Vuex 內的 actions
  store.dispatch('fetchCurrentUser')
  next()
})

export default router
