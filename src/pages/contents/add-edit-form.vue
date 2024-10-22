<template>
  <div>
    <div class="container-default">
      <div class="left-marker mb-2">新增章节</div>
      <VpForm v-model="model" :label-width="80" :schema="addEditFormSchema" ref="addEditFormRef">
      </VpForm>
      <el-button @click="handleClick">OK</el-button>
      <el-button @click="handleSet">SET</el-button>
    </div>
  </div>
</template>

<script setup lang='tsx'>
import { VpEditor, type VpFormSchema, type VpTableColumnType } from "el-admin-components";
import UploadTrigger from '@/components/contents/upload/UploadTrigger.vue'
import FilePreview from '@/components/contents/upload/FilePreview.vue'
import { useUpload } from "@/components/contents/upload/useUpload"

definePage({
  meta: {
    hideMenu: true,
    title: '新建章节'
  }
})

const model = ref();
const addEditFormRef = ref()
const { uploadRef, beforeUpload, handleRemove } = useUpload()

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
    childRef: (ref) => uploadRef.value = ref
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
  },
  {
    prop: 'contents',
    value: '',
    label: '章节详情',
    span: 24,
    type: '',
    defaultSlot: (props) => <VpEditor class="w-full!" ></VpEditor>
  }
] as VpFormSchema)

const handleClick = () => {
  // 验证并提交数据
  console.log('model.value', model.value)
}

const handleSet = () => {
  if (model.value && typeof model.value['contents'] !== 'undefined') {
    model.value['contents'] = 'hello world'
  }
}
</script>
<style scoped></style>