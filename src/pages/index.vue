<template>
  <div class="flex">
    <!-- 内容区域 -->
    <div class="flex-1 pr-5">
      <!-- 统计 -->
      <div class="grid grid-cols-3 gap-5">
        <div class="border rounded flex flex-col text-center shadow bg-default">
          <div class="flex flex-col flex-1 items-center justify-center bg-white py-8 shadow">
            <div class="text-3xl">新用户</div>
            <div class="text-3xl font-bold">0</div>
          </div>
          <div class="flex items-center justify-around bg-gray-200 text-sm py-4">
            <div class="flex-1 border-r-1 border-gray-300">
              <span>普通用户：</span>
              <span>0</span>
            </div>
            <div class="flex-1">
              <span>会员用户：</span>
              <span>100</span>
            </div>
          </div>
        </div>
        <div class="border rounded shadow bg-default">
          test
        </div>
        <div class="border rounded shadow bg-default">
          test
        </div>
      </div>
      <!-- 待办事宜 -->
      <div class="pt-4">
        <el-card class="shadow" shadow="never">
          <template #header>
            <div class="card-header">
              <span>待办事宜</span>
            </div>
          </template>
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="User" name="first">
              <VpTable :columns="columns" :data="tableData">
              </VpTable>
            </el-tab-pane>
            <el-tab-pane label="Config" name="second">Config</el-tab-pane>
            <el-tab-pane label="Role" name="third">Role</el-tab-pane>
            <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
      <!-- 常用功能 -->
      <div class="pt-4">
        <el-card class="shadow" shadow="never">
          <template #header>
            <div class="card-header">
              <span>常用功能</span>
              <span class="text-sm text-blue-400 ml-4">自定义</span>
            </div>
          </template>
          <div>
            <ul class="grid grid-cols-7">
              <li class="flex flex-col items-center mb-8 cursor-pointer" v-for="item in shortCuts" :key="index">
                <div class="flex items-center justify-center w-15 h-15 rounded-1/2 bg-gray-200">
                  <i :class="item.icon" class="text-3xl"></i>
                </div>
                <div class="text-sm mt-3">{{ item.text }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 边栏 -->
    <div class=" w-[300px]">
      <!-- 消息通知 -->
      <div>消息通知</div>
      <!-- 广告位 -->
      <div>广告位</div>
      <!-- 帮助 -->
      <div>帮助</div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { TabsPaneContext } from 'element-plus/es/components/tabs/src/constants';
import type { VpTableColumnType } from 'el-admin-components'

const worker = new SharedWorker(new URL('@/utils/shared-worker.ts', import.meta.url));
definePage({
  meta: {
    title: 'pages.home',
    icon: 'mdi:home'
  }
})

const activeName = ref('first')

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
] as VpTableColumnType[])

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

const shortCuts = ref([
  {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }, {
    icon: 'i-ep:user',
    text: '新建图文'
  }
])

const handlePageChange = (number) => {
  console.log('🚀 ~ file: index.vue:105 ~ handlePageChange ~ number:', number)
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
onMounted(() => {
  worker.port.start()
  //接收消息
  worker.port.onmessage = (event) => {
    console.log('🚀 ~ file: index.vue:111 ~ worker.port.onmessage ~ event:', event)
  }

})
</script>

<style scoped lang="scss">
:deep(.el-tabs__nav-wrap)::after {
  display: none;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
