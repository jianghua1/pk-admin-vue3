<template>
  <!-- <div class="hover:x-[font-bold,text-green-500]">home</div> -->
  <div class="flex bg-gray-100">
    <!-- 内容区域 -->
    <div class="flex-1">
      <!-- 统计 -->
      <div class="grid grid-cols-3 grid-rows-1 gap-5 text-center">
        <div class="flex flex-col ">
          <div class="flex flex-col flex-1 items-center justify-center bg-white py-8">
            <div class="text-3xl">新用户</div>
            <div class="text-3xl font-bold">0</div>
          </div>
          <div class="flex items-center justify-around bg-gray-200 text-sm py-4">
            <div class="flex-1 border-r-1 border-gray-300">
              <span>普通用户：</span>
              <span>0</span>
            </div>
            <div class="flex-1">
              <span>会员用户：</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 待办事宜 -->
      <div>待办事宜</div>
      <!-- 常用功能 -->
      <div>常用功能</div>
    </div>
    <!-- 边栏 -->
    <div class=" w-[300px]">
      <!-- 消息通知 -->
      <div>消息通知</div>
      <!-- 广告位 -->
      <div>广告位</div>
      <!-- 帮助 -->
      <div>帮助</div>
    </div>
  </div>
</template>

<script setup lang="tsx">
definePage({
  meta: {
    title: 'pages.home',
    icon: 'mdi:home'
  }
})
</script>

<style scoped lang="scss"></style>

<route lang="yaml">
meta:
  layout: default
</route>
