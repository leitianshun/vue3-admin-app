<script setup lang='ts'>
defineProps({
  icon: String,
  color: String,
  width: { type: String, default: '40px' },
  height: { type: String, default: '40px' },
  prefix: {
    type: String,
    default: '#icon-',
  },
})
</script>

<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + icon" :fill="color" />
    </svg>
  </div>
</template>

<style scoped lang='scss'>
</style>
