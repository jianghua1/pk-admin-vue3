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
      <VpTable stripe border :columns="columns" :pagination="pagination" :max-height="300" :data="tableData">
      </VpTable>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { VpFormSchema } from 'el-admin-components'
import dayjs from 'dayjs'

definePage({
  meta: {
    title: '我的评论',
    icon: 'mdi:comments-text-outline',
    order: 100
  }
})

const router = useRouter()

const schema = ref([
  {
    prop: 'name',
    value: '',
    label: '课程名称',
    span: 5,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'username',
    value: '',
    label: '用户昵称',
    span: 6,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'title',
    value: '',
    label: '评论标题',
    span: 6,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'content',
    value: '',
    label: '评论内容',
    span: 6,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'status',
    value: '',
    label: '审核状态',
    span: 4,
    type: 'select',
    class: 'mr-4',
    attrs: {
      multiple: true
    },
    children: [
      {
        label: '待审核',
        value: 0
      },
      {
        label: '已审核',
        value: 1
      },
      {
        label: '已隐藏',
        value: 2
      },
      {
        label: '已删除',
        value: 3
      }
    ]
  },
  {
    prop: '',
    label: '提交时间',
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
    type: 'selection',
    align: 'center'
  },
  {
    prop: 'name',
    label: '用户昵称 ',
    width: 120
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
    prop: 'title',
    label: '标题',
    width: 120
  },
  {
    prop: 'content',
    label: '评论内容'
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
    prop: 'status',
    label: '状态',
    align: 'center',
    width: 100,
    defaultSlot: (scope) => {
      const { row } = scope
      const { status } = row
      // 待审核，已审核，已隐藏，已删除
      // tag组件
      if (typeof status === 'undefined') return
      const statusMap = {
        0: { name: '待审核', type: 'warning' },
        1: { name: '已审核', type: 'success' },
        2: { name: '已隐藏', type: 'info' },
        3: { name: '已删除', type: 'danger' }
      }
      return <el-tag type={statusMap[status].type || 'primary'}>{statusMap[status].name}</el-tag>
    }
  },
  {
    prop: 'course',
    label: '关联课程',
    align: 'center',
    width: 120
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
          path: '/members/comments-detail',
          query: {
            id: row.id
          }
        })
      }
      return (
        <div class="vertical-middle flex items-center">
          <el-tooltip class="box-item" effect="light" content="查看" placement="top-start">
            <i
              class="i-ep:warning-filled bg-primary text-xl cursor-pointer mr-2"
              onClick={handleMore}
            ></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="编辑" placement="top-start">
            <i class="i-ep:edit text-xl bg-primary mr-2  cursor-pointer" onClick={handleMore}></i>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="light"
            content={isHide ? '已隐藏' : '正常显示'}
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
    isHide: false
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
    isHide: true
  }
])
</script>

<style scoped></style>
