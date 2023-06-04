<script setup lang='ts'>
const layoutStore = useLayoutStore()
function changeIcon() {
  layoutStore.setCollapse()
}
</script>

<template>
  <div class="flex items-center">
    <el-icon @click="changeIcon">
      <component :is="layoutStore.isCollapse ? 'Fold' : 'Expand'" />
    </el-icon>
    <div class="ml-3">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
