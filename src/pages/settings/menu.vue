<template>
  <div>
    <div class="container-default">
      <div class="left-marker mb-4">菜单管理</div>
      <div class="flex">
          <el-row class="flex flex-1">
            <el-col :span="8">
              <el-tree style="max-width: 600px" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
            </el-col>
            <el-col :span="16">
              <el-tabs v-model="activeName" >
                <el-tab-pane label="表单展示" name="form"> 
                  <VpForm v-model="model" label-width="110" :schema="schema"></VpForm>
                </el-tab-pane>
                <el-tab-pane label="JSON预览" name="json">  
                  <div class="w-full">
                    <JsonPreview v-model="model"></JsonPreview>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang='tsx'>
import type { RouteRecordRaw } from 'vue-router';
import { routes } from 'vue-router/auto-routes'
import { useI18n } from 'vue-i18n'
import { VpForm, VpFormSchema } from 'el-admin-components';

definePage({
  meta: {
    title: '菜单管理',
    icon: 'ep:set-up',
    order: 250
  }
})

const { t } = useI18n()
const activeName = ref('form')
const data = ref()
const model = ref()

const local = ref([])

const schema = ref([
  {
    prop: 'name',
    value: '',
    label: '路由名称',
    type: 'input',
    span: 24
  },
  {
    prop: 'path',
    value: '',
    label: '路由路径',
    type: 'input',
    span: 24
  },
  {
    prop: 'meta',
    value: {},
    label: '路由元数据',
    type: 'input',
    span: 24,
    defaultSlot: (props) => {
      const values = props.modelValue || {}
      const keys = Object.keys(values)
      const localSchema = keys.map(key => ({
        prop: key,
        value: values[key],
        label: key,
        type: 'input',
        span: 24,
        class: 'mb-2'
      }))
      return <VpForm schema={localSchema} class="w-full" label-width={80}></VpForm>
    }
  },
  {
    prop: 'component',
    value: '',
    label: '组件路径',
    type: 'input',
    span: 24
  },
  {
    prop: 'children',
    value: [],
    label: '子组件',
    type: 'input',
    defaultSlot: (props) => {
      let localSchema = []
      const values = props.modelValue||[]
      if(values instanceof Array){
        localSchema = values.map(item=>({
          prop:item['name'].replace(/\//g,''),
          value:item['component']+'',
          span: 24,
          label: item['label']||item['name'],
          type: 'input',
          class: 'mb-2'
        }))
        local.value = localSchema
      }
      return <VpForm class="w-full" label-width={120}>
        {local.value.map(item=>(
          <el-form-item prop={item.prop} label={item.label}>
            <el-input v-model={item.value} />
          </el-form-item>
        ))}
      </VpForm>
    },
    span: 24
  }
] as VpFormSchema)

onBeforeMount(() => {
  const orderRoutesData = (origin: RouteRecordRaw[]) => {
    const arr = [...origin]

    arr.forEach((item) => {
      if (item.children && item.children.length > 0) {
        item.children = orderRoutesData(item.children)
      }
      if (item.meta && typeof item.meta.title === 'string') {
        if (item.meta.title.startsWith('pages')) {
          item['label'] = t(item.meta.title)
        } else {
          item['label'] = item.meta.title
        }
      } else {
        item['label'] = item.name || '未设置名称'
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

const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>
<style scoped></style>