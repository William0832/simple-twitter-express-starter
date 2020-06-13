import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import tweets from '../views/Tweets'
import store from '../store'

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && !(currentUser.role === 'admin')) {
    next('/404')
    return
  }

  next()
}

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/tweets'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/users/:id/tweets',
    name: 'user',
    component: () => import('../views/User.vue')
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
    path: '/tweets',
    name: 'tweets',
    component: tweets
  },
  {
    path: '/tweets/:tweet_id/replies',
    name: 'replies',
    component: () => import('../views/Reply')
  },
  {
    path: '/hashtag',
    name: 'hashtag',
    component: () => import('../views/Hashtag')
  },
  {
    path: '/hashtag/:hashtag',
    name: 'individual-hashtag',
    component: () => import('../views/Hashtag')
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

router.beforeEach(async (to, from, next) => {
  // console.log('store', store.state)

  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated) {
    switch (to.name) {
      case 'sign-in':
        next()
        return
      case 'sign-up':
        next()
        return
    }

    next('signin')
    return
  }

  // 如果 token 有效則轉址到首頁
  if (isAuthenticated && to.name === 'sign-in') {
    next('/tweets')
    return
  }

  next()
})

export default router
