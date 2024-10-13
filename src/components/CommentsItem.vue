<template>
  <div>
    <div class="text-dark-500 font-bold text-2xl mt-4 mb-8 line-clamp-1" v-if="title">{{ title }}</div>
    <!-- 用户信息 -->
    <div class="flex items-center">
      <!-- 用户头像 -->
      <el-avatar :size="50" :src="user.avatar" class="mr-4"></el-avatar>
      <div class="flex flex-col">
        <!-- 用户昵称 -->
        <div class="text-dark-500 text-sm font-bold">{{ user.name }}</div>
        <!-- 回复时间 -->
        <div class="text-gray-400 text-sm">{{ created }}</div>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="py-4">
      <!-- 回复内容 -->
      <div class="mb-4 text-dark-500">
        {{ content }}
        <!-- 大家好，又是卡在七月的末尾，我老废物回来了！很高兴大家对于上期文章的积极评分和留言，虽然我写了很多但收到的评分和评论也很多，虽然高质量回复没两条但也感谢大家的支持，还是老规矩，废话不多说，让我们赶紧看看八月份的新片又有哪些值得我们关注！
        本期和前面两期文章有所不同，从这期开始，我决定将IP社的作品统一放在其他分类内一起介绍，只保留s1和m社的新片单独介绍，因为IP社一个月只有一个档期且能推荐的作品数量太少，真没必要单独列出推荐，希望大家理解！
        本期全文共计16000+字，图片200+张，推荐作品达74部，主打一个量大管饱，请大家慢慢欣赏！ -->
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
        <i class="i-ep:delete text-2xl cursor-pointer"></i>
      </div>
    </div>
    <div class="p-4 bg-gray-100 rounded" v-if="children && children.length > 0">
      <div :class="[{ 'border-b mb-4': index !== children.length - 1 }]" v-for="(item, index) in children" :key="index">
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

<script setup lang='ts'>
interface UserInfo {
  name: string
  avatar: string
}

interface CommentItemProps {
  user: UserInfo
  title?: string
  content: string
  created: string
  children?: CommentItemProps[]
}

defineProps<CommentItemProps>()
</script>
<style scoped></style>