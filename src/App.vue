<template>
  <!-- 渲染路由对应的组件 -->
  <!-- <MainLayout /> -->
  <router-view />
</template>

<script lang="ts" setup>
import MainLayout from '@/views/MainLayout.vue'
// 可以在这里添加全局逻辑
</script>

<style>
/* 全局样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
