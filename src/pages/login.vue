<!--  -->
<template>
  <div class="flex w-[900px] h-[600px] rounded">
    <div class="w-1/2">
      <div class="bg"></div>
    </div>
    <div class="w-1/2">
      <div class="text-3xl font-[500]">tomic 后台管理系统</div>
      <router-view></router-view>
    </div>
    <el-button @click="handleClick2" type="primary">发送消息</el-button>
  </div>
</template>

<script setup lang='ts'>
import { useWork } from '@/hooks/useWork';


definePage({
  meta: {
    title: '',
    hideMenu: true,
    layout: 'single-page',
    position: 'center',
    backgroundImage: './bg.jpg'
  }
})

const { on, emit, broadcast } = useWork()

const handleClick2 = () => {
  console.log('我执行了')
  emit('/', '从login页面返送的消息')
}
onMounted(() => {

  on('message', (data) => {
    console.log('login 页面收到消息：', data);
  })
})
</script>
<style scoped lang="scss">
.bg {
  background: url('@/assets/images/login.png') no-repeat center center;
  background-size: contain;
  width: 100%;
  height: 100%;
}
</style>