<template>
  <div>
    <div class="container-default">
      <div class="left-marker mb-4">订单管理</div>
      <div>
        <VpForm :schema="schema">
          <template #actions>
            <el-form-item>
              <el-button type="primary">
                <div class="flex">
                  <i class="i-ep:search mr-1"> </i>
                  <span>筛选订单</span>
                </div>
              </el-button>
              <el-button>
                <div class="flex">
                  <i class="i-ep:refresh mr-1"> </i>
                  <span>重置筛选</span>
                </div>
              </el-button>
            </el-form-item>
          </template>
        </VpForm>
      </div>
      <!-- 表格 -->

      <el-tabs v-model="active" class="demo-tabs">
        <el-tab-pane label="支付订单" name="order">
          <VpTable stripe border :columns="columns" :pagination="pagination" :max-height="300" :data="tableData">
          </VpTable>
        </el-tab-pane>
        <el-tab-pane label="退款订单" name="refund">
          <VpTable stripe border :columns="refundColumns" :pagination="pagination" :max-height="300" :data="tableData1">
          </VpTable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { VpFormSchema, VpTableColumnType } from 'el-admin-components'
import dayjs from 'dayjs'

definePage({
  meta: {
    title: '订单管理',
    icon: 'ep:goods'
  }
})

const active = ref('order')

const schema = ref([
  {
    prop: 'id',
    value: '',
    label: '订单编号',
    span: 5,
    type: 'input',
    class: 'mr-4'
  },
  // 商品分类
  {
    prop: 'type',
    value: '',
    label: '商品分类',
    span: 6,
    class: 'mr-4',
    type: 'select',
    attrs: {
      multiple: true,
      clearable: true
    },
    children: [
      {
        label: '优质专栏',
        value: 0
      },
      {
        label: '实战课',
        value: 1
      },
      {
        label: '体系课',
        value: 2
      },
      {
        label: '免费课',
        value: 3
      }
    ]
  },
  // 订单状态
  {
    prop: 'status',
    value: '',
    label: '订单状态',
    span: 6,
    class: 'mr-4',
    type: 'select',
    attrs: {
      multiple: true,
      clearable: true
    },
    children: [
      {
        label: '未付款',
        value: 0
      },
      {
        label: '已付款',
        value: 1
      },
      {
        label: '已取消',
        value: 2
      },
      {
        label: '退款中',
        value: 3
      },
      {
        label: '已退款',
        value: 4
      },
      {
        label: '其他异常',
        value: -1
      }
    ]
  },
  // 支付方式
  {
    prop: 'payType',
    value: '',
    label: '支付方式',
    span: 6,
    type: 'select',
    attrs: {
      multiple: true
    },
    children: [
      {
        label: '微信',
        value: 0
      },
      {
        label: '支付宝',
        value: 1
      },
      {
        label: '银联',
        value: 2
      },
      {
        label: '其他',
        value: -1
      }
    ]
  },
  // 买家昵称
  {
    prop: 'username',
    value: '',
    label: '买家昵称',
    span: 6,
    type: 'input',
    class: 'mr-4'
  },
  // 创建时间
  {
    prop: '',
    label: '创建时间',
    schema: [
      {
        span: 11,
        prop: 'date1',
        value: '',
        type: 'date-picker',
        label: '',
        attrs: {
          type: 'date',
          placeholder: '',
          style: {
            width: '100%'
          }
        }
      },
      {
        span: 2,
        value: '-',
        attrs: {
          class: 'text-center w-full'
        }
      },
      {
        span: 11,
        type: 'date-picker',
        prop: 'date2',
        value: '',
        label: '',
        attrs: {
          placeholder: '',
          style: {
            width: '100%'
          }
        }
      }
    ]
  }
] as VpFormSchema)

const columns = ref([
  {
    type: 'index',
    label: '#',
    align: 'center',
    width: 55
  },
  {
    prop: 'created',
    label: '交易时间',
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
    prop: 'name',
    label: '商品名称'
  },
  {
    prop: 'id',
    label: '订单编号',
    width: 200
  },
  {
    prop: 'price',
    label: '单价',
    width: 80,

    align: 'center'
  },
  {
    prop: 'num',
    label: '数量',
    width: 60,
    align: 'center'
  },
  {
    prop: 'real-pay',
    label: '实付金额',
    width: 120,
    align: 'center'
  },
  {
    prop: 'type',
    label: '订单状态',
    align: 'center',
    width: 120,
    defaultSlot: (scope) => {
      const {
        row: { type }
      } = scope
      if (typeof type === 'undefined') return
      const typeMap = {
        0: { name: '未付款', type: 'warning' },
        1: { name: '已付款', type: 'success' },
        2: { name: '已取消', type: 'info' },
        3: { name: '退款中', type: 'warning' },
        4: { name: '已退款', type: 'success' },
        '-1': { name: '其他异常', type: 'danger' }
      }
      return <el-tag type={typeMap[type].type || 'primary'}>{typeMap[type].name}</el-tag>
    }
  },
  {
    prop: 'payType',
    label: '支付方式',
    align: 'center',
    width: 120,
    defaultSlot: (scope) => {
      const {
        row: { payType }
      } = scope
      if (typeof payType === 'undefined') return
      const typeMap = {
        0: '微信',
        1: '支付宝',
        2: '银联',
        '-1': '其他'
      }
      return typeMap[payType]
    }
  },
  {
    prop: 'username',
    label: '买家昵称',
    width: 120
  },
  {
    prop: '',
    label: '更多操作',
    fixed: 'right',
    defaultSlot: (scope) => {
      const { row } = scope
      const { isHide } = row

      const hideStatus = isHide ? (
        <i class="i-ep:hide text-xl bg-info cursor-pointer mr-2"></i>
      ) : (
        <i class="i-ep:view text-xl bg-info cursor-pointer mr-2"></i>
      )
      return (
        <div class="vertical-middle flex items-center">
          <el-tooltip class="box-item" effect="light" content="查看" placement="top-start">
            <i class="i-ep:chat-line-square bg-primary text-xl cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="回复" placement="top-start">
            <i class="i-ep:position text-xl bg-primary mr-2  cursor-pointer"></i>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="light"
            content={isHide ? '已屏蔽' : '正常'}
            placement="top-start"
          >
            {hideStatus}
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="删除" placement="top-start">
            <i class="i-ep:delete text-xl bg-error cursor-pointer"></i>
          </el-tooltip>
        </div>
      )
    }
  }
] as VpTableColumnType[])

const refundColumns = ref([
  {
    type: 'index',
    label: '#',
    align: 'center',
    width: 55
  },
  {
    prop: 'created',
    label: '交易时间',
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
    prop: 'name',
    label: '商品名称'
  },
  {
    prop: 'id',
    label: '订单编号',
    width: 200
  },
  {
    prop: 'real-pay',
    label: '实付金额',
    width: 120,
    align: 'center'
  },
  {
    prop: 'apply-refund',
    label: '申请退款',
    align: 'center',
    width: 120
  },
  {
    prop: 'refund',
    label: '实际退款',
    width: 120,
    align: 'center'
  },
  {
    prop: 'type',
    label: '订单状态',
    align: 'center',
    width: 120,
    defaultSlot: (scope) => {
      const {
        row: { type }
      } = scope
      if (typeof type === 'undefined') return
      const typeMap = {
        0: { name: '未付款', type: 'warning' },
        1: { name: '已付款', type: 'success' },
        2: { name: '已取消', type: 'info' },
        3: { name: '退款中', type: 'warning' },
        4: { name: '已退款', type: 'success' },
        '-1': { name: '其他异常', type: 'danger' }
      }
      return <el-tag type={typeMap[type].type || 'primary'}>{typeMap[type].name}</el-tag>
    }
  },
  {
    prop: 'payType',
    label: '支付方式',
    align: 'center',
    width: 120,
    defaultSlot: (scope) => {
      const {
        row: { payType }
      } = scope
      if (typeof payType === 'undefined') return
      const typeMap = {
        0: '微信',
        1: '支付宝',
        2: '银联',
        '-1': '其他'
      }
      return typeMap[payType]
    }
  },
  {
    prop: 'username',
    label: '买家昵称',
    width: 120
  },
  {
    prop: 'reason',
    label: '退款原因'
  },
  {
    prop: '',
    label: '更多操作',
    fixed: 'right',
    defaultSlot: (scope) => {
      const { row } = scope
      const { isHide } = row

      const hideStatus = isHide ? (
        <i class="i-ep:hide text-xl bg-info cursor-pointer mr-2"></i>
      ) : (
        <i class="i-ep:view text-xl bg-info cursor-pointer mr-2"></i>
      )
      return (
        <div class="vertical-middle flex items-center">
          <el-tooltip class="box-item" effect="light" content="查看" placement="top-start">
            <i class="i-ep:chat-line-square bg-primary text-xl cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="回复" placement="top-start">
            <i class="i-ep:position text-xl bg-primary mr-2  cursor-pointer"></i>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="light"
            content={isHide ? '已屏蔽' : '正常'}
            placement="top-start"
          >
            {hideStatus}
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="删除" placement="top-start">
            <i class="i-ep:delete text-xl bg-error cursor-pointer"></i>
          </el-tooltip>
        </div>
      )
    }
  }
] as VpTableColumnType[])

const pagination = ref({
  align: 'right',
  small: false,
  background: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 7,
  pageSizes: [10, 20, 30, 40, 50, 100],
  total: 100
} as any)

const tableData = ref([])
const tableData1 = ref([])
</script>

<style scoped></style>
