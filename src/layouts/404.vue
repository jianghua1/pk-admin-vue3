<template>
  <div
    class="flex flex-col items-center justify-center absolute inset-0 h-full w-full overflow-hidden bg-gray-100"
  >
    <div class="text-[10rem]">404</div>
    <router-view></router-view>
    <el-button type="info" @click="router.back()" class="h-12!">
      <div class="text-2xl flex items-center py-1 px-2">
        <i class="i-ep:back mr-1"></i>
        返回
      </div>
    </el-button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style scoped></style>
