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
      if (this.tabs.some((item) => item.name === route.name || item.path === route.path)) return
      this.tabs.push({ ...route })
      this.title = ''
    },
    removeRoute(path: string) {
      this.tabs = this.tabs.filter((item) => item.name !== path)
    }
  },
  persist: true
})
