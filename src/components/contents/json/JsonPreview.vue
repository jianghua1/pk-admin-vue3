<template>
  <div>
    <el-switch v-model="editable" size="small"/>
    <vue-json-pretty v-model:data="modelValue" :editable="editable"/>
  </div>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { JSONDataType } from 'vue-json-pretty/types/utils';

const modelValue = defineModel<JSONDataType>()

const editable = ref(false)
</script>