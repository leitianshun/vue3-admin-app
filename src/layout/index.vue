<script setup lang='ts'>
import Menu from './menu/index.vue'
import logo from './logo/index.vue'
import Main from './main/index.vue'
import { routes } from '@/router/index'

const route = useRoute()
</script>

<template>
  <div class="w-full h-screen flex overflow-hidden ">
    <div class="w-70 h-screen    bg-blue-gray-800 transition-500">
      <logo />
      <el-scrollbar class="w-full menu">
        <el-menu
          router
          :default-active="route.path"
          class=""
          text-color="white"
          background-color="#1e293b"
        >
          <Menu :menu-list="routes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="w-full h-full overflow-auto">
      <div class="h-15 bg-blue w-full ">
        header
      </div>
      <div class="h-10 bg-cyan-400 w-full ">
        tag
      </div>
      <div class="h-full w-full bg-pink-300 ">
        <Main />
        <div />
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
 .menu{
  .el-menu{
    border-right: none;
  }
  .el-menu--vertical{
    background-color: #1e293b;
  }
}
</style>
