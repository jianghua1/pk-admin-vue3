<template>
  <div>
    <div class="container-default">
      <div class="left-marker mb-4">菜单管理</div>
      <div class="flex">
        <el-row class="flex flex-1">
          <!-- 菜单 tree -->
          <el-col :span="8" class="p-2 pr-4!">
            <el-tree
              style="max-width: 600px"
              :data="routes"
              :props="defaultProps"
              @node-click="handleNodeClick"
            />
          </el-col>
          <!-- 对应的菜单信息 -->
          <el-col :span="16">
            <el-tabs v-model="activeName" class="w-full">
              <el-tab-pane label="表单展示" name="form">
                <VpForm v-model="model" label-width="110" :schema="schema"></VpForm>
              </el-tab-pane>
              <el-tab-pane label="Json预览" name="json">
                <!-- <JsonPreview v-model="model"></JsonPreview> -->
                <JsonPreviewPlus v-model="model" @change="handleChange"></JsonPreviewPlus>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useI18n } from 'vue-i18n'
import type { VpFormSchema } from 'el-admin-components'
import { VpForm } from 'el-admin-components'
// import JsonPreview from '@/components/contents/JsonPreview.vue'

definePage({
  meta: {
    title: 'pages.settings.menus',
    icon: 'ep:set-up',
    order: 250
  }
})

const { t } = useI18n()
const activeName = ref('form')

const data = ref<any>([])
const model = ref({})

const local = ref([])

const defaultProps = {
  children: 'children',
  label: 'label'
}

const schema = ref([
  {
    prop: 'name',
    value: '',
    span: 24,
    label: '路由名称',
    type: 'input'
  },
  {
    prop: 'path',
    value: '',
    span: 24,
    label: '路由路径',
    type: 'input'
  },
  {
    prop: 'meta',
    value: {},
    span: 24,
    label: '路由元信息',
    type: '',
    defaultSlot: (props) => {
      const values = props.modelValue || {}
      const keys = Object.keys(values)
      const localSchema = keys.map((key) => ({
        prop: key,
        value: values[key],
        span: 24,
        label: key,
        class: 'mb-2',
        type: 'input'
      }))
      return <VpForm schema={localSchema} class="w-full" label-width={80}></VpForm>
    }
  },
  {
    prop: 'component',
    value: '',
    span: 24,
    label: '组件路径',
    type: 'input'
  },
  {
    prop: 'children',
    value: [],
    span: 24,
    label: '子组件',
    type: '',
    defaultSlot: (props) => {
      let localSchema = [] as any
      const values = props.modelValue || []
      if (values instanceof Array) {
        localSchema = values.map((item) => ({
          prop: item['name'].replace(/\//g, ''),
          value: item['component'] + '',
          span: 24,
          label: item['label'] || item['name'],
          class: 'mb-2',
          type: 'input'
        }))
        local.value = localSchema
      }
      return <VpForm schema={local.value} class="w-full" label-width={120}></VpForm>
    }
  }
] as VpFormSchema)

onBeforeMount(() => {
  // 格式化+排序routes数据，并赋值给data
  const orderRoutesData = (origin: RouteRecordRaw[]) => {
    const arr = [...origin]
    arr.forEach((item) => {
      if (item.children && item.children.length > 0) {
        item.children = orderRoutesData(item.children)
      }
      if (item.meta) {
        if (typeof item.meta.title === 'string') {
          item['label'] = t(item.meta.title)
        } else {
          item['label'] = item.name || '未设置名称'
        }
      }
    })

    arr.sort((a, b) => {
      const orderA = (a.meta?.order || 100) as number
      const orderB = (b.meta?.order || 100) as number
      return orderA - orderB
    })

    return arr
  }
  const result = orderRoutesData(routes)
  data.value = result
})

const handleNodeClick = (data: any) => {
  Object.assign(model.value, data)
}

const handleChange = (content) => {
  if (content && typeof content.json !== 'undefined') Object.assign(model.value, content.json)
}
</script>

<style scoped></style>
