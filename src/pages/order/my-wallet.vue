<template>
  <div>
    <div class="container-default mb-4">
      <div class="left-marker mb-4">数据统计</div>
      <div class="grid grid-cols-4 gap-5">
        <!-- 用户数 -->
        <div :class="[
          'flex flex-col text-xl justify-center items-center py-4 rounded border relative',
          index % 2 === 0 ? 'bg-gray-100' : 'bg-[var(--el-color-primary-light-8)]'
        ]" v-for="(item, index) in items" :key="index">
          <div class="text-gray-400 text-base">{{ item.title }}</div>
          <div class="text-dark-300 font-bold">{{ item.value }}</div>
          <div
            class="absolute right-0 bottom-0 text-sm underline text-color-[var(--el-color-primary)] cursor-pointer p-4"
            v-if="item && index == items.length - 1">
            提现 >
          </div>
        </div>
      </div>
    </div>
    <div class="container-default">
      <div class="left-marker mb-4">账单明细</div>
      <VpTable stripe border :columns="columns" :pagination="pagination" :data="tableData" ref="tableRef">
      </VpTable>
    </div>
  </div>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs'
import type { VpTableColumnType } from 'el-admin-components'
import { dividerProps } from 'element-plus'
definePage({
  meta: {
    title: '我的钱包',
    icon: 'ep:wallet'
  }
})

const tableRef = ref()

const items = ref([
  {
    title: '今日收入(元)',
    value: 100
  },
  {
    title: '累计收入(元)',
    value: 100
  },
  {
    title: '可用余额(元)',
    value: 100
  },
  {
    title: '可提现金额(元)',
    value: 100
  }
])

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
    type: 'expand',
    defaultSlot: ({ row }) => {
      console.log('🚀 ~ row:', row)
      if (row.steps && row.steps.length > 0) {
        return (
          <div class="p-2">
            <div class="left-marker mb-4">审核流程详情：</div>
            <el-steps class="w-full" space={150} active={row.steps.length} align-center>
              {row.steps.map((item) => (
                <el-step title={item.title} description={item.description} status={item.status} />
              ))}
            </el-steps>
          </div>
        )
      } else {
        return '-'
      }
    }
  },
  {
    type: 'index',
    label: '#',
    align: 'center',
    width: 60
  },
  {
    prop: 'created',
    label: '创建时间',
    align: 'center',
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
    prop: 'username',
    label: '提现用户',
    align: 'center'
  },
  {
    prop: 'price',
    label: '提现金额',
    width: 120,
    align: 'center'
  },
  {
    prop: 'type',
    label: '状态',
    align: 'center',
    width: 180,
    defaultSlot: (scope) => {
      const {
        row: { type }
      } = scope
      const handleClick = () => {
        if (tableRef.value) {
          tableRef.value.toggleRowExpansion(scope.row, !scope.expanded)
        }
      }

      if (typeof type === 'undefined') return
      const typeMap = {
        //  提现状态 提交申请、审批中、审批通过、审批拒绝、已提交打款、打款成功、打款失败
        0: { name: '提交申请', type: 'primary' },
        1: { name: '审批中', type: 'warning' },
        2: { name: '审批通过', type: 'success' },
        3: { name: '审批拒绝', type: 'info' },
        4: { name: '已提交打款', type: 'info' },
        5: { name: '打款成功', type: 'success' },
        6: { name: '打款失败', type: 'danger' },
        '-1': { name: '其他', type: 'danger' }
      }
      return (
        <>
          <el-tag type={typeMap[type].type || 'primary'}>{typeMap[type].name}</el-tag>
          <el-button link onClick={handleClick}>
            {'查看详情>>'}
          </el-button>
        </>
      )
    }
  },
  {
    prop: 'payInfo',
    label: '支付详情',
    align: 'center',
    width: 120,
    defaultSlot: (scope) => {
      return (
        <el-button link type="primay">
          查看详情
        </el-button>
      )
    }
  },
  {
    prop: '',
    label: '更多操作',
    fixed: 'right',
    width: 200,
    defaultSlot: (scope) => {
      const { row } = scope
      console.log('🚀 ~ row:', row)

      return (
        <div class="vertical-middle flex items-center">
          <el-tooltip class="box-item" effect="light" content="查看" placement="top-start">
            <i class="i-ep:chat-line-square bg-primary text-xl cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="删除" placement="top-start">
            <i class="i-ep:delete text-xl bg-error cursor-pointer"></i>
          </el-tooltip>
        </div>
      )
    }
  }
] as VpTableColumnType[])

const tableData = ref([
  {
    created: '2022-12-12 12:12:12',
    username: '测试用户',
    price: 100,
    type: 5,
    payInfo: '支付宝支付',
    steps: [
      {
        title: '提交申请',
        value: 0,
        status: 'success'
      },
      {
        title: '审批中',
        value: 1,
        status: 'success'
      },
      {
        title: '审批通过',
        value: 2,
        status: 'success'
      },
      {
        title: '已提交打款',
        value: 4,
        status: 'process'
      },
      {
        title: '打款成功',
        value: 5,
        status: 'wait'
      }
    ]
  },
  {
    created: '2022-12-12 12:12:12',
    username: '测试用户',
    price: 100,
    type: 5,
    payInfo: '支付宝支付',
    steps: [
      {
        title: '提交申请',
        value: 0,
        status: 'success'
      },
      {
        title: '审批中',
        value: 1,
        status: 'success'
      },
      {
        title: '审批拒绝',
        value: 3,
        status: 'error'
      }
    ]
  },
  {
    created: '2022-12-12 12:12:12',
    username: '测试用户',
    price: 100,
    type: 5,
    payInfo: '支付宝支付',
    steps: [
      {
        title: '提交申请',
        value: 0,
        status: 'success'
      },
      {
        title: '审批中',
        value: 1,
        status: 'success'
      },
      {
        title: '审批通过',
        value: 2,
        status: 'wait'
      },
      {
        title: '已提交打款',
        value: 4,
        status: 'wait'
      },
      {
        title: '打款成功',
        value: 5,
        status: 'wait'
      }
    ]
  }
])
</script>

<style scoped></style>
