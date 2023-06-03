<script setup lang='ts'>
// const route = useRoute()
</script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>

  <!-- <keep-alive>
    <router-view v-if="route.meta.keepAlive" />
  </keep-alive>
  <router-view v-if="!route.meta.keepAlive" /> -->
</template>

<style scoped lang='scss'>
.fade-enter-from{
  opacity: 0;
  transform: rotate(0);
  transform: scale(0);
}
.fade-enter-active{
  transition: all 1s;
}
.fade-enter-to{
  opacity: 1;
  transform: rotate(360deg);
  transform: scale(1);

}
</style>
