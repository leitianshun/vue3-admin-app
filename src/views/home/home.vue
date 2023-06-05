<script setup lang="ts">
import { getTime } from '@/utils/time'

const userStore = useUserStore()
</script>

<template>
  <div class="p-3 w-full h-full">
    <div class="flex p-3  shadow-gray-200 rounded-xl  shadow-xl items-center border border-solid border-gray-100 w-full h-20">
      <img src="/src/assets/image/dog.gif" class="w-15 h-15 rounded-full" alt="">
      <div class="ml-3 text-2xl font-bold ">
        {{ getTime() }}好呀，{{ userStore.name }}
      </div>
    </div>
    <div class="text-center mt-5">
      <svgIcons icon="welcome" width="640px" height="640px" color="red" />
    </div>
  </div>
</template>

<style scoped lang="scss">
$red:blue; //定义变量
.box{
  color:$red
}
</style>
