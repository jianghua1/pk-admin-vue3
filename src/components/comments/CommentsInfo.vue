<template>
  <div>
    <!-- 评论用户信息 -->
    <div class="container-default mb-4">
      <div class="left-marker mb-4">评论用户信息</div>
      <div>
        <!-- 用户基础信息 -->
        <div class="flex items-center mb-4">
          <!-- 用户信息 -->
          <div class="flex flex-col justify-start">
            <!-- 昵称，角色标签 -->
            <div class="flex mb-4">
              <span class="text-xl mr-4">toimc同学</span
              ><span>
                <el-tag type="primary" size="small">普通用户</el-tag>
              </span>
            </div>
            <!-- 地域信息 -->
            <div class="text-sm text-gray-400">湖北武汉</div>
            <!-- 最后登录信息 -->
            <div class="text-sm text-gray-500">最后登录时间:2022-01-01 00:00:00</div>
          </div>
        </div>
        <!-- 用户统计信息，学习数，学分，评论数 -->
        <div class="grid grid-cols-3 gap-2">
          <div class="flex flex-col items-center justify-center">
            <div class="font-bold text-xl">100</div>
            <div class="text-gray-500">学习时长</div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <div class="font-bold text-xl">100</div>
            <div class="text-gray-500">评论数</div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <div class="font-bold text-xl">100</div>
            <div class="text-gray-500">学分</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论相关主题 -->
    <div class="container-default">
      <div class="left-marker mb-4">相关主题</div>
      <ul class="flex flex-col">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="text-sm flex justify-start items-start mb-4 cursor-pointer hover:(font-bold text-dark-500 )"
        >
          <span class="shrink-0 text-orange-500 flex items-center mr-4">回答 {{ item.msg }}</span>
          <span class="line-clamp-3">{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  {
    title:
      '评论相关主题1,评论相关主题1评论相关主题1评论相关主题1评论相关主题1评论相关主题1评论相关主题1评论相关主题1评论相关主题1评论相关主题1评论相关主题1评论相关主题1评论相关主题1评论相关主题1',
    msg: 10
  },
  {
    title: '评论相关主题2',
    msg: 10
  },
  {
    title: '评论相关主题3',
    msg: 10
  },
  {
    title: '评论相关主题4',
    msg: 10
  },
  {
    title: '评论相关主题5',
    msg: 10
  }
])
</script>

<style scoped></style>
