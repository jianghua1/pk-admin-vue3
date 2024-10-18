<template>
  <div>
    <div class="container-default">
      <div class="left-marker mb-2">章节详情</div>
      <!-- 统计信息 -->
      <div class="grid grid-cols-4 gap-5">
        <!-- 用户数 -->
        <div :class="[
          'flex flex-col text-xl justify-center items-center py-4 rounded border',
          index % 2 === 0 ? 'bg-gray-100' : 'bg-[var(--el-color-primary-light-8)]'
        ]" v-for="(item, index) in items" :key="index">
          <div class="text-gray-400 text-base">{{ item.title }}</div>
          <div class="text-dark-300 font-bold">{{ item.value }}</div>
        </div>
        <!-- 付费信息 -->
      </div>

    </div>
    <div class="container-default mt-2">
      <div class="flex items-center">
        <el-button type="success">新增章节
          <template #icon>
            <i class="i-ep:plus text-2xl"></i>
          </template>
        </el-button>
      </div>
      <!-- 表格 -->
      <VpTable stripe border :columns="columns" :pagination="pagination" :max-height="300" :data="tableData">
        <template #footer-actions>
          <el-button type="primary">全选</el-button>
          <el-button>取消全选</el-button>
          <el-button>批量删除</el-button>
          <el-button>批量设置</el-button>
        </template>
      </VpTable>
    </div>
  </div>
</template>

<script setup lang='tsx'>
import type { VpTableColumnType } from 'el-admin-components';
import dayjs from 'dayjs';
import { useTabsStore } from '@/store/tabs';

definePage({
  meta: {
    title: '内容详情',
    hideMenu: true
  }
})
const items = ref([
  {
    title: '已上架视频/未上架',
    value: '100/20'
  },
  {
    title: '视频时长',
    value: 45
  },
  {
    title: '资料总数',
    value: 100
  },
  {
    title: '习题总数',
    value: 10
  }
])

const router = useRouter()
const store = useTabsStore()

const pagination = ref({
  align: 'right',
  small: false,
  background: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 7,
  pageSizes: [10, 20, 30, 40, 50, 100],
  total: 100
} as any)

const columns = ref([
  {
    prop: '',
    type: 'selection',
    align: 'center'
  },
  {
    prop: 'id',
    label: 'Id',
    align: 'center',
    width: 60
  },
  {
    prop: 'name',
    label: '章节名',
    align: 'center',
    width: 220
  },
  {
    prop: 'desc',
    label: '章节介绍'
  },
  {
    prop: 'courses',
    label: '课程数',
    align: 'center',
    width: 120
  },
  {
    prop: 'attachments',
    label: '资料数',
    align: 'center',
    width: 120
  },
  {
    prop: 'created',
    label: '创建时间',
    align: 'center',
    width: 120,
    defaultSlot: (scope) => {
      const {
        row: { created }
      } = scope
      if (created) {
        return dayjs(created).format('YYYY-MM-DD')
      } else {
        return '-'
      }
    }
  },
  {
    prop: 'guide',
    label: '导学视频',
    align: 'center',
    width: 100
  },
  {
    prop: 'status',
    label: '状态',
    align: 'center',
    width: 80,
    defaultSlot: (scope) => {
      const { row } = scope
      // 未开始，完结，进行中，已上架，已下架，未上架
      return row.status
    }
  },
  {
    prop: '',
    label: '更多操作',
    width: 160,
    fixed: 'right',
    defaultSlot: (scope) => {
      const { row } = scope
      const handleMore = () => {
        router.push({
          path: '/contents/content-detail',
          query: {
            id: row.id,
            level: '2'
          }
        })
        store.title = '这是一个新的标题1'
      }
      return (
        <div class="vertical-middle flex items-center">
          <el-tooltip class="box-item" effect="light" content="编辑" placement="top-start">
            <i class="i-ep:edit text-xl cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="更多信息" placement="top-start">
            <i class="i-ep:warning-filled text-xl  cursor-pointer mr-2" onClick={handleMore}></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="上架" placement="top-start">
            <i class="i-ep:upload text-xl bg-primary cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="预览" placement="top-start">
            <i class="i-ep:view text-xl bg-primary cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="删除" placement="top-start">
            <i class="i-ep:delete text-xl bg-error cursor-pointer mr-2"></i>
          </el-tooltip>
        </div>
      )
    }
  }
] as VpTableColumnType[])

const tableData = ref([
  {
    id: 1,
    name: '第一章',
    desc: '第一章的简介',
    courses: 10,
    attachments: 20,
    guide: 1,
    created: '2022-11-11',
    students: 100,
    creator: 'admin',
    status: 1
  }
])
</script>
<style scoped></style>