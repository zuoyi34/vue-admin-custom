<template>
  <div class="dashboard-container">
    <!-- 顶部标题和描述 -->
    <div class="dashboard-header">
      <h2>诸事皆顺</h2>
      <p>致自己：路要自己走；苦要自己扛；钱要自己赚！</p>
    </div>

    <!-- 快速入口 -->
    <div class="quick-entry">
      <el-card class="entry-card" @click="goTo('/users')">
        <p>用户管理</p>
      </el-card>
      <el-card class="entry-card" @click="goTo('/devices')">
        <p>设备管理</p>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function goTo(path: string) {
  router.push(path)
}
</script>

<style scoped>
.dashboard-container {
  padding: 24px;
}

/* 标题和描述 */
.dashboard-header {
  margin-bottom: 24px;
}
.dashboard-header h2 {
  color: #1976d2;          /* 标题颜色 */
  font-size: 50px;
  margin-bottom: 8px;
}
.dashboard-header p {
  color: #bd2525ff;              /* 描述文字颜色 */
  font-size: 35px;
  line-height: 1.6;
}

/* 快速入口格子 */
.quick-entry {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.entry-card {
  flex: 1;
  min-width: 150px;
  text-align: center;
  cursor: pointer;
  background: rgba(121, 202, 198, 0.85); /* 半透明背景 */
  box-shadow: 0 8px 32px rgba(17, 26, 150, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(52, 25, 175, 0.3);
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.entry-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(17, 26, 150, 0.3);
}
</style>
