<template>
  <!-- <div>query: {{ $route.query }}</div> -->
  <div>
    <div class="mb-4 container-default">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <!-- 头像 -->
          <el-avatar :size="50" src="/headers/1.jpeg" class="mr-4"></el-avatar>
          <!-- 用户信息 -->
          <div class="flex flex-col justify-start">
            <!-- 昵称 -->
            <div>
              <span>jianghua同学</span>
              <span class="ml-3">
                <el-tag type="primary" size="small">普通用户</el-tag>
              </span>
            </div>
            <!-- 地域信息 -->
            <div class="text-sm text-gray-300 pt-3">湖北武汉</div>
            <!-- 最后登录信息 -->
            <div class="text-sm text-gray-400">最后登录时间：2022-10-10 10:10:10</div>
          </div>
        </div>
        <div class="flex flex-col text-2xl justify-end">
          <div class="flex mb-4 items-center">
            <span>学生评级</span>
            <span>E-</span>
          </div>
        </div>
      </div>
      <VpDescription title="基础信息" border :column="2" :data="data"></VpDescription>
      <div class="container-default">
        <el-tabs v-model:model-value="activeTag" class="demo-tabs">
          <el-tab-pane label="购买记录" name="purchase">
            <!-- 表格 -->
            <VpTable border :columns="columns" :data="tableData" :pagination="pagination">
            </VpTable>
          </el-tab-pane>
          <el-tab-pane label="学习情况" name="lessons">222</el-tab-pane>
          <el-tab-pane label="用户评论" name="comments">333</el-tab-pane>
          <el-tab-pane label="学分收支" name="points">444</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang='tsx'>
import type { VpPaginationType, VpTableColumnType } from "el-admin-components"
definePage({
  meta: {
    hideMenu: true
  }
})

const data = ref([{
  label: '邮箱',
  value: '12345678900@qq.com'
}, {
  label: '微信',
  value: '一页书'
}, {
  label: '是否是会员',
  value: '是'
}, {
  label: '会员过期时间',
  value: '2022-10-10 10:10:10'
}
])

const activeTag = ref('purchase')

const columns = ref([
  {
    prop: 'index',
    label: '#',
    // width: 60, // 可以设置列宽
    align: 'center',
    fixed: 'left'
  },
  {
    prop: 'name',
    label: '商品名称',
    align: 'center'
  },
  {
    prop: 'type',
    label: '类型',
    align: 'center',
    defaultSlot: (scope) => {
      const { row: { type } } = scope
      if (typeof status === 'undefined') return
      //定义类型字典
      const typeMap = {
        0: '专栏',
        1: '实战课',
        2: '体系课',
        3: '直播课',
        4: '免费课'
      }
      return typeMap[type]
    }
  },
  {
    prop: 'price',
    label: '价格',
    align: 'center',
    width: 120
  },
  {
    prop: 'real-price',
    label: '实付',
    align: 'center',
    width: 120
  },
  {
    prop: 'created-at',
    label: '创建时间',
    align: 'center'
  },
  {
    prop: 'status',
    label: '订单状态',
    align: 'center',
    width: 200,
    defaultSlot: (scope) => {
      const { row: { status } } = scope
      //定义状态字典
      const typeMap = {
        0: {
          name: '未支付', type: 'warning'
        },
        1: {
          name: '已付款', type: 'success'
        },
        2: {
          name: '已取消', type: 'info'
        },
        3: {
          name: '其他', type: 'error'
        }
      }
      const statusObj = typeMap[status]
      if (typeof statusObj === 'undefined') return
      return (
        <el-tag class="ml-2" type={typeMap[status].type || 'primary'}>{typeMap[status].name}</el-tag>
      )
    }
  },
  {
    prop: '',
    label: '更多操作',
    align: 'center',
    fixed: 'right',
    width: 130,
    defaultSlot: (scope) => {
      const { row } = scope
      const handleMore = () => {
        console.log(row)
      }
      return (
        <div>
          <el-button type="primary" size="small" onClick={handleMore}>详细信息</el-button>
        </div>
      )
    }
  }
] as VpTableColumnType[])

const tableData = ref([
  {
    name: '商品名称',
    type: 0,
    price: '100',
    'real-price': '80',
    'created-at': '2024-01-01 00:00:00',
    status: 1
  }
])
//添加序号
tableData.value = tableData.value.map((item, index) => ({ ...item, index: index + 1 }))

const pagination = ref({
  align: 'right',
  small: false,
  background: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 7,
  pageSizes: [10, 20, 30, 40, 50, 100],
  total: 100
} as VpPaginationType)
</script>
<style scoped></style>