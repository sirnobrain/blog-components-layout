import Vue from 'vue'
import Router from 'vue-router'
import store from './../vuex/store'
import Home from '@/components/Home'
import PostDetails from '@/components/PostDetails'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/post/:id',
      component: PostDetails
    },
    {
      path: '/signin',
      component: Signin,
      meta: { authenticationPage: true }
    },
    {
      path: '/signup',
      component: Signup,
      meta: { authenticationPage: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.state.user.isLoggedIn
  let isAuthenticationPage = to.matched.some(record => record.meta.authenticationPage)

  if (isAuthenticated && isAuthenticationPage) next('/')
  else next()
})

export default router
