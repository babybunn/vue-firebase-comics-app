import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'


import HelloWorld from '@/components/HelloWorld'
import Comics from '@/components/Comics'
import Login from '@/components/Login'
import Signup from '@/components/Signup'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/comics',
      name: 'Comics',
      component: Comics,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('comics')
  else next()
})

export default router
