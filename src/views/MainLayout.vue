<template>
  <el-container class="h-full">
    <!-- 侧边栏 -->
    <el-aside class="transition-all duration-300">
      <!-- <h5 class="text-center text-gray-200 py-4">阿烨的AYE前端框架</h5> -->
      <el-switch v-model="isCollapse" :active-action-icon="View" :inactive-action-icon="Hide" />
      <el-menu
        :default-active="activeIndex"
        :class="isDarkMode ? 'bg-gray-900' : 'bg-gray-800'"
        :collapse="!isCollapse"
        :unique-opened="true"
        :router="true"
      >
        <!-- 后台管理菜单 -->
        <el-sub-menu index="/admin">
          <template #title>
            <el-icon><location /></el-icon>
            <span>后台管理</span>
          </template>

          <el-sub-menu index="/admin/permission">
            <template #title>用户权限</template>
            <el-menu-item index="/admin/permission/user">用户管理</el-menu-item>
            <el-menu-item index="/admin/permission/role">角色管理</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="/admin/config">
            <template #title>参数配置</template>
            <el-menu-item index="/admin/config/basic">基础参数</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="/admin/protocol">
            <template #title>通信协议</template>
            <el-menu-item index="/admin/protocol/http">HTTP协议</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <!-- FTP测试 -->
        <el-menu-item index="ftp">
          <el-icon><icon-menu /></el-icon>
          <span>FTP测试</span>
        </el-menu-item>

        <!-- 禁用菜单 -->
        <el-menu-item index="3" disabled>
          <el-icon><House /></el-icon>
          <span>一夜暴富的秘密</span>
        </el-menu-item>

        <!-- WebApi测试 -->
        <!-- 注意 这里 路由传参的时候 给的是带 / 的，会不太一样 -->
        <el-menu-item index="/webapi">
          <el-icon><Plus /></el-icon>
          <span>WebApi测试</span>
        </el-menu-item>

        <!-- 页面跳转测试 -->
        <el-menu-item index="settings">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </el-menu-item>

        <!-- dashboard -->
        <el-menu-item index="dashboard">
          <el-icon><Plus /></el-icon>
          <span>布局测试</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部导航栏 -->
      <el-header class="flex items-center justify-between bg-white shadow-sm">
        <div class="flex items-center gap-4">
          <el-button @click="toggleDarkMode" :icon="isDarkMode ? Moon : Sunny">
            <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
            <span class="ml-2">{{ isDarkMode ? 'Dark' : 'Light' }}</span>
          </el-button>
          <!-- <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar
                :size="32"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </div>
      </el-header>

      <!-- 内容区域 -->
      <el-main class="bg-gray-100 transition-colors duration-300">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component
              :is="Component"
              class="bg-white rounded-lg p-6 shadow-sm transition-colors duration-300"
            />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'
import { useDark, useToggle } from '@vueuse/core'

import {
  House,
  Setting,
  Menu as IconMenu,
  Location,
  Plus,
  Moon,
  Sunny,
  Hide,
  View,
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const sidebarStore = useSidebarStore()

// 暗黑模式
// const isDark = useDark({
//   selector: 'body',
//   attribute: 'color-scheme',
//   valueDark: 'dark',
//   valueLight: 'light',
// })

/*

// const isDark = useDark({
//   selector: 'html', // 修改为 html 元素
//   attribute: 'class', // 修改为 class 属性
//   valueDark: 'dark', // 暗黑模式时添加 dark 类名
//   valueLight: 'light', // 普通模式时移除 dark 类名
// })


const isDark = useDark({
  storageKey: 'vitepress-theme-appearance',
})
const toggleDark = useToggle(isDark)
*/

// 侧边栏状态
const isCollapse = ref(true)
//const test = watchEffect(() => console.log('isCollapse.value: ' + isCollapse.value))

// 当前激活菜单
const activeIndex = computed(() => route.path)

// 退出登录
const logout = () => {
  router.push('/login')
}

// 检查用户系统偏好
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDarkMode = ref(prefersDarkMode)

// 切换暗黑模式的函数
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value)
  // 保存用户选择到本地存储
  //@ts-ignore
  localStorage.setItem('darkMode', isDarkMode.value)
}

//  钩子 ：页面加载时检查本地存储
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    isDarkMode.value = JSON.parse(savedDarkMode)
    document.body.classList.toggle('dark-mode', isDarkMode.value)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 侧边栏高度占满 */
.el-aside {
  height: 100vh; /* 占满整个视口高度 */
}

.el-menu {
  height: calc(100% - 64px); /* 减去标题高度 */
}

/* 暗黑模式样式 */
.dark-mode .el-aside {
  background-color: black; /* 暗黑模式背景色 */
  color: #ffffff; /* 暗黑模式文字颜色 */
}

.dark-mode .el-menu {
  background-color: black; /* 暗黑模式背景色 */
  color: #ffffff; /* 暗黑模式文字颜色 */
}

.dark-mode .el-menu-item {
  color: #ffffff; /* 暗黑模式菜单项文字颜色 */
}

.dark-mode .el-menu-item:hover {
  background-color: #3a4a5a; /* 暗黑模式菜单项悬停背景色 */
}

.dark-mode .el-sub-menu,
.dark-mode .el-menu-item {
  color: #ffffff; /* 暗黑模式菜单项文字颜色 */
}

.dark-mode .el-sub-menu:hover,
.dark-mode .el-menu-item:hover {
  background-color: #3a4a5a; /* 暗黑模式菜单项悬停背景色 */
}

.light-menu {
  background-color: #ffffff; /* 普通模式背景色 */
}

.dark-menu {
  background-color: black; /* 暗黑模式背景色 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
