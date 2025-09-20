<template>
  <div>
    <!-- 顶部工具栏，只保留新增用户按钮 -->
    <el-row justify="end" style="margin-bottom:12px">
      <el-col>
        <el-button v-if="isAdmin" type="primary" @click="openCreate">新增用户</el-button>
      </el-col>
    </el-row>

    <!-- 用户卡片列表，横向排列 -->
    <div class="user-list">
      <div class="user-row" v-for="user in users" :key="user.email">
        <div class="user-cell">{{ user.email }}</div>
        <div class="user-cell">{{ user.is_admin ? '管理员' : '普通用户' }}</div>
        <div class="user-cell">{{ user.password || '******' }}</div>
        <div class="user-cell">{{ user.created_at ? new Date(user.created_at).toLocaleString() : '-' }}</div>
        <div class="user-cell">
          <el-button
            v-if="isAdmin && !user.is_admin"
            type="danger"
            size="small"
            @click="remove(user.email)"
          >
            删除
          </el-button>
        </div>
      </div>
    </div>

    <!-- 新增用户弹窗 -->
    <el-dialog v-model="showCreate" width="400px" :before-close="handleClose">
      <template #title>新增用户</template>
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" autocomplete="new-password" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="普通用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreate = false">取消</el-button>
        <el-button type="primary" @click="create">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import http from '@/api/http'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const users = ref<any[]>([])
const showCreate = ref(false)
const form = reactive({ username: '', phone: '', password: '', role: 'user' })
const role = ref(localStorage.getItem('role') || '')
const router = useRouter()
const isAdmin = computed(() => role.value === 'admin')

onMounted(() => {
  if (!isAdmin.value) {
    ElMessage.warning('无权限访问用户管理页')
    router.push('/')
  } else {
    fetchUsers()
  }
})

async function fetchUsers() {
  try {
    const res = await http.get('/users')
    users.value = res.data.map((u: any) => ({
      ...u,
      password: undefined,
      created_at: u.created_at || null
    })) || []
  } catch (e) {
    ElMessage.error('获取用户列表失败')
    console.error(e)
  }
}

function openCreate() {
  form.username = ''
  form.phone = ''
  form.password = ''
  form.role = 'user'
  showCreate.value = true
}

function handleClose(done: () => void) {
  form.username = ''
  form.phone = ''
  form.password = ''
  form.role = 'user'
  done()
}

async function create() {
  if (!form.username || !form.password) {
    ElMessage.warning('用户名和密码不能为空')
    return
  }
  try {
    const payload = {
      username: form.username,
      phone: form.phone,
      password: form.password,
      is_admin: form.role === 'admin'
    }
    await http.post('/users/add', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
    ElMessage.success('用户添加成功')
    showCreate.value = false

    users.value.unshift({
      email: form.username,
      is_admin: form.role === 'admin',
      created_at: new Date().toISOString(),
      password: form.password
    })

    form.username = ''
    form.password = ''
    form.role = 'user'
  } catch (e) {
    ElMessage.error('添加用户失败')
    console.error(e)
  }
}

async function remove(email: string) {
  try {
    await http.delete(`/users/${encodeURIComponent(email)}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
    ElMessage.success('删除成功')
    fetchUsers()
  } catch (e) {
    ElMessage.error('删除用户失败')
    console.error(e)
  }
}
</script>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-row {
  display: flex;
  background: rgba(121, 202, 198, 0.85);
  box-shadow: 0 8px 32px rgba(17, 26, 150, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(52, 25, 175, 0.3);
  border-radius: 6px;
  padding: 12px;
  align-items: center;
}

.user-cell {
  flex: 1;
  text-align: center;
  color: #f3f1f1ff;
}
.user-cell:last-child {
  text-align: center;
}
</style>
