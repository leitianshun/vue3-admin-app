<script setup lang="ts">
defineProps<{ msg: string }>()
const count = ref(0)
onMounted(() => {
  console.log(111)
})
const open = () => {
  ElMessage.success('hello')
}
</script>

<template>
  <h1 class="text-red-500  ">{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <el-button type="primary" @click="open">Primary</el-button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
