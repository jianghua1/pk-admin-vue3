import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useUserStore } from '@/store/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => {
    return setupLayouts(routes)
  }
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  // if (to.fullPath === '/contents/') next('/')
  // 使用to.path来与routes进行比较，如果routes包含path，即跳转
  if (store.routes.includes(to.path) || store.allRoutes) {
    next()
  } else {
    if (store.token !== '') {
      // 如果用户登录之后，则跳转首页
      next('/')
    } else {
      next('/login')
    }
  }
})

export default router
