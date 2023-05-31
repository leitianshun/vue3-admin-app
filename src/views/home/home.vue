<script setup lang="ts">
defineProps<{ msg: string }>()
onMounted(() => {
})
function open() {
  ElMessage.success('hello')
}
const { getUserInfo, logout } = useUserStore()
// const { getCount } = storeToRefs(useUserStore())
getUserInfo()
const router = useRouter()
</script>

<template>
  <div class="card">
    <el-button type="primary" @click="logout()">
      退出登录
    </el-button>
    <el-button type="primary" @click="router.push('/404')">
      addcount
    </el-button>
    <div>
      <svgIcons icon="search" width="40px" height="40px" color="red" />
    </div>
    <div class="box">
      11
    </div>
  </div>
</template>

<style scoped lang="scss">
$red:blue; //定义变量
.read-the-docs {
  color: #888;
}
.box{
  color:$color
}
</style>
