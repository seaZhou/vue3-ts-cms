import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { firstRoute } from '@/utils/map-menu'
import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/userInfo/userInfo.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    // 判断是否登录，没有登录则跳回到登录页
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }

    if (to.path === '/main') {
      console.log(firstRoute, 'firstRoute')
      return firstRoute?.path
    }
  }
})

export default router
