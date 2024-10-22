<template>
  <div>
    <div class="container-default">
      <div class="left-marker mb-4">菜单管理</div>
      <el-row class="flex">
        <el-col :span="8">
          <el-tree style="max-width: 600px" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        </el-col>
        <el-col :span="16">Content</el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang='ts'>
import type { RouteRecordRaw } from 'vue-router';
import { routes } from 'vue-router/auto-routes'
import { useI18n } from 'vue-i18n'

definePage({
  meta: {
    title: '菜单管理',
    icon: 'ep:set-up',
    order: 250
  }
})

const { t } = useI18n()
const data = ref()

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

const handleNodeClick = (data) => {
  console.log(data)
}

const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>
<style scoped></style>