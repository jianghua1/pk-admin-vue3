<template>
  <div>
    <div class="container-default">
      <!-- 统计信息 -->
      <div class="grid grid-cols-6 gap-5">
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
      <!-- 会员列表信息 -->
      <div class="my-4">
        <VpForm :schema="schema">
          <template #actions>
            <el-form-item>
              <el-button type="primary">
                <div class="flex">
                  <i class="i-ep:search mr-1"> </i>
                  <span>查询用户</span>
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
        <!-- 表格 -->
        <VpTable stripe border :columns="columns" :pagination="pagination" :max-height="300" :data="tableData">
        </VpTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { VpFormSchema } from 'el-admin-components'
import dayjs from 'dayjs'

definePage({
  meta: {
    title: '我的用户',
    icon: 'ri:vip-line',
    order: 100
  }
})

const router = useRouter()

const items = ref([
  {
    title: '普通用户',
    value: 1000
  },
  {
    title: '付费用户',
    value: 100
  },
  {
    title: '新增用户',
    value: 100
  },
  {
    title: '新增会员',
    value: 100
  },
  {
    title: '昨日付费',
    value: '2,100'
  },
  {
    title: '累计付费',
    value: '100,000'
  }
])

const schema = ref([
  {
    prop: 'id',
    value: '',
    label: 'id',
    span: 4,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'name',
    value: '',
    label: '昵称',
    span: 4,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'email',
    value: '',
    label: '邮箱',
    span: 4,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'role',
    value: '',
    label: '用户角色',
    span: 6,
    type: 'select',
    attrs: {
      multiple: true
    },
    children: [
      {
        label: '普通用户',
        value: 0
      },
      {
        label: '付费用户',
        value: 3
      }
    ]
  },
  {
    prop: '',
    label: '注册时间',
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
  },
  {
    prop: '',
    label: '消费金额',
    class: 'ml-4',
    schema: [
      {
        span: 11,
        prop: 'low',
        value: '',
        type: 'input',
        label: '',
        attrs: {
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
        type: 'input',
        prop: 'high',
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
  // ] as any)
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
    label: '昵称',
    width: 120
  },
  {
    prop: 'email',
    label: '邮箱',
    width: 120
  },
  {
    prop: 'type',
    label: '用户类型',
    align: 'center',
    width: 200,
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
    prop: 'lastLoginTime',
    label: '最近登录时间',
    align: 'center',
    defaultSlot: (scope) => {
      const {
        row: { lastLoginTime }
      } = scope
      if (lastLoginTime) {
        return dayjs(lastLoginTime).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return '-'
      }
    }
  },
  {
    prop: 'lessons',
    label: '购买课程',
    align: 'center',
    width: 100
  },
  {
    prop: 'hours',
    label: '学时',
    align: 'center',
    width: 120
  },
  {
    prop: 'status',
    label: '状态',
    align: 'center',
    width: 80,
    defaultSlot: (scope) => {
      const { row } = scope
      return row.status ? (
        <i class="i-ep:circle-close-filled text-xl vertical-middle bg-error"></i>
      ) : (
        <i class="i-ep:circle-check-filled text-xl vertical-middle bg-success"></i>
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
        router.push({
          path: '/members/info',
          query: {
            id: row.id
          }
        })
      }
      return (
        <div class="vertical-middle flex items-center">
          <el-tooltip class="box-item" effect="light" content="私信" placement="top-start">
            <i class="i-ep:message text-xl bg-primary cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="禁言" placement="top-start">
            <i class="i-tabler:message-off text-xl bg-error cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="更多信息" placement="top-start">
            <i class="i-ep:warning-filled text-xl  cursor-pointer" onClick={handleMore}></i>
          </el-tooltip>
        </div>
      )
    }
  }
] as any[])

const tableData = ref([
  {
    id: 1,
    name: 'admin',
    email: '123@qq.com',
    type: [0],
    lastLoginTime: '2022-01-01 00:00:00',
    lessons: 1,
    hours: 10,
    status: 0
  },
  {
    id: 1,
    name: 'admin1',
    email: '1233@qq.com',
    type: [0],
    lastLoginTime: '',
    lessons: 3,
    hours: 120,
    status: 0
  },
  {
    id: 1,
    name: 'admin2',
    email: '1234@qq.com',
    type: [3],
    lastLoginTime: '2022-01-01 00:00:00',
    lessons: 3,
    hours: 15,
    status: 0
  }
])
</script>

<style scoped></style>
