<script setup lang='ts'>
import setting from '@/setting'
</script>

<template>
  <div class="w-full h-15  flex items-center text-white p-1">
    <img :src="setting.logo" class="w-10 h-10 rounded-full border-gray border-opacity-50 ml-2 border-1 border-solid shadow-yellow-300 " alt="">
    <div class="ml-5   whitespace-nowrap">
      {{ setting.title }}
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
