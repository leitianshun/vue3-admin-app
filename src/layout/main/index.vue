<script setup lang='ts'>
const route = useRoute()
</script>

<template>
  <!-- <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view> -->

  <keep-alive>
    <router-view v-if="route.meta.keepAlive" />
  </keep-alive>
  <router-view v-if="!route.meta.keepAlive" />
</template>

<style scoped lang='scss'>
</style>
