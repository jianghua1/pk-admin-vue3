<template>
  <div>
    <div class="container-default mb-4">
      <!-- query:{{ $route.query }} -->
      <!-- 基础信息 -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <!-- 头像 -->
          <el-avatar :size="50" src="/headers/1.jpeg" class="mr-4"></el-avatar>
          <!-- 用户信息 -->
          <div class="flex flex-col justify-start">
            <!-- 昵称，角色标签 -->
            <div class="flex mb-4">
              <span class="text-xl mr-4">toimc同学</span><span>
                <el-tag type="primary" size="small">普通用户</el-tag>
              </span>
            </div>
            <!-- 地域信息 -->
            <div class="text-sm text-gray-400">湖北武汉</div>
            <!-- 最后登录信息 -->
            <div class="text-sm text-gray-500">最后登录时间:2022-01-01 00:00:00</div>
          </div>
        </div>
        <div class="flex flex-col text-2xl justify-end">
          <div class="flex mb-4 items-center">
            <span class="mr-2 text-carnation-100">学生评级</span>
            <span class="text-3xl font-bold text-center w-[60px]">{{
              calculateGrade(percentage)
            }}</span>
          </div>
          <!-- 进度条 -->
          <el-progress :percentage="percentage" :color="customColors" :show-text="false" />
          <div class="text-sm text-gray-300 mt-2">购买力+学习能力（供参考）</div>
        </div>
      </div>
      <VpDescription title="基础信息" title-class="left-marker" border :column="2" :data="data"></VpDescription>
    </div>
    <div class="container-default">
      <el-tabs v-model="activeTag" class="demo-tabs">
        <el-tab-pane label="购买记录" name="purchase">
          <div class="mt-4">
            <VpTable stripe border :columns="columns" :pagination="pagination" :max-height="300" :data="tableData">
            </VpTable>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学习情况" name="lessons">
          <div class="grid grid-cols-4 gap-5">
            <!-- 用户数 -->
            <div :class="[
              'flex flex-col text-xl justify-center items-center py-4 rounded border',
              index % 2 === 0 ? 'bg-gray-100' : 'bg-[var(--el-color-primary-light-8)]'
            ]" v-for="(item, index) in items" :key="index">
              <div class="text-gray-400 text-base">{{ item.title }}</div>
              <div class="text-dark-300 font-bold">{{ item.value }}</div>
            </div>
          </div>
          <!-- 学习数据图表 -->
          <div class="my-4 left-marker">学习数据情况</div>
          <VpVueEcharts :option="options" :height="400"></VpVueEcharts>
        </el-tab-pane>
        <el-tab-pane label="用户评论" name="comments">
          <div class="mt-4">
            <VpTable stripe border :columns="commentsColumns" :pagination="pagination" :max-height="300"
              :data="commentsData">
            </VpTable>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学分收支" name="points">
          <div class="mt-4">
            <VpTable stripe border :columns="pointsColumns" :pagination="pagination" :max-height="300"
              :data="pointsData">
            </VpTable>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { VpFormSchema } from 'el-admin-components'
import { calculateGrade } from '@/utils'
import * as echarts from 'echarts'

definePage({
  meta: {
    title: '会员详情',
    hideMenu: true
  }
})

const options = ref({
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [
      '2024-01-01',
      '2024-01-02',
      '2024-01-03',
      '2024-01-04',
      '2024-01-05',
      '2024-01-06',
      '2024-01-07'
    ]
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      label: {
        backgroundColor: '#6a7985'
      }
    },
    formatter: function (params) {
      params = params[0]
      return `🚀 ${params.name}: ${params.value}h`
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      lineStyle: {
        width: 3,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(64,108,230)'
          },
          {
            offset: 1,
            color: 'rgb(100,203,245)'
          }
        ])
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(64,108,230, 0.3)'
            },
            {
              offset: 1,
              color: 'rgba(100,203,245, 0)'
            }
          ])
        }
      },
      smooth: true
    }
  ]
})

const activeTag = ref('purchase')
const percentage = ref(10)
const items = ref([
  {
    title: '今日学习时长(min)',
    value: '100'
  },
  {
    title: '总学习时长(min)',
    value: '100'
  },
  {
    title: '连续学习天数(天)',
    value: '100'
  },
  {
    title: '已学习课程数(节)',
    value: '100'
  }
])

//  '100': '#fdece2',
//     '200': '#fdd5c9',
//     '300': '#fab2a8',
//     '400': '#f56b6b',
//     '500': '#ec465a',
//     '600': '#da2b53',
//     '700': '#b71f54',
//     '800': '#961d55',
const customColors = ref([
  { color: '#fdd5c9', percentage: 5 },
  { color: '#fab2a8', percentage: 20 },
  { color: '#f56b6b', percentage: 40 },
  { color: '#ec465a', percentage: 55 },
  { color: '#da2b53', percentage: 70 },
  { color: '#b71f54', percentage: 90 },
  { color: '#961d55', percentage: 100 }
])

// 昵称，邮箱，微信，最后登录时间，是否是会员，会员过期时间
const data = ref([
  {
    label: '邮箱',
    value: 'toimc@qq.com'
  },
  {
    label: '微信',
    value: 'toimc'
  },
  {
    label: '是否是会员',
    value: '是'
  },
  {
    label: '会员过期时间',
    value: '2022-01-01 00:00:00'
  }
])

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
    type: 'index',
    label: '#',
    align: 'center'
  },
  {
    prop: 'name',
    label: '商品名称',
    align: 'center'
  },
  {
    prop: 'type',
    label: '类型',
    width: 120,
    defaultSlot: (scope) => {
      const {
        row: { type }
      } = scope
      if (typeof status === 'undefined') return
      // 课程类型， 专栏、实战课、体系课、直播课、免费课
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
    width: 200
  },
  {
    prop: 'status',
    label: '订单状态',
    align: 'center',
    width: 200,
    defaultSlot: (scope) => {
      const {
        row: { status }
      } = scope
      if (typeof status === 'undefined') return
      const typeMap = {
        // 订单状态
        0: {
          name: '未付款',
          type: 'warning'
        },
        1: {
          name: '已付款',
          type: 'success'
        },
        2: {
          name: '已取消',
          type: 'info'
        },
        3: {
          name: '其他',
          type: 'error'
        }
      }
      return (
        <el-tag class="mr-1" type={typeMap[status].type || 'primary'}>
          {typeMap[status].name}
        </el-tag>
      )
    }
  },
  {
    prop: '',
    label: '更多操作',
    width: 130,
    fixed: 'right',
    defaultSlot: (scope) => {
      const { row } = scope
      const handleMore = () => {
        // TODO
        console.log(row)
      }
      return (
        <el-button link type="primary" size="small" onClick={handleMore}>
          详细信息
        </el-button>
      )
    }
  }
] as VpFormSchema)

const commentsData = ref([
  {
    course: '课程1',
    name: '用户1',
    content: '评论内容',
    created: '2022-01-01 00:00:00',
    hands: 10,
    isBest: 0
  },
  {
    course: '课程1',
    name: '用户1',
    content: '评论内容',
    created: '2022-01-01 00:00:00',
    hands: 10,
    isBest: 1
  }
])
const commentsColumns = ref([
  {
    type: 'index',
    label: '#',
    align: 'center'
  },
  {
    prop: 'course',
    label: '关联内容',
    width: 200
  },
  {
    prop: 'name',
    label: '用户',
    width: 120,
    align: 'center'
  },
  {
    prop: 'content',
    label: '评论内容',
    'min-width': 200
  },
  {
    prop: 'created',
    label: '评论时间',
    width: 200,
    align: 'center'
  },
  {
    prop: 'hands',
    label: '点赞数',
    width: 80,
    align: 'center'
  },
  {
    prop: 'isBest',
    label: '精选?',
    width: 80,
    align: 'center'
  },
  {
    prop: '',
    label: '更多操作',
    width: 130,
    fixed: 'right',
    defaultSlot: (scope) => {
      const { row } = scope
      const handleMore = () => {
        // TODO
        console.log(row)
      }
      return (
        <el-button link type="primary" size="small" onClick={handleMore}>
          详细信息
        </el-button>
      )
    }
  }
] as VpFormSchema)

const pointsData = ref([
  {
    course: '课程1',
    type: 0, // 0-收入
    score: 10,
    source: '学习课程',
    created: '2022-01-01 00:00:00'
  },
  {
    course: '课程1',
    type: 1, // 0-支出
    score: 10,
    source: '学习课程',
    created: '2022-01-01 00:00:00'
  }
])

const pointsColumns = ref([
  {
    type: 'index',
    label: '#',
    align: 'center'
  },
  {
    prop: 'course',
    label: '关联内容'
  },
  {
    prop: 'type',
    label: '类型'
  },
  {
    prop: 'score',
    label: '学分'
  },
  {
    prop: 'source',
    label: '学习来源'
  },
  {
    prop: 'created',
    label: '创建时间'
  }
] as VpFormSchema)
</script>

<style scoped></style>
