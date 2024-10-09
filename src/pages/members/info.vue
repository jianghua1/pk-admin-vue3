<template>
  <!-- <div>query: {{ $route.query }}</div> -->
  <div class="bg-default">
    <div class="flex items-center">
      <!-- 头像 -->
      <el-avatar :size="50" src="/headers/1.jpeg" class="mr-4"></el-avatar>
      <!-- 用户信息 -->
      <div class="flex flex-col justify-start">
        <!-- 昵称 -->
        <div>
          <span>jianghua同学</span>
          <span class="ml-3">
            <el-tag type="primary" size="small">普通用户</el-tag>
          </span>
        </div>
        <!-- 地域信息 -->
        <div class="text-sm text-gray-300 pt-3">湖北武汉</div>
        <!-- 最后登录信息 -->
        <div class="text-sm text-gray-400">最后登录时间：2022-10-10 10:10:10</div>
      </div>
    </div>
    <VpDescription title="基础信息" border :column="2" :data="data"></VpDescription>
  </div>
</template>

<script setup lang='ts'>
definePage({
  meta: {
    hideMenu: true
  }
})

const data = ref([{
  label: '邮箱',
  value: '12345678900@qq.com'
}, {
  label: '微信',
  value: '一页书'
}, {
  label: '是否是会员',
  value: '是'
}, {
  label: '会员过期时间',
  value: '2022-10-10 10:10:10'
}
])
</script>
<style scoped></style>