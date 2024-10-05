<template>
  <div class="bg-default">
    <el-card shadow="never" class="shadow">
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
        </div>
      </template>

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
                <i class="i-ep:search mr-l"></i>
                <span>查&nbsp;&nbsp;询</span>
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
import type { FormItemInstance } from "element-plus"
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
    prop: 'date',
    label: 'Date'
  },
  {
    prop: 'name',
    label: 'Name'
  },
  {
    prop: 'state',
    label: 'State'
  },
  {
    prop: 'city',
    label: 'City'
  },
  {
    prop: 'address',
    label: 'Address'
  },
  {
    prop: 'zip',
    label: 'Zip'
  },
  {
    prop: 'tag',
    label: 'Tag'
  },
  {
    prop: '',
    label: 'Operations',
    width: 120,
    fixed: 'right',
    defaultSlot: (_props) => (
      <>
        <el-button link type="primary" size="small" onClick={() => handleClick(_props)}>
          Detail
        </el-button>
        <el-button link type="primary" size="small">
          Edit
        </el-button>
      </>
    )
  }
] as VpTableColumnType[])

const fixedTableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office'
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
} as VpPaginationType)

const handleClick = (scope) => {
  console.log('🚀 ~ file: index.vue:37 ~ handleClick ~ scope:', scope)
}
</script>
<style scoped></style>