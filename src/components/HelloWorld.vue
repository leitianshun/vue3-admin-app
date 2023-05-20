<script setup lang="ts">

defineProps<{ msg: string }>()
onMounted(() => {
  console.log(111)
})
const open = () => {
  ElMessage.success('hello')
}
const {setCount} = useUserStore()
const {getCount } = storeToRefs(useUserStore())
</script>

<template>
  <h1 class="text-red-500  ">{{ getCount}}</h1>
  <div class="card">
    <el-button type="primary" @click="open">Primary</el-button>
    <el-button type="primary" @click="setCount()">addcount</el-button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
