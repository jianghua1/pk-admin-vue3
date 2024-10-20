<template>
  <div class="flex justify-center">
    <!-- {{ $route.query }} -->
    <!-- 快捷操作按钮 -->
    <CommentsCtrl></CommentsCtrl>
    <!-- 评论列表 -->
    <div class="min-w-[800px] mx-3 flex flex-col">
      <CommentItem
        class="mb-2 container-default shadow"
        v-for="(comment, index) in comments"
        :key="index"
        v-bind="comment"
      ></CommentItem>
      <VpEditor :schema="schema" v-model="value"></VpEditor>
    </div>
    <!-- 评论相关，用户信息，评论相关主题列表推荐 -->
    <CommentsInfo class="w-[300px] shrink-0"></CommentsInfo>
  </div>
</template>

<script setup lang="ts">
import type { VpFormSchema } from 'el-admin-components'

definePage({
  meta: {
    title: 'pages.members.comments-detail',
    hideMenu: true
  }
})

const value = ref('')

const schema = ref([
  {
    label: '模式',
    prop: 'mode',
    type: 'radio-group',
    value: 'ir',
    attrs: {
      size: 'small'
    },
    children: [
      {
        type: 'radio-button',
        label: 'WYSIWYG',
        value: 'wysiwyg'
      },
      {
        type: 'radio-button',
        label: '即时渲染',
        value: 'ir'
      },
      {
        type: 'radio-button',
        label: '分屏预览',
        value: 'sv'
      }
    ],
    colProps: {
      xs: 24,
      sm: 12,
      md: 11
    }
  },
  {
    type: 'radio-group',
    value: 'zh_CN',
    label: '设置语言',
    prop: 'lang',
    attrs: {
      size: 'small'
    },
    children: [
      { type: 'radio-button', label: '中', value: 'zh_CN' },
      { type: 'radio-button', label: '英', value: 'en_US' },
      { type: 'radio-button', label: '繁', value: 'zh_TW' }
    ],
    colProps: {
      xs: 24,
      sm: 12,
      md: 7
    }
  },
  {
    type: 'input-number',
    value: '400',
    label: '设置高度',
    prop: 'height',
    attrs: {
      size: 'small',
      step: 10,
      min: 400
    },
    colProps: {
      xs: 24,
      sm: 12,
      md: 6
    }
  },
  {
    type: 'radio-group',
    value: 'ant',
    label: '图标设计',
    prop: 'icon',
    attrs: {
      size: 'small'
    },
    children: [
      {
        type: 'radio-button',
        label: 'Ant Design',
        value: 'ant'
      },
      {
        type: 'radio-button',
        label: 'Material Design',
        value: 'material'
      }
    ],
    colProps: {
      xs: 24,
      sm: 12
      // md: 12
    }
  }
] as VpFormSchema)

const comments = ref([
  {
    title:
      '这是一个很长的标题,这是一个很长的标题,这是一个很长的标题,这是一个很长的标题,这是一个很长的标题,这是一个很长的标题,这是一个很长的标题,',
    user: {
      name: 'toimc老师',
      avatar: '/headers/1.jpeg'
    },
    created: '2小时前',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    children: [
      {
        user: {
          name: 'toimc老师',
          avatar: '/headers/1.jpeg'
        },
        created: '2小时前',
        content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
        children: []
      },
      {
        user: {
          name: 'toimc老师',
          avatar: '/headers/1.jpeg'
        },
        created: '2小时前',
        content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
        children: []
      },
      {
        user: {
          name: 'toimc老师',
          avatar: '/headers/1.jpeg'
        },
        created: '2小时前',
        content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
        children: []
      }
    ]
  },
  {
    user: {
      name: 'toimc老师',
      avatar: '/headers/1.jpeg'
    },
    created: '2小时前',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    children: []
  },
  {
    user: {
      name: 'toimc老师',
      avatar: '/headers/1.jpeg'
    },
    created: '2小时前',
    content: `toimc知识付费首页是一个知识付费网站的前端展示项目，该项目包含了网站的首页、学习、社区、关于我们等模块。首页包括项目展示、课程推介、团队介绍等内容，学习页面主要是分类展示不同的课程及价格，提供用户登录的相关入口，社区是外链到外部的社区项目，关于我们展示了知识付费团队的相关历史。

该项目使用了Vue3全家桶和TypeScript技术栈，使得开发人员可以快速构建出高效且易于维护的代码。同时，项目的前端和后端使用了完全不同的技术栈，使得前后端的开发可以并行进行，提高了开发效率。`,
    children: []
  }
] as any)
</script>

<style scoped></style>
