<template>
  <JsonEditorVue v-model="model" v-bind="$attrs" :onChange="handleChange" />
</template>

<script setup lang="ts">
import JsonEditorVue from 'json-editor-vue'

const model = defineModel<{ [key: string]: any }>()

const emits = defineEmits(['change'])

const handleChange = (content: any) => {
  emits('change', content)
}
</script>

<style scoped></style>
