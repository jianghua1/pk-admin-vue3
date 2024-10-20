<template>
  <div>
    <div class="container-default flex flex-col items-center justify-start">
      <!-- 返回 -->
      <el-tooltip effect="light" content="返回" placement="top-start">
        <i class="i-ep:back mb-8 text-2xl cursor-pointer"></i>
      </el-tooltip>
      <!-- 收藏 -->
      <el-tooltip effect="light" content="收藏" placement="top-start">
        <i class="i-ep:star mb-8 text-2xl cursor-pointer"></i>
      </el-tooltip>
      <!-- 设置分类、标签 -->
      <el-tooltip effect="light" content="标签" placement="top-start">
        <i class="i-ep:price-tag mb-8 text-2xl cursor-pointer"></i>
      </el-tooltip>
      <!-- 管理员操作 -->
      <!-- 隐藏 -->
      <el-tooltip effect="light" content="隐藏" placement="top-start">
        <i class="i-ep:hide mb-8 text-2xl cursor-pointer"></i>
      </el-tooltip>
      <!-- 禁言 -->
      <el-tooltip effect="light" content="禁言" placement="top-start">
        <i class="i-mage:message-dots-round-cross mb-8 text-2xl cursor-pointer"></i>
      </el-tooltip>
      <!-- 删除 -->
      <el-tooltip effect="light" content="删除" placement="top-start">
        <i class="i-ep:delete text-2xl cursor-pointer"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
