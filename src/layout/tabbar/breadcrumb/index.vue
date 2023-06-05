<script setup lang='ts'>
const layoutStore = useLayoutStore()
function changeIcon() {
  layoutStore.setCollapse()
}

const route = useRoute()
// console.log(route.matched)  //可以获取到当前匹配的路由，也就是点击的路由
</script>

<template>
  <div class="flex items-center">
    <el-icon @click="changeIcon">
      <component :is="layoutStore.isCollapse ? 'Fold' : 'Expand'" />
    </el-icon>
    <div class="ml-3">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in route.matched" v-show="item.meta.title" :key="index" :to="item.path">
          <div class="flex items-center">
            <el-icon>
              <component :is="item.meta.icon" class="w-4.5 h-4.5" />
            </el-icon>
            <span class="ml-1">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
