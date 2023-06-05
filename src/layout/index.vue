<script setup lang='ts'>
import Menu from './menu/index.vue'
import logo from './logo/index.vue'
import Main from './main/index.vue'
import TabBar from './tabbar/index.vue'

const route = useRoute()
const userStore = useUserStore()
const layoutStore = useLayoutStore()
</script>

<template>
  <div class="w-full h-screen flex overflow-hidden layout-container">
    <div class=" h-screen  layout-slide  bg-blue-gray-800 " :class="{ collapse: layoutStore.isCollapse }">
      <logo />
      <el-scrollbar class="w-full menu">
        <el-menu
          router
          :default-active="route.path"
          collapse-transition
          text-color="white"
          background-color="#1e293b"
          :collapse="layoutStore.isCollapse"
        >
          <Menu :menu-list="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class=" overflow-auto flex-1 layout-main">
      <div class=" w-full nav-bar ">
        <TabBar />
      </div>
      <div class="overflow-y-auto w-full main ">
        <Main />
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.layout-container{

.layout-slide {
  width: $base-menu-width;
  transition: all .5s;

 .menu{
  height: calc(100vh - $base-top-nav-height );
  .el-menu{
    border-right: none;
  }
  .el-menu--vertical{
    background-color: #1e293b;
  }
}
}

.collapse{
  transition: all .5s;
  width: $base-menu-min-width;
}

.layout-main{
.nav-bar{
  height: $base-top-nav-height;
}
.main{
  height:calc(100vh  -  $base-top-nav-height)
}
}
}
</style>
