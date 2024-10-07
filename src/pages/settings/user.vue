<template>
  <div class="bg-default">
    <el-card shadow="never" class="shadow">
      <!-- <template #header>
        <div class="card-header">
          <span>用户管理</span>
        </div>
      </template> -->

      <!-- 搜索 -->
      <div class="mb-4">
        <VpForm :schema="schema" ref="formItemRef">
          <template #actions>
            <el-form-item>
              <el-button type="primary">
                <div class="flex">
                  <i class="i-ep:plus mr-l"></i>
                  <span>新增用户</span>
                </div>
              </el-button>
              <el-button type="info">
                <div class="flex">
                  <i class="i-ep:search mr-l"></i>
                  <span>查&nbsp;&nbsp;询</span>
                </div>
              </el-button>
            </el-form-item>
          </template>
        </VpForm>
      </div>
      <!-- 表格 -->
      <VpTable :columns="fixedTableColumns" :data="fixedTableData" :pagination="pagination">
      </VpTable>
    </el-card>
  </div>
</template>

<script setup lang='tsx'>
import type { VpFormSchema, VpPaginationType, VpTableColumnType } from "el-admin-components"
import type  {FormItemInstance } from "element-plus"
import dayjs from 'dayjs'

definePage({
  meta: {
    title: '用户管理',
    icon: 'mdi:user',
    order: 100
  }
})

const schema = ref([
  {
    prop: 'username',
    value: '',
    label: '用户名',
    span: 6,
    type: 'input',
    itemRef: (ref: FormItemInstance) => {
      formItemRef.value = ref
    }
  },
  {
    prop: 'email',
    value: '',
    label: '邮箱',
    colProps: {
      span: 6,
      class: 'mx-4'
    },
    type: 'input'
  },
  {
    prop: 'role',
    span: 6,
    value: '',
    label: '用户角色',
    type: 'select',
    attrs: {
      multiple: true
    },
    children: [
      {
        label: '普通用户',
        value: 'user'
      },
      {
        label: '运营人员',
        value: 'operator'
      },
      {
        label: '管理员',
        value: 'manager'
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
        type: 'time-picker',
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
    type: 'radio-group',
    prop: 'resource',
    label: '是否禁用',
    colProps: {
      span: 6,
      class: 'mx-4'
    },
    value: '',
    children: [
      {
        type: 'radio',
        label: '正常',
        value: 1
      },
      {
        type: 'radio',
        label: '已禁用',
        value: 2
      }
    ]
  }
] as VpFormSchema)

const formItemRef = ref()

const fixedTableColumns = ref([
  {
    prop: 'index',
    label: '#',
    width: 60, // 可以设置列宽
    fixed: 'left' // 固定在左边
  },
  {
    prop: 'username',
    label: '用户名',
     align: 'center'
  },
  {
    prop: 'name',
    label: '昵称',
     align: 'center'
  },
  {
    prop: 'type',
    label: '用户类型',
    align: 'center',
    width:400,
    defaultSlot: (scope) => {
      const { row } = scope
      const typeMap = {
        0: { name: '普通用户', type: 'primay' },
        1: { name: '运营人员', type: 'success' },
        2: { name: '管理员', type: 'danger' },
        3: {name: '会员', type: 'warning'}
      }
      if (Array.isArray(row.type)) {
        return row.type.map((type) => (
          <el-tag  class="mr-1" key={type} type={typeMap[type || 0].type || 'primay'}>{typeMap[type || 0].name}</el-tag>
        ))
      } else {
        return <el-tag class="mr-1" type={typeMap[row.type || 0].type ||'primay'}>{typeMap[row.type||0].name}</el-tag>
      }
    }
  }, {
    prop: 'expired',
    label: '过期时间',
    align: 'center',
    defaultSlot: (scope) => {
      const { row } = scope
      if (row.expired) {
        return dayjs(row.expired).format('YYYY-MM-DD')
      } else { 
        return '-'
      }
    }
  },
{
  prop: 'status',
  label: '是否被禁用',
  align: 'center',
  defaultSlot: (scope) => {
    const { row } = scope
    const isEnabled = ref(row.status === 1) // 将数字转换为布尔值
    return <el-switch style="--el-switch-on-color: var(--el-color-danger)" model-value={isEnabled.value} onUpdate:model-value={(val) => {
      // 更新 row.status 值
      row.status = val ? 1 : 0
    }}></el-switch>
  }
},
  {
    prop: 'phone',
    label: '手机号',
    align: 'center'
  },
  {
    prop: 'email',
    label: '电子邮箱',
    align: 'center'
  },
  {
    prop: 'wx',
    label: (<i class="i-mdi:wechat text-2xl bg-gray-500"></i>),
    align: 'center',
    defaultSlot: (scope) => {
      const { row } = scope
      return row.wx ? (<i class="i-ep:circle-check-filled text-xl bg-green-500"></i>) : (<i class="i-ep:circle-close-filled text-xl bg-red-500"></i>)
    }
  },
  {
    prop: '',
    label: '更多操作',
    width: 120,
    align: 'center',
    fixed: 'right',
    defaultSlot: (_props) => (
      <>
        <el-button link type="primary" size="small" onClick={() => handleClick(_props)}>
          编辑
        </el-button>
        <el-button link type="danger" size="small">
          删除
        </el-button>
      </>
    )
  }
] as VpTableColumnType[])

const fixedTableData = ref([
  {
    username: 'tomic',
    name: 'tomic',
    type: 0,
    expired: '2022-01-01 00:00:00',
    status: 0,
    phone: '12345678900',
    email: '12345678900@qq.com',
    wx: true
  }, {
    username: 'tomic',
    name: 'tomic',
    type: 0,
    expired: '2022-01-01 00:00:00',
    status: 1,
    phone: '12345678900',
    email: '12345678900@qq.com',
    wx: true
  }, {
    username: 'tomic',
    name: 'tomic',
    type: [1,2,3],
    expired: '2022-01-01 00:00:00',
    status: 0,
    phone: '12345678900',
    email: '12345678900@qq.com',
    wx: false
  }, {
    username: 'tomic',
    name: 'tomic',
    type: 0,
    expired: '2022-01-01 00:00:00',
    status: 0,
    phone: '12345678900',
    email: '12345678900@qq.com',
    wx: true
  }, {
    username: 'tomic',
    name: 'tomic',
    type: 0,
    expired: '2022-01-01 00:00:00',
    status: 0,
    phone: '12345678900',
    email: '12345678900@qq.com',
    wx: true
  }
])
//添加序号
fixedTableData.value = fixedTableData.value.map((item, index) => ({ ...item, index: index + 1 }))

const pagination = ref({
  align: 'right',
  small: false,
  background: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 7,
  pageSizes: [10, 20, 30, 40, 50, 100],
  total: 100
} as VpPaginationType)

const handleClick = (scope) => {
  console.log('🚀 ~ file: index.vue:37 ~ handleClick ~ scope:', scope)
}
</script>
<style scoped></style>