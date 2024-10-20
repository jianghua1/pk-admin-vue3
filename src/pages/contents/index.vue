<template>
  <div>
    <div class="container-default">
      <div class="my-4">
        <!-- 筛选&创建 -->
        <VpForm :schema="schema">
          <template #actions>
            <div class="flex justify-between">
              <div>
                <el-form-item>
                  <el-button type="primary">
                    <div class="flex">
                      <i class="i-ep:search mr-1"> </i>
                      <span>筛选课程</span>
                    </div>
                  </el-button>
                  <el-button>
                    <div class="flex">
                      <i class="i-ep:refresh mr-1"> </i>
                      <span>重置筛选</span>
                    </div>
                  </el-button>
                </el-form-item>
              </div>
              <div>
                <el-button type="primary">
                  <div class="flex" @click="addCourse">
                    <i class="i-ep:plus mr-1"> </i>
                    <span>创建课程</span>
                  </div>
                </el-button>
              </div>
            </div>
          </template>
        </VpForm>
        <!-- 表格 -->
        <!-- 分页 -->
        <VpTable stripe border :columns="columns" :pagination="pagination" :max-height="300" :data="tableData">
        </VpTable>
      </div>
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
import { type VpFormSchema, type VpTableColumnType } from 'el-admin-components'
import dayjs from 'dayjs'
import { useTabsStore } from '@/store/tabs'

import UploadTrigger from '@/components/contents/upload/UploadTrigger.vue'
import FilePreview from '@/components/contents/upload/FilePreview.vue'
import { useUpload } from '@/components/contents/upload/useUpload'

definePage({
  meta: {
    title: '我的内容',
    icon: 'ep:document',
    order: 100
  }
})
const router = useRouter()
const store = useTabsStore()

const addEditFormRef = ref()
const drawer = ref(false)
const direction = ref<any>('rtl')
const msg = ref('新增用户')
const model = ref({})

const { uploadRef, beforeUpload, handleRemove } = useUpload()

const addCourse = () => {
  drawer.value = true
}

// 筛选的内容
// 课程名称，课程简介，课程分类（图文、音频），课程创建时间，课程作者，课程状态
const schema = ref([
  {
    prop: 'owner',
    value: '',
    label: '课程作者',
    span: 5,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'name',
    value: '',
    label: '课程名称',
    span: 6,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'desc',
    value: '',
    label: '课程简介',
    span: 6,
    type: 'input',
    class: 'mr-4'
  },
  {
    prop: 'type',
    value: '',
    label: '课程分类',
    span: 6,
    type: 'select',
    attrs: {
      multiple: true
    },
    children: [
      {
        label: '免费课和',
        value: 0
      },
      {
        label: '实战课',
        value: 1
      },
      {
        label: '体系课',
        value: 2
      },
      {
        label: '其他',
        value: 3
      }
    ]
  },
  {
    prop: '',
    label: '创建时间',
    span: 11,
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
    prop: 'status',
    label: '课程状态',
    class: 'ml-4',
    value: 0,
    span: 8,
    type: 'radio-group',
    attrs: {},
    children: [
      {
        type: 'radio',
        label: '已上架',
        value: 0
      },
      {
        type: 'radio',
        label: '未上架',
        value: 1
      },
      {
        type: 'radio',
        label: '已下架',
        value: 2
      },
      {
        type: 'radio',
        label: '其他',
        value: 3
      }
    ]
  }
  // ] as any)
] as VpFormSchema)

// 表格的内容
const pagination = ref({
  align: 'right',
  small: false,
  background: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 7,
  pageSizes: [10, 20, 30, 40, 50, 100],
  total: 100
} as any)
// 课程宣传图，课程名称，课程简介，课程分类（图文、音频），课程创建时间，课程作者，课程状态
const columns = ref([
  {
    prop: 'id',
    label: 'Id',
    align: 'center',
    width: 60
  },
  {
    prop: 'image',
    label: '封面',
    width: 180,
    align: 'center',
    defaultSlot: ({ row }) => {
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
    width: 120
  },
  {
    prop: 'type',
    label: '课程类型',
    align: 'center',
    width: 100,
    defaultSlot: (scope) => {
      const {
        row: { type }
      } = scope
      if (typeof type === 'undefined') return
      const typeMap = {
        // 免费课，实战课，体系课，直播课，专栏，微课，项目，其他
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
        return dayjs(created).format('YYYY-MM-DD')
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
      // 未开始，完结，进行中，已上架，已下架，未上架
      return row.status
    }
  },
  {
    prop: '',
    label: '更多操作',
    width: 160,
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
        // TODO 可以使用I8n来进行动态设置多语言的标题
        store.title = '这是一个动态标题'
      }
      return (
        <div class="vertical-middle flex items-center">
          <el-tooltip class="box-item" effect="light" content="编辑" placement="top-start">
            <i class="i-ep:edit text-xl cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="更多信息" placement="top-start">
            <i class="i-ep:warning-filled text-xl  cursor-pointer mr-2" onClick={handleMore}></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="上架" placement="top-start">
            <i class="i-ep:upload text-xl bg-primary cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="预览" placement="top-start">
            <i class="i-ep:view text-xl bg-primary cursor-pointer mr-2"></i>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="删除" placement="top-start">
            <i class="i-ep:delete text-xl bg-error cursor-pointer mr-2"></i>
          </el-tooltip>
        </div>
      )
    }
  }
] as VpTableColumnType[])

const tableData = ref([
  {
    id: 1,
    image: '/bg.jpg',
    name: '课程名称',
    desc: '课程简介',
    type: [0],
    price: 3999,
    created: '2022-11-11',
    students: 0,
    creator: 'admin',
    status: 1
  }
])

const addEditFormSchema = ref([
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
      action: '/dev/upload',
      drag: true,
      multiple: false,
      limit: 1,
      accept: 'image/*',
      class: 'w-full',
      beforeUpload: beforeUpload
    },
    slots: {
      defaultSlot: () => <UploadTrigger></UploadTrigger>,
      tipSlot: () => <div class="tips text-sm text-gray-300">支持jpg/png文件 文件大小5M以内</div>,
      fileSlot: ({ file }) => {
        return <FilePreview file={file} onRemove={handleRemove}></FilePreview>
      }
    },
    childRef: (ref) => (uploadRef.value = ref)
  },
  {
    prop: 'price',
    value: 0,
    label: '课程价格',
    span: 24,
    type: 'input',
    attrs: {
      type: 'number'
    }
  },
  {
    prop: 'type',
    value: 0,
    label: '课程分类',
    span: 24,
    type: 'select',
    // 免费课，实战课，体系课，直播课，专栏，微课，项目，其他
    children: [
      { label: '免费课', value: 0 },
      { label: '实战课', value: 1 },
      { label: '体系课', value: 2 },
      { label: '直播课', value: 3 },
      { label: '专栏', value: 4 },
      { label: '微课', value: 5 },
      { label: '项目', value: 6 },
      { label: '其他', value: 7 }
    ]
  },
  {
    prop: 'tabs',
    value: 0,
    label: '课程方向',
    span: 24,
    type: 'select',
    attrs: {
      multiple: true
    },
    // Java, Android, iOS, PHP, HTML, CSS, JavaScript, 框架, 工具，小程序
    children: [
      { label: 'Java', value: 0 },
      { label: 'Android', value: 1 },
      { label: 'iOS', value: 2 },
      { label: 'PHP', value: 3 },
      { label: 'HTML', value: 4 },
      { label: 'CSS', value: 5 },
      { label: 'JavaScript', value: 6 },
      { label: '框架', value: 7 },
      { label: '工具', value: 8 },
      { label: '小程序', value: 9 }
    ]
  },
  {
    prop: 'level',
    value: 0,
    label: '课程难度',
    span: 24,
    type: 'select',
    children: [
      // 入门，初级，中级，高级，专业
      { label: '入门', value: 0 },
      { label: '初级', value: 1 },
      { label: '中级', value: 2 },
      { label: '高级', value: 3 },
      { label: '专业', value: 4 }
    ]
  }
] as VpFormSchema)

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
  console.log('model.value', model.value)
}
</script>

<style scoped lang="scss">
// 交由ref来操作dom
// .hide {
//   :deep(.tips) {
//     display: none;
//   }
//   :deep(.el-upload-dragger) {
//     display: none;
//   }
// }</style>
