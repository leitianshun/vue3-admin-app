<script setup lang='ts'>
const refresh = ref(true)
const layoutStore = useLayoutStore()
watch(() => layoutStore.refresh, () => { // 监听store里的refresh变化，让组件销毁重建，然后重新挂载获取数据
  refresh.value = false
  nextTick(() => {
    refresh.value = true // 等待dom渲染完成后修改数据
  })
})
// const route = useRoute()
</script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" v-if="refresh" />
    </Transition>
  </router-view>
<!--
  <Keep-Alive>
    <router-view v-if="route.meta.keepAlive" />
  </Keep-Alive>
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
