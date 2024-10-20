<template>
  <div class="p-2">
    <!-- 时间 -->
    <!-- 类似微信群的时间逻辑 -->
    <!-- 1.相近的消息只会显示一次时间 -->
    <!-- 2.最近的显示时间为3分钟 -->
    <!-- 3.超过3分钟显示具体的时间  -->
    <!-- 分成：a.24小时内 b.一周内 c.一年内 d.超过1年的 -->
    <div
      v-if="shouldDisplayTime(created, lastCreated)"
      class="text-center text-sm text-gray-300 dark:text-gray-400 mb-1"
    >
      {{ formatTime }}
    </div>
    <div class="flex items-start" v-if="direction === 'left'">
      <!-- 头像 -->
      <div class="mr-4 mt-1">
        <el-avatar v-bind="avatarProps" :src="user.avatar"></el-avatar>
      </div>
      <!-- 内容 -->
      <div class="flex flex-col pr-14">
        <div class="text-sm text-gray-400 dark:text-gray-500 mb-1" v-if="showName">
          {{ user.name }}
        </div>
        <div class="container-default relative dark:bg-dark-300">
          <div
            :class="[
              'text-white dark:text-dark-300 absolute left-[-9.6px]',
              showName ? 'top-1' : 'top-4'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M16 6a1 1 0 0 0-1.6-.8l-8 6a1 1 0 0 0 0 1.6l8 6A1 1 0 0 0 16 18z"
              />
            </svg>
          </div>
          <div class="dark:text-gray-100">
            {{ content }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-start" v-else>
      <!-- 内容 -->
      <div class="flex flex-col items-end pl-14">
        <div class="container-default bg-[#95EC69] relative">
          <div class="text-[#95EC69] absolute right-[-9.6px] top-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M8 6a1 1 0 0 1 1.6-.8l8 6a1 1 0 0 1 0 1.6l-8 6A1 1 0 0 1 8 18z"
              />
            </svg>
          </div>
          <div class="dark:text-dark-300">
            {{ content }}
          </div>
        </div>
      </div>
      <!-- 头像 -->
      <div class="ml-4 mt-1">
        <el-avatar v-bind="avatarProps" :src="user.avatar"></el-avatar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import type { AvatarProps } from 'element-plus'

import zhCn from 'dayjs/locale/zh-cn'
import en from 'dayjs/locale/en'
import { formatMessageTime, shouldDisplayTime } from '@/utils'
dayjs.locale(zhCn)

interface UserInfo {
  name: string
  avatar: string
}
interface CommentItemProps {
  direction: 'left' | 'right'
  user: UserInfo
  title?: string
  content: string
  created: string
  lastCreated: string
  avatarProps: Partial<AvatarProps>
  children: CommentItemProps[]
  showName: boolean
}

const props = withDefaults(defineProps<CommentItemProps>(), {
  direction: 'left',
  avatarProps: () => ({
    size: 'default',
    shape: 'square',
    fit: 'cover'
  }),
  showName: true
})

const { locale } = useI18n()
const formatTime = ref('')

watch(
  locale,
  () => {
    if (locale.value.startsWith('zh')) {
      dayjs.locale(zhCn)
    } else if (locale.value.startsWith('en')) {
      dayjs.locale(en)
    }
    formatTime.value = formatMessageTime(props.created)
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss"></style>
