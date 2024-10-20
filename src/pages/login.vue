<template>
  <div class="flex w-[900px] h-[600px] rounded">
    <div class="w-1/2">
      <div class="bg"></div>
    </div>
    <div class="w-1/2 px-4">
      <router-view></router-view>
      <!-- 第三方登录 -->
      <el-divider direction="horizontal" class="mt-10">
        <span class="text-gray-500">其他登录方式</span>
      </el-divider>
      <div class="flex justify-around">
        <VpIconify
          class="text-2xl text-gray-400 cursor-pointer hover:text-[var(--el-color-primary)]"
          :icon="item.icon"
          v-for="(item, index) in loginItems"
          :key="index"
          @click="handleClickItem(item)"
        ></VpIconify>
      </div>
    </div>
    <!-- <el-button @click="handleClick">test 发送消息</el-button> -->
  </div>
</template>

<script setup lang="ts">
import { useWork } from '@/hooks/useWork'

definePage({
  meta: {
    title: 'pages.login.default',
    hideMenu: true,
    layout: 'single-page',
    position: 'center',
    backgroundImage: './bg.jpg'
  }
})

const loginItems = [
  {
    icon: 'ic:baseline-wechat',
    url: ''
  },
  {
    icon: 'cib:tencent-qq',
    url: ''
  },
  {
    icon: 'bi:sina-weibo',
    url: ''
  },
  {
    icon: 'mdi:github',
    url: ''
  }
]

const handleClickItem = (item) => {
  console.log('🚀 ~ handleClickItem ~ item:', item)
}

// const worker = new SharedWorker(new URL('@/utils/shared-worker.js', import.meta.url))

// const { on, emit, broadcast } = useWork()

// const handleClick = () => {
//   // emit('/1111', '从 login 页面发送的消息')
//   broadcast('从 login 页面发送的广播消息')
// }

onMounted(() => {
  // 1.从新的页面发送消息
  // if (window.opener) {
  //   window.opener.postMessage('hello from other tab', '*')
  // }
  // 2.从旧的页面发送消息，在新的 tab 中接收消息
  // window.addEventListener('message', (event) => {
  //   console.log('🚀 ~ onMounted new Tab ~ event:', event)
  // })
  // 测试内容
  // on('message', (data) => {
  //   console.log('login 页面收到消息:', data)
  // })
  // worker.port.start()
  // setTimeout(() => {
  //   worker.port.postMessage('from worker')
  // }, 5000)
})
</script>

<style scoped lang="scss">
.bg {
  background: url('@/assets/images/login.png') no-repeat center center;
  background-size: contain;
  width: 100%;
  height: 100%;
}

:deep(.el-tabs__nav-wrap) {
  &:after {
    display: none;
  }
}
</style>
