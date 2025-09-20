<template>
  <el-aside width="200px" class="sidebar">
    <el-menu
      :default-active="$route.path"
      router
      class="sidebar-menu"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
    >
      <!-- 一级菜单 -->
      <el-menu-item index="/">首页</el-menu-item>

      <!-- 二级菜单 -->
      <el-submenu index="users">
        <template #title>用户管理</template>
        <el-menu-item index="/users">用户列表</el-menu-item>
      </el-submenu>

      <el-menu-item index="/devices">设备管理</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
// 如果需要动态菜单或者图标，可以在这里引入和处理
</script>

<style scoped>
/* 整个左侧栏背景和样式 */
.sidebar {
  background: rgba(121, 202, 198, 0.85);  /* 背景颜色，半透明效果 */
  box-shadow: 0 8px 32px rgba(17, 26, 150, 0.2); /* 阴影 */
  backdrop-filter: blur(10px); /* 毛玻璃模糊 */
  border-right: 1px solid rgba(52, 25, 175, 0.3); /* 边框 */
  color: #fff; /* 默认文字颜色 */
}

/* 菜单文字和背景 */
.sidebar-menu {
  border-right: none; /* 去掉默认边框 */
}

/* 悬浮效果 */
.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

/* 当前选中效果 */
.el-menu-item.is-active,
.el-submenu.is-active > .el-submenu__title {
  background-color: rgba(255, 255, 255, 0.35);
  color: #fff;
}

/* 子菜单文字缩进 */
.el-submenu__title {
  padding-left: 20px;
}

/* 一级菜单间距 */
.el-menu-item {
  padding-left: 20px;
  font-size: 14px;
}
</style>
