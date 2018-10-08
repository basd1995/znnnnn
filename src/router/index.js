import Vue from 'vue'
import Router from 'vue-router'
import Direct from '@/components/Direct/Direct'
import Home from '@/components/Home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Direct',
      name: 'Direct',
      component: Direct
    }
  ]
})
