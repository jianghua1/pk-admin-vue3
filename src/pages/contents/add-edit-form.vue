<template>
  <div>
    <div class="container-default">
      <div class="left-marker">新增章节</div>
      <VpForm v-model="model" :label-width="80" :schema="addEditFormSchema" ref="addEditFormRef">
      </VpForm>
    </div>
  </div>
</template>

<script setup lang='tsx'>
import type { VpFormSchema } from "el-admin-components";

definePage({
  meta: {
    hideMenu: true
  }
})

const model = ref();
const addEditFormRef = ref()
const addEditFormSchema = ref<VpFormSchema>([
  {
    prop: 'name',
    value: '',
    label: '课程名称',
    span: 24,
    type: 'input'
  }])
</script>
<style scoped></style>