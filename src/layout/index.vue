<script setup lang='ts'>
import Menu from './menu/index.vue'
import logo from './logo/index.vue'
import Main from './main/index.vue'
import TabBar from './tabbar/index.vue'

const route = useRoute()
const userStore = useUserStore()
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
          <Menu :menu-list="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="w-full h-full overflow-auto">
      <div class="h-15 w-full ">
        <TabBar />
      </div>
      <div class="overflow-y-auto w-full bg-pink-300 " style="height:calc(100vh - 60px)">
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
