import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/popularlist',
    name: 'PopularList',
    component: () => import('../views/PopularList.vue')
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import('../views/Friends.vue')
  },
  {
    path: '/yourlist',
    name: 'YourList',
    component: () => import('../views/YourList.vue')
  },
  {
    path: '/addfriend',
    name: 'AddFriend',
    component: () => import('../views/AddFriend.vue')
  },
  {
    path: '/profilephoto',
    name: 'ProfilePhoto',
    component: () => import('../views/ProfilePhoto.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
