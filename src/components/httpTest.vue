<template>
    <div>
      <pre>{{ data }}</pre>
    </div>
  </template>
  
  <script setup>
  import http from '../utils/request';
  import { ref } from 'vue';
  
  // 定义 data 变量 是一个ref类型的响应式变量，
  // 初始值为 null，类型为 string 或者 null，帮助TS类型推断
  const data = ref<string | null>(null);
  
  const fetchData = async () => {
    const response = await http.get('/posts/1');//要改成自己的接口地址
    data.value = JSON.stringify(response.data);
  };
  
  fetchData();
  </script>