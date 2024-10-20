<template>
  <div>
    <el-switch v-model="editable" size="small"></el-switch>
    <vue-json-pretty v-model:data="modelValue" :editable="editable" />
  </div>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import type { JSONDataType } from 'vue-json-pretty/types/utils'

// defineProps<{ data: { [key: string]: any } }>()

const modelValue = defineModel<JSONDataType>()

const editable = ref(false)
</script>
