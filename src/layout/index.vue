<script setup lang='ts'>
import Menu from './menu/index.vue'
import logo from './logo/index.vue'
import Main from './main/index.vue'
</script>

<template>
  <div class="w-full h-screen flex overflow-hidden">
    <div class="w-64 h-screen bg-red-400 transition-500">
      <logo />
      <el-scrollbar class="w-full menu">
        <el-menu
          default-active="2"
          class=""
        >
          <Menu />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="w-full h-full">
      <div class="h-15 bg-blue w-full ">
        header
      </div>
      <div class="h-10 bg-cyan-400 w-full ">
        tag
      </div>
      <div class="h-full w-full bg-pink-300 ">
        <Main />
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.menu{
  .el-menu{
    border-right: none;
  }
}
</style>
