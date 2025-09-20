<template>
  <div class="layout">
    <SideBar />
    <div class="main">
      <LayoutHeader />
      <el-container>
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from './SideBar.vue'
import LayoutHeader from './LayoutHeader.vue'
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background: #4545a1ff; /* 整个页面背景色 */
  color: #fff; /* 默认文字颜色 */
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 内容区 */
.main-content {
  padding: 16px;
}

/* 如果 SideBar 组件自己有背景色，可在这里覆盖 */
.sidebar {
  background: transparent; /* 或 #1e1e2f 与页面统一 */
  color: #fff;
}

/* LayoutHeader 统一背景 */
.layout-header {
  background: transparent; /* 或 #1e1e2f */
  color: #fff;
}
</style>
