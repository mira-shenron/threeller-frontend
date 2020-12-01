import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../pages/home-page.vue'
import board from '../pages/board.vue'
import welcomePage from '../pages/welcome-page.vue'
import loginPage from '../pages/login-page.vue'
import signupPage from '../pages/signup-page.vue'
import threeller from '../pages/threeller.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/threeller',
    name: 'threeller',
    component: threeller,
    children: [
      {
        path: 'home',
        name: 'home-page',
        component: homePage
      },
      {
        path: 'board/:id?',
        name: 'board',
        component: board
      },
    ]
  },
  // {
  //   path: '/home',
  //   name: 'home-page',
  //   component: homePage
  // },
  {
    path: '/',
    name: 'welcome-page',
    component: welcomePage
  },
  {
    path: '/login',
    name: 'login-page',
    component: loginPage
  },
  {
    path: '/signup',
    name: 'signup-page',
    component: signupPage
  },
  // {
  //   path: '/board/:id?',
  //   name: 'board',
  //   component: board
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
