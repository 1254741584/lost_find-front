import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import login from '@/pages/user/login'
import register from '@/pages/user/register'
import lostCreate from '@/pages/lost/create'
import lostList from '@/pages/lost/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/user/login',
      name: 'login',
      component: login
    },
    {
      path: '/user/register',
      name: 'register',
      component: register
    },
    {
      path: '/lost/create',
      name: 'lostCreate',
      component: lostCreate
    },
    {
      path: '/lost/list',
      name: 'lostList',
      component: lostList
    }
  ]
})
