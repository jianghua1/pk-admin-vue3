import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '123123',
    roles: ['users'],
    // 控制是否可以访问所有的路由
    allRoutes: true,
    // TODO
    // public公共路由 + private私有路由
    routes: ['/', '/contents', '/login', '/contents/content-detail']
  })
})
