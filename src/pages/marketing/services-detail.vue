<template>
  <div class="flex justify-center h-full pr-0!">
    <!-- {{ $route.query }} -->
    <CommentsCtrl></CommentsCtrl>
    <!-- 私信列表 -->
    <div class="flex flex-col w-full h-full">
      <!-- 私信列表 -->
      <div class="flex-1 overflow-hidden">
        <el-scrollbar class="px-3">
          <MessageItem
            v-for="(item, index) in messages"
            :key="index"
            v-bind="item"
            :last-created="index > 0 ? messages[index - 1].created : ''"
          ></MessageItem>
        </el-scrollbar>
      </div>
      <!-- 输入框 -->
      <div class="min-h-[52px] pr-4">
        <div class="relative bg-[var(--el-bg-color)] rounded-4 boder flex overflow-hidden">
          <div class="absolute left-3 bottom-1.8 cursor-pointer" @click="() => fileRef.click()">
            <i class="i-ep:upload-filled text-2xl text-dark-300 dark:(text-white)"></i>
            <input type="file" ref="fileRef" class="hidden" @change="handleFileUpload" />
          </div>
          <textarea
            v-model="value"
            rows="1"
            type="text"
            class="w-full resize-none px-10 py-3 border-0 outline-0 bg-transparent border max-h-52 focus:(ring-1 rounded-4 ring-shadow) dark:(bg-transparent)"
            ref="textareaRef"
            placeholder="说点什么吧"
          ></textarea>
          <div class="absolute right-3 bottom-1.8 cursor-pointer">
            <i
              :class="[
                'i-ep:promotion text-2xl text-gray-200 dark:(text-gray-500 hover:text-white) hover:text-dark-300',
                { 'text-dark-300! dark:(text-white!)': value.trim() !== '' }
              ]"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    title: 'pages.members.message-detail',
    hideMenu: true
  }
})

const fileRef = ref()
const value = ref('')
const textareaRef = ref()

watch(value, () => {
  // 动态设置textarea部分的高度
  checkScroll()
})

const messages = ref([
  {
    title:
      '这是一个很长的标题,这是一个很长的标题,这是一个很长的标题,这是一个很长的标题,这是一个很长的标题,这是一个很长的标题,这是一个很长的标题,',
    user: {
      name: 'toimc老师',
      avatar: '/headers/1.jpeg'
    },
    created: '2024-01-01 00:00:00',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    showName: false
  },
  {
    user: {
      name: 'toimc老师',
      avatar: '/headers/1.jpeg'
    },
    created: '2024-01-01 00:00:00',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    children: [],
    direction: 'right'
  },
  {
    user: {
      name: 'toimc老师112321',
      avatar: '/headers/1.jpeg'
    },
    created: '2024-01-01 00:05:00',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    children: []
  },
  {
    user: {
      name: 'toimc老师',
      avatar: '/headers/1.jpeg'
    },
    created: '2024-01-01 00:00:00',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    children: []
  },
  {
    user: {
      name: 'toimc老师',
      avatar: '/headers/1.jpeg'
    },
    created: '2024-01-01 00:00:00',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    children: []
  },
  {
    user: {
      name: 'toimc老师',
      avatar: '/headers/1.jpeg'
    },
    created: '2024-01-01 00:00:00',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    children: []
  },
  {
    user: {
      name: 'toimc老师',
      avatar: '/headers/1.jpeg'
    },
    created: '2024-01-01 00:00:00',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    children: []
  },
  {
    user: {
      name: 'toimc老师',
      avatar: '/headers/1.jpeg'
    },
    created: '2024-01-01 00:00:00',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    children: []
  }
] as any)

const handleFileUpload = (event) => {
  const files = event.target.files
  if (files && files.length > 0) {
    console.log(files[0])
  }
}

function checkScroll() {
  if (!textareaRef.value) return
  const element = textareaRef.value
  element.style.height = 'auto'
  const scrollHeight = element.scrollHeight
  if (element.scrollHeight > element.clientHeight) {
    element.style.height = `${scrollHeight + 2}px`
  }
}
</script>

<style scoped lang="scss"></style>
