<template>
  <div class="login-wrapper">
    <el-card class="login-card">
      <h3 class="login-title">{{ title }}</h3>
      <el-form :model="form">
        <el-form-item label="账号">
          <el-input
            v-model="form.username"
            placeholder="请输入账号"
            @keyup.enter="onLogin"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            show-password
            v-model="form.password"
            placeholder="请输入密码"
            @keyup.enter="onLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            class="login-btn"
            @click="onLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/api/http'

const router = useRouter()
const title = import.meta.env.VITE_APP_TITLE || 'Vue Admin'
const loading = ref(false)
const form = reactive({ username: '', password: '' })

async function onLogin() {
  if (!form.username || !form.password) {
    const { ElMessage } = await import('element-plus')
    ElMessage.warning('请输入账号和密码')
    return
  }

  loading.value = true
  try {
    const loginForm = new URLSearchParams()
    loginForm.append('username', form.username)
    loginForm.append('password', form.password)
    loginForm.append('grant_type', 'password')

    const res = await http.post('/login', loginForm)
    const token = res.data?.access_token || res.data?.token
    const role = res.data?.role

    if (!token) throw new Error('登录未返回 token')
    if (!role) throw new Error('登录未返回角色信息')

    localStorage.setItem('accessToken', token)
    localStorage.setItem('role', role)

    router.push('/')
  } catch (e: any) {
    const { ElMessage } = await import('element-plus')
    const msg = e?.response?.data?.detail || e.message || '登录失败'
    ElMessage.error(msg)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 渐变背景 */
  background: linear-gradient(135deg, #065f58ff, #0d7a75ff);
}

.login-card {
  width: 380px;
  padding: 35px 30px;
  border-radius: 12px;
  /* 半透明白色卡片 */
  background: rgba(121, 202, 198, 0.85);
  box-shadow: 0 8px 32px rgba(17, 26, 150, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(52, 25, 175, 0.3);
}

.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #333;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
  font-size: 16px;
  padding: 12px 0;
  border-radius: 8px;
}
</style>
