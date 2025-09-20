<template>
  <div>
    <h3>客户管理</h3>
    <el-table :data="customers" v-loading="loading" style="width:100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="name" label="名称" />
      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/api/http'

const customers = ref<any[]>([])
const loading = ref(false)

async function fetch(){
  loading.value = true
  try {
    const res = await http.get('/customers')
    customers.value = res.data || []
  } catch (e){ console.error(e) } finally { loading.value = false }
}

async function remove(id: number){
  try {
    await http.delete(`/customers/${id}`)
    fetch()
  } catch (e){ console.error(e) }
}

onMounted(fetch)
</script>
