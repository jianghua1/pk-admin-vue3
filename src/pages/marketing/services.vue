<template>
  <div>
    <div class="container-default">
      <div class="left-marker mb-4">用户列表</div>
      <div>
        <VpForm :schema="schema">
          <template #actions>
            <el-form-item>
              <el-button type="primary">
                <div class="flex">
                  <i class="i-ep:search mr-1"> </i>
                  <span>查询评论</span>
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
      <VpTable
        stripe
        border
        :columns="columns"
        :pagination="pagination"
        :max-height="300"
        :data="tableData"
      >
      </VpTable>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { VpFormSchema } from 'el-admin-components'
import dayjs from 'dayjs'

definePage({
  meta: {
    title: 'pages.marketing.services',
    icon: 'ep:money',
    order: 200
  }
})
const router = useRouter()

const schema = ref([
  {
    prop: 'username',
    value: '',
    label: '用户昵称',
    span: 6,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'content',
    value: '',
    label: '私信内容',
    span: 6,
    type: 'input',
    class: 'mr-4'
  },
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
    type: '',
    label: 'new?',
    prop: 'read',
    width: 65,
    align: 'center',
    defaultSlot: (scope) => {
      const { row } = scope
      return row.new ? (
        <i class="i-material-symbols-light:fiber-new-outline text-4xl bg-primary vertical-middle"></i>
      ) : (
        '-'
      )
    }
  },
  {
    prop: 'name',
    label: '用户昵称 ',
    width: 120
  },
  {
    prop: 'content',
    label: '最新内容'
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
        return dayjs(created).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return '-'
      }
    }
  },
  {
    prop: 'type',
    label: '用户类型',
    align: 'center',
    width: 120,
    defaultSlot: (scope) => {
      const {
        row: { type }
      } = scope
      if (typeof type === 'undefined') return
      const typeMap = {
        0: { name: '普通用户', type: 'primay' },
        3: { name: '会员', type: 'warning' }
      }
      let result
      result = type.map((item) => (
        <el-tag class="mr-1" type={typeMap[item].type || 'primary'}>
          {typeMap[item].name}
        </el-tag>
      ))
      return result
    }
  },
  {
    prop: '',
    label: '更多操作',
    width: 130,
    fixed: 'right',
    defaultSlot: (scope) => {
      const { row } = scope
      const { isHide } = row

      const hideStatus = isHide ? (
        <i class="i-ep:hide text-xl bg-info cursor-pointer mr-2"></i>
      ) : (
        <i class="i-ep:view text-xl bg-info cursor-pointer mr-2"></i>
      )

      const handleMore = () => {
        router.push({
          path: '/members/message-detail',
          query: {
            id: row.id
          }
        })
      }
      return (
        <div class="vertical-middle flex items-center">
          <el-tooltip class="box-item" effect="light" content="查看" placement="top-start">
            <i
              class="i-ep:chat-line-square bg-primary text-xl cursor-pointer mr-2"
              onClick={handleMore}
            ></i>
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
] as any[])

const tableData = ref([
  {
    id: 1,
    name: '张三',
    type: [0],
    title: '评论标题',
    content: '评论内容',
    created: '2022-01-01 12:00:00',
    status: 1,
    course: '课程名称',
    new: false
  },
  {
    id: 2,
    name: '张三',
    type: [0],
    title: '评论标题',
    content: '评论内容',
    created: '2022-01-01 12:00:00',
    status: 1,
    course: '课程名称',
    new: true
  }
])
</script>

<style scoped></style>
