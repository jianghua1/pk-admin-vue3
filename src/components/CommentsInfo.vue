<template>
  <div>
    <!-- 评论用户信息 -->
    <div class="container-default mb-4">
      <div class="left-marker mb-4">评论用户信息</div>
      <div>
        <div class="flex items-center mb-4">
          <!-- <el-avatar :size="50" src="/headers/1.jpeg" class="mr-4"></el-avatar> -->
          <div class="flex flex-col justify-start">
            <div class="flex mb-4">
              <span class="text-xl mr-4">toimc同学</span>
              <span>
                <el-tag type="primary" size="small">普通用户</el-tag>
              </span>
            </div>
            <!-- 地域信息 -->
            <div class="text-sm text-gray-400">湖北武汉</div>
            <!-- 最后登录信息 -->
            <div class="text-sm text-gray-500">最后登录时间:2022-01-01 00:00:00</div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="flex flex-col justify-center items-center">
            <div class="text-xl font-bold">100</div>
            <div class="text-gray-500">学习时长</div>
          </div>
          <div class="flex flex-col justify-center items-center">
            <div class="text-xl font-bold">100</div>
            <div class="text-gray-500">评论数</div>
          </div>
          <div class="flex flex-col justify-center items-center">
            <div class="text-xl font-bold">100</div>
            <div class="text-gray-500">学分</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论相关主题 -->
    <div class="container-default">
      <div class="left-marker mb-4">相关主题</div>
      <ul class="flex flex-col">
        <li v-for="(item, index) in items" :key="index" class="text-sm flex justify-start items-start mb-4
        cursor-pointer hover:(font-bold text-dark-500)">
          <span class="shrink-0 text-orange-400 flex items-center mr-4">回答：{{ item.msg }}</span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
const items = ref([
  {
    title: '评论用户信息1评论用户信息1评论用户信息1评论用户信息1评论用户信息1评论用户信息1评论用户信息1评论用户信息1评论用户信息1评论用户信息1评论用户信息1评论用户信息1',
    msg: 10
  }, {
    title: '评论用户信息2',
    msg: 10
  }, {
    title: '评论用户信息3',
    msg: 10
  }, {
    title: '评论用户信息4',
    msg: 10
  }, {
    title: '评论用户信息5',
    msg: 10
  }
])
</script>
<style scoped></style>