import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: () => import('@/components/LayoutShell.vue'),
    children: [
      { path: '', name: 'Dashboard', component: () => import('@/views/Dashboard.vue') },
      { path: 'users', name: 'Users', component: () => import('@/views/Users.vue') },
      { path: 'customers', name: 'Customers', component: () => import('@/views/Customers.vue') },
      { path: 'devices', name: 'Devices', component: () => import('@/views/Devices.vue') },
      { path: 'devices/:id', name: 'DeviceDetail', component: () => import('@/views/DeviceDetail.vue') }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')

  if (!token && to.path !== '/login') {
    // 没有 token 还想进后台，强制跳登录
    return next('/login')
  }

  if (token && to.path === '/login') {
    // 已登录还访问登录页？直接跳首页
    return next('/')
  }

  next()
})


export default router
