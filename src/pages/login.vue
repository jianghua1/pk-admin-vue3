<template>
  <div>
    test
  </div>
</template>

<script setup lang="tsx">
definePage({
  meta: {
    title: '欢迎 回来',
    hideMenu: true,
    layout: 'single-page',
    position: 'center',
    backgroundImage: './bg.jpg'
  }
})

const loginItems = [
  {
    icon: 'ic:baseline-wechat',
    url: ''
  },
  {
    icon: 'cib:tencent-qq',
    url: ''
  },
  {
    icon: 'bi:sina-weibo',
    url: ''
  },
  {
    icon: 'mdi:github',
    url: ''
  }
]

const handleSubmit = (form: any) => {
  console.log('🚀 ~ file: login.vue:37 ~ handleSubmit ~ form:', form)
}
</script>

<style scoped></style>
