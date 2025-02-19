<template>
    <div class="p-6 bg-white rounded-lg shadow">
      <h1 class="text-2xl font-bold mb-4">仪表盘</h1>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-statistic title="1" :value="12423" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="2" :value="2456" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="3" :value="136526.32" precision="2" />
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts" setup>
  // 可以在这里添加TS逻辑
  </script>