<template>
  <div class="text-2xl mb-10 text-center">
    <p class="mb-2">Not Found</p>
    <p class="text-base">您访问的页面走丢了...</p>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    hideMenu: true,
    title: 'pages.not-found'
  }
})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: 404
</route>
