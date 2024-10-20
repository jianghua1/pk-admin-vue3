<template>
  <div class="px-8">
    <div class="text-dark-500 font-bold text-2xl mt-4 mb-8 line-clamp-1" v-if="title">
      {{ title }}
    </div>
    <!-- 用户信息 -->
    <div class="flex items-center">
      <!-- 用户头像 -->
      <el-avatar :size="50" :src="user.avatar" class="mr-4"></el-avatar>
      <div class="flex flex-col justify-start">
        <!-- 用户昵称 -->
        <div class="text-dark-200 text-sm font-bold mb-2">{{ user.name }}</div>
        <!-- 回复时间 -->
        <div class="text-gray-300 text-sm">{{ created }}</div>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="py-4">
      <!-- 回复内容 -->
      <div class="mb-4 text-dark-500">
        {{ content }}
      </div>
      <!-- 操作区域 -->
      <div class="flex justify-end">
        <!-- 点赞按钮 -->
        <i class="i-la:thumbs-up text-2xl cursor-pointer mr-4"></i>
        <!-- 回复按钮 -->
        <i class="i-ep:message text-2xl cursor-pointer mr-4"></i>
        <!-- 设置最佳按钮 -->
        <i class="i-ep:select text-2xl cursor-pointer mr-4"></i>
        <!-- 收藏按钮 -->
        <i class="i-ep:star text-2xl cursor-pointer mr-4"></i>
        <!-- 删除按钮 -->
        <i class="i-ep:delte text-2xl cursor-pointer"></i>
      </div>
    </div>
    <div class="p-4 bg-gray-100 rounded" v-if="children && children.length > 0">
      <div
        :class="[{ 'border-b mb-4': index !== children.length - 1 }]"
        v-for="(item, index) in children"
        :key="index"
      >
        <!-- 用户信息 -->
        <div class="flex items-center justify-between">
          <!-- 用户头像 -->
          <div class="flex justify-start">
            <!-- 用户昵称 -->
            <div class="text-dark-200 text-sm font-bold mr-4">{{ item.user.name }}</div>
            <!-- 回复时间 -->
            <div class="text-gray-300 text-sm">{{ item.created }}</div>
          </div>
          <div class="text-gray-400">#{{ index + 1 }}</div>
        </div>
        <!-- 内容区域 -->
        <div class="py-4">
          <!-- 回复内容 -->
          <div class="mb-4 text-dark-500">
            {{ item.content }}
          </div>
          <!-- 操作区域 -->
          <div class="flex justify-end">
            <!-- 点赞按钮 -->
            <i class="i-la:thumbs-up text-2xl cursor-pointer mr-4"></i>
            <!-- 回复按钮 -->
            <i class="i-ep:message text-2xl cursor-pointer mr-4"></i>
            <!-- 设置最佳按钮 -->
            <i class="i-ep:select text-2xl cursor-pointer mr-4"></i>
            <!-- 收藏按钮 -->
            <i class="i-ep:star text-2xl cursor-pointer mr-4"></i>
            <!-- 删除按钮 -->
            <i class="i-ep:delte text-2xl cursor-pointer"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UserInfo {
  name: string
  avatar: string
}
interface CommentItemProps {
  user: UserInfo
  title?: string
  content: string
  created: string
  children: CommentItemProps[]
}

defineProps<CommentItemProps>()
</script>

<style scoped></style>
