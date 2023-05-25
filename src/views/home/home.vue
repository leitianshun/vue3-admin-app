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
// /admin/acl/index/login
function login() {
  request({
    url: '/admin/acl/index/login',
    method: 'post',
    data: { username: 'admin', password: 'atguigu123' }, // 111111
  })
}
login()
// console.log(request)
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
