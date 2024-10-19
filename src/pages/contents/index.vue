<template>
  <div>
    <!-- 表头 -->
    <div class="container-default">
      <VpForm :schema="schema" ref="formItemRef" :gutter="20">
        <template #actions>
          <div class="flex justify-between">
            <div>
              <el-form-item>
                <el-button type="primary">
                  <div class="flex">
                    <i class="i-ep:plus mr-l"></i>
                    <span>筛选课程</span>
                  </div>
                </el-button>
                <el-button>
                  <div class="flex">
                    <i class="i-ep:search mr-l"></i>
                    <span>重置筛选</span>
                  </div>
                </el-button>
              </el-form-item>
            </div>
            <div>
              <el-button type="primary">
                <div class="flex">
                  <i class="i-ep:search mr-l"></i>
                  <span>创建课程</span>
                </div>
              </el-button>
            </div>
          </div>
        </template>
      </VpForm>
      <!-- 表格 -->
      <VpTable border :columns="columns" :data="fixedTableData" :pagination="pagination">
      </VpTable>
    </div>
    <el-drawer v-model="drawer" :direction="direction" @close="handleClose">
      <template #header>
        <h4>{{ msg }}</h4>
      </template>
      <template #default>
        <VpForm v-model="model" :label-width="80" :schema="addEditFormSchema" ref="addEditFormRef">
        </VpForm>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="tsx">
import type { VpFormSchema, VpPaginationType, VpTableColumnType } from "el-admin-components"
import type { FormItemInstance } from "element-plus"
import dayjs from 'dayjs'
definePage({
  meta: {
    title: '我的内容',
    icon: 'ep:document',
    order: 100
  }
})

const drawer = ref(false)
const direction = ref<'ltr' | 'rtl'>('rtl')
const msg = ref('新增用户')
const model = ref()
const addEditFormRef = ref()

const addEditFormSchema = ref<VpFormSchema>([
  {
    prop: 'name',
    value: '',
    label: '课程名称',
    span: 24,
    type: 'input'
  },
  {
    prop: 'desc',
    value: '',
    label: '课程描述',
    span: 24,
    type: 'input',
    attrs: {
      type: 'textarea',
      rows: 3,
      'show-word-limit': true,
      maxlength: 250,
      minlength: 0
    }
  },
  {
    prop: 'image',
    value: [],
    label: '课程封面',
    span: 24,
    type: 'upload',
    attrs: {
      action: '/dev/upload'
      // drag: true,
      // multiple: false,
      // limit: 1,
      // accept: 'image/*',
      // class: 'w-full'
    }
  }
])

// 获取当前页面的路由信息
const router = useRouter()

const schema = ref([
  {
    prop: 'username',
    value: '',
    label: '课程作者',
    span: 6,
    type: 'input',
    class: 'pr-4'
  },
  {
    prop: 'email',
    value: '',
    label: '课程名称',
    span: 6,
    type: 'input',
    class: 'pr-4'
  },
  {
    prop: 'desc',
    value: '',
    label: '课程简介',
    span: 6,
    type: 'input',
    class: 'pr-4'
  },
  {
    prop: 'type',
    span: 6,
    value: '',
    label: '课程分类',
    type: 'select',
    attrs: {
      multiple: true
    },
    children: [
      {
        label: '免费课',
        value: 1
      },
      {
        label: '实战课',
        value: 2
      },
      {
        label: '体系课',
        value: 3
      },
      {
        label: '其他',
        value: 3
      }
    ],
    class: 'pr-4'
  },
  {
    prop: '',
    label: '创建时间',
    span: 12,
    schema: [
      {
        span: 5,
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
        span: 5,
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
        label: '已上架',
        value: 1
      },
      {
        type: 'radio',
        label: '未上架',
        value: 2
      },
      {
        type: 'radio',
        label: '已下架',
        value: 3
      },
      {
        type: 'radio',
        label: '其他',
        value: 4
      }
    ]
  }
] as VpFormSchema)

const formItemRef = ref()

const columns = ref([
  {
    prop: 'id',
    label: 'Id',
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    prop: 'image',
    label: '封面',
    width: 180,
    align: 'center',
    defaultSlot: (scope) => {
      const { row } = scope
      return (
        <div class="flex justify-center">
          <img class="w-36 h-20 rounded" src={row.image} />
        </div>
      )
    }
  },
  {
    prop: 'name',
    label: '课程名称',
    align: 'center',
    width: 120
  },
  {
    prop: 'desc',
    label: '课程简介',
    align: 'center',
    width: 120
  },
  {
    prop: 'type',
    label: '课程类型',
    align: 'center',
    width: 100,
    defaultSlot: (scope) => {
      const { row: { type } } = scope
      if (typeof type === 'undefined') return
      const typeMap = {
        0: { name: '免费课', type: 'primary' },
        1: { name: '实战课', type: 'success' },
        2: { name: '体系课', type: 'danger' },
        3: { name: '直播课', type: 'warning' },
        4: { name: '专栏', type: 'success' },
        5: { name: '微课', type: 'primary' },
        6: { name: '项目', type: 'danger' },
        7: { name: '其他', type: 'info' }
      }
      let result
      result = type.map((item) => (
        <el-tag class="mr-1" type={typeMap[item].type || 'primary'}>
          {typeMap[item].name}
        </el-tag>
      ))
      return result
    }
  }, {
    prop: 'created',
    label: '创建时间',
    align: 'center',
    width: 120,
    defaultSlot: (scope) => {
      const { row } = scope
      if (row.created) {
        return dayjs(row.created).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return '-'
      }
    }
  },
  {
    prop: 'price',
    label: '售价',
    align: 'center',
    width: 100
  },
  {
    prop: 'students',
    label: '学习人数',
    align: 'center'
  },
  {
    prop: 'creator',
    label: '创建者',
    align: 'center'
  },
  {
    prop: 'status',
    label: '状态',
    align: 'center',
    width: 80,
    defaultSlot: (scope) => {
      const { row } = scope
      return row.status
    }
  },
  {
    prop: '',
    label: '更多操作',
    width: 120,
    align: 'center',
    fixed: 'right',
    defaultSlot: (scope) => {
      const { row } = scope
      const handleMore = () => {
        router.push({
          path: '/contents/content-detail',
          query: {
            id: row.id
          }
        })
      }
      const handleEdit = () => {
        drawer.value = true
      }
      return (
        <div class="vertical-middle flex items-center">
          <el-tooltip class="box-item" effect="light" content="编辑" placement="top-start">
            <i class="i-ep:edit text-xl cursor-pointer mr-2" onClick={handleEdit}></i>
          </el-tooltip>
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
] as VpTableColumnType[])

const fixedTableData = ref([
  {
    id: 1,
    image: '/bg.jpg',
    name: '课程名称',
    desc: '1111',
    type: [0],
    price: 3999,
    created: '2022-11-11',
    students: 0,
    creator: 'admin',
    status: 0
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

const addCourse = () => {
  drawer.value = true
}

const cancelClick = () => {
  drawer.value = false
}

const confirmClick = () => {
  console.log('model.value:', model.value)
}

const handleClose = () => {
  if (addEditFormRef.value) {
    addEditFormRef.value.resetFields()
  }
}
</script>

<style scoped></style>
