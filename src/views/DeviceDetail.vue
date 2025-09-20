<template>
  <div>
    <el-button @click="$router.back()">返回</el-button>
    <h3>设备 {{ id }} 详情</h3>
    <el-tabs v-model="tab">
      <el-tab-pane name="info" label="设备信息">
        <pre>{{ device }}</pre>
      </el-tab-pane>
      <el-tab-pane name="contacts" label="联系人">
        <el-table :data="contacts"><el-table-column prop="name" label="姓名" /></el-table>
      </el-tab-pane>
      <el-tab-pane name="messages" label="消息">
        <el-table :data="messages"><el-table-column prop="text" label="内容" /></el-table>
      </el-tab-pane>
      <el-tab-pane name="photos" label="照片">
        <div v-if="photos.length===0">无照片</div>
        <div v-else><img v-for="p in photos" :src="p.url" :key="p.url" style="height:120px;margin:6px" /></div>
      </el-tab-pane>
      <el-tab-pane name="location" label="定位">
        <pre>{{ location }}</pre>
      </el-tab-pane>
      <el-tab-pane name="apps" label="应用">
        <el-table :data="apps"><el-table-column prop="name" label="应用名" /></el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import http from '@/api/http'

const route = useRoute()
const id = route.params.id
const tab = ref('info')
const device = ref(null)
const contacts = ref([] as any[])
const messages = ref([] as any[])
const photos = ref([] as any[])
const location = ref(null)
const apps = ref([] as any[])

async function fetchAll(){
  try {
    const res = await http.get(`/device/${id}`)
    device.value = res.data
  } catch (e){ console.error(e) }

  try { const r = await http.get(`/devices/${id}/contacts`); contacts.value = r.data || [] } catch(e){console.error(e)}
  try { const r = await http.get(`/devices/${id}/messages`); messages.value = r.data || [] } catch(e){console.error(e)}
  try { const r = await http.get(`/devices/${id}/photos`); photos.value = r.data || [] } catch(e){console.error(e)}
  try { const r = await http.get(`/devices/${id}/location`); location.value = r.data || null } catch(e){console.error(e)}
  try { const r = await http.get(`/devices/${id}/apps`); apps.value = r.data || [] } catch(e){console.error(e)}
}

onMounted(fetchAll)
</script>
