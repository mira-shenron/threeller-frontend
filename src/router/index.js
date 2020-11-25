import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../pages/home-page.vue'
import board from '../pages/board.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: homePage
  },
  // {
  //   path: '/board/:id?',
  //   name: 'board',
  //   component: board
  // },
    {
    path: '/board/:id?',
    name: 'board',
    component: board
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
