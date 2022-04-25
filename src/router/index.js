import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginHome from '../views/LoginHome'
import UserMain from '@/views/UserMain'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginHome
  },
  {
    path: '/user',
    name: 'user',
    component: UserMain
  }
]

const router = new VueRouter({
  // mode: history,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'login' && token == null) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
