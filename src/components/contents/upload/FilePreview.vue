<template>
  <div>
    <div class="relative group h-auto rounded border overflow-hidden">
      <img :src="src" alt="" />
      <div
        class="absolute left-0 top-0 w-full h-full flex justify-around items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
      >
        <i class="cursor-pointer i-ep:zoom-in text-3xl" @click="handlePreview"></i>
        <i class="cursor-pointer i-ep:delete text-3xl" @click="handleRemove"></i>
      </div>
      <div
        class="absolute inset-0 bg-black opacity-0 z-5 group-hover:opacity-40 transition-opacity duration-500"
      ></div>
    </div>
    <teleport to="body">
      <el-dialog v-model="show">
        <img class="w-full" :src="src" alt="Preview Image" />
      </el-dialog>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import type { UploadFile } from 'element-plus'

const [show, toggle] = useToggle(false)

interface FilePreviewProps {
  file: UploadFile
}

const props = defineProps<FilePreviewProps>()
const src = ref('')

const emits = defineEmits(['remove'])

onBeforeMount(() => {
  const raw = props.file.raw as File
  // 预览图片的临时地址
  src.value = URL.createObjectURL(raw)
})

watch(
  () => props.file,
  (newVal: UploadFile) => {
    const raw = newVal.raw as File
    // 预览图片的临时地址
    src.value = URL.createObjectURL(raw)
  },
  {
    immediate: true
  }
)

const handlePreview = () => {
  toggle(true)
}
const handleRemove = () => {
  // if (uploadRef.value && uploadRef.value.clearFiles) {
  //   uploadRef.value.clearFiles()
  //   // 显示上传区域
  //   toggleVisibleUpload(true)
  // }
  emits('remove')
}
</script>

<style scoped></style>
