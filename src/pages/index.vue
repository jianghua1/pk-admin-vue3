<template>
  <div class="flex flex-1 p-2">
    <!-- 内容区域 -->
    <div class="flex-1 pr-2 overflow-hidden">
      <!-- 统计信息 -->
      <div>
        <div class="grid grid-cols-3 gap-2">
          <div class="border rounded flex flex-col text-center shadow bg-default">
            <div class="flex flex-col py-8">
              <div class="text-xl">新用户</div>
              <div class="text-3xl font-bold">0</div>
            </div>
            <div class="flex text-sm py-4 border-t justify-around">
              <div class="border-r flex-1">
                <span>普通用户</span>
                <span>10100</span>
              </div>
              <div class="flex-1">
                <span>会员用户</span>
                <span>100</span>
              </div>
            </div>
          </div>
          <div class="border rounded flex flex-col text-center shadow bg-default">
            <div class="flex flex-col py-8">
              <div class="text-xl">新用户</div>
              <div class="text-3xl font-bold">0</div>
            </div>
            <div class="flex text-sm py-4 border-t justify-around">
              <div class="border-r flex-1">
                <span>普通用户</span>
                <span>10100</span>
              </div>
              <div class="flex-1">
                <span>会员用户</span>
                <span>100</span>
              </div>
            </div>
          </div>
          <div class="border rounded shadow bg-default">test</div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="pt-2">
        <el-card shadow="never" class="shadow">
          <template #header>
            <div class="card-header">
              <span>待办事宜</span>
            </div>
          </template>
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="User" name="first">
              <VpTable :columns="columns" :data="tableData"> </VpTable>
            </el-tab-pane>
            <el-tab-pane label="Config" name="second">Config</el-tab-pane>
            <el-tab-pane label="Role" name="third">Role</el-tab-pane>
            <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
      <!-- 其他内容 快捷链接 -->
      <div class="pt-2">
        <el-card shadow="never" class="shadow">
          <template #header>
            <div class="card-header">
              <span>常用功能</span>
              <span class="text-sm ml-4 color-[var(--el-color-primary)]">自定义</span>
            </div>
          </template>
          <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
            <li
              class="flex flex-col items-center mb-8 cursor-pointer"
              v-for="(item, index) in shortCuts"
              :key="index"
            >
              <div class="w-15 h-15 bg-gray-200 rounded-1/2 flex items-center justify-center">
                <i :class="['text-3xl', item.icon]"></i>
              </div>
              <div class="text-sm mt-3">{{ item.text }}</div>
            </li>
          </ul>
        </el-card>
      </div>
    </div>
    <!-- 边栏 -->
    <div class="w-[300px] shrink-0 lt-lg:hidden">
      <!-- 通知 -->
      <div
        class="bg-default text-sm text-gray-500 py-2 pr-2 mb-2 shadow rounded grid grid-cols-1 gap-2"
      >
        <div class="flex justify-between">
          <div class="flex items-center">
            <i class="i-ep:info-filled bg-primary text-2xl mx-2"></i>
            <span class="text-ellipsis overflow-hidden text-nowrap mr-2"
              >关于 toimc 系统升级的通知</span
            >
          </div>
          <div class="flex items-center">
            <span>22:00</span>
            <i class="i-ep:arrow-right"></i>
          </div>
        </div>
      </div>
      <!-- 导航菜单 -->
      <div class="mb-2">
        <el-card shadow="never" class="shadow">
          <template #header>
            <div class="flex">
              <span>热门榜单</span>
            </div>
          </template>
          <el-tabs v-model="activeName1">
            <el-tab-pane label="学习榜" name="first">
              <ul class="flex flex-col">
                <li
                  class="flex text-sm justify-between mb-2"
                  v-for="(item, index) in headers"
                  :key="index"
                >
                  <div class="flex items-center">
                    <span class="mr-2">
                      <img :src="item.header" class="w-5 h-5 rounded-1/2" />
                    </span>
                    <span class="text-dark-300">{{ item.name }}</span>
                  </div>
                  <div class="text-gray-500">
                    <span class="text-orange pr-1">{{ item.hours }}</span
                    >h
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="活跃榜" name="second">活跃榜</el-tab-pane>
            <el-tab-pane label="课程榜" name="third">课程榜</el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
      <!-- 广告位 -->
      <div class="mb-2">
        <el-card shadow="never" class="shadow">
          <template #header>
            <div>在线客服</div>
          </template>
          <div class="flex">
            <img src="@/assets/images/qrcode.jpg" class="w-20 h-20" />
            <div class="flex flex-col items-center ml-2">
              <div class="flex items-center">
                <i class="i-ep:phone mr-2 text-xl"></i>
                <span class="text-xl">400-820-8080</span>
              </div>
              <el-button class="mt-4" type="primary">点击在线咨询</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <!-- 帮助信息 -->
      <div>
        <el-card shadow="never" class="shadow">
          <template #header>
            <div class="flex">
              <span>常见问题</span>
              <span class="text-sm ml-4 color-[var(--el-color-primary)] flex items-center">
                帮助中心
                <i class="i-ep:arrow-right"></i>
              </span>
            </div>
          </template>
          <ul>
            <li class="text-eclipse overflow-hidden text-nowrap text-sm text-gray-500 mb-3">
              如何进行提现？
            </li>
            <li class="text-eclipse overflow-hidden text-nowrap text-sm text-gray-500 mb-3">
              如何上架我的课程？
            </li>
            <li class="text-eclipse overflow-hidden text-nowrap text-sm text-gray-500 mb-3">
              toimc知识付费平台发布规范
            </li>
            <li class="text-eclipse overflow-hidden text-nowrap text-sm text-gray-500 mb-3">
              提现审核的流程是什么？
            </li>
            <li class="text-eclipse overflow-hidden text-nowrap text-sm text-gray-500 mb-3">
              如何创建图文内容的课程
            </li>
            <li class="text-eclipse overflow-hidden text-nowrap text-sm text-gray-500 mb-3">
              上架视频课程的要求
            </li>
          </ul>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { useWork } from '@/hooks/useWork'

definePage({
  meta: {
    title: 'pages.home',
    icon: 'mdi:home'
  }
})

const activeName = ref('first')
const activeName1 = ref('first')

const shortCuts = ref([
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  },
  {
    icon: 'i-ep:user',
    text: '新建图文'
  }
])

const headers = ref([
  {
    header: '/headers/1.jpeg',
    name: 'Brian老师',
    hours: 12
  },
  {
    header: '/headers/2.jpeg',
    // 随机名称
    name: '小白同学',
    hours: 11
  },
  {
    header: '/headers/3.jpeg',
    name: '前端老王',
    hours: 9
  },
  {
    header: '/headers/4.jpeg',
    name: 'Java 大哥',
    hours: 8
  },
  {
    header: '/headers/5.jpeg',
    name: '前端老王',
    hours: 9
  },
  {
    header: '/headers/6.jpeg',
    name: 'Java 大哥666',
    hours: 8
  }
])

// 内容表格
const columns = ref([
  {
    prop: 'date',
    label: 'Date'
  },
  {
    prop: 'name',
    label: 'Name'
  },
  {
    prop: 'address',
    label: 'Address'
  }
] as any[])

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

const handlePageChange = (number) => {
  console.log('🚀 ~ file: index.vue:105 ~ handlePageChange ~ number:', number)
}

// sharedWorker
const { on, emit, message, routeIds } = useWork()

watch(message, () => {
  console.log('new message', message.value)
})

const handleClick = () => {
  console.log('message', routeIds.value)
  emit('/login', 'hello from page index')
}

onMounted(() => {
  // localhost:5173  dashboard 页面 => 接收端（源侧）
  // open打开新的 tab -> toimc.cn:5173 -> host 映射 -> localhost
  // 1. tab 新的标签发送消息 postMessage
  // window.addEventListener('message', (event) => {
  //   console.log('🚀 ~ onMounted ~ event:', event)
  //   if (event.origin !== 'http://toimc.cn:5173') {
  //     return
  //   }
  //   // 从正常的 tab 传来的数据
  //   console.log('🚀 ~ onMounted ~ event.data:', event.data)
  // })
  // 2. 从新的页面发送消息
  // 如果需要往新开的 tab 发送消息
  // const newPage = window.open('http://toimc.cn:5173/#/login')
  // setTimeout(() => {
  //   // 测试发送
  //   if (newPage && newPage.postMessage) {
  //     newPage.postMessage('hello from old tab', '*')
  //   }
  // }, 5000)
  // window.channel = new BroadcastChannel('channel_name')
  // on('message', (data) => {
  //   console.log('index page接收到消息:', data)
  // })
  // worker.port.onmessage = (e) => {
  //   console.log('worker:', e)
  // }
})
</script>

<style scoped lang="scss">
:deep(.el-tabs__nav-wrap) {
  &:after {
    display: none;
  }
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
