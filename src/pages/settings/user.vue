<template>
  <div>
    <div class="container-default">
      <!-- 搜索 -->
      <div class="mb-4">
        <VpForm v-model="model" :schema="schema" ref="formRef">
          <template #actions>
            <el-form-item>
              <el-button type="primary">
                <div class="flex" @click="addUser">
                  <i class="i-ep:plus mr-1"> </i>
                  <span>新增用户</span>
                </div>
              </el-button>
              <el-button>
                <div class="flex">
                  <i class="i-ep:search mr-1"> </i>
                  <span>查询用户</span>
                </div>
              </el-button>
            </el-form-item>
          </template>
        </VpForm>
      </div>
      <!-- 表格 -->
      <VpTable stripe border :columns="columns" :pagination="pagination" :data="tableData" :adaptive="75">
      </VpTable>
      <el-drawer v-model="drawer" :direction="direction" @close="handleClose">
        <template #header>
          <h4>{{ msg }}</h4>
        </template>
        <template #default>
          <VpForm v-model="model1" :label-width="80" :schema="addEditFormSchema" ref="addEditFormRef">
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
  </div>
</template>

<script setup lang="tsx">
import type { VpFormSchema } from 'el-admin-components'
import { type FormItemInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'

interface UserFormType {
  username: string
  name: string
  type: number[]
  expired: string
  status: number
  password: string
  email: string
  phone: string
}

definePage({
  meta: {
    title: '用户管理',
    icon: 'mdi:user',
    order: 100
  }
})

const formItemRef = ref()
const addEditFormRef = ref()
const drawer = ref(false)
const direction = ref<any>('rtl')
const msg = ref('新增用户')

const addEditFormSchema = ref<VpFormSchema>([
  {
    prop: 'username',
    value: '',
    label: '用户名',
    span: 24,
    type: 'input',
    rules: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
  },
  {
    prop: 'name',
    value: '',
    label: '昵称',
    span: 24,
    type: 'input'
  },
  {
    prop: 'type',
    value: '',
    label: '角色',
    span: 24,
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
        label: '运营人员',
        value: 1
      },
      {
        label: '管理员',
        value: 2
      },
      {
        label: '会员',
        value: 3
      }
    ]
  },
  // {
  //   prop: 'expired',
  //   value: '',
  //   span: 24,
  //   type: 'date-picker',
  //   label: '过期时间'
  // },
  {
    type: 'radio-group',
    prop: 'status',
    label: '是否禁用',
    value: 0,
    span: 24,
    children: [
      {
        type: 'radio',
        label: '正常',
        value: 0
      },
      {
        type: 'radio',
        label: '已禁用',
        value: 1
      }
    ]
  },
  {
    prop: 'password',
    value: '',
    label: '密码',
    span: 24,
    type: 'input',
    attrs: {
      type: 'password'
    },
    rules: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      // 密码需要6-32位的字符
      { min: 6, max: 32, message: '密码格式不正确', trigger: 'blur' }
    ]
  },
  {
    prop: 'email',
    value: '',
    label: '邮箱',
    span: 24,
    type: 'input',
    rules: [
      // 密码需要6-32位的字符
      // 邮箱的正则
      { type: 'email', trigger: 'blur' }
    ]
  },
  {
    prop: 'phone',
    value: '',
    label: '手机号',
    span: 24,
    type: 'input',
    // 手机号正则
    rules: [{ pattern: /^1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }]
  }
])

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
    value: '',
    label: '用户角色',
    span: 11,
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
    value: '1',
    colProps: {
      span: 6,
      class: 'mx-4'
    },
    children: [
      {
        type: 'radio',
        label: '正常',
        value: '1'
      },
      {
        type: 'radio',
        label: '已禁用',
        value: '2'
      }
    ]
  }
  // ] as any)
] as VpFormSchema)

const model = ref({})
const model1 = ref({} as UserFormType)

watch(
  model1,
  () => {
    // 会员用户
    if (model1.value.type && model1.value.type.includes(3)) {
      // 设置过期时间
      // 在type后面，插入过期时间的schema
      const index = addEditFormSchema.value.findIndex((item) => item.prop === 'type')
      // 判断过期时间的schema是否存在，不存在则插入，存在则不插入
      if (!addEditFormSchema.value.find((item) => item.prop === 'expired')) {
        addEditFormSchema.value.splice(index + 1, 0, {
          prop: 'expired',
          value: '',
          label: '过期时间',
          span: 24,
          type: 'date-picker',
          attrs: {
            type: 'date',
            placeholder: '',
            style: {
              width: '100%'
            }
          }
        })
        // model1.value.expired = ''
      }
    } else {
      // 不需要设置过期时间
      if (addEditFormSchema.value.find((item) => item.prop === 'expired')) {
        addEditFormSchema.value = addEditFormSchema.value.filter((item) => item.prop !== 'expired')
        model1.value.expired = ''
      }
    }
  },
  {
    deep: true
  }
)

const pagination = ref({
  align: 'right',
  small: false,
  background: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 7,
  pageSizes: [10, 20, 30, 40, 50, 100],
  total: 100
} as any)

const tableData = ref([
  {
    username: 'toimc',
    name: 'toimc',
    type: [0],
    expired: '2022-12-12 12:12:12',
    status: 0,
    phone: '12345678901',
    email: '123@qq.com',
    wx: true
  },
  {
    username: 'toimc',
    name: 'toimc',
    type: [1],
    expired: '2022-12-12 12:12:12',
    status: [],
    phone: '12345678901',
    email: '123@qq.com',
    wx: false
  },
  {
    username: 'toimc',
    name: 'toimc',
    type: [2],
    expired: '2022-12-12 12:12:12',
    status: 0,
    phone: '12345678901',
    email: '123@qq.com',
    wx: false
  },
  {
    username: 'toimc',
    name: 'toimc',
    type: [0, 3],
    expired: '2022-12-12 12:12:12',
    status: 0,
    phone: '12345678901',
    email: '123@qq.com',
    wx: false
  }
])

const columns = ref([
  {
    type: 'index',
    label: '#',
    align: 'center'
  },
  {
    prop: 'username',
    label: '用户名',
    width: 120
  },
  {
    prop: 'name',
    label: '昵称',
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
        1: { name: '运营人员', type: 'success' },
        2: { name: '管理员', type: 'danger' },
        3: { name: '会员', type: 'warning' }
      }
      let result
      // 如果后台传递的数据为多角色用户，使用循环方式，把 tag 展示出来
      if (type instanceof Array) {
        result = type.map((item) => (
          <el-tag class="mr-1" type={typeMap[item].type || 'primary'}>
            {typeMap[item].name}
          </el-tag>
        ))
      } else {
        result = <el-tag type={typeMap[type].type || 'primary'}>{typeMap[type].name}</el-tag>
      }
      return result
    }
  },
  {
    prop: 'expired',
    label: '过期时间',
    align: 'center',
    defaultSlot: (scope) => {
      const {
        row: { expired }
      } = scope
      if (expired) {
        return dayjs(expired).format('YYYY-MM-DD')
      } else {
        return '-'
      }
    }
  },
  {
    prop: 'status',
    label: '已禁用?',
    align: 'center',
    width: 80,
    defaultSlot: (scope) => {
      const { row } = scope
      const handleChange = (e) => {
        row.status = e ? 1 : 0
        // console.log(tableData.value[index])
      }
      return (
        <el-switch
          style="--el-switch-on-color: var(--el-color-danger)"
          model-value={!!row.status}
          onChange={handleChange}
        ></el-switch>
        // el-select
      )
    }
  },
  {
    prop: 'phone',
    label: '手机号',
    align: 'center'
  },
  {
    prop: 'email',
    label: '邮箱'
  },
  {
    prop: 'wx',
    label: <i class="text-2xl i-ic:baseline-wechat vertical-middle"></i>,
    width: 60,
    align: 'center',
    defaultSlot: (scope) => {
      const { row } = scope
      return row.wx ? (
        <i class="i-ep:circle-check-filled text-xl vertical-middle bg-success"></i>
      ) : (
        <i class="i-ep:circle-close-filled text-xl vertical-middle bg-error"></i>
      )
    }
  },
  {
    prop: '',
    label: '更多操作',
    width: 120,
    fixed: 'right',
    defaultSlot: (scope) => {
      const { row } = scope
      const handleDelete = () => {
        ElMessageBox.confirm(`确定要删除${row.username}吗？`, '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        })
          .then(() => {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消删除'
            })
          })
      }

      const handleEdit = () => {
        msg.value = '编辑用户'
        // 弹窗
        drawer.value = true
        // 修改model1的值
        nextTick(() => {
          Object.assign(model1.value, row)
          // console.log('🚀 ~ setTimeout ~ model1.value:', model1.value)
        })
      }
      return (
        <div class="vertical-middle flex items-center">
          {/* <el-button link type="primary" size="small" onClick={handleEdit}>
            编辑
          </el-button>
          <el-button link type="danger" size="small" onClick={handleDelete}>
            删除
          </el-button> */}
          <el-tooltip class="box-item" effect="light" content="编辑" placement="top-start">
            <i class="i-ep:edit text-xl cursor-pointer bg-primary mr-2" onClick={handleEdit}></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="删除" placement="top-start">
            <i class="i-ep:delete text-xl bg-error cursor-pointer" onClick={handleDelete}></i>
          </el-tooltip>
        </div>
      )
    }
  }
] as any[])

const addUser = () => {
  msg.value = '新增用户'
  drawer.value = true
}

const handleClose = () => {
  // 清空Form
  if (addEditFormRef.value) {
    addEditFormRef.value.resetFields()
  }
}

const cancelClick = () => {
  drawer.value = false
}
const confirmClick = () => {
  console.log('model1.value', model1.value)
}
</script>

<style scoped></style>
