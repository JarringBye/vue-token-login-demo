import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginHome from '../views/LoginHome'
import UserMain from '@/views/UserMain'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/user' // 默认进入user页面，如果token没有或者不对会返回login页面
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
