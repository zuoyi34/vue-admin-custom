<template>
  <el-header class="header">
    <div class="left">{{ title }}</div>
    <div class="right">
      <el-button type="text" @click="onLogout">退出</el-button>
    </div>
  </el-header>
</template>

<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE || 'Vue Admin'
function onLogout() {
  localStorage.removeItem('accessToken')
  window.location.href = '/login'
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background: #4545a1ff; /* 统一深色背景 */
  color: #fff;
  border-bottom: none;
}

.header .el-button {
  color: #fff; /* 退出按钮文字颜色 */
}
</style>
