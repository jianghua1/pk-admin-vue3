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
  </div>
</template>

<script setup lang='ts'>
definePage({
  meta: {
    title: '',
    hideMenu: true,
    layout: 'single-page',
    position: 'center',
    background: './bg.jpg'
  }
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