<script setup lang="ts">
defineProps<{ msg: string }>()
onMounted(() => {
  console.log(111)
})
function open() {
  ElMessage.success('hello')
}
const { setCount } = useUserStore()
const { getCount } = storeToRefs(useUserStore())

const router = useRouter()
</script>

<template>
  <h1 class="text-red-500  ">
    {{ getCount }}
  </h1>
  <div class="card">
    <el-button type="primary" @click="open">
      Primary
    </el-button>
    <el-button type="primary" @click="setCount()">
      addcount
    </el-button>
    <el-button type="primary" @click="router.push('/login')">
      addcount
    </el-button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
