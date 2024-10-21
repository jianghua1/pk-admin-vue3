<template>
  <div>
    <div class="relative group w-full h-auto rounded border overflow-hidden">
      <img src={src} alt="" />
      <div class="absolute w-full left-0 top-0 h-full flex text-white 
              justify-around items-center opacity-0 group-hover:opacity-100
              transition-opacity duration-500 z-10">
        <i class="i-ep:zoom-in text-3xl cursor-pointer" @click="handleRreview"></i>
        <i class="i-ep:delete text-3xl cursor-pointer" @click="handleRemove"></i>
      </div>
      <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 
              transition-opacity duration-500"></div>
    </div>
    <teleport to="body">
      <el-dialog v-model="show">
        <img class="w-full" src={src} alt="" />
      </el-dialog>
    </teleport>
  </div>
</template>

<script setup lang='ts'>

const [show, toggle] = useToggle(false)
const [visibleUpload, toggleVisibleUpload] = useToggle(true)

const raw = file.raw as File
const src = URL.createObjectURL(raw)
const uploadRef = ref()

const handleRemove = () => {
  if (uploadRef.value && uploadRef.value.clearFiles) {
    uploadRef.value.clearFiles()
    toggleVisibleUpload(true)
  }
}

const handleRreview = () => {
  toggle(true)
}
</script>
<style scoped></style>