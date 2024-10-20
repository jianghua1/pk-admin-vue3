<template>
  <div>
    <div class="container-default">
      <!-- 搜索 -->
      <div class="mb-4">
        <VpForm v-model="model" :schema="schema">
          <template #actions>
            <el-form-item>
              <el-button type="primary">
                <div class="flex" @click="addRole">
                  <i class="i-ep:plus mr-1"> </i>
                  <span>新增角色</span>
                </div>
              </el-button>
              <el-button>
                <div class="flex">
                  <i class="i-ep:search mr-1"> </i>
                  <span>查询角色</span>
                </div>
              </el-button>
            </el-form-item>
          </template>
        </VpForm>
      </div>
      <!-- 表格 -->
      <VpTable stripe border :columns="columns" :pagination="pagination" :max-height="300" :data="tableData">
      </VpTable>
    </div>
  </div>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs'
import type { VpFormSchema } from 'el-admin-components'

definePage({
  meta: {
    title: '角色管理',
    icon: 'mdi:user',
    order: 150
  }
})
const msg = ref('')
const drawer = ref(false)
const direction = ref('rtl')
const model = ref({})

const columns = ref([
  {
    type: 'index',
    label: '#',
    align: 'center'
  },
  {
    prop: 'name',
    label: '角色名称',
    width: 120
  },
  {
    prop: 'code',
    label: '角色编码',
    align: 'center'
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
        msg.value = '编辑角色'
        // 弹窗
        drawer.value = true
      }
      return (
        <>
          <el-button link type="primary" size="small" onClick={handleEdit}>
            编辑
          </el-button>
          <el-button link type="danger" size="small" onClick={handleDelete}>
            删除
          </el-button>
        </>
      )
    }
  }
] as any[])

const pagination = ref({
  align: 'right',
  small: false,
  background: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 3,
  pageSizes: [10, 20, 30, 40, 50, 100],
  total: 100
} as any)

const schema = ref([
  {
    prop: 'name',
    value: '',
    label: '角色名称',
    span: 6,
    type: 'input'
  },
  {
    prop: 'code',
    value: '',
    label: '角色编码',
    colProps: {
      span: 6,
      class: 'mx-4'
    },
    type: 'input'
  }
] as VpFormSchema)

const tableData = ref([])

const addRole = () => {
  msg.value = '新增用户'
  drawer.value = true
}
</script>

<style scoped></style>
