<template>
  <div
    class="position-absolute left-0 top-0 w-full h-full overflow-hidden flex"
    :style="{ '--el-color-primary': settings?.theme }"
  >
    <!-- 左右布局 -->
    <!-- sidebar -->
    <div
      :style="{
        width: mixMenuWidth,
        backgroundColor: settings?.backgroundColor
      }"
      class="h-full transition-width shrink-0"
      v-if="settings?.mode !== 'top'"
    >
      <el-row class="h-full">
        <el-scrollbar
          v-if="settings?.mode !== 'mix'"
          :class="[settings?.mode !== 'mixbar' ? 'flex-1' : 'w-[64px] py-4']"
          :style="{
            backgroundColor:
              settings?.mode !== 'mixbar' ? 'auto' : darken(settings?.backgroundColor, 0.2)
          }"
        >
          <!-- menu: 左侧 左侧菜单混合 -->
          <VpMenu
            v-if="settings?.mode === 'siderbar' || settings?.mode === 'mixbar'"
            text-color="#b8b8b8"
            :class="[{ mixbar: settings?.mode === 'mixbar' }]"
            :data="mixMenus"
            :collapse="settings?.mode !== 'mixbar' && localSettings.collapse"
            :background-color="
              settings?.mode !== 'mixbar' ? settings?.backgroundColor : 'transparent'
            "
            :active-text-color="settings?.theme"
            @select="handleSelect"
          ></VpMenu>
        </el-scrollbar>
        <!-- menu二级菜单：左侧菜单混合，顶部左侧菜单混合-->
        <el-scrollbar v-if="settings?.mode === 'mixbar' || settings?.mode === 'mix'" class="flex-1">
          <!-- menu -->
          <VpMenu
            text-color="#b8b8b8"
            :data="getSubMenus(menus)"
            :collapse="localSettings.collapse"
            :background-color="settings?.backgroundColor"
            :active-text-color="settings?.theme"
            @select="handleSelect"
          >
          </VpMenu>
        </el-scrollbar>
      </el-row>
    </div>
    <!-- content -->
    <div :class="['relative w-full h-full flex-1 overflow-hidden']">
      <el-scrollbar>
        <div>
          <!-- header: fullscreen, darkmode, theme, menu -->
          <VpHeader
            v-model:collapse="localSettings.collapse"
            :locales="locales"
            :username="username"
            :src="avatar"
            :data="avatarMenu"
            :settings="settings"
            :show-collapse="!lockCollapse"
            @settings-change="handleSettigsChange"
            @select="handleSelect"
          >
            <!-- menu：顶部左侧菜单混合 -->
            <VpMenu
              v-if="settings?.mode === 'mix' || settings?.mode === 'top'"
              mode="horizontal"
              :data="settings?.mode === 'mix' ? getTopMenus(menus) : menus"
              :collapse="false"
              :active-text-color="settings?.theme"
              @select="handleSelect"
            ></VpMenu>
          </VpHeader>
          <VpHeaderTabs
            v-if="settings?.showTabs"
            :data="tabsStore.tabs"
            @tab-click="handleTabClick"
            @tab-remove="handleTabRemove"
            @tab-menu-click="handleTabMenuClick"
            v-model="tabsStore.current"
          ></VpHeaderTabs>
        </div>
        <!-- router-view -->
        <div :class="['bg', contentClass]">
          <el-scrollbar>
            <Transition
              :name="camelToHyphen(settings?.transition || 'fade') + '-transition'"
              mode="out-in"
            >
              <router-view v-slot="{ Component }" v-if="$route.meta.keepAlive">
                <keep-alive :key="settings?.transition">
                  <component :is="Component" :key="$route.fullPath" :class="['rounded p-2']">
                  </component>
                </keep-alive>
              </router-view>
              <router-view v-slot="{ Component }" v-else>
                <component :is="Component" :key="$route.fullPath" :class="['rounded p-2 h-full']">
                </component>
              </router-view>
            </Transition>
          </el-scrollbar>

          <!-- <transition mode="out-in" name="fade">
      <KeepAlive :include="['Index', 'Home', 'About', '/', '/about/']" :max="20">
        <component :is="Component" :key="route.fullPath" class="p-4 rounded shadow bg-white" />
      </KeepAlive>
    </transition> -->
        </div>
      </el-scrollbar>
      <!-- <el-scrollbar>
      </el-scrollbar> -->
      <!-- <div class="overflow-y-auto h-full">
        <router-view></router-view>
      </div> -->
    </div>
    <!-- drawer -->
    <el-drawer
      direction="ltr"
      class="w-full!"
      :style="{ backgroundColor: settings?.backgroundColor }"
      v-if="isMobile"
      :model-value="!localSettings.collapse"
      @close="localSettings.collapse = true"
    >
      <!-- menu: 左侧 左侧菜单混合 -->
      <VpMenu
        text-color="#b8b8b8"
        :data="menus"
        :background-color="settings?.backgroundColor"
        :active-text-color="settings?.theme"
        @select="handleSelect"
      ></VpMenu>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import type {
  VpHeaderProps,
  VpThemeSettingsProps,
  VpDropDownMenuItem,
  VpAppRouteMenuItem
} from 'el-admin-components'
import { routes } from 'vue-router/auto-routes'
// import { useMenu } from 'el-admin-components'
import { darken, camelToHyphen } from '@/utils'
import { ElScrollbar } from 'element-plus'
import { useTabsStore } from '../store/tabs'
// import { TabActions } from '@/components/Layouts/const'
import { useUserStore } from '../store/user'

enum TabActions {
  closeOthers = 'closeOthers',
  closeLeft = 'closeLeft',
  closeRight = 'closeRight',
  closeAll = 'closeAll'
}

interface ThemeSettingsOption extends VpHeaderProps {
  username: string
  avatar: string
  avatarMenu: VpDropDownMenuItem[]
}

const isMobile = ref(false)
const lockCollapse = ref(false)

const route = useRoute()
const router = useRouter()

const tabsStore = useTabsStore()
const userStore = useUserStore()

const localSettings = reactive<ThemeSettingsOption>({
  // 折叠菜单
  collapse: false,
  locales: [
    {
      text: '中文',
      name: 'zh-CN',
      icon: 'uil:letter-chinese-a'
    },
    {
      text: 'English',
      name: 'en',
      icon: 'ri:english-input'
    }
  ],
  username: 'toimc',
  avatar: '',
  // TODO
  avatarMenu: [],
  settings: {
    menuWidth: 280
  } as VpThemeSettingsProps
})

const { locales, username, avatar, avatarMenu } = toRefs(localSettings)

function generateMenuData(routes: RouteRecordRaw[]): VpAppRouteMenuItem[] {
  const menuData: VpAppRouteMenuItem[] = []

  routes.forEach((route) => {
    let menuItem: VpAppRouteMenuItem = {
      path: route.path,
      name: route.name,
      meta: route.meta,
      alias: typeof route.redirect === 'string' ? route.redirect : undefined,
      component: route.component as any
    }
    if (route.children && Array.isArray(route.children) && route.children.length > 0) {
      menuItem.children = generateMenuData(route.children)
    }
    menuData.push(menuItem)
  })

  return menuData
}

const { getTopMenus, getSubMenus } = useMenu()

const menus = computed(() => {
  const tempMenu = generateMenuData(routes)
  if (userStore.allRoutes) return tempMenu
  // 菜单权限
  // 限制用户访问菜单
  const arr = [] as VpAppRouteMenuItem[]
  for (const item of tempMenu) {
    if (userStore.routes.includes(item.path)) {
      if (item.children && item.children.length > 0) {
        item.children = item.children.filter(
          (child) => userStore.routes.includes(child.path) || child.path === ''
        )
      }
      arr.push(item)
    }
  }
  return arr
})

const settings = computed(() => localSettings.settings)
// 混合菜单
const mixMenus = computed(() =>
  settings.value?.mode === 'mixbar' ? getTopMenus(menus.value) : menus.value
)
const menuWidth = computed(() => (localSettings.settings ? localSettings.settings.menuWidth : 240))

// 判断二组菜单的顶级是否所有的菜单项都设置了icon
const isFullIcons = computed(() =>
  getSubMenus(menus.value).every(
    (item) => typeof item.meta?.icon !== 'undefined' && item.meta?.icon
  )
)

// 混合左侧双菜单模式下的菜单宽度
const mixMenuWidth = computed(() => {
  if (isMobile.value) {
    return 0
  }
  if (settings.value?.mode === 'mixbar') {
    if (!getSubMenus(menus.value).length) {
      lockCollapse.value = true
      return '64px'
    } else {
      lockCollapse.value = false
    }
    if (isFullIcons.value) {
      return localSettings.collapse ? 'auto' : menuWidth.value + 'px'
    }
  }
  if (settings.value?.mode === 'mix') {
    if (!getSubMenus(menus.value).length) {
      lockCollapse.value = true
      return 0
    } else {
      lockCollapse.value = false
    }
  }

  return localSettings.collapse ? '64px' : menuWidth.value + 'px'
})

const tmpWidth = ref(0)
const changeWidthFlag = ref(false)

// 监听窗口变化
window.addEventListener('resize', () => {
  const width = window.innerWidth
  // document.documentElement.style.setProperty('--body-height', `${window.innerHeight}px`)

  // const { width } = entries[0].contentRect
  if (tmpWidth.value === 0) {
    tmpWidth.value = width
  }
  if (width > tmpWidth.value) {
    // 扩大屏幕
    changeWidthFlag.value = width < 640
  } else {
    // 缩小屏幕
    changeWidthFlag.value = width > 1200
  }
  if (width < 640 && !changeWidthFlag.value) {
    localSettings.collapse = true
  }
  if (width > 1200 && !changeWidthFlag.value) {
    localSettings.collapse = false
  }
  isMobile.value = width < 440
  tmpWidth.value = width
})

// 内容区域class
const contentClass = computed(() => {
  let cls = 'flex flex-col '
  if (settings.value?.fixedHead) {
    if (settings.value?.showTabs) {
      cls += 'h-[calc(100%-90px)]'
    } else {
      cls += 'h-[calc(100%-50px)]'
    }
  } else {
    if (settings.value?.showTabs) {
      cls += 'min-h-[calc(100%-90px)]'
    } else {
      cls += 'min-h-[calc(100%-50px)]'
    }
  }
  return cls
})

onBeforeMount(() => {
  // user-agent是否是移动端
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    isMobile.value = true
    localSettings.collapse = true
  }
})

watch(
  route,
  () => {
    tabsStore.addRoute(route)
    tabsStore.current = route.fullPath || (route.name as string)
  },
  {
    immediate: true
  }
)

const handleSettigsChange = (themeSettings: VpThemeSettingsProps) => {
  localSettings.settings = themeSettings
}

const handleSelect = (item: VpAppRouteMenuItem) => {
  if (item) {
    if (item.fullPath) {
      router.push(item.fullPath as string)
    } else {
      router.push({ name: item.name })
    }
    if (isMobile.value) localSettings.collapse = true
  }
}

const handleTabClick = (tab) => {
  const { index } = tab
  const route = tabsStore.tabs[index]
  if (route.fullPath) {
    router.push(route.fullPath as string)
  } else {
    router.push({ name: route.name })
  }
}

const handleTabRemove = (tab) => {
  tabsStore.removeRoute(tab)
  if (tabsStore.current === tab) {
    if (tabsStore.tabs.length !== 0) {
      tabsStore.current = tabsStore.tabs[0].name as string
    } else {
      // 用户删除了最后一个tab
      const tmpRoute = menus.value.filter((item) => item.path === '/')[0]
      tabsStore.addRoute(tmpRoute)
      tabsStore.current = tmpRoute.name as string
    }
    router.push(tabsStore.current)
  }
}

const handleTabMenuClick = (action: TabActions) => {
  const index = tabsStore.tabs.findIndex((item) => item.name === tabsStore.current)
  if (action === TabActions.closeAll) {
    tabsStore.tabs = []
    const tmpRoute = menus.value.filter((item) => item.path === '/')[0]
    tabsStore.addRoute(tmpRoute)
    tabsStore.current = tmpRoute.name as string
  } else if (action === TabActions.closeLeft) {
    tabsStore.tabs = tabsStore.tabs.splice(index, tabsStore.tabs.length - 1)
  } else if (action === TabActions.closeRight) {
    tabsStore.tabs = tabsStore.tabs.splice(0, index + 1)
  } else if (action === TabActions.closeOthers) {
    tabsStore.tabs = tabsStore.tabs.splice(index, 1)
  }
  router.push(tabsStore.current)
}
</script>

<style lang="scss" scoped>
.bg {
  background-color: var(--el-fill-color-light);
}

.mixbar {
  :deep(.el-menu-item) {
    height: auto;
    line-height: unset !important;
    flex-direction: column;
    margin-bottom: 15px;
    padding: 4px 0 !important;

    svg {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}

:deep(.el-scrollbar__view) {
  height: 100%;
}
</style>
