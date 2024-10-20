import type { VpAppRouteMenuItem as AppRouteMenuItem } from 'el-admin-components'
import { defineStore } from 'pinia'

interface TabsStoreType {
  tabs: AppRouteMenuItem[]
  current: string
  title: string
}

export const useTabsStore = defineStore('tabs', {
  state: () =>
    ({
      tabs: [] as AppRouteMenuItem[],
      current: '',
      title: ''
    }) as TabsStoreType,
  actions: {
    addRoute(route: AppRouteMenuItem) {
      if (typeof route.meta === 'undefined') route.meta = {}
      if (this.title) {
        route.meta.title = this.title
      }
      if (
        this.tabs.some((item) => {
          let flag = false
          if (item.fullPath) {
            if (item.fullPath === route.fullPath) {
              flag = true
            }
          } else {
            if (item.path === route.path) {
              flag = true
            }
          }
          return flag
        })
      )
        return
      this.tabs.push({ ...route })
      this.title = ''
    },
    removeRoute(path: string) {
      this.tabs = this.tabs.filter((item) => (item.fullPath || item.path) !== path)
    }
  },
  // 1. timestamp -> new timestamp => 7-30
  // 2. package.json -> version -> localStorage
  persist: true
})
