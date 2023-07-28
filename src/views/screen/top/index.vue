<script setup lang='ts'>
import dayjs from 'dayjs'

const timer = ref()
const router = useRouter()
const time = ref(dayjs().format('YYYY年MM月DD日 HH:mm:ss'))
// const time = new Date().toLocaleString().replace(/\//g, '-')

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div class="flex  w-full h-full">
    <div class="left flex-1 flex w-full justify-end">
      <div class="left-btn w-40 h-full flex text-xl items-center justify-center cursor-pointer" @click="router.push('/')">
        首页
      </div>
    </div>
    <div class="center w-full h-20   text-3xl flex-[2]  flex items-center justify-center">
      智慧旅游可视化大数据展示平台
    </div>
    <div class="right flex-1 flex w-full justify-between items-center ">
      <div class="w-40 right-btn text-xl h-full flex items-center justify-center">
        统计报告
      </div>
      <div class="mr-8 ">
        当前时间  {{ time }}
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.left {
  background: url('/src/views/screen/images/dataScreen-header-left-bg.png') no-repeat;
  background-size: cover;

  .left-btn {
    background: url('/src/views/screen/images/dataScreen-header-btn-bg-l.png') no-repeat;
    background-size: cover;
    color: #29fcff;
  }
}

.center {
  background: url('/src/views/screen/images/dataScreen-header-center-bg.png') no-repeat;
  background-size: cover;
  color: #29fcff;
}

.right {
  background: url('/src/views/screen/images/dataScreen-header-right-bg.png') no-repeat;
  background-size: cover;
    color: #29fcff;

  .right-btn {
    background: url('/src/views/screen/images/dataScreen-header-btn-bg-r.png') no-repeat;
    background-size: cover;
  }
}
</style>
