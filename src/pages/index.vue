<template>
  <!-- <div class="hover:x-[font-bold,text-green-500]">home</div> -->
  <div class="home">home</div>
</template>

<script setup lang="tsx">
definePage({
  meta: {
    title: 'pages.home',
    icon: 'mdi:home'
  }
})
</script>

<style scoped lang="scss">
.home {
  &:hover {
    @apply font-bold text-red-500;
  }
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>


